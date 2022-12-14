import { RequestHandler, Request, Response, NextFunction } from "express"
import async from "async"
import { body, validationResult } from "express-validator"
import Category, { ICategory } from "../models/category"
import Item, { IItem } from "../models/item"
import endpoints from "../endpoints.config"

// NOTE: Homepage
export const index: RequestHandler = (_, res, next) => {
  Category.find()
    .sort({ name: 1 })
    .exec((err, list_category) => {
      if (err) {
        next(err)
      } else {
        res.render("category_index", {
          title: "Categories",
          category_list: list_category,
        })
      }
    })
}

// Display all the items inside of a category
// NOTE: /category/:id/
export const category_detail: RequestHandler = (req, res, next) => {
  interface IResult {
    item_list: IItem[]
    category_name: { name: string }
  }
  async.parallel(
    {
      category_name(callback) {
        Category.findById(req.params.id).exec(callback)
      },
      item_list(callback) {
        Item.find({ category: req.params.id }).sort({ title: 1 }).exec(callback)
      },
    },
    (err, results: any | IResult) => {
      if (err) {
        next(err)
      } else {
        res.render("category_detail", {
          title: results.category_name.name,
          item_list: results.item_list,
          category: results.category_name,
        })
      }
    }
  )
}

// Display category create form on GET.
export const category_create_get: RequestHandler = (_, res) => {
  // NOTE: /category/create
  res.render("category_form", { title: "Create Category" })
}

// Handle category create on POST.
export const category_create_post = [
  // Validate and sanitize
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified.")
    .isAlphanumeric()
    .withMessage("Category name has non-alphanumeric characters."),
  body("description")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage("Category description must be specified."),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Data from form is valid.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    })
    switch (!errors.isEmpty()) {
      case true:
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("category_form", {
          title: "Create Category",
          category: category,
          errors: errors.array(),
        })
        return
      default:
        category.save((err) => {
          if (err) {
            return next(err)
          } else {
            if (category.url) {
              res.redirect(category.url)
            } else {
              res.redirect("/")
            }
          }
        })
    }
  },
]

// Display category delete form on GET.
export const category_delete_get: RequestHandler = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback)
      },
      items(callback) {
        Item.find({ category: req.params.id }).exec(callback)
      },
    },
    (err, results) => {
      if (err) return next(err)
      else {
        res.render("category_delete", {
          title: "Delete Category",
          category: results.category,
          items: results.items,
        })
      }
    }
  )
}

// Handle category delete on POST.
export const category_delete_post = [
  body("password")
    .exists()
    .custom((value) => {
      if (value === endpoints.DELETE_PASSWORD) {
        return true
      } else {
        throw new Error("Password is incorrect")
      }
    }),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    switch (!errors.isEmpty()) {
      case true:
        async.parallel(
          {
            category(callback) {
              Category.findById(req.params.id).exec(callback)
            },
            items(callback) {
              Item.find({ category: req.params.id }).exec(callback)
            },
          },
          (err, results) => {
            if (err) return next(err)
            else {
              res.render("category_delete", {
                title: "Delete Category",
                category: results.category,
                items: results.items,
                errors: errors.array(),
              })
            }
          }
        )
        return

      default:
        async.parallel(
          {
            item(callback) {
              Item.deleteMany({ category: req.body.id }).exec(callback)
            },
            category(callback) {
              Category.findByIdAndRemove(req.body.id).exec(callback)
            },
          },
          (err, _) => {
            if (err) return next(err)
            res.redirect("/")
          }
        )
    }
  },
]

// Display category update form on GET.
export const category_update_get: RequestHandler = (req, res, next) => {
  // NOTE: /category:id/update
  Category.findById(req.params.id, (err: Error, category: ICategory | null) => {
    if (err) return next(err)
    else if (category == null) {
      const err = new Error("Category not found")
      res.status(404)
      return next(err)
    } else {
      res.render("category_update_form", {
        title: "Update Category",
        category: category,
      })
    }
  })
}

// Handle category update on POST.
export const category_update_post = [
  // Validate and sanitize
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified.")
    .isAlphanumeric()
    .withMessage("Category name has non-alphanumeric characters."),
  body("description")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage("Category description must be specified."),
  body("password")
    .exists()
    .custom((value) => {
      if (value === endpoints.UPDATE_PASSWORD) {
        return true
      } else {
        throw new Error("Password is incorrect")
      }
    }),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Data from form is valid.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    })
    switch (!errors.isEmpty()) {
      case true:
        res.render("category_update_form", {
          title: "Create Category",
          category: category,
          errors: errors.array(),
        })
        return
      default:
        Category.findByIdAndUpdate(
          req.params.id,
          category,
          {},
          (err, result: ICategory | null) => {
            if (err) return next(err)
            else {
              if (result === null) {
                res.redirect("/")
              } else {
                if (result.url) res.redirect(result.url)
                else res.redirect("/")
              }
            }
          }
        )
    }
  },
]

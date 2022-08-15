import { RequestHandler, Request, Response, NextFunction } from "express"
import async from "async"
import { Types } from "mongoose"
import { body, validationResult } from "express-validator"
import Category from "../models/category"
import Item, { IItem } from "../models/item"

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
export const category_detail: RequestHandler = (req, res, next) => {
  interface IResult {
    item_list: IItem[]
    category_name: { name: string }
  }
  // NOTE: /category/:id/
  async.parallel(
    {
      category_name(callback) {
        Category.findById(req.params.id, "name").exec(callback)
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

    switch (!errors.isEmpty()) {
      case true:
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("category_form", {
          title: "Create Category",
          category: req.body,
          errors: errors.array(),
        })
        return
      default:
        // Data from form is valid.
        const category = new Category({
          _id: new Types.ObjectId(),
          name: req.body.name,
          description: req.body.description,
        })
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
export const category_delete_get: RequestHandler = (_, res) => {
  // NOTE: /category:id/delete
  res.send("NOT IMPLEMENTED: category delete GET")
}

// Handle category delete on POST.
export const category_delete_post: RequestHandler = (_, res) => {
  // NOTE: /category:id/delete
  res.send("NOT IMPLEMENTED: category delete POST")
}

// Display category update form on GET.
export const category_update_get: RequestHandler = (_, res) => {
  // NOTE: /category:id/update
  res.send("NOT IMPLEMENTED: category update GET")
}

// Handle category update on POST.
export const category_update_post: RequestHandler = (_, res) => {
  // NOTE: /category:id/update
  res.send("NOT IMPLEMENTED: category update POST")
}

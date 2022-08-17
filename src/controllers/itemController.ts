import { RequestHandler, Request, Response, NextFunction } from "express"
import async from "async"
import { body, validationResult } from "express-validator"
import Item, { IItem } from "../models/item"
import Category from "../models/category"
import endpoints from "../endpoints.config"

// Display detail page for a specific item.
export const item_detail: RequestHandler = (req, res, next) => {
  // NOTE: /inventory/item/:id/
  Item.findById(req.params.id).exec((err, item_detail) => {
    if (err) {
      next(err)
    } else {
      res.render("item_detail", {
        item: item_detail,
      })
    }
  })
}

// Display item create form on GET.
export const item_create_get: RequestHandler = (_, res, next) => {
  // NOTE: /inventory/item/create
  async.parallel(
    {
      category(callback) {
        Category.find(callback)
      },
    },
    (err, results) => {
      if (err) return next(err)
      else {
        res.render("item_form", {
          title: "Create Item",
          categories: results.category,
        })
      }
    }
  )
}

// Handle item create on POST.
export const item_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .toFloat()
    .isFloat()
    .withMessage("Price must be a valid number")
    .escape(),
  body(
    "discountPercentage",
    "Discount percentage must be provided, else pass 0"
  )
    .trim()
    .toFloat()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount percentage must be a valid number")
    .escape(),
  body("rating", "Rating must be provided")
    .trim()
    .toFloat()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a valid number")
    .escape(),
  body("stock", "Stock must be provided")
    .trim()
    .toInt()
    .isInt()
    .withMessage("Stock must be a valid number")
    .escape(),
  body("thumbnail")
    .exists()
    .withMessage("Thumbnail is required")
    .isURL()
    .withMessage("Thumbnail requires a valid link.")
    .custom((value) => {
      const checkIfImage = (url: string) =>
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
      if (checkIfImage(value)) {
        return true
      } else {
        throw new Error("Thumbnail link must be a valid image url")
      }
    }),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      stock: req.body.stock,
      brand: req.body.brand,
      // TODO: better image upload
      thumbnail: req.body.thumbnail,
      images: req.body.thumbnail,
    })

    switch (!errors.isEmpty()) {
      case true:
        async.parallel(
          {
            category(callback) {
              Category.find(callback)
            },
          },
          (err, results) => {
            if (err) return next(err)
            res.render("item_form", {
              title: "Create Item",
              item: item,
              categories: results.category,
              errors: errors.array(),
            })
          }
        )
        return
      default:
        Item.findOne({ title: req.body.title }).exec((err, found_item) => {
          if (err) return next(err)
          else if (found_item) {
            if (found_item.url) {
              res.redirect(found_item.url) // redirect to the new doc page
            } else {
              res.redirect("/") // redirect to the new doc page
            }
          } else {
            item.save((err) => {
              // save the form input
              if (err) return next(err)
              else {
                if (item.url) {
                  res.redirect(item.url) // redirect to the new doc page
                } else {
                  res.redirect("/") // redirect to the new doc page
                }
              }
            })
          }
        })
    }
  },
]

// Display item delete form on GET.
export const item_delete_get: RequestHandler = (req, res, next) => {
  // NOTE: /inventory/item/:id/delete
  Item.findById(req.params.id).exec((err, item_detail) => {
    if (err) {
      next(err)
    } else {
      res.render("item_delete", {
        title: "Delete Item",
        item: item_detail,
      })
    }
  })
}

// Handle item delete on POST.
export const item_delete_post = [
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
            item(callback) {
              Item.findById(req.params.id).exec(callback)
            },
          },
          (err, results) => {
            if (err) return next(err)
            res.render("item_delete", {
              title: "Delete Item",
              item: results.item,
              errors: errors.array(),
            })
          }
        )
        return

      default:
        Item.findByIdAndRemove(req.params.id).exec((err, _) => {
          if (err) return next(err)
          res.redirect("/")
        })
    }
  },
]

// Display item update form on GET.
export const item_update_get: RequestHandler = (req, res, next) => {
  // NOTE: /inventory/item/create
  async.parallel(
    {
      category(callback) {
        Category.find(callback)
      },
      item(callback) {
        Item.findById(req.params.id).exec(callback)
      },
    },
    (err, results) => {
      if (err) return next(err)
      else {
        res.render("item_update_form", {
          title: "Update Item",
          categories: results.category,
          item: results.item,
        })
      }
    }
  )
}

// Handle item update on POST.
export const item_update_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty.").trim().exists().escape(),
  body("price", "Price must not be empty.")
    .trim()
    .toFloat()
    .isFloat()
    .withMessage("Price must be a valid number")
    .escape(),
  body(
    "discountPercentage",
    "Discount percentage must be provided, else pass 0"
  )
    .trim()
    .toFloat()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount percentage must be a valid number")
    .escape(),
  body("rating", "Rating must be provided")
    .trim()
    .toFloat()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a valid number")
    .escape(),
  body("stock", "Stock must be provided")
    .trim()
    .toInt()
    .isInt()
    .withMessage("Stock must be a valid number")
    .escape(),
  body("thumbnail")
    .exists()
    .withMessage("Thumbnail is required")
    .isURL()
    .withMessage("Thumbnail requires a valid link.")
    .custom((value) => {
      const checkIfImage = (url: string) =>
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
      if (checkIfImage(value)) {
        return true
      } else {
        throw new Error("Thumbnail link must be a valid image url")
      }
    }),
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

    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      stock: req.body.stock,
      brand: req.body.brand,
      // TODO: better image upload
      thumbnail: req.body.thumbnail,
      images: req.body.thumbnail,
      _id: req.params.id,
    })

    switch (!errors.isEmpty()) {
      case true:
        async.parallel(
          {
            category(callback) {
              Category.find(callback)
            },
          },
          (err, results) => {
            if (err) return next(err)
            res.render("item_update_form", {
              title: "Update Item",
              item: item,
              categories: results.category,
              errors: errors.array(),
            })
          }
        )
        return
      default:
        Item.findByIdAndUpdate(
          req.params.id,
          item,
          {},
          (err, result: IItem | null) => {
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

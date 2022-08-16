import { RequestHandler, Request, Response, NextFunction } from "express"
import async from "async"
import { body, validationResult } from "express-validator"
import Item from "../models/item"
import Category from "../models/category"

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
          category: results.category,
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
    .isLength({ min: 8 })
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
      thumbnail: "https://picsum.photos/200/300",
      images: ["https://picsum.photos/200/300"],
    })

    if (!errors.isEmpty()) {
      async.parallel(
        {
          category(callback) {
            Category.find(callback)
          },
        },
        (err, results) => {
          if (err) return next(err)
          else {
            console.log(results.category)
            res.render("item_form", {
              title: "Create Item",
              category: results.category,
              errors: errors.array(),
            })
          }
        }
      )
      return
    } else {
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
export const item_delete_get: RequestHandler = (_, res) => {
  // NOTE: /inventory/item:id/delete
  res.send("NOT IMPLEMENTED: item delete GET")
}

// Handle item delete on POST.
export const item_delete_post: RequestHandler = (_, res) => {
  // NOTE: /inventory/item:id/delete
  res.send("NOT IMPLEMENTED: item delete POST")
}

// Display item update form on GET.
export const item_update_get: RequestHandler = (_, res) => {
  // NOTE: /inventory/item:id/update
  res.send("NOT IMPLEMENTED: item update GET")
}

// Handle item update on POST.
export const item_update_post: RequestHandler = (_, res) => {
  // NOTE: /inventory/item:id/update
  res.send("NOT IMPLEMENTED: item update POST")
}

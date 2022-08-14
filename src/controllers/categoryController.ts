import { RequestHandler } from "express"
import Category from "../models/category"

// Homepage - display list of all categorys.
export const index: RequestHandler = (_, res, next) => {
  // show the categories and their description
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

// Display list of all books.
export const category_list: RequestHandler = (_, res) => {
  // NOTE: /category
  res.send("NOT IMPLEMENTED: Book list")
}

// Display all the items inside of a category
export const category_detail: RequestHandler = (req, res) => {
  // NOTE: /category/:id/
  res.send(`NOT IMPLEMENTED: category detail: ${req.params.id}`)
}

// Display category create form on GET.
export const category_create_get: RequestHandler = (_, res) => {
  // NOTE: /category/create
  res.send("NOT IMPLEMENTED: category create GET")
}

// Handle category create on POST.
export const category_create_post: RequestHandler = (_, res) => {
  // NOTE: /category/create
  res.send("NOT IMPLEMENTED: category create POST")
}

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

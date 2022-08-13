import { RequestHandler } from "express"
/* import category, { ICategory } from "../models/category" */

// Homepage - display list of all categorys.
export const index:RequestHandler = (_, res) => {
  // NOTE: /inventory/
  // TODO: homepage should just should name of page and category button
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all books.
export const category_list:RequestHandler = (_, res) => {
  // NOTE: /inventory/category
  res.send('NOT IMPLEMENTED: Book list');
};

// Display detail page for a specific category.
export const category_detail: RequestHandler = (req, res) => {
  // NOTE: /inventory/category/:id/
  res.send(`NOT IMPLEMENTED: category detail: ${req.params.id}`)
}

// Display category create form on GET.
export const category_create_get: RequestHandler = (_, res) => {
  // NOTE: /inventory/category/create
  res.send("NOT IMPLEMENTED: category create GET")
}

// Handle category create on POST.
export const category_create_post: RequestHandler = (_, res) => {
  // NOTE: /inventory/category/create
  res.send("NOT IMPLEMENTED: category create POST")
}

// Display category delete form on GET.
export const category_delete_get: RequestHandler = (_, res) => {
  // NOTE: /inventory/category:id/delete
  res.send("NOT IMPLEMENTED: category delete GET")
}

// Handle category delete on POST.
export const category_delete_post: RequestHandler = (_, res) => {
  // NOTE: /inventory/category:id/delete
  res.send("NOT IMPLEMENTED: category delete POST")
}

// Display category update form on GET.
export const category_update_get: RequestHandler = (_, res) => {
  // NOTE: /inventory/category:id/update
  res.send("NOT IMPLEMENTED: category update GET")
}

// Handle category update on POST.
export const category_update_post: RequestHandler = (_, res) => {
  // NOTE: /inventory/category:id/update
  res.send("NOT IMPLEMENTED: category update POST")
}

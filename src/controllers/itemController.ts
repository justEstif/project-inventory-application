import { RequestHandler } from "express"
import { Types } from "mongoose"
import Item, { IItem } from "../models/item"

// Display detail page for a specific item.
export const item_detail: RequestHandler = (req, res, next) => {
  // NOTE: /inventory/item/:id/

  const itemID = new Types.ObjectId(req.params.id)
  Item.find({ _id: itemID }).exec((err, item_detail) => {
    if (err) {
      next(err)
    } else {
      const item: IItem = item_detail[0] as IItem
      res.render("item_detail", {
        title: item.title,
        item: item,
      })
    }
  })
}

// Display item create form on GET.
export const item_create_get: RequestHandler = (_, res) => {
  // NOTE: /inventory/item/create
  res.send("NOT IMPLEMENTED: item create GET")
}

// Handle item create on POST.
export const item_create_post: RequestHandler = (_, res) => {
  // NOTE: /inventory/item/create
  res.send("NOT IMPLEMENTED: item create POST")
}

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

import { Router } from "express"
import * as item_controller from "../controllers/itemController"
import * as category_controller from "../controllers/categoryController"

const inventoryRouter = Router()

/// CATEGORY ROUTES ///

// NOTE: Homepage
inventoryRouter.get("/", category_controller.index)

// GET request for one category.
inventoryRouter.get("/category/:id", category_controller.category_detail)

// GET request for creating a category. NOTE This must come before routes that display category (uses id).
inventoryRouter.get("/category/create", category_controller.category_create_get)

// POST request for creating category.
inventoryRouter.post(
  "/category/create",
  category_controller.category_create_post
)

// GET request to delete category.
inventoryRouter.get(
  "/category/:id/delete",
  category_controller.category_delete_get
)

// POST request to delete category.
inventoryRouter.post(
  "/category/:id/delete",
  category_controller.category_delete_post
)

// GET request to update category.
inventoryRouter.get(
  "/category/:id/update",
  category_controller.category_update_get
)

// POST request to update category.
inventoryRouter.post(
  "/category/:id/update",
  category_controller.category_update_post
)

/// ITEM ROUTES ///

// GET request for one item.
inventoryRouter.get("/item/:id", item_controller.item_detail)

// GET request for creating a item. NOTE This must come before routes that display item (uses id).
inventoryRouter.get("/item/create", item_controller.item_create_get)

// POST request for creating item.
inventoryRouter.post("/item/create", item_controller.item_create_post)

// GET request to delete item.
inventoryRouter.get("/item/:id/delete", item_controller.item_delete_get)

// POST request to delete item.
inventoryRouter.post("/item/:id/delete", item_controller.item_delete_post)

// GET request to update item.
inventoryRouter.get("/item/:id/update", item_controller.item_update_get)

// POST request to update item.
inventoryRouter.post("/item/:id/update", item_controller.item_update_post)

export default inventoryRouter

# Project: Inventory Application

## NPM Packages

### Dependencies

- express
- mongoose
- pug
- luxon -> date normalizing
- serve-favicon -> favicon request middleware
- express-validator -> validate forms
- async -> handle async
- dotenv
- compression
- helmet

### Dev Dependencies

- typescript
- nodemon
- concurrently
- @types/async
- @types/express
- @types/luxon
- @types/mongoose
- @types/node
- @types/compression
- @types/serve-favicon

## Installation:

- `npm i express luxon mongoose pug serve-favicon express-validator async dotenv compression helmet`
- `npm i -D typescript @types/async @types/express @types/luxon @types/mongoose @types/node @types/serve-favicon concurrently nodemon @types/compression`
- `npx tsconfig.json`

## Inventory

- Using data from: <https://dummyjson.com/products>

- Category:

  - name,
  - description
  - URL

- Item:

  - title
  - description
  - price
  - discount percentage
  - rating
  - stock
  - brand
  - category
  - thumbnail
  - images
  - url

## Making the mongo collection

1. Create a new Mongo Collection using the web-interface as demonstrated in the tutorial
2. set up your database schemas and models.
3. seed data to mongo

## Routes and Controllers

1. Create the routes that you need
  - since this should have all crud functions

```
inventory/ — The home/index page.
inventory/<objects>/ — The list of all objects -> category || items
inventory/<object>/<id> — The detail page for a specific category or item with the given _id field value (e.g. /inventory/item/584493c1f4887f06c0e67d37).
inventory/<object>/create — The form to create a new item or category (e.g. /inventory/category/create).
inventory/<object>/<id>/update — The form to update a specific item or category with the given_id field value (e.g. /inventory/category/584493c1f4887f06c0e67d37/update).
inventory/<object>/<id>/delete — The form to delete a specific item or category with the given _id field value (e.g. /inventory/item/584493c1f4887f06c0e67d37/delete).
```

## Design

- button on  the top right-corner of category page to edit or delete category
- you can only add an item to a category that already exists

<!-- NOTE: Deleting a category also means deleting all the items in that category -->
<!-- DONE: Create all of the ‘READ’ views (i.e. view category, and view item) -->

## CRUD

<!-- DONE: WITH THE C -->
<!-- DONE: WITH THE R -->
- C - create
- DONE - R - read
- U - update
- D - delete

<!-- - NOTE: The reason the create form was not rendering was because the order of the routes. -->

- working on how to delete the category and all the items in that category.
```
// Display category delete form on GET.
export const category_delete_get: RequestHandler = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id)
          .exec(callback)
      },
      items(callback) {
        item.find({ category: req.params.id }).exec(callback)
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
export const category_delete_post: RequestHandler = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id)
          .exec(callback)
      },
      items(callback) {
        item.find({ category: req.params.id }).exec(callback)
      },
    },
    (err, results) => {
      if (err) return next(err)

      else if {
        res.render("category_delete", {
          title: "Delete Category",
          category: results.category,
          items: results.items,
        })
        return
      }
      else {
        async.parallel(
        {
            item(callback){
                Item.deleteMany({ category: req.params.id }).exec(callback);
            },
            category(callback){
                Category.findByIdAndRemove(req.body.id).exec(callback)
              }
          },
          (err, results) =>{
              if(err) return next(err)
                res.redirect("/category")
            }
        )
      }
    }
  )
}

```

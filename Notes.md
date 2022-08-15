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

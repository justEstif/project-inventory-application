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
<!-- DONE: WITH THE D -->
- C - create
- DONE - R - read
- U - update
- D - delete

<!-- - NOTE: The reason the create form was not rendering was because the order of the routes. -->

- working on how to delete the category and all the items in that category.

- Noticed the text area in the category_form page was not showing the value
  - fixed it by setting the text directly, rather than as value as you would for input element

- Completed the update item page form

TODO:
- The image uploading feature has not been implemented yet.
- There is an option to pass a link for the thumbnail, but that isn't well implemented as well.

- EXTRA CREDIT:
  - Prevent the user from deleting or updating unless they are logged in.
  - Figure out how to protect destructive actions (like deleting and updating) by making users enter a secret admin password to confirm the action.

  - Possible Method 1
    1. create update form page
    2. add password input field
    3. check the password and allow or prevent
  - Possible Method 2 - without a update form page
    1. Make the submit button create a pop up alert to type in the password
    2. If the password matches confirm changes



- EXTRA CREDIT:
  - For bonus points, try to figure out how to add and upload images for each item. Use this middleware(multer) which was created by the Express team.
    - The documentation in the README there should be enough to get you going.

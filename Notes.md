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

  - categories:

    - smartphones
    - laptops
    - fragrances
    - skincare
    - groceries
    - home-decoration

  - items:

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

Hello,

I am working on the Inventory Management project, and I want to display images of items from an external url.
In my db, I have stored items with thumbnail property which has the url of the image like so:

```js
const ItemSchema = new Schema<IItem>({
  // ... other properties
  thumbnail: { type: String, required: true },
})
```

After I retrieve the url, and try to display it in the template like so:
```pug
li
  a(href=item.url class="capitalize text-2xl text-slate-600 hover:text-blue-600")= item.title
  p(class="indent-3")= item.description
  img(src=item.thumbnail)
```

The browser shows this error message:
`GET https://dummyjson.com/image/i/products/11/thumbnail.jpg net::ERR_BLOCKED_BY_RESPONSE.NotSameOriginAfterDefaultedToSameOriginByCoep 200`

I googled the problem, and I came upon this solution but it didn't solve the problem:

```js
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
)
```
I suspect I have to add something in the img-src, but I don't understand the format to use.
Another idea was to use the cors middleware, but I decided to ask a question beforehand.

Do you mind explaining why this did not work? And any amendment I could make.

Thanks.

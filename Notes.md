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

  - `npm i express   luxon   mongoose   pug   serve-favicon   express-validator   async   dotenv   compression   helmet`
  - `npm i -D  typescript   @types/async   @types/express   @types/luxon   @types/mongoose   @types/node   @types/serve-favicon   concurrently   nodemon   @types/compression`
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

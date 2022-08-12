# Project: Inventory Application

## Type of inventory: Guitar Shop

<!-- TODO: I need to look for some sample data -->

- Shop by Category or condition:

### Category:

- Data model:

  - name: enum [ "Acoustic", "Electric" ]
  - description: string
  - url

### Guitar

- Data model:

  - name: string
  - description: string
  - url: string
  - number_in_stock: number
  - original_price: number
  - category: Category

- Notes:

  - the sum of the 'New' and "Used" Guitar Instances

### Guitar Instance

- Data model:

  - guitar: Guitar
  - condition: enum [ "New", "Used", "Sold", "Free" ]
  - price: number (original_price \* (value based on condition))
  - sold_date: Date

- Notes:

  - can accept or deny return's based on the request date and sold date
    - accept_return if the req date is less 30 days after the sold date
  - the date need to be normalized using luxon
  - price:
    - if "New": original_price
    - if "Sold": return_price: (original_price - (10% \* original_price;))
      - don't accept if it has been 30 days
    - if "Used": (original_price - (2% \* sold_date - req_date))
      - the lowest it can go is 50%

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

### Installation:

  - npm i express   luxon   mongoose   pug   serve-favicon   express-validator   async   dotenv   compression   helmet
  - npm i -D  typescript   @types/async   @types/express   @types/luxon   @types/mongoose   @types/node   @types/serve-favicon   concurrently   nodemon   @types/compression
  - npx tsconfig.json

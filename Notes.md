# Project: Inventory Application

## Type of inventory: Guitar Shop

<!-- TODO: I need to look for some sample data -->
- Shop by Category or condition:

---
- Category:

  + name: enum [ "Acoustic", "Electric" ]
  + description: string
  + url
---

---
- Guitar

  + _id_: Object Id
  + name: string
  + description: string
  + url: string
  + number_in_stock: number
  + original_price: number
  + category: Category

- Notes:
  - the sum of the 'New' and "Used" Guitar Instances
---

---
- Guitar Instance

  + _id_: Object Id
  + guitar: Guitar
  + condition: enum [ "New", "Used", "Sold", "Free" ]
  + price: number (original_price * (value based on condition))
  + accept_return : Boolean
  + sold_date: Date

- Notes:
  - can accept or deny return's based on the request date and sold date
  - price:
    - if "New": original_price
    - if "Sold": return_price: (original_price - (10% * original_price;))
      - don't accept if it has been 30days
    - if "Used": (original_price - (2% * sold_date - req_date))
      - the lowest it can go is 50%
---

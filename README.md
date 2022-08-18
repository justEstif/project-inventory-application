# Project Inventory Application

- An Inventory management app for an imaginary store that includes all of the CRUD methods for both items and categories, so anybody that’s visits can Create, Read, Update or Delete any Item or Category.

- Using:

  - Express + Typescript
  - Pug + Tailwind
  - Heroku


- Final Notes

  - I found this project to be a great overview of mongoose. It felt a lot more intuitive than using firebase.
  - I think I could improve the data model, i.e. the images data type.
    - This would make completing the additional features easier.
  - I noticed that the MDN local library project that I based my project off used get and post request for everything.
    - I think I need to fix this in the next version:
      - C -> POST
      - R -> GET
      - U -> PUT
      - D -> DELETE

  - Possible Additions:

    - The image uploading feature has not been implemented yet.
    - Updating an item also replaces the current array of items.
    - I might implement multer middleware, but it doesn't match the current schema I have setup.
    - There is an option to pass a link for the thumbnail, but that isn't well implemented as well.

- Live link: <https://rocky-shelf-43437.herokuapp.com/>

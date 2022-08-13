import { Router } from "express"

const indexRouter = Router()

// GET home page.
indexRouter.get("/", (_, res) => {
  res.redirect("/category")
})

export default indexRouter


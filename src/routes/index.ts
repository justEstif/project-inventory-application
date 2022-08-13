import { Router } from "express"

const indexRouter = Router()

// GET home page.
indexRouter.get("/", (_, res) => {
  res.redirect("/inventory")
})

export default indexRouter


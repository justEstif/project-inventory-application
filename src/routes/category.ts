import { Router, Response, Request } from "express"
const categoryRouter = Router()

categoryRouter.get("/", (_: Request, res: Response) => {
  res.render("layout", { title: "Hey", message: "Welcome to Category Page" })
})

export default categoryRouter

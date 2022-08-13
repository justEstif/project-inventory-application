import { Router, Response, Request } from "express"
const inventoryRouter = Router()

inventoryRouter.get("/", (_: Request, res: Response) => {
  res.render("layout", { title: "Hey", message: "Welcome to Inventory Page" })
})

export default inventoryRouter

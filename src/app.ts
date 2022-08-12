import express, { Response, Request } from "express"
import path from "path"
import favicon from "serve-favicon"
import mongoose from "mongoose"
import compression from "compression"
import helmet from "helmet"

import endpoints from "./endpoints.config"
// import indexRouter from "./routes"
// import catalogRouter from "./routes/catalog"

// Connect to MongoDB
mongoose.connect(endpoints.MONGO_URL)

const app: express.Express = express()

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// view engine setup
app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

app.use(compression()) // compress all paths
app.use(helmet()) // protect site by setting appr headers

// serve favicon
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")))

// app.use("/", indexRouter)
// app.use("/catalog", catalogRouter)

app.get("/", (_: Request, res: Response) => {
  res.render('layout', { title: 'Hey', message: 'Hello there!' })
})

app.listen(endpoints.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${endpoints.PORT}`
  )
})

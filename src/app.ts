import express from "express"
import path from "path"
import favicon from "serve-favicon"
import mongoose from "mongoose"
import compression from "compression"
import helmet from "helmet"

import endpoints from "./endpoints.config"
import indexRouter from "./routes"
import inventoryRouter from "./routes/inventory"

// Connect to MongoDB
mongoose.connect(endpoints.MONGO_URL)

const app: express.Express = express()

// compress all paths
app.use(compression())

// protect site by setting appr headers
app.use(helmet())

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// view engine setup
app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

// serve favicon
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")))

// Routing
app.use("/", indexRouter)
app.use('/inventory', inventoryRouter)

app.listen(endpoints.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${endpoints.PORT}`
  )
})

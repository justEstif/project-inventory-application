import express from "express"
import path from "path"
import favicon from "serve-favicon"
import mongoose from "mongoose"
import compression from "compression"
import helmet from "helmet"

import endpoints from "./endpoints.config"
import inventoryRouter from "./routes/inventory"

// Connect to MongoDB
mongoose.connect(endpoints.MONGO_URL)

const app: express.Express = express()

app.use(compression()) // compress all paths

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
)

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// view engine setup
app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

// serve favicon
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")))

// Routing
app.use("/", inventoryRouter)

app.listen(endpoints.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${endpoints.PORT}`
  )
})

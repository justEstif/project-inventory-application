import { Types, Schema, model } from "mongoose"

interface ICategory {
  name: string
  description: string
  url?: string
  _id?: Types.ObjectId
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

CategorySchema.virtual("url").get(function() {
  return "/category/" + this._id
})

const Category = model<ICategory>("Category", CategorySchema)
export { ICategory }
export default Category

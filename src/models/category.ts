import { Schema, model, Types } from "mongoose"

interface ICategory {
  _id: Types.ObjectId
  name: string
  description: string
  url?: string
}

const CategorySchema = new Schema<ICategory>({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
})

CategorySchema.virtual("url").get(function () {
  return "/category/" + this._id
})

const Category = model<ICategory>("Category", CategorySchema)
export { ICategory }
export default Category

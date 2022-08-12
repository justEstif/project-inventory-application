import { Types, Schema, model } from "mongoose"

interface IItem {
  title: string
  description: string
  price: number
  discount_percentage: number
  rating: number
  stock: number
  brand: string
  thumbnail: string
  images: string[]
  category: Types.ObjectId
}

const ItemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  discount_percentage: { type: Number, required: true },
  // TODO: min - 0,
  price: { type: Number, required: true },
  // TODO: min - 0, max - 5
  rating: { type: Number, required: true },
  // TODO: min - 0,
  stock: { type: Number, required: true },
})

ItemSchema.virtual("url").get(function () {
  // TODO: /${category}/${title}
  return "/item/" + this._id
})

const Item = model<IItem>("Item", ItemSchema)
export { IItem }
export default Item

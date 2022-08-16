import { Types, Schema, model } from "mongoose"
interface IItem {
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  thumbnail: string
  images: string[]
  category: string | Types.ObjectId
  url?: string
}

const ItemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discountPercentage: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  rating: { type: Number, required: true, min: 0, max: 5 },
})

ItemSchema.virtual("url").get(function() {
  // TODO: /${category}/${title}
  return "/item/" + this._id
})

const Item = model<IItem>("Item", ItemSchema)
export { IItem }
export default Item

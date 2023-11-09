import { Schema as schema, model } from "mongoose";
const Schema = schema;

const productSchema = new Schema(
  {
    image: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    dislikes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { timestamps: true }
);

export default model("Product", productSchema);

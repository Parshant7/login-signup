import { Schema as schema, model } from "mongoose";
const Schema = schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ['user', 'admin']
    }
  },
  { timestamps: true }
);

export default model("User", userSchema);

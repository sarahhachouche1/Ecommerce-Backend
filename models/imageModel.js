import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      enum: ["home", "gallery", "services", "shop", "about"],
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    priority: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const image = mongoose.model("image", imageSchema);

export default image;

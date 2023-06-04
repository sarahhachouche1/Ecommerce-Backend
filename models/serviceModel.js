import mongoose from "mongoose";

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },

    status: {
      type: String,
      enum: ["customer", "student"],
      required: true,
    },
  },
  { timestamps: true }
  
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;

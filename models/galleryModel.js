import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const gallerySchema = new Schema(
    {
        category:{
            type: String,
            required: true
        },
        image: { type: String,
                required: true },
    },

    {
        timestamps: true,
    }

);

const Gallery= model('Gallery', gallerySchema);
export default Gallery;
import Gallery from "../models/galleryModel.js";
import cloudinary from "../utils/cloudinary.js";
import axios from 'axios';

export const createPhoto = async (req,res)=>{
  console.log(req.body.category)
     const category = req.body.category;
     const file = req.file.path;
     try {
        const result = await cloudinary.uploader.upload(file,{
         public_id: `${Date.now()}`,
         resource_type:"auto",
          folder:"Gallery",
        });
        const newPhoto = await Gallery.create({
            category,
            image:result.url
           });
        const save = await newPhoto.save();
        res.status(201).json({
            success: true,
             newPhoto
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}
export const getAllPhotos = async (req, res) => {
    try {
      console.log("hi am here")
      const photos = await Gallery.find().lean();
      const newPhotos = await Promise.all(
        photos.map(async (photo) => {
          const imageUrl = cloudinary.url(photo.image);
          const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const base64Image = Buffer.from(imageResponse.data).toString('base64');
          return {
            _id: photo._id,
            category: photo.category,
            image: base64Image,
          };
        })
      );
      console.log(newPhotos)
      res.status(200).json(newPhotos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deletePhoto = async (req, res) => {
    console.log("hiii",req.params.id)
    const { id } = req.params
    try {
        const deletedPhoto = await Gallery.findByIdAndDelete(id);

      if (!deletedPhoto) {
        return res.status(404).json({ message: 'Photo not found' });
      }
      res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
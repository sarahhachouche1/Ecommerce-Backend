import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import ItemRouter from "./routes/item.route.js";
import OrderRouter from "./routes/order.route.js";
import ItemOrderRouter from "./routes/itemOrder.route.js";
import UserRouter from "./routes/user.route.js";
import cors from "cors";
import express from "express";
// import errorHandler from "./middlewares/errorMiddleware.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import bodyParser from "body-parser";
import aboutRoutes from './routes/aboutRoute.js'
import contactRoutes from './routes/contactRouter.js';
import galleryRoutes from "./routes/galleryRoute.js";
import fileUpload from 'express-fileupload';

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
dotenv.config();

// app.use(fileUpload({ useTempFiles:true
// }));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/uploads',express.static('uploads'))
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//you use these inorder to use the body data
app.use(express.json());

//routes
app.use("/api/services", serviceRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gallery", galleryRoutes);
//item
app.use("/api/Items", ItemRouter);
//order
app.use("/api/Orders", OrderRouter);
//ItemOrder
app.use("/api/ItemOrders", ItemOrderRouter);
//User
app.use('/api/users', UserRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));



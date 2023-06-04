import Service from "../models/serviceModel.js";
import fs from "fs";
import asyncHandler from "express-async-handler";
import path from "path";

// GET /services - retrieve all services
const getServices = async (req, res) => {
  try {
    const services = (await Service.find()).map((item) => {
      let image;
      if (item.image_url) {
        const file = fs.readFileSync(item.image_url);
        image = Buffer.from(file).toString("base64");
      }
      return {
        title: item.title,
        price: item.price,
        description: item.description,
        status: item.status,
        id: item.id,
        image,
      };
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /services/:id - retrieve a specific service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /services - create a new service
const createService = asyncHandler(async (req, res) => {

  const service = new Service({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image_url: req.file?.path,
    status: req.body.status,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /services/:id - update a specific service by ID
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const imageFile = req.file?.path;

    const { title, price, description, status } = req.body;

    service.title = title;
    service.price = price;
    service.description = description;
    service.status = status;
    if (imageFile) service.image_url = imageFile;
    console.log(req.file);

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /services/:id - delete a specific service by ID
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    res.json({ message: `Service ${service.title} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};

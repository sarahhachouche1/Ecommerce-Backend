import Model from "../models/aboutModel.js";
import fs from "fs";

class Controller {
  //get All
  async getAll(req, res, next) {
    try {
      const respon = await Model.find({});
      return res.status(200).json(respon);
    } catch (err) {
      return res.status(500).json({
        data: err,
      });
    }
  }

  //get story by id
  async get(req, res, next) {
    let { id } = req.params;

    try {
      const getAbout = await Model.findById(id);

      if (!getAbout)
        return res.status(404).json({
          data: `Info with this ${id} does not exist`,
        });
      return res.status(200).json({
        data: getAbout,
      });
    } catch (err) {
      return res.status(500).json({
        data: getAbout,
      });
    }
  }

  // creating new story
  async post(req, res) {
    const body = req.body;
    try {
      const doc = new Model(body);
      if (req.file) {
        doc.image_url = req.file.path;
      }
      const new_date = await doc.save();

      return res.status(200).json({ new_date });
    } catch (err) {
      return res.status(500).json({
        data: err.message,
      });
    }
  }
  //update an author by _id
  async put(req, res, next) {
    try {
      const about = await Model.findById(req.params.id);
      if (!about) {
        return res.status(404).json({ message: "About not found" });
      }

      about.title = req.body.title;
      about.description = req.body.description;
      about.image_url = req.file.path;
      about.section = req.body.section;

      const updatedAbout = await about.save();
      res.json(updatedAbout);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  //delete story by id

  async delete(req, res, next) {
    try {
      const about = await Model.findByIdAndDelete(req.params.id);
      res.json({ message: `About story ${about.title} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

const controller = new Controller();

export default controller;

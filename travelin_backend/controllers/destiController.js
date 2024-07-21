import mongoose from "mongoose";
import destiModel from "../models/destination.js";
import destiService from "../servicer/destination.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
class destiController {
  static postDest = async (req, res) => {
    try {
      const fileData = req.files[0];
      const cloudinaryResponse = await uploadOnCloudinary(fileData);
      if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        return res.json({
          status: 500,
          message: "Failed to upload file to Cloudinary",
        });
      }

      const imageUrl = cloudinaryResponse.secure_url;
      const state = req.body.state;
      const place = req.body.place;
      const data = await destiModel.findOne({ place: place });
      if (data) {
        return res.json({
          status: 409,
          message: "record already exists",
        });
      } else {
        if (state && place && imageUrl) {
          try {
            const doc = new destiModel({
              imageUrl: imageUrl,
              state: state,
              place: place,
            });
            await doc.save();
            return res.json({
              status: 200,
              message: "insert success",
            });
          } catch (error) {
            return res.json({
              status: 404,
              message: "failed to add destination",
            });
          }
        } else {
          return res.json({
            status: 409,
            message: "all field are require",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal server error",
      });
    }
  };

  // static postDest = async (req, res) => {
  //     const { img } = req.file
  // }

  static getDest = async (req, res) => {
    try {
      const data = await destiModel.find();
      return res.json(data);
    } catch (error) {
      return res.json({
        status: 500,
        message: "internal server error",
      });
    }
  };

  static updateDest = async (req, res) => {
    try {
      const fileData = req.files[0];
      const cloudinaryResponse = await uploadOnCloudinary(fileData)
      const imageUrl = cloudinaryResponse.secure_url;
      // const imageUrl = req.file.path;
      const { state, place } = req.body;
      const destiId = req.params.id;
      const existingDestination = await destiModel.aggregate([
        {
          $match: {
            place: place,
            _id: { $ne: new mongoose.Types.ObjectId(destiId) },
          },
        },
      ]);
      if (existingDestination.length > 0) {
        return res.json({
          status: 400,
          message: "place already exists",
        });
      } else {
        await destiModel.findByIdAndUpdate(
          destiId,
          { imageUrl, state, place },
          { new: true }
        );
        return res.json({
          status: 200,
          message: "update your destination",
        });
      }
    } catch (error) {
      return res.json({
        status: 500,
        message: "Internal server error",
      });
    }
  };

  static deleteDest = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await destiModel.findById(id);
      console.log(data);
      if (data) {
        console.log(req.params);
        await destiModel.findOneAndDelete(data._id, { id });
        return res.json({
          status: 200,
          message: "record deleted successfully",
        });
      } else {
        return res.json({
          status: 404,
          message: "destination not found",
        });
      }
    } catch (error) {
      return res.json({
        status: 500,
        message: "Internal server error",
      });
    }
  };
}
export default destiController;

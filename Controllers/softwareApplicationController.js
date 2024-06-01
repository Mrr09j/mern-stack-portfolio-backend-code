import { CatchAsyncError } from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { SoftwareApplication } from "../Models/softwareApplicationSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplication = CatchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Apploction svg/icon required", 400));
  }
  const { svg } = req.files;
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler("software name is required", 400));
  }
  const filePath = svg.tempFilePath || svg.path;
  const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
    folder: "PORTFOLIO_SOFTWARE_APPLICATIONS",
  });
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary error",
      cloudinaryResponse.error || "Unknown cloudinary error"
    );
  }

  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "new software application added",
    softwareApplication,
  });
});
export const deleteApplication = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const softwareApplication = await SoftwareApplication.findById(id);
  if (!softwareApplication) {
    return next(new ErrorHandler("Software application not found", 404));
  }
  const softwareApplicationSvgId = softwareApplication.svg.public_id;
  await cloudinary.uploader.destroy(softwareApplicationSvgId);
  await softwareApplication.deleteOne();
  res.status(200).json({
    success: true,
    message: "software application deleted",
  });
});
export const getAllApplications = CatchAsyncError(async (req, res, next) => {
  const softwareApplications = await SoftwareApplication.find();
  res.status(200).json({
    success: true,
    softwareApplications,
  });
});

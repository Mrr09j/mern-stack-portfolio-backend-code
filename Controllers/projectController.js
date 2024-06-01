import { CatchAsyncError } from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { Project } from "../Models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = CatchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files) === 0) {
    return next(new ErrorHandler("project banner image required", 400));
  }
  const { projectBanner } = req.files;
  const {
    title,
    description,
    projectLink,
    gitRepoLink,
    stack,
    technologies,
    deployed,
  } = req.body;
  if (
    !title ||
    !description ||
    !projectLink ||
    !gitRepoLink ||
    !stack ||
    !technologies ||
    !deployed
  ) {
    return next(new ErrorHandler("please provide all details", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "PROJECT IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error",
      cloudinary.error || "Unknown cloudinary error"
    );
    return next(
      new ErrorHandler("Failed to upload project banner to cloudinary", 500)
    );
  }
  const project = await Project.create({
    title,
    description,
    projectLink,
    gitRepoLink,
    stack,
    technologies,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "New Project created",
    project,
  });
});
export const updateProject = CatchAsyncError(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    projectLink: req.body.projectLink,
    gitRepoLink: req.body.gitRepoLink,
    stack: req.body.stack,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
  };
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectBannerId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectBannerId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "Project Images" }
    );
    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Project updated",
    project,
  });
});
export const deleteProject = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("project not found", 404));
  }
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "project deleted",
  });
});
export const getAllProject = CatchAsyncError(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});
export const getSingProject = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("project not found", 404));
  }
  res.status(200).json({
    success: true,
    project,
  });
});

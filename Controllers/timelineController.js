import { CatchAsyncError } from "../Middlewares/CatchAsyncError.js";
import { Timeline } from "../Models/timelineSchema.js";
import ErrorHandler from "../Middlewares/error.js";
export const PostTimeline = CatchAsyncError(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "timeline added",
    newTimeline,
  });
});
export const deleteTimeline = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("timeline not found", 404));
  }
  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "timeline deleted",
  });
});
export const getAllTimelines = CatchAsyncError(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    timelines,
  });
});

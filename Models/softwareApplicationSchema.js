import mongoose from "mongoose";

const softwareApplicationSchema = mongoose.Schema({
  name: String,
  svg: {
    public_id: {
      type: String,
      reuired: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const SoftwareApplication = mongoose.model(
  "SoftwareApplication",
  softwareApplicationSchema
);

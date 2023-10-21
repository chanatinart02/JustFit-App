import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  typeOfActivity: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dateOfActivity: {
    type: Date,
    default: new Date(),
  },
  duration: {
    type: Number,
    required: true,
  },
  energyBurn: {
    type: Number,
    required: false,
  },
  distance: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const activityModel = mongoose.model("Activity", ActivitySchema);

export default activityModel;

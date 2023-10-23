import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  typeOfActivity: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: false,
  },
  energyBurn: {
    type: Number,
    required: false,
  },
  distance: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ["success", "failed"],
    default: null,
  },
});

const goalModel = mongoose.model("Goal", GoalSchema);

export default goalModel;

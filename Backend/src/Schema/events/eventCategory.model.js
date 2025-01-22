const mongoose = require("mongoose");
const {
  mosque,
  userMosque,
  eventCategory,
  user,
} = require("../../Constants/model.constants");

//   enum: [
//     'Religious Education',
//     'Community Services',
//     'Youth Development',
//     'Spiritual Growth',
//     'Family Programs',
//     'Social Welfare',
//     'Islamic Studies',
//     'Charitable Initiatives',
//     'Cultural Engagement',
//     'Interfaith Dialogue'
// "lecture",
// "seminar",
// "workshop",
// "conference",
// "iftar",
// "community_gathering",
// "charity_event",
// "youth_program",
// "children_class",
// "ramadan_program",
// "eid_celebration",
//   ]
const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
      required: true,
    },
    default: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "createdRef",
    },
    createdRef: {
      type: String,
      enum: [user, userMosque],
      required: true,
    },
    updatedRef: {
      type: String,
      enum: [user, userMosque],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "updatedRef",
    },
  },

  { timestamps: true }
);

const eventCategoryModel = mongoose.model(eventCategory, ModelSchema);
module.exports = eventCategoryModel;

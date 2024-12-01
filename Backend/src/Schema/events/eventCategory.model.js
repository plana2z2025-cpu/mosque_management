const mongoose = require("mongoose");

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
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mosque",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "createdRef",
    },
    createdRef: {
      type: String,
      enum: ["user", "user_mosque"],
      required: true,
    },
    updatedRef: {
      type: String,
      enum: ["user", "user_mosque"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "updatedRef",
    },
  },

  { timestamps: true }
);

eventCategoryModel = mongoose.model("eventcategory", ModelSchema);
module.exports = eventCategoryModel;

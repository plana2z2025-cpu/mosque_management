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
      refPath: "dynamicRef",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "dynamicRef",
    },
    dynamicRef: {
      type: String,
      enum: ["user", "user_mosque"],
      required: true,
    },
  },

  { timestamps: true }
);

eventCategoryModel = mongoose.model("eventcategory", ModelSchema);
module.exports = eventCategoryModel;

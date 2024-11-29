const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    },
  },

  { timestamps: true }
);

eventCategoryModel = mongoose.model("eventcategory", ModelSchema);
module.exports = eventCategoryModel;

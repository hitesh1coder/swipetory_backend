const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  userId: String,
  category: String,
  imageurl: String,
  description: String,
  heading: String,
  likes: [],
});
const StoryModel = mongoose.model("story", storySchema);

module.exports = { StoryModel };

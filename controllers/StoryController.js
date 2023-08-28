const { StoryModel } = require("../Models/StoryModel.js");
const UserModel = require("../Models/UserModel.js");

const createStory = async (req, res) => {
  try {
    const forms = req.body.forms;

    if (
      forms.length < 2 &&
      forms[0].category === "" &&
      forms[0].heading === "" &&
      forms[0].imageurl === "" &&
      forms[0].description === "" &&
      forms[1].category === "" &&
      forms[1].heading === "" &&
      forms[1].imageurl === "" &&
      forms[1].description === "" &&
      forms[2].category === "" &&
      forms[2].heading === "" &&
      forms[2].imageurl === "" &&
      forms[2].description === ""
    ) {
      res.status(400).json({ message: "No forms found" });
    } else {
      const result = await StoryModel.create(forms);
      res.status(200).json({ message: "Forms saved successfully" });
    }
  } catch (error) {
    console.error("Error saving forms:", error);
    res.status(501).json({ error: "An error occurred" });
  }
};

// Get all Story

const getAllStory = async (req, res) => {
  try {
    const story = await StoryModel.find();
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json(error);
  }
};
// get filter Stories
const getFilteredStories = async (req, res) => {
  try {
    let category = req.query.category || "";

    const filterStories =
      category === "all"
        ? await StoryModel.find()
        : await StoryModel.find({ category });

    return res.status(200).json(filterStories);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// Update a story
const updateStory = async (req, res) => {
  const storyId = req.params.id;
  const { userId } = req.body;
  try {
    const story = await StoryModel.findById(storyId);
    if (story.userId === userId) {
      await story.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingleStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    const story = await StoryModel.findById(storyId);
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addToBookmark = async (req, res) => {
  const storyData = req.body.storyData;
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId);

    await user.updateOne({ $push: { bookmarksStories: storyData } });

    res.status(200).json({
      status: "SUCCESS",
      bookMarkedStories: user.bookmarksStories,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a story
const likeStory = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const story = await StoryModel.findById(id);
    if (!story.likes.includes(userId)) {
      await story.updateOne({ $push: { likes: userId } });
      res.status(200).json({ status: "liked", likes: story.likes });
    } else {
      await story.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ status: "unliked", likes: story.likes });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCurrentUserStories = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const currentUserStories = await StoryModel.find({ userId });
    res
      .status(200)
      .json(currentUserStories.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createStory,
  updateStory,
  getAllStory,
  getSingleStory,
  getFilteredStories,
  likeStory,
  getCurrentUserStories,
  addToBookmark,
};

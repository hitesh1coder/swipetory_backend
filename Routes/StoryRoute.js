const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createStory,
  getAllStory,
  updateStory,
  likeStory,
  getCurrentUserStories,
  getFilteredStories,
  getSingleStory,
  addToBookmark,
} = require("../controllers/StoryController");
const router = express.Router();

router.post("/create/:id", auth, createStory);
router.get("/singlestory/:id", getSingleStory);
router.get("/", getAllStory);
router.get("/category", getFilteredStories);
router.post("/bookmark/:userId", addToBookmark);
router.put("/update/:id", auth, updateStory);
router.put("/like/:id", likeStory);
router.get("/:id/mystory", getCurrentUserStories);

module.exports = router;

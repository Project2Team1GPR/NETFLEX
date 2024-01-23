const router = require('express').Router();
const { Comment } = require('../../models');

// Create New Comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });

    console.log(newComment);

    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;


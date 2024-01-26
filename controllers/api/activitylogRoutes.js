const { ActivityLog } = require("../../models");
const router = require("express").Router();

router.post("/", async (req, res) => {
  console.log("made it to route");
  try {
    if (!req.session.user_id) {
      return res
        .status(401)
        .json({ message: "You must be logged in to do that." });
    }

    const newActivity = await ActivityLog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newActivity);

    res.status(200).json(newActivity);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;

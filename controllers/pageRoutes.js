const router = require("express").Router();
const { Post, Comment, User, ActivityLog } = require("../models");
const withAuth = require("../utils/auth");
// get all blog posts for homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log("BLOGS", posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post
router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const post = dbPostData.get({ plain: true });
    console.log("LOOK", post);
    res.render("post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get Dashboard data.. user's blog posts
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [["createdAt", "DESC"]],
    });

    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });

    const posts = postData.map((dashboard) => dashboard.get({ plain: true }));
    const user = userData.get({ plain: true });

    console.log(posts);
    console.log(user);
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn, user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get form for user to create a post
router.get("/dashboard/create", async (req, res) => {
  res.render("create-post", { loggedIn: req.session.loggedIn });
});

// Get form to edit post
router.get("/dashboard/edit/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const post = dbPostData.get({ plain: true });
    res.render("edit-post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//activity log
router.get("/activitylog", async (req, res) => {
  try {
    const logs = await ActivityLog.findAll({
      order: [["createdAt", "DESC"]],
    }); // fetch all logs from the database
    const logsData = logs.map((log) => log.get({ plain: true })); // convert logs to plain JavaScript objects
    console.log("made it to activity log");
    console.log(logs);
    res.render("activity-log", { loggedIn: req.session.loggedIn, 
      logs: logsData, // pass the logs to the view
      layout: "main", // specify the layout if you're using one
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

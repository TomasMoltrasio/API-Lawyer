const postController = {};

const Post = require("../models/Post");

postController.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "Posts not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

postController.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

postController.getPostsByTitle = async (req, res) => {
  try {
    const posts = await Post.find({
      title: { $regex: req.params.title, $options: "i" },
    });
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

postController.createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
      date: new Date(),
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

postController.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.title = req.body.title;
      post.content = req.body.content;
      post.description = req.body.description;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

postController.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.remove();
      res.status(200).json({ message: "Post deleted" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

postController.deleteAllPosts = async (req, res) => {
  try {
    await Post.deleteMany();
    res.status(200).json({ message: "All posts deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = postController;

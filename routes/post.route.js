const { Router } = require("express");
const {
  getPosts,
  getPost,
  getPostsByTitle,
  createPost,
  updatePost,
  deletePost,
  deleteAllPosts,
} = require("../controllers/post.controller");

const router = Router();

router.route("/").get(getPosts).post(createPost).delete(deleteAllPosts);

router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

router.route("/title/:title").get(getPostsByTitle);

module.exports = router;

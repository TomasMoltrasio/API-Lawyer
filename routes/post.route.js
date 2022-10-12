const { Router } = require("express");
const {
  getPosts,
  getPost,
  getPostsByTitle,
  createPost,
  updatePost,
  deletePost,
  deleteAll,
} = require("../services/post.service");

const router = Router();

router.route("/").get(getPosts).post(createPost).delete(deleteAll);

router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

router.route("/title/:title").get(getPostsByTitle);

module.exports = router;

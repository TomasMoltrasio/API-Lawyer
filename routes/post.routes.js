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

const { auth, handleError } = require("../auth");

const router = Router();

router
  .route("/")
  .get(getPosts)
  .post(auth, createPost)
  .delete(auth, deleteAllPosts);

router
  .route("/:id")
  .get(getPost)
  .put(auth, updatePost)
  .delete(auth, deletePost);

router.route("/title/:title").get(getPostsByTitle);

module.exports = router;

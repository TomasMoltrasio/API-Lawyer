const { Router } = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controller");

const { auth, handleError } = require("../auth");

const router = Router();

router.route("/").get(auth, getUsers).post(auth, createUser);

router.route("/login").post(login);

router
  .route("/:id")
  .get(auth, getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

router.use(handleError);

module.exports = router;

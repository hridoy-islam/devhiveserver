const express = require("express");
const {
  accessChat,
  fetchChat,
  deleteChat,
} = require("../Controllers/chatController");

const router = express.Router();

router.route("/").post(accessChat);
router.route("/").get(fetchChat);
router.route("/:id").delete(deleteChat);
// router.route("/group").post( createGroupChat);
// router.route("/rename").put( renameGroup);
// router.route("/removeFromGroup").put( removeFromGroup);
// router.route("/addUser").put( addUser);

module.exports = router;

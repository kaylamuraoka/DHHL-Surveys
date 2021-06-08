const express = require("express");
const router = express.Router();

// CREATE = post
// READ = get
// UPDATE = put
// DELETE = delete

// @route - /api/v1/locations/
router.route("/").get().post();

// @route - /api/v1/locations/{:id}
router.route("/:id").put().delete();

module.exports = router;

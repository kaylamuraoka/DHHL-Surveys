const express = require("express");
const locationController = require("../controllers/locationController");
const router = express.Router();

// CREATE = post
// READ = get
// UPDATE = put
// DELETE = delete

// @route - /api/v1/locations/
router
  .route("/")
  .get(locationController.getAllLocations)
  .post(locationController.createNewLocation);

// @route - /api/v1/locations/{:id}
router
  .route("/:id")
  .put(locationController.updateLocationById)
  .delete(locationController.deleteLocationById);

module.exports = router;

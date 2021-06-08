const Location = require("../models/Location");

exports.getAllLocations = async (req, res, next) => {
  // Sync a query to out mongodb database and retrieve a response
  const locations = await Location.find();

  res.status(200).json({
    success: true,
    data: locations,
  });
};

exports.createNewLocation = (req, res, next) => {
  res.send("Create a new location route");
};

exports.updateLocationById = (req, res, next) => {
  res.send("Update a location by id route");
};

exports.deleteLocationById = (req, res, next) => {
  res.send("Delete a location by id route");
};

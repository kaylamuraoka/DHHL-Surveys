exports.getAllLocations = (req, res, next) => {
  res.send("Get all locations route");
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

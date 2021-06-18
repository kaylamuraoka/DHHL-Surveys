const Location = require("../models/Location");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllLocations = asyncHandler(async (req, res, next) => {
  // Sync a query to out mongodb database and retrieve a response
  let query;

  let uiValues = {
    filtering: {},
    sorting: {},
  };

  const reqQuery = { ...req.query };

  const removeFields = ["sort", "page"];

  removeFields.forEach((val) => delete reqQuery[val]);

  const filterKeys = Object.keys(reqQuery);
  const filterValues = Object.values(reqQuery);

  filterKeys.forEach(
    (val, idx) => (uiValues.filtering[val] = filterValues[idx])
  );

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Location.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortByArr = req.query.sort.split(",");

    sortByArr.forEach((val) => {
      let order;

      if (val[0] === "-") {
        order = "descending";
      } else {
        order = "ascending";
      }

      uiValues.sorting[val.replace("-", "")] = order;
    });

    const sortByStr = sortByArr.join(" ");

    query = query.sort(sortByStr);
  } else {
    query = query.sort("-objectId");
  }

  const locations = await query;

  const maxObjectId = await Location.find()
    .sort({ objectId: -1 })
    .limit(1)
    .select("-_id objectId");

  const minObjectId = await Location.find()
    .sort({ objectId: 1 })
    .limit(1)
    .select("_id objectId");

  uiValues.maxObjectId = maxObjectId[0].objectId;
  uiValues.minObjectId = minObjectId[0].objectId;

  res.status(200).json({
    success: true,
    data: locations,
    uiValues,
  });
});

exports.createNewLocation = asyncHandler(async (req, res, next) => {
  const location = await Location.create(req.body);

  res.status(201).json({
    success: true,
    data: location,
  });
});

exports.updateLocationById = asyncHandler(async (req, res, next) => {
  let location = await Location.findById(req.params.id);

  if (!location) {
    return next(
      new ErrorResponse(`Location with id ${req.params.id} was not found`, 404)
    );
  }

  location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: location,
  });
});

exports.deleteLocationById = asyncHandler(async (req, res, next) => {
  let location = await Location.findById(req.params.id);

  if (!location) {
    return next(
      new ErrorResponse(`Location with id ${req.params.id} was not found`, 404)
    );
  }
  await location.remove();

  res.status(200).json({
    success: true,
    data: location,
  });
});

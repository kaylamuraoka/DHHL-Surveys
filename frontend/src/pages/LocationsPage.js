import { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Slider,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import LocationCard from "../components/LocationCard";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: "13px",
  },
  filters: {
    padding: "0 1.5rem",
  },
  idRangeInputs: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const LocationsPage = () => {
  // Material UI Styles
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const params = location.search ? location.search : null;

  // Component State
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sliderMax, setSliderMax] = useState(1000);
  const [objectIdRange, setObjectIdRange] = useState([25, 75]);
  const [objectIdOrder, setObjectIdOrder] = useState("descending");

  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState("");

  const updateUIValues = (uiValues) => {
    setSliderMax(uiValues.maxObjectId);

    if (uiValues.filtering.objectId) {
      let objectIdFilter = uiValues.filtering.objectId;

      setObjectIdRange([
        Number(objectIdFilter.gte),
        Number(objectIdFilter.lte),
      ]);
    }

    if (uiValues.sorting.objectId) {
      let objectIdSort = uiValues.sorting.objectId;

      setObjectIdOrder(objectIdSort);
    }
  };

  // Side effects
  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      try {
        let query;

        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        if (sorting) {
          if (query.length === 0) {
            query = `?sort=${sorting}`;
          } else {
            query = query + "&sort=" + sorting;
          }
        }

        const { data } = await axios({
          method: "GET",
          url: `/api/v1/locations${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setLocations(data.data);
        setLoading(false);
        updateUIValues(data.uiValues);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error.response.data);
      }
    };

    fetchData();

    return () => cancel();
  }, [filter, params, sorting]);

  const handleObjectIdInputChange = (e, type) => {
    let newRange;
    if (type === "lower") {
      newRange = [...objectIdRange];
      newRange[0] = Number(e.target.value);

      setObjectIdRange(newRange);
    }

    if (type === "upper") {
      newRange = [...objectIdRange];
      newRange[1] = Number(e.target.value);

      setObjectIdRange(newRange);
    }
  };

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const onTextfieldCommitHandler = () => {
    buildRangeFilter(objectIdRange);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?objectId[gte]=${newValue[0]}&objectId[lte]=${newValue[1]}`;

    setFilter(urlFilter);

    history.push(urlFilter);
  };

  const handleSortChange = (e) => {
    setObjectIdOrder(e.target.value);

    if (e.target.value === "ascending") {
      setSorting("objectId");
    } else if (e.target.value === "descending") {
      setSorting("-objectId");
    }
  };

  const clearAllFilters = () => {
    setFilter("");
    setSorting("");
    setObjectIdRange([0, sliderMax]);
    history.push("/");
  };

  return (
    <Container className={classes.root}>
      {/* Filtering and Sorting Section */}
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Filters</Typography>

            <div className={classes.filters}>
              <Slider
                min={0}
                max={sliderMax}
                value={objectIdRange}
                valueLabelDisplay="auto"
                disabled={loading}
                onChange={(e, newValue) => setObjectIdRange(newValue)}
                onChangeCommitted={onSliderCommitHandler}
              />

              <div className={classes.idRangeInputs}>
                <TextField
                  size="small"
                  id="lower"
                  label="Min Object Id"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={objectIdRange[0]}
                  onChange={(e) => handleObjectIdInputChange(e, "lower")}
                  onBlur={onTextfieldCommitHandler}
                />

                <TextField
                  size="small"
                  id="upper"
                  label="Max Object Id"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={objectIdRange[1]}
                  onChange={(e) => handleObjectIdInputChange(e, "upper")}
                  onBlur={onTextfieldCommitHandler}
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort By</Typography>

            <FormControl component="fieldset" className={classes.filters}>
              <RadioGroup
                aria-label="objectId-order"
                name="objectId-order"
                value={objectIdOrder}
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value="descending"
                  disabled={loading}
                  control={<Radio />}
                  label="Object ID: Highest - Lowest"
                />

                <FormControlLabel
                  value="ascending"
                  disabled={loading}
                  control={<Radio />}
                  label="Object ID: Lowest - Highest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button size="small" color="primary" onClick={clearAllFilters}>
          Clear All
        </Button>
      </Paper>

      {/* Locations Listing */}
      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          locations.map((location) => (
            <Grid item key={location._id} xs={12} sm={6} md={4} lg={3}>
              <LocationCard location={location} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default LocationsPage;

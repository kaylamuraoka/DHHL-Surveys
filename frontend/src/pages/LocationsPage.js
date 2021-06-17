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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

  // Component State
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sliderMax, setSliderMax] = useState(1000);
  const [objectIdRange, setObjectIdRange] = useState([25, 75]);

  const [filter, setFilter] = useState("");

  // Side effects
  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios({
          method: "GET",
          url: `/api/v1/locations`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setLocations(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [filter]);

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?objectId[gte]=${newValue[0]}&objectId[lte]=${newValue[1]}`;

    setFilter(urlFilter);

    history.push(urlFilter);
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
                  value={0}
                />

                <TextField
                  size="small"
                  id="upper"
                  label="Max Object Id"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={123}
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort By</Typography>

            <FormControl component="fieldset" className={classes.filters}>
              <RadioGroup aria-label="objectId-order" name="objectId-order">
                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Object ID: Highest - Lowest"
                />

                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Object ID: Lowest - Highest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
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

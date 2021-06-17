import { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

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
});

const LocationsPage = () => {
  // Material UI Styles
  const classes = useStyles();

  // Component State
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, []);

  return (
    <Container className={classes.root}>
      {/* Filtering and Sorting Section */}

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

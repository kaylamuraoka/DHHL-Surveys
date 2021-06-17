import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import axios from "axios";

const LocationsPage = () => {
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
    <Container>
      {/* Filtering and Sorting Section */}

      {/* Locations Listing */}
    </Container>
  );
};

export default LocationsPage;

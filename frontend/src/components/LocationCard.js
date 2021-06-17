import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

const LocationCard = ({ location }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant="h6">{location.objectId}</Typography>}
      />

      <CardContent>
        <Typography variant="caption">{location.housePrfx}</Typography>
        <Typography variant="caption">{location.houseNumbr}</Typography>
        <Typography variant="caption">{location.houseSuffix}</Typography>
        <Typography variant="caption">{location.streetName}</Typography>
        <Typography variant="caption">{location.city}</Typography>
        <Typography variant="caption">{location.zipCode}</Typography>
        <Typography variant="h6" gutterBottom>
          {location.subdivision}
        </Typography>
      </CardContent>

      <CardActions>
        <Button variant="contained" size="small" color="primary">
          Start Survey
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default LocationCard;

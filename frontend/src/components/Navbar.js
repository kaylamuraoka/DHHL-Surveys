import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h5">Locations</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const MySnackbar = ({ open, color, message, onClose}) => {
  return ( <Stack spacing={2} sx={{ width: "100%" }}>
  <Snackbar
    open={open}
    autoHideDuration={3000}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    onClose={onClose}
  >
    <Alert severity={color}>
      {message}
    </Alert>
  </Snackbar>
</Stack> );
}
 
export default MySnackbar;

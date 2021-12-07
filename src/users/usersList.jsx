import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { TableCell, TableContainer } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { getUsers } from "../services/userService";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

class UsersList extends Component {
  state = {
    users: [],
    count: 0,
    page: 0,
    rowsPerPage: 3,
  };

  async componentDidMount() {
    console.log("Test");
    try {
      const { data } = await getUsers();
      const users = data.data;
      this.setState({ users });
    } catch (ex) {
      console.log(ex);
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({ newPage });
  };

  handleOpenAddUsers = () => {
    //window.location = "/register";
    console.log(this.props);
  };

  handleDelete = (id) => {
    const { users } = this.state;
    let deleteUsers = users.filter((user) => {
      return user.id !== id;
    });
    this.setState({ users: deleteUsers });
    console.log(deleteUsers);
  };

  render() {
    const columns = ["Id", "Nome", "Cognome", "Email", "Password"];
    return (
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="row">
          <Tooltip title="Aggiungi" onClick={this.handleOpenAddUsers}>
            <IconButton aria-label="delete" size="large">
              <PersonAddAltIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="row">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((col) => {
                    return (
                      <TableCell align="center" key={col}>
                        {col}&nbsp;
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.surname}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.password}</TableCell>
                    <TableCell align="center">
                      {}
                      <Tooltip title="Elimina">
                        <IconButton
                          aria-label="delete"
                          size="large"
                          color="error"
                          onClick={this.handleDelete.bind(this, user.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <Tooltip title="Modifica">
                        <IconButton
                          aria-label="edit"
                          size="large"
                          onClick={this.handleOpenAddUsers}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default UsersList;

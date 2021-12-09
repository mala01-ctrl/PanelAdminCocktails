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
import { deleteUser, getUsers } from "../services/userService";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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

  handleDelete = async (id) => {
    const { users } = this.state;
    let deleteUsers = users.filter((user) => {
      return user.id !== id;
    });
    try {
      const { data } = await deleteUser(id);
      console.log(data);
      if (data.status) this.setState({ users: deleteUsers });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("Questo utente è già stato cancellato");
    }
    console.log(deleteUsers);
  };

  //TODO refactoring della table in un nuovo componente
  render() {
    const columns = [
      "Id",
      "Nome",
      "Cognome",
      "Email",
      "Password",
      "Elimina",
      "Modifica",
    ];
    return (
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="row">
          <Link to="/register">
            <Tooltip title="Aggiungi">
              <IconButton
                aria-label="add"
                size="large"
                style={{ color: "#3f51b5" }}
              >
                <PersonAddAltIcon />
              </IconButton>
            </Tooltip>
          </Link>
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
                          onClick={this.handleDelete.bind(this, user.id)}
                          style={{ color: "red" }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <Tooltip title="Modifica">
                        <Link to="/register">
                          <IconButton
                            aria-label="edit"
                            size="large"
                            onClick={this.handleOpenAddUsers}
                            style={{ color: "#3f51b5" }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default UsersList;

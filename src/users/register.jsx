import { TextField } from "@mui/material";
import React, { Component } from "react";
import validate from "validate.js";
import { register } from "../services/userService";
import MySnackbar from "../utils/snackbar";

class Register extends Component {
  state = {
    user: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    errors: {},
    snackBar: {
      open: false,
      color: "",
      message: "",
    },
  };

  constraints = {
    name: {
      presence: { allowEmpty: false },
    },
    surname: {
      presence: { allowEmpty: false },
    },
    email: {
      presence: { allowEmpty: false },
      email: {
        message: "Formato non valido",
      },
    },
    password: {
      presence: { allowEmpty: false },
    },
  };

  handleChange = ({ target: input }) => {
    const { user } = this.state;
    user[input.name] = input.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.handleError(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ user, errors });
  };

  handleError = ({ name, value }) => {
    validate.validators.presence.message = "Campo obbligatorio";
    let error = validate.single(value, this.constraints[name]);
    return error ? error[0] : null;
  };

  doSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }
    try {
      const { user } = this.state;
      const { data } = await register(user);
      const { snackBar } = this.state;
      if (data.status) {
        window.location = "/home";
        snackBar.open = true;
        snackBar.message = "Utente Inserito correttamente";
        snackBar.color = "success";
      } else{
        snackBar.open = true;
        snackBar.message = "Qualcosa è andato storto!";
        snackBar.color = "error";
      }
      this.setState({ snackBar });
    } catch (ex) {}
  };

  handleClose = () => {
    const { snackBar } = this.state;
    snackBar.open = false;
    this.setState({ snackBar });
  };

  validate = () => {
    validate.validators.presence.message = "Campo obbligatorio";
    let error = validate(this.state.user, this.constraints, {
      fullMessages: false,
    });
    if (!error) return;
    const errors = [];
    Object.keys(error).map((item) => (errors[item] = error[item][0]));
    return errors;
  };

  render() {
    const { name, surname, email, password } = this.state.user;
    const errors = this.state.errors;
    return (
      <form onSubmit={this.doSubmit}>
        <div className="container" style={{ marginTop: "7%" }}>
          <div className="row justify-content-center">
            <div className="card">
              <div className="card-body">
                <div style={{ textAlign: "center" }}>
                  <i className="fas fa-user-circle fa-3x"></i>
                  <h3 className="card-title">Registrazione</h3>
                </div>
                <div className="row" style={{ marginTop: "5%" }}>
                  <div className="col">
                    <TextField
                      error={errors["name"] ? true : false}
                      onChange={this.handleChange}
                      value={name}
                      helperText={errors["name"]}
                      name="name"
                      label="Nome"
                      variant="outlined"
                      required
                    />
                  </div>
                  <div className="col">
                    <TextField
                      error={errors["surname"] ? true : false}
                      onChange={this.handleChange}
                      value={surname}
                      helperText={errors["surname"]}
                      name="surname"
                      label="Cognome"
                      variant="outlined"
                      required
                    />
                  </div>
                </div>
                <div className="row" style={{ marginTop: "5%" }}>
                  <div className="col">
                    <TextField
                      error={errors["email"] ? true : false}
                      onChange={this.handleChange}
                      value={email}
                      helperText={errors["email"]}
                      name="email"
                      id="email"
                      label="Email"
                      variant="outlined"
                      required
                    />
                  </div>
                  <div className="col">
                    <TextField
                      error={errors["password"] ? true : false}
                      onChange={this.handleChange}
                      value={password}
                      helperText={errors["password"]}
                      name="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      required
                    />
                  </div>
                </div>
                <div style={{ marginTop: "5%", textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary">
                    Registra
                  </button>
                </div>
              </div>
            </div>
          </div>
          <MySnackbar
            message={this.state.snackBar.message}
            color={this.state.snackBar.color}
            open={this.state.snackBar.open}
            onClose={this.handleClose}
          />
        </div>
      </form>
    );
  }
}

export default Register;

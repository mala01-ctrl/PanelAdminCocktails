import { TextField } from "@mui/material";
import React, { Component } from "react";
import validate from "validate.js";
import { login } from "../services/userService";

class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    errors: {},
    loginError: "",
  };

  constraints = {
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
      const { data } = await login(user);
      console.log(data);
      if (data.status) window.location = "/home";
      else {
        this.setState({ loginError: data.message });
        console.log("test");
      }
    } catch (ex) {}
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
    const errors = this.state.errors;
    console.log(this.state.loginError);
    return (
      <form onSubmit={this.doSubmit}>
        <div className="container" style={{ marginTop: "7%" }}>
          <div className="row justify-content-center">
            <div className="card" style={{ width: "30%" }}>
              <div className="card-body">
                <div style={{ textAlign: "center" }}>
                  <i className="fas fa-user-circle fa-3x"></i>
                  <h3 className="card-title">Login</h3>
                </div>
                <div
                  className="row"
                  style={{ marginTop: "5%", textAlign: "center" }}
                >
                  <div className="col">
                    <TextField
                      onChange={this.handleChange}
                      name="email"
                      label="Email"
                      variant="outlined"
                      error={errors["email"] ? true : false}
                      helperText={errors["email"]}
                      required
                    />
                  </div>
                </div>
                <div
                  className="row"
                  style={{ marginTop: "10%", textAlign: "center" }}
                >
                  <div className="col">
                    <TextField
                      onChange={this.handleChange}
                      name="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      error={errors["password"] ? true : false}
                      helperText={errors["password"]}
                      required
                    />
                  </div>
                </div>
                <div style={{ marginTop: "5%", textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <div>
                  {this.state.loginError ? (
                    <p style={{ color: "red", textAlign: "center" }}>
                      {this.state.loginError}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;

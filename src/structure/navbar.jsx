import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    //console.log(this)
    return (
        <MDBNavbar color="indigo" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Cocktails Database</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
    );
  }
}

export default Navbar;

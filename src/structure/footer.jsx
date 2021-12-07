import { MDBContainer, MDBFooter } from "mdbreact";
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ position: " absolute", bottom: "0", left: "0", width: "100%" }}
    >
      <MDBFooter color="indigo" className="font-small pt-4 mt-4">
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
          </MDBContainer>
        </div>
      </MDBFooter>
    </footer>
  );
};

export default Footer;

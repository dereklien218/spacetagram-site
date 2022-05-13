import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "reactstrap";

function Footer() {
  return (
    <footer className="text-white">
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">Spacetagram</h6>
            <hr className="mb-4 mt-0 d-inline-block mx-auto" />
            <p>Explore the cosmos, space tech and the solar system.</p>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">Cosmos</h6>
            <hr className="mb-4 mt-0 d-inline-block mx-auto" />
            <p>
              <Link to="/gallery">Gallery</Link>
            </p>
            <p>
              <Link to="/marsrover">Mars Rover</Link>
            </p>
            <p>
              <Link to="/nasaphoto">NASA APOD</Link>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase font-weight-bold">Contact</h6>
            <hr className="mb-4 mt-0 d-inline-block mx-auto" />
            <p>
              <i className="fa fa-envelope mr-3"></i> email@email.com
            </p>
            <p>
              <i className="fa fa-phone mr-3"></i> + 1 234 567 8888
            </p>
            <p>
              <i className="fa fa-mobile mr-3"></i> + 1 234 567 8889
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-3" style={{ backgroundColor: "#000000" }}>
        © 2022 Copyright:
        <a href="/home"> Spacetagram</a>
      </div>
    </footer>
  );
}

export default Footer;

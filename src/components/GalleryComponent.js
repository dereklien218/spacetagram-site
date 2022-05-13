import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

function RenderGalleryItem({ cosmo }) {
  return (
    <Card>
      <Link to={`/gallery/${cosmo.id}`}>
        <CardImg
          width="100%"
          height="400px"
          src={cosmo.image}
          alt={cosmo.name}
        />
        <CardImgOverlay>
          <CardTitle>{cosmo.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Gallery(props) {
  const gallery = props.cosmos.cosmos.map((cosmo) => {
    return (
      <div key={cosmo.id} className="col-md-5 m-1 p-2">
        <RenderGalleryItem cosmo={cosmo} />
      </div>
    );
  });

  if (props.cosmos.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.cosmos.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.cosmos.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">{gallery}</div>
    </div>
  );
}

export default Gallery;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_NASA_KEY;

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  }
  if (errMess) {
    return <h4>{errMess}</h4>;
  }
  return (
    <Card>
      <CardImg width="100%" height="300px" src={item.image} alt={item.name} />
      <CardBody>
        <CardTitle>Explore the {item.title}</CardTitle>
        <CardText>{item.subtitle}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props) {
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );
      const data = await res.json();
      setPhotoData(data);
      console.log(data);
    }
  }, []);

  if (!photoData) return <div />;

  return (
    <>
      <div
        className="home"
        style={{
          backgroundImage: `url(${photoData.url})`,
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xs m-2 p-2 text-center">
              <h1>NASA's Photo of the Day</h1>
              <Link to="/nasaphoto">
                <Button color="primary" className="mt-5">
                  Explore the Cosmos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md m-1">
            <Link to="/gallery">
              <RenderCard
                item={props.cosmo}
                isLoading={props.cosmosLoading}
                errMess={props.cosmosErrMess}
              />
            </Link>
          </div>
          <div className="col-md m-1">
            <Link to="/gallery">
              <RenderCard
                item={props.planet}
                isLoading={props.cosmosLoading}
                errMess={props.cosmosErrMess}
              />
            </Link>
          </div>
          <div className="col-md m-1">
            <Link to="/gallery">
              <RenderCard
                item={props.space}
                isLoading={props.cosmosLoading}
                errMess={props.cosmosErrMess}
              />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="home"
        style={{
          maxHeight: "600px",
          backgroundImage: `url(https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/00361/ids/edr/browse/ncam/NLF_0361_0698991442_037ECM_N0110000NCAM02361_07_195J01_1200.jpg)`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>Explore Mars with Perseverance</h1>
              <Link to="/marsrover">
                <Button color="primary" className="mt-5">
                  View Rover Images
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

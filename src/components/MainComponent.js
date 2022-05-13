import React, { Component } from "react";
import Gallery from "./GalleryComponent";
import CosmoInfo from "./CosmoInfoComponent";
import NasaPhoto from "./NasaPhotoComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import MarsRover from "./MarsRoverComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, fetchCosmos } from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    cosmos: state.cosmos,
    comments: state.comments,
    marsrovers: state.marsrovers,
  };
};

const mapDispatchToProps = {
  addComment: (cosmoId, rating, author, text) =>
    addComment(cosmoId, rating, author, text),
  fetchCosmos: () => fetchCosmos(),
};
class Main extends Component {
  componentDidMount() {
    this.props.fetchCosmos();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          cosmo={this.props.cosmos.cosmos.filter((cosmo) => cosmo.type.star)[0]}
          cosmosLoading={this.props.cosmos.isLoading}
          cosmosErrMess={this.props.cosmos.errMess}
          planet={
            this.props.cosmos.cosmos.filter(
              (cosmo) => cosmo.type.solarsystem
            )[0]
          }
          space={
            this.props.cosmos.cosmos.filter((cosmo) => cosmo.type.spacetech)[0]
          }
        />
      );
    };

    const CosmoPage = () => {
      return (
        <Gallery
          cosmos={this.props.cosmos.filter((cosmo) => cosmo.type.star)}
          cosmosLoading={this.props.cosmos.isLoading}
          cosmosErrMess={this.props.cosmos.errMess}
        />
      );
    };

    const CosmoWithId = ({ match }) => {
      return (
        <CosmoInfo
          cosmo={
            this.props.cosmos.cosmos.filter(
              (cosmo) => cosmo.id === +match.params.cosmoId
            )[0]
          }
          isLoading={this.props.cosmos.isLoading}
          errMess={this.props.cosmos.errMess}
          comments={this.props.comments.filter(
            (comment) => comment.cosmoId === +match.params.cosmoId
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/gallery"
                render={() => <Gallery cosmos={this.props.cosmos} />}
              />
              <Route path="/gallery/:cosmoId" component={CosmoWithId} />
              <Route component={NasaPhoto} path="/nasaphoto" />
              <Route
                exact
                path="/marsrover"
                render={() => <MarsRover marsrovers={this.props.marsrovers} />}
              />
              <Route path="/cosmos" component={CosmoPage} />
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

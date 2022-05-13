import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import { HeartComponent } from "./HeartComponent";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderCosmo({ cosmo }) {
  return (
    <div className="col-md-5 p-2 m-1">
      <FadeTransform
        in
        transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
      >
        <Card>
          <CardImg top src={cosmo.image} alt={cosmo.name} />
          <CardBody>
            <CardTitle>{cosmo.name}</CardTitle>
            <CardText>{cosmo.explanation}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, addComment, cosmoId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-4">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((comment) => (
            <Fade in key={comment.id}>
              <div>
                <p className="comments mt-2 mb-4">
                  {comment.text} <br />
                  -- {comment.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
              </div>
            </Fade>
          ))}
        </Stagger>
        <CommentForm cosmoId={cosmoId} addComment={addComment} />
      </div>
    );
  }
  return <div />;
}
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      rating: "value",
      author: "",
      text: "",
      touched: {
        author: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.cosmoId,
      values.rating,
      values.author,
      values.text
    );
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleModal} className="mt-4">
          <i className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>
        <HeartComponent />

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                >
                  <option hidden selected value="">
                    Select
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  rows="6"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function CosmoInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.cosmo) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/gallery">Gallery</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.cosmo.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.cosmo.name}</h2>
            <p style={{ color: "#d14f4f", fontSize: "12px" }}>
              Image Credit and Copyright: {props.cosmo.credit}
            </p>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCosmo cosmo={props.cosmo} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            cosmoId={props.cosmo.id}
          />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CosmoInfo;

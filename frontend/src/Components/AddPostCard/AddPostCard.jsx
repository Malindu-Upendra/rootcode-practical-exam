import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import React from "react";
import "./AddPostCard.css";
import axios from "axios";

export class AddPostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      color: "Blue",
    };
  }

  valuesOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  assignColor = (color) => {
    this.setState({ color: color });
  };

  handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.title, this.state.description);
    const data = {
      title: this.state.title,
      description: this.state.description,
      color: this.state.color,
    };
    await axios.post("http://localhost:5000/post", data).then((res) => {
      this.props.addItem(data);
      this.props.onHide();
    });
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Post
          </Modal.Title>
          <CloseButton onClick={this.props.onHide} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="input"
                name="title"
                onChange={this.valuesOnChange}
                placeholder="Title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                name="description"
                onChange={this.valuesOnChange}
                placeholder="Description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title Color: {this.state.color}</Form.Label>
              <div class="d-flex flex-row" style={{ justifyContent: "end" }}>
                <div
                  onClick={this.assignColor.bind(this, "Blue")}
                  class="p-2 h-45 w-25 bg-primary"
                />
                <div
                  onClick={this.assignColor.bind(this, "Red")}
                  class="p-2 h-45 w-25 bg-danger"
                />
                <div
                  onClick={this.assignColor.bind(this, "Green")}
                  class="p-2 h-45 w-25 bg-success"
                />
              </div>
            </Form.Group>

            <Button
              style={{ backgroundColor: "black" }}
              className="btn-publish"
              type="submit"
            >
              Publish
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

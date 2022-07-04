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
    };
  }

  valuesOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.title, this.state.description);
    const data = {
      title: this.state.title,
      description: this.state.description,
    };
    await axios.post("http://localhost:5000/post", data).then((res) => {
      this.props.addItem(data);
      this.props.onHide()
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
              <Form.Label>Title Color</Form.Label>
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

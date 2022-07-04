import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";
import { RetrievePostCard } from "../Retrieve-Post-Card/RetrievePostCard";

export class ViewPostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      postData: "",
      comment: "",
      comments: [],
      items:[]
    };
  }

  componentDidMount = async () => {
    this.setState({ id: this.props.id });
    let data;
    await axios
      .get("http://localhost:5000/post")
      .then((res) => {
        this.setState({ items: res.data });
      }).then(() => {
         data = this.state.items.find((post) => {
          return post._id === this.props.id;
        });
      });
    this.setState({ postData: data });
    this.setState({ comments: data.comments });
  };

  commentOnChange = (e) => {
    this.setState({ comment: e.target.value });
    console.log(this.state.comment);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let commentArr = [];
    commentArr = this.state.comments;
    commentArr.push({ comment: this.state.comment });
    this.setState({ comments: commentArr });
    this.setState({ comment: "" });
    const data = {
      "id":this.props.id,
      "comment":this.state.comment
    }
    await axios.post("http://localhost:5000/post/comment", data).then((res) => {});
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
          <Modal.Title>
            {this.state.postData?.title || "Not loaded yet"}
          </Modal.Title>
          <CloseButton onClick={this.props.onHide} />
        </Modal.Header>
        <Modal.Body>
          <RetrievePostCard item={this.state.postData} />
          <br></br>
          <Form onSubmit={this.onSubmit}>
            {this.state.comments?.map((comment, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Control
                  value={comment.comment}
                  placeholder="Disabled input"
                  disabled
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                name="comment"
                value={this.state.comment}
                onChange={this.commentOnChange}
                placeholder="Comment"
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "black" }}
              className="btn-publish"
              type="submit"
            >
              Comment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

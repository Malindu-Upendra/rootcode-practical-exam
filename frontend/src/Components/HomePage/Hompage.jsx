import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import "./Homepage.css";
import { RetrievePostCard } from "../Retrieve-Post-Card/RetrievePostCard";
import { AddPostCard } from "../AddPostCard/AddPostCard";
import axios from "axios";

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      addPostModal: false,
    };
  }

  componentDidMount = async () => {
    await axios
      .get("http://localhost:5000/post")
      .then((res) => {
        console.log(res.data);
        // const events = res.data.data;
        this.setState({ items: res.data });
      });
  };

  openAddPostModal = () => {
    this.setState({ addPostModal: true });
  };

  closeAddPostModal = () => {
    this.setState({ addPostModal: false });
  };

  addItem = (item) => {
    this.setState({items:[...this.state.items,item]})
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container className="header">
            <Navbar.Brand href="#home" className="header-title">
              Home
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="container home-body">
          <Button
            variant="dark"
            onClick={this.openAddPostModal}
            className="add-post-button"
          >
            Create new post
          </Button>
          {this.state.items.map((data, index) => (
            <RetrievePostCard key={index} item={data} />
          ))}
        </div>
        <AddPostCard
          show={this.state.addPostModal}
          onHide={this.closeAddPostModal}
          addItem={this.addItem}
        />
      </div>
    );
  }
}

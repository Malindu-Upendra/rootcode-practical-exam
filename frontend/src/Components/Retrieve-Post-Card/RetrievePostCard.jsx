import React from "react";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import "./RetrievePostCard.css";
import { ViewPostCard } from "../ViewPostCard/ViewPostCard";

export class RetrievePostCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hover:false,
      viewCardModal: false
    }
  }

  changeColor = (value) => {
    this.setState({hover:value})
  };

  openViewPostModal = () => {
    this.setState({ viewCardModal: true });
  };

  closeViewPostModal = () => {
    this.setState({ viewCardModal: false });
  };

  render() {
    return (
      <div>
        <Card border="dark" className="post-card">
          <Card.Body>
            <Card.Title
            style={{ color: this.props.item.color}}
              onMouseOut={this.changeColor.bind(this, false)}
              onMouseOver={this.changeColor.bind(this, true)}
              onClick={this.openViewPostModal}
            >
              {this.props.item.title}
            </Card.Title>
            <Card.Text>{this.props.item.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush lg-item">
            <ListGroupItem>
              Comments {this.props.item.comments?.length || 0}
            </ListGroupItem>
          </ListGroup>
        </Card>
        <ViewPostCard
          show={this.state.viewCardModal}
          onHide={this.closeViewPostModal}
          id={this.props.item._id}
        />
      </div>
    );
  }
}

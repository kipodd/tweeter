import React, {Component} from "react";
import "./App.css";
import Form from "./components/Form";
import Comments from "./components/Comments";
import {getAllComments} from "./lib/api";

class App extends Component {
  state = {
    comments: [],
  };

  loadComments = () => {
    const data = getAllComments();
    this.setState({comments: data});
  };

  componentDidMount() {
    this.loadComments();
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="offset-2 col-8">
              <Form loadComments={this.loadComments} />
              <Comments comments={this.state.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

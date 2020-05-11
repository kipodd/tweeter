import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Comments from "./components/Comments";
import Profile from "./components/Profile";
// import {getAllComments} from "./lib/api";
import {CommentsContext, FormContext} from "./Contexts";
import * as firebase from "firebase/app";

class App extends Component {
  state = {
    comments: [],
    userName: "Anonymous",
  };

  refreshComments!: NodeJS.Timeout;

  // loadComments = async () => {
  //   const response = await getAllComments();
  //   const data = await response.json();
  //   this.setState({comments: data.tweets});
  // };

  loadComments = async () => {
    const db = firebase.firestore();
    const data = await db.collection("comments").get();
    const comments = data.docs.map(doc => doc.data());
    this.setState({comments: comments});
  };

  loadNewComment = (userName: string, content: string, date: string) => {
    this.setState({
      comments: [{userName, content, date}, ...this.state.comments],
    });
  };

  componentDidMount() {
    this.refreshComments = setInterval(this.loadComments, 10000);
    this.loadComments();
  }

  componentWillUnmount() {
    clearInterval(this.refreshComments);
  }

  changeUsername = (newUsername: string) => {
    this.setState({userName: newUsername});
  };

  render() {
    const {userName, comments} = this.state;
    return (
      <div className="App">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-secondary sticky-top">
            <Link className="navbar-brand" to="/">
              Microblog
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-item nav-link" to="/profile">
                  Profile
                </Link>
              </div>
            </div>
          </nav>
          <Switch>
            <Route path="/profile">
              <div className="container-fluid">
                <div className="row mt-5">
                  <div className="offset-2 col-8">
                    <Profile changeUsername={this.changeUsername}></Profile>
                  </div>
                </div>
              </div>
            </Route>
            <Route path="/">
              <div className="container-fluid">
                <div className="row mt-5">
                  <div className="offset-2 col-8">
                    <FormContext.Provider
                      value={{
                        userName: userName,
                        // loadComments: this.loadComments,
                        loadNewComment: this.loadNewComment,
                      }}
                    >
                      <Form />
                    </FormContext.Provider>
                    <CommentsContext.Provider value={{comments: comments}}>
                      <Comments />
                    </CommentsContext.Provider>
                  </div>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

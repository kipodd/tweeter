import React, {Component} from "react";
import "./styles/Form.css";
// import {createComment} from "../lib/api";
import {FormContext} from "../Contexts";
import * as firebase from "firebase/app";

export class Form extends Component {
  state = {
    content: "",
    buttonLoading: false,
    serverError: "",
    valueText: "",
  };

  handleOnSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    userName: string,
    loadNewComment: (userName: string, content: string, date: string) => void
  ) => void = async (event, userName, loadNewComment) => {
    event.preventDefault();
    this.setState({buttonLoading: true, serverError: ""});

    const newComment = {
      userName: userName,
      content: this.state.content,
      date: new Date().toISOString(),
    };

    try {
      const db = firebase.firestore();
      await db.collection("comments").add({...newComment});
      loadNewComment(newComment.userName, newComment.content, newComment.date);
      this.setState({buttonLoading: false, content: ""});
    } catch (err) {
      console.error(err);
      const errorMessage = err;
      this.setState({buttonLoading: false, serverError: errorMessage});
    }
  };

  render() {
    const {content, buttonLoading, serverError} = this.state;
    return (
      <div>
        <FormContext.Consumer>
          {({userName, loadNewComment}) => (
            <form
              onSubmit={event =>
                this.handleOnSubmit(event, userName, loadNewComment)
              }
            >
              <div className="form-group textarea-container">
                <textarea
                  className="form-control bg-dark text-white"
                  placeholder="Say something to the world!"
                  rows={5}
                  value={content}
                  onChange={event =>
                    this.setState({content: event.target.value})
                  }
                ></textarea>
                {serverError && (
                  <span className="alert alert-danger px-2 py-1" role="alert">
                    Server error: {serverError}
                  </span>
                )}
                <button
                  type="submit"
                  disabled={
                    buttonLoading || !content || content.length > 140
                      ? true
                      : false
                  }
                  className="btn btn-light"
                >
                  {buttonLoading ? (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </form>
          )}
        </FormContext.Consumer>
      </div>
    );
  }
}

export default Form;

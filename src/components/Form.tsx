import React, {Component} from "react";
import "./styles/Form.css";
import {createComment} from "../lib/api";

interface Props {
  loadComments: () => void;
}

export class Form extends Component<Props> {
  state = {
    content: "",
    buttonLoading: false,
    serverError: "",
  };

  handleOnSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void = async event => {
    event.preventDefault();
    this.setState({buttonLoading: true, serverError: ""});

    const response = await createComment(
      "John",
      this.state.content,
      new Date().toISOString()
    );
    if (response.ok) {
      this.props.loadComments();
      this.setState({buttonLoading: false});
    } else {
      const errorMessage = await response.text();
      this.setState({buttonLoading: false, serverError: errorMessage});
    }
  };

  render() {
    const {content, buttonLoading, serverError} = this.state;
    return (
      <div>
        <form onSubmit={event => this.handleOnSubmit(event)}>
          <div className="form-group textarea-container">
            <textarea
              className="form-control bg-dark text-white"
              placeholder="Say something to the world!"
              rows={5}
              onChange={event => this.setState({content: event.target.value})}
            ></textarea>
            {serverError && (
              <span className="alert alert-danger px-2 py-1" role="alert">
                Server error: {serverError}
              </span>
            )}
            <button
              type="submit"
              disabled={
                buttonLoading || !content || content.length > 140 ? true : false
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
      </div>
    );
  }
}

export default Form;

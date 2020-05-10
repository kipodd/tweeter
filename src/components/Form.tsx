import React, {Component} from "react";
import "./styles/Form.css";
import {createComment} from "../lib/api";
import {FormContext} from "../Contexts";

export class Form extends Component {
  state = {
    content: "",
    buttonLoading: false,
    serverError: "",
  };

  handleOnSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    userName: string,
    loadComments: () => void
  ) => void = async (event, userName, loadComments) => {
    event.preventDefault();
    this.setState({buttonLoading: true, serverError: ""});
    console.log(userName);

    const response = await createComment(
      userName,
      this.state.content,
      new Date().toISOString()
    );
    if (response.ok) {
      loadComments();
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
        <FormContext.Consumer>
          {({userName, loadComments}) => (
            <form
              onSubmit={event =>
                this.handleOnSubmit(event, userName, loadComments)
              }
            >
              <div className="form-group textarea-container">
                <textarea
                  className="form-control bg-dark text-white"
                  placeholder="Say something to the world!"
                  rows={5}
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

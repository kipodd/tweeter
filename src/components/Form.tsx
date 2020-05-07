import React, {Component} from "react";
import "./styles/Form.css";
import {createComment} from "../lib/api";

interface Props {
  loadComments: () => void;
}

export class Form extends Component<Props> {
  state = {
    content: "",
  };

  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault();
    createComment(new Date().getUTCMilliseconds(), "John", this.state.content);
    this.props.loadComments();
  };

  render() {
    return (
      <div>
        <form onSubmit={event => this.handleOnSubmit(event)}>
          <div className="form-group textarea-container">
            <textarea
              className="form-control bg-dark text-white"
              placeholder="Say something to the world!"
              rows={3}
              onChange={event => this.setState({content: event.target.value})}
            ></textarea>
            <button
              type="submit"
              disabled={
                !this.state.content || this.state.content.length > 140
                  ? true
                  : false
              }
              className="btn btn-light"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

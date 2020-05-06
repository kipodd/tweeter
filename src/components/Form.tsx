import React, {Component} from "react";
import "./styles/Form.css";
import {createComment} from "../lib/api";

interface Props {
  loadComments: () => void;
}

export class Form extends Component<Props> {
  state = {
    content: "",
    disableButton: false,
  };

  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault();
    const {content} = this.state;
    createComment(new Date().getUTCMilliseconds(), "John", content);
    this.props.loadComments();
  };

  handleOnChange: (eventValue: string) => void = eventValue => {
    this.setState({content: eventValue});
    // console.log(this.state.content.length);
    // console.log(this.state.disableButton);
    if (this.state.content.length > 140) {
      this.setState({disableButton: true});
    } else {
      this.setState({disableButton: false});
    }
    // console.log(this.state.disableButton);
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
              // onChange={event => this.setState({content: event.target.value})}
              onChange={event => this.handleOnChange(event.target.value)}
            ></textarea>
            <button
              type="submit"
              disabled={this.state.disableButton}
              className="btn btn-secondary"
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

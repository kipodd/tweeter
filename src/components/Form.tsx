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
  componentDidMount() {}

  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault();
    const {content} = this.state;
    createComment(new Date().getUTCMilliseconds(), "John", content);
    this.props.loadComments();
  };

  handleOnChange: (eventValue: string) => void = eventValue => {
    // console.log(this.state.content.length);
    // console.log(this.state.disableButton);
    this.setState({content: eventValue});
    // console.log(this.state.disableButton);
  };

  shouldDisable = (): boolean => {
    if (!this.state.content || this.state.content.length > 140) {
      return true;
    } else {
      return false;
    }
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
              disabled={this.shouldDisable()}
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

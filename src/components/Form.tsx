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
    const {content} = this.state;
    console.log(
      createComment(new Date().getUTCMilliseconds(), "John", content)
    );
    this.props.loadComments();
  };

  render() {
    return (
      <div>
        <form onSubmit={event => this.handleOnSubmit(event)}>
          {/* <input
            type="text"
            name="tweetText"
            // value={formName}
            id="name"
            placeholder="Say something to the world!"
            onChange={event => this.setState({formName: event.target.value})}
          ></input> */}
          <div className="form-group textarea-container">
            <textarea
              className="form-control"
              placeholder="Say something to the world!"
              rows={3}
              onChange={event => this.setState({content: event.target.value})}
            ></textarea>
            <button type="submit">Tweet</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

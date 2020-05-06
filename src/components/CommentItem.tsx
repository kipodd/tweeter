import React, {Component} from "react";

interface Props {
  comment: {
    id: number;
    user: string;
    time: Date;
    content: string;
  };
}

export class Comment extends Component<Props> {
  render() {
    const {user, time, content} = this.props.comment;
    return (
      <div>
        <div className="card">
          <div className="text-muted">{user}</div>
          <div className="float-right text-muted">{time.toString()}</div>
          <div className="card-body">{content}</div>
        </div>
      </div>
    );
  }
}

export default Comment;

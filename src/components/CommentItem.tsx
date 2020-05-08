import React, {Component} from "react";

interface Props {
  comment: {
    content: string;
    date: string;
    userName: string;
  };
}

export class Comment extends Component<Props> {
  render() {
    const {userName, date, content} = this.props.comment;
    return (
      <div>
        <div className="card bg-dark text-white mb-3">
          <div className="d-flex justify-content-between p-3">
            <div className="text-muted">{userName}</div>
            <div className="text-muted">{date}</div>
          </div>
          <div className="card-body">{content}</div>
        </div>
      </div>
    );
  }
}

export default Comment;

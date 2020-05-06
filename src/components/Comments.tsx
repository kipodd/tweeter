import React, {Component} from "react";
import CommentItem from "./CommentItem";

interface Props {
  comments: {
    id: number;
    user: string;
    time: Date;
    content: string;
  }[];
}

export class Comment extends Component<Props> {
  render() {
    return this.props.comments.map(comment => (
      <CommentItem key={comment.id} comment={comment} />
    ));
  }
}

export default Comment;

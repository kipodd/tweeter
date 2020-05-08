import React, {Component} from "react";
import CommentItem from "./CommentItem";

interface Props {
  comments: {
    content: string;
    date: string;
    userName: string;
  }[];
}

export class Comment extends Component<Props> {
  render() {
    // return <> </>;
    return this.props.comments.map((comment, index) => (
      <CommentItem key={index} comment={comment} />
    ));
  }
}

export default Comment;

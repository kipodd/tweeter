import React, {Component} from "react";
import CommentItem from "./CommentItem";
import {CommentsContext} from "../Contexts";

export class Comment extends Component {
  render() {
    return (
      <div>
        <CommentsContext.Consumer>
          {comments => {
            return comments.comments.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ));
          }}
        </CommentsContext.Consumer>
      </div>
    );
  }
}

export default Comment;

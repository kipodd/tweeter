import React from "react";

export const CommentsContext = React.createContext({
  comments: [],
});

export const FormContext = React.createContext({
  userName: "",
  // loadComments: () => {},
  loadNewComment: (userName: string, content: string, date: string) => {},
});

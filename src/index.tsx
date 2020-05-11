import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAFjgROHlFn_g8FHCLbMZRkv_F-Gi6D3FM",
  authDomain: "kipodd-micro-blog.firebaseapp.com",
  databaseURL: "https://kipodd-micro-blog.firebaseio.com",
  projectId: "kipodd-micro-blog",
  storageBucket: "kipodd-micro-blog.appspot.com",
  messagingSenderId: "932225239116",
  appId: "1:932225239116:web:e9a7c92088c6b3d3608ce9",
  measurementId: "G-1NBTRSNBX3",
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, {Component} from "react";
import * as firebase from "firebase/app";

interface Props {
  changeUsername: (newUsername: string) => void;
}

export class Profile extends Component<Props> {
  state = {
    userName: "",
    email: "",
    password: "",
  };

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(`User ${user.email} logged in.`);
        this.setState({user: user});
      } else {
        this.setState({user: null});
      }
      // console.log(firebase.auth().currentUser);
    });
  };

  handleOnSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void = async event => {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
    } catch (err) {
      console.error(err);
    }
    this.props.changeUsername(this.state.userName);
  };

  render() {
    return (
      <div>
        <form onSubmit={event => this.handleOnSubmit(event)}>
          <label htmlFor="validationDefaultUsername" className="text-white">
            Email address:
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span
                className="input-group-text bg-secondary text-white"
                id="inputGroupPrepend2"
              >
                @
              </span>
            </div>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="validationDefaultUsername"
              placeholder="new_username"
              aria-describedby="inputGroupPrepend2"
              required
              onChange={event => this.setState({email: event.target.value})}
            />
          </div>
          <label
            htmlFor="validationDefaultPassword"
            className="text-white mt-3"
          >
            Password:
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span
                className="input-group-text bg-secondary text-white"
                id="inputGroupPrepend2"
              >
                &bull;
              </span>
            </div>
            <input
              type="password"
              className="form-control bg-dark text-white form-group"
              id="validationDefaultPassword"
              placeholder="correct_horse_battery_staple"
              aria-describedby="inputGroupPrepend2"
              required
              onChange={event => this.setState({password: event.target.value})}
            />
          </div>
          <button className="btn btn-light mt-3" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default Profile;

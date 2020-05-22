import React, {Component} from "react";
import * as firebase from "firebase/app";

interface Props {
  changeUsername: (newUsername: string) => void;
  userObj: string;
}

export class Profile extends Component<Props> {
  state = {
    email: "",
    password: "",
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
    this.props.changeUsername(this.state.email);
  };

  logout: () => void = () => {
    firebase.auth().signOut();
  };

  render() {
    const {userObj} = this.props;

    return (
      <div>
        {userObj && (
          <div className="text-white mb-3">
            Logged in as {firebase.auth().currentUser!.email}
            <span className="float-right">
              <button
                type="button"
                className="btn btn-link text-white p-0 pb-2"
                onClick={() => this.logout()}
              >
                Logout
              </button>
            </span>
          </div>
        )}
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

import React, {Component} from "react";

interface Props {
  changeUsername: (newUsername: string) => void;
}

export class Profile extends Component<Props> {
  state = {
    userName: "",
  };

  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault();
    this.props.changeUsername(this.state.userName);
  };

  render() {
    return (
      <div>
        <form onSubmit={event => this.handleOnSubmit(event)}>
          <label htmlFor="validationDefaultUsername" className="text-white">
            Change User Name:
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
              onChange={event => this.setState({userName: event.target.value})}
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

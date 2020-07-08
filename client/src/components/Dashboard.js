import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../action";

class Dashboard extends Component {
  // componentDidMount() {
  //   this.props.getUser();
  // }
  renderData = () => {
    if (this.props.user) {
      return (
        <blockquote>
          Name : {this.props.user.user.name}
          <br></br>
          Email : {this.props.user.user.email}
        </blockquote>
      );
    }
  };
  render() {
    return (
      <div className="container">
        <blockquote>
          <h2>USER DETAILS</h2>
        </blockquote>
        {this.renderData()}
        <button
          className="waves-effect waves-light btn black right"
          onClick={() => this.props.logoutUser()}
        >
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users,
  };
};

export default connect(mapStateToProps, { logoutUser })(Dashboard);

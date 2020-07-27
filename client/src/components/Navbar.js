import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../action";
import M from "materialize-css/dist/js/materialize.min.js";

class Navbar extends Component {
  async componentDidMount() {
    await this.props.getUser();
    M.AutoInit();
  }
  renderNav = () => {
    if (!this.props.user || !this.props.user.email) {
      return (
        <div>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
          <li>
            <Link to="/create">SignUp</Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/orders">
              <div>My Orders</div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <div>My cart</div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <div onClick={() => this.props.logoutUser()}>LogOut</div>
            </Link>
          </li>
          <li>
            <Link to="/sell">
              <div>Sell</div>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">{this.props.user.name}</Link>
          </li>
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper grey darken-4">
            <div className="container">
              <Link to="/" className="brand-logo">
                E-Commerce
              </Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {this.renderNav()}
              </ul>
            </div>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          {this.renderNav()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users,
  };
};

export default connect(mapStateToProps, { logoutUser, getUser })(Navbar);

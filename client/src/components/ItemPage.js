import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { getItemById, addToCart } from "../action";
import history from "../history";
import Preloader from "./Preloader";

class ItemPage extends Component {
  async componentDidMount() {
    await this.props.getItemById(this.props.match.params.id);
    M.AutoInit();
    // console.log(this.props.item.images.length);
  }

  toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  callCart = async () => {
    if (!this.props.user || !this.props.user.email) {
      history.push("/login");
      M.toast({ html: "Please Login First" });
    } else {
      await this.props.addToCart(this.props.match.params.id);
      M.toast({ html: "Added to cart!" });
    }
  };

  renderImages = () => {
    if (this.props.item.images.length === 1) {
      return (
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s3">
                <a class="active" href="#test1">
                  1
                </a>
              </li>
            </ul>
          </div>
          <img
            className="materialboxed col s12"
            id="test1"
            src={`data:image/gif;base64,${this.toBase64(
              this.props.item.images[0].image.data
            )}`}
            style={{ width: "400px" }}
          ></img>
        </div>
      );
    } else if (this.props.item.images.length === 2) {
      return (
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s3">
                <a class="active" href="#test1">
                  1
                </a>
              </li>
              <li class="tab col s3">
                <a href="#test2">2</a>
              </li>
            </ul>
          </div>
          <img
            className="materialboxed col s12"
            id="test1"
            src={`data:image/gif;base64,${this.toBase64(
              this.props.item.images[0].image.data
            )}`}
            style={{ width: "400px" }}
          ></img>
          <img
            id="test2"
            className="materialboxed col s12"
            src={`data:image/gif;base64,${this.toBase64(
              this.props.item.images[1].image.data
            )}`}
            style={{ width: "400px" }}
          ></img>
        </div>
      );
    } else {
      return (
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s3">
                <a class="active" href="#test1">
                  1
                </a>
              </li>
              <li class="tab col s3">
                <a href="#test2">2</a>
              </li>
              <li class="tab col s3">
                <a href="#test4">3</a>
              </li>
            </ul>
          </div>
          <img
            className="materialboxed col s12"
            id="test1"
            src={`data:image/gif;base64,${this.toBase64(
              this.props.item.images[0].image.data
            )}`}
            style={{ width: "400px" }}
          ></img>
          <img
            id="test2"
            className="materialboxed col s12"
            src={`data:image/gif;base64,${this.toBase64(
              this.props.item.images[1].image.data
            )}`}
            style={{ width: "400px" }}
          ></img>
          <img
            id="test4"
            className="materialboxed col s12"
            src={`data:image/gif;base64,${this.toBase64(
              this.props.item.images[2].image.data
            )}`}
            style={{ width: "400px" }}
          ></img>
        </div>
      );
    }
  };

  renderPage = () => {
    if (!this.props.item || !this.props.item.name) {
      return <Preloader></Preloader>;
    }
    return (
      <div className="container">
        <div
          style={{
            paddingTop: "100px",
            float: "left",
          }}
        >
          <blockquote>
            <h4>{this.props.item.name}</h4>
          </blockquote>
          <div>
            <h6>{this.props.item.description}</h6>
            <h5>Quantity: {this.props.item.quantity}</h5>
            <h5>Price: {this.props.item.price}</h5>
          </div>
          <br></br>
          <br></br>
          <a
            className="waves-effect waves-light btn yellow darken-2"
            onClick={() => this.callCart()}
          >
            <i className="material-icons left">add_shopping_cart</i>Add to cart
          </a>
        </div>
        <div
          style={{
            paddingTop: "100px",
            float: "right",
          }}
        >
          {this.renderImages()}
        </div>
      </div>
    );
  };

  render() {
    return this.renderPage();
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users,
    item: state.items,
  };
};

export default connect(mapStateToProps, { getItemById, addToCart })(ItemPage);

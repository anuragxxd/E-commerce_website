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
  }

  callCart = async () => {
    if (!this.props.user || !this.props.user.email) {
      history.push("/login");
      M.toast({ html: "Please Login First" });
    } else {
      await this.props.addToCart(this.props.match.params.id);
      M.toast({ html: "Added to cart!" });
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
            <h2>{this.props.item.name}</h2>
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
          <img
            className="materialboxed"
            src="/logo192.png"
            style={{ width: "300px" }}
          ></img>
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

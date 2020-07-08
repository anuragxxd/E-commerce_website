import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeItemFromCart, updateItem } from "../action";
import CartCard from "./CartCard";
import history from "../history";
import M from "materialize-css/dist/js/materialize.min.js";
import "../css/footer.css";
import Preloader from "./Preloader";

class CartList extends Component {
  async componentDidMount() {
    await this.props.getCart();
    M.AutoInit();
  }
  remove = async (id) => {
    await this.props.removeItemFromCart(id);
    history.push("/");
    history.push("/cart");
    M.toast({ html: "Item Removed" });
  };
  edit = async (id, quantity, action) => {
    if (action === "inc") {
      await this.props.updateItem(id, quantity + 1);
    }
    if (action === "dec") {
      await this.props.updateItem(id, quantity - 1);
    }
    history.push("/");
    history.push("/cart");
  };
  renderList = () => {
    if (!this.props.cart) {
      return <Preloader></Preloader>;
    } else {
      return this.props.cart.map((item) => {
        return (
          <>
            <CartCard
              name={item.name}
              price={item.price}
              description={item.description}
              quantity={item.quantity}
              id={item.id}
              remove={this.remove}
              key={item.id}
              edit={this.edit}
            ></CartCard>
          </>
        );
      });
    }
  };
  renderTotal = () => {
    if (!this.props.cart) {
      return <Preloader></Preloader>;
    } else {
      var total = 0;
      this.props.cart.forEach((item) => {
        total = total + item.price * item.quantity;
      });
      if (total === 0) {
        return <div>Rs. 0</div>;
      }
      return <div>Rs. {total}</div>;
    }
  };
  render() {
    return (
      <div>
        <ul class="collapsible popout">{this.renderList()}</ul>
        <div class="footer grey darken-4">
          <h5 class="container">
            <div class="left">Grand Total</div>
            <div class="right">{this.renderTotal()}</div>
          </h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, {
  getCart,
  removeItemFromCart,
  updateItem,
})(CartList);

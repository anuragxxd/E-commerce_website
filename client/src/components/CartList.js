import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeItemFromCart, updateItem } from "../action";
import CartCard from "./CartCard";
import history from "../history";
import M from "materialize-css/dist/js/materialize.min.js";
import "../css/footer.css";
import Preloader from "./Preloader";
import PaypalButton from "./PaypalButton";

class CartList extends Component {
  state = {
    isCheckout: false,
  };

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
      console.log(this.props.cart);
      this.props.cart.forEach((item) => {
        total = total + item.price * item.quantity;
      });
      return total;
    }
  };
  render() {
    const total = this.renderTotal();
    if (this.state.isCheckout) {
      return (
        <div className="container">
          <PaypalButton total={total} items={this.props.cart} />
        </div>
      );
    }
    return (
      <div>
        <ul class="collapsible popout">{this.renderList()}</ul>
        <div class="footer grey darken-4">
          <h5 class="container">
            <div class="left">Grand Total: Rs. {total}</div>
            <div class="right">
              <a
                class="waves-effect waves-light btn-small black"
                onClick={() => {
                  if (total > 0) {
                    this.setState({ isCheckout: true });
                  }
                }}
              >
                Buy Now
              </a>
            </div>
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

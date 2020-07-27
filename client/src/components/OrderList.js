import React, { Component } from "react";
import { connect } from "react-redux";
import { orders, getItemById } from "../action";
import OrderCard from "./OrderCard.js";
import Preloader from "./Preloader";

class OrderList extends Component {
  async componentDidMount() {
    await this.props.orders();
    console.log(this.props.order);
  }
  renderList = () => {
    if (!this.props.order) {
      return <Preloader></Preloader>;
    } else if (this.props.order.length == 0) {
      return (
        <div className="center">
          <p>Nothing To Show</p>
          <p class="grey-text">Buy Something!!</p>
        </div>
      );
    } else {
      return this.props.order.map((item) => {
        return (
          <>
            <OrderCard
              name={item.name}
              price={item.price}
              description={item.description}
              quantity={item.quantity}
              id={item.id}
              key={item.id}
              time={item.time}
            ></OrderCard>
          </>
        );
      });
    }
  };
  render() {
    console.log(this.props.order);
    return <ul class="collapsible popout">{this.renderList()}</ul>;
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.orders,
  };
};

export default connect(mapStateToProps, { orders, getItemById })(OrderList);

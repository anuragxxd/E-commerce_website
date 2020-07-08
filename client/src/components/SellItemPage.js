import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sellItemList, removeItem } from "../action";
import M from "materialize-css/dist/js/materialize.min.js";
import SellItemPageCard from "./SellItemPageCard";
import history from "../history";
import Preloader from "./Preloader";

class SellItemPage extends Component {
  async componentDidMount() {
    M.AutoInit();
    await this.props.sellItemList();
  }
  removeItem = async (id) => {
    await this.props.removeItem(id);
    history.push("/");
    history.push("/sell");
  };
  renderList = () => {
    if (!this.props.items) {
      return <Preloader></Preloader>;
    }
    return this.props.items.map((item) => {
      return (
        <>
          <SellItemPageCard
            id={item._id}
            name={item.name}
            price={item.price}
            description={item.description}
            quantity={item.quantity}
            category={item.category}
            createdOn={item.createdAt}
            remove={this.removeItem}
            updatedOn={item.updatedAt}
          ></SellItemPageCard>
        </>
      );
    });
  };
  render() {
    return (
      <div>
        <ul class="collapsible popout">{this.renderList()}</ul>
        <div style={{ position: "fixed", bottom: "50px", right: "50px" }}>
          <Link to="/sell/create">
            <a class="waves-effect waves-light btn grey darken-4">
              <i class="material-icons left">add</i>New Listing
            </a>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.sellItems,
  };
};

export default connect(mapStateToProps, { sellItemList, removeItem })(
  SellItemPage
);

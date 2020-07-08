import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItems, getUser } from "../action";
import ItemCard from "./ItemCard";
import Preloader from "./Preloader";
import SearchBar from "./SearchBar";

class ItemList extends Component {
  async componentDidMount() {
    await this.props.fetchItems();
  }
  state = {
    value: "",
    items: null,
  };
  renderList = () => {
    if (this.state.value && this.state.items) {
      return (
        <span>
          {this.state.items.map((item) => {
            return (
              <ItemCard
                title={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              ></ItemCard>
            );
          })}
        </span>
      );
    } else if (
      this.props.items.length != 0 &&
      Array.isArray(this.props.items) &&
      !this.state.value
    ) {
      return (
        <span>
          {this.props.items.map((item) => {
            return (
              <ItemCard
                title={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              ></ItemCard>
            );
          })}
        </span>
      );
    } else {
      return <Preloader></Preloader>;
    }
  };
  handleChange = (value) => {
    this.setState({ value });
  };
  filterItems = () => {
    const items = this.props.items.filter((item) => {
      return (
        item.name.toLowerCase().includes(this.state.value.toLowerCase()) ||
        item.category.toLowerCase().includes(this.state.value.toLowerCase())
      );
    });
    this.setState({ items });
  };
  render() {
    return (
      <div>
        <SearchBar
          value={this.state.value}
          change={this.handleChange}
          filter={this.filterItems}
        ></SearchBar>
        <div className="center">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { items: state.items };
};

export default connect(mapStateToProps, { fetchItems, getUser })(ItemList);

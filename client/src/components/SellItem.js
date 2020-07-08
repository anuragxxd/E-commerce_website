import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { sellItem, uploadImage } from "../action";
import history from "../history";

class SellItem extends Component {
  state = {
    image1: null,
    image2: null,
    image3: null,
  };
  async componentDidMount() {
    M.AutoInit();
    let input1 = document.getElementById("name");
    M.CharacterCounter.init(input1);
    let input2 = document.getElementById("description");
    M.CharacterCounter.init(input2);
  }
  renderInput(formProps) {
    return (
      <div className="input-field">
        <input
          {...formProps.input}
          required
          autoComplete="off"
          id={formProps.input.name}
          data-length={formProps.length}
        ></input>
        <label className="active" for={formProps.input.name}>
          {formProps.label}
        </label>
      </div>
    );
  }
  handleChange1 = async (e) => {
    const file = e.target.files[0];
    await this.setState({ image1: file });
  };
  handleChange2 = async (e) => {
    const file = e.target.files[0];
    await this.setState({ image2: file });
  };
  handleChange3 = async (e) => {
    const file = e.target.files[0];
    await this.setState({ image3: file });
  };
  renderFileUpload() {
    return (
      <div style={{ paddingTop: "15px" }}>
        <label className="active">Images (minimum:1)</label>
        <br></br>
        <input
          required
          type="file"
          onChange={(e) => this.handleChange1(e)}
        ></input>
        <br></br>
        <input type="file" onChange={(e) => this.handleChange2(e)}></input>
        <br></br>
        <input type="file" onChange={(e) => this.handleChange3(e)}></input>
      </div>
    );
  }
  onSubmit = async (formValues) => {
    let formdata1 = new FormData();
    formdata1.append("itemImage", this.state.image1);

    let formdata2 = new FormData();
    formdata2.append("itemImage", this.state.image2);

    let formdata3 = new FormData();
    formdata3.append("itemImage", this.state.image3);
    await this.props.sellItem(formValues);
    await this.props.uploadImage(this.props.item._id, formdata1);
    if (this.state.image2) {
      await this.props.uploadImage(this.props.item._id, formdata2);
    }
    if (this.state.image3) {
      await this.props.uploadImage(this.props.item._id, formdata3);
    }
    history.push("/sell");
    M.toast({ html: "Item Listed!" });
  };
  render() {
    return (
      <div className="container">
        <blockquote>
          <h2>SELL ITEM</h2>
        </blockquote>
        <br></br>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="name"
            component={this.renderInput}
            label="Title"
            length="22"
          ></Field>
          <Field
            name="description"
            component={this.renderInput}
            label="Description"
            length="100"
          ></Field>
          {this.renderFileUpload()}
          <Field
            name="quantity"
            component={this.renderInput}
            label="Quantity"
          ></Field>
          <Field
            name="price"
            component={this.renderInput}
            label="Price (in Rs.)"
          ></Field>
          <Field
            name="category"
            component={this.renderInput}
            label="Category"
          ></Field>
          <button
            type="submit"
            className="btn waves-effect waves-light right black"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.sellItems,
  };
};

SellItem = connect(mapStateToProps, { sellItem, uploadImage })(SellItem);

export default reduxForm({
  form: "sellItemForm",
})(SellItem);

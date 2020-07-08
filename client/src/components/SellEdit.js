import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import {
  getItemById,
  updateItemForSell,
  deleteImage,
  uploadImage,
} from "../action";
import history from "../history";

class SellEdit extends Component {
  state = {
    image1: null,
  };
  async componentDidMount() {
    await this.props.getItemById(this.props.match.params.id);
    M.AutoInit();
  }
  renderInput = (formProps) => {
    return (
      <div className="input-field">
        <input
          {...formProps.input}
          autoComplete="off"
          id={formProps.input.name}
        ></input>
        <label className="active" for={formProps.input.name}>
          {formProps.label}
        </label>
        <div class="helper-text" data-error="wrong" data-success="right">
          Previous value: {this.props.item[`${formProps.input.name}`]}
        </div>
        <br></br>
      </div>
    );
  };

  toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  handleChange1 = async (e) => {
    const file = e.target.files[0];
    await this.setState({ image1: file });
    console.log(this.state);
  };

  handleRemove = async (index) => {
    await this.props.deleteImage(
      this.props.item._id,
      this.props.item.images[index]._id
    );
    history.push("/sell");
    history.push(`/sell/edit/${this.props.item._id}`);
    M.toast({ html: "Image Deleted!" });
  };

  renderFileUpload = () => {
    console.log(this.props.item.images);
    if (this.props.item && Array.isArray(this.props.item.images)) {
      if (this.props.item.images.length === 1) {
        return (
          <div class="row">
            <label className="active">Images (minimum:1)</label>
            <br></br>
            <div class="col s12" style={{ width: "250px" }}>
              <ul class="tabs">
                <li class="tab col s3">
                  <a class="active" href="#test1">
                    1
                  </a>
                </li>
              </ul>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div id="test1">
              <img
                className="materialboxed col s12"
                src={`data:image/gif;base64,${this.toBase64(
                  this.props.item.images[0].image.data
                )}`}
                style={{ width: "200px" }}
              ></img>
            </div>
            <div class="file-field input-field">
              <a class="btn-floating btn-medium waves-effect waves-light black">
                <i class="material-icons">add</i>
                <input
                  type="file"
                  onChange={(e) => this.handleChange1(e)}
                ></input>
              </a>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>
        );
      } else if (this.props.item.images.length === 2) {
        return (
          <div class="row">
            <label className="active">Images (minimum:1)</label>
            <br></br>
            <div class="col s12" style={{ width: "250px" }}>
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
            <br></br>
            <br></br>
            <br></br>
            <div id="test1">
              <img
                className="materialboxed col s12"
                src={`data:image/gif;base64,${this.toBase64(
                  this.props.item.images[0].image.data
                )}`}
                style={{ width: "200px" }}
              ></img>
              <a
                class="btn-floating btn-medium waves-effect waves-light grey"
                onClick={() => this.handleRemove(0)}
              >
                <i class="material-icons">delete</i>
              </a>
            </div>
            <div id="test2">
              <img
                className="materialboxed col s12"
                src={`data:image/gif;base64,${this.toBase64(
                  this.props.item.images[1].image.data
                )}`}
                style={{ width: "200px" }}
              ></img>
              <a
                class="btn-floating btn-medium waves-effect waves-light grey"
                onClick={() => this.handleRemove(1)}
              >
                <i class="material-icons">delete</i>
              </a>
            </div>
            <div class="file-field input-field">
              <a class="btn-floating btn-medium waves-effect waves-light black">
                <i class="material-icons">add</i>
                <input
                  type="file"
                  onChange={(e) => this.handleChange1(e)}
                ></input>
              </a>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div class="row">
            <label className="active">Images (minimum:1)</label>
            <br></br>
            <div class="col s12" style={{ width: "250px" }}>
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
            <br></br>
            <br></br>
            <br></br>
            <div id="test1">
              <img
                className="materialboxed col s12"
                src={`data:image/gif;base64,${this.toBase64(
                  this.props.item.images[0].image.data
                )}`}
                style={{ width: "200px" }}
              ></img>
              <a
                class="btn-floating btn-medium waves-effect waves-light grey"
                onClick={() => this.handleRemove(0)}
              >
                <i class="material-icons">delete</i>
              </a>
            </div>
            <div id="test2">
              <img
                className="materialboxed col s12"
                src={`data:image/gif;base64,${this.toBase64(
                  this.props.item.images[1].image.data
                )}`}
                style={{ width: "200px" }}
              ></img>
              <a
                class="btn-floating btn-medium waves-effect waves-light grey"
                onClick={() => this.handleRemove(1)}
              >
                <i class="material-icons">delete</i>
              </a>
            </div>
            <div id="test4">
              <img
                className="materialboxed col s12"
                src={`data:image/gif;base64,${this.toBase64(
                  this.props.item.images[2].image.data
                )}`}
                style={{ width: "200px" }}
              ></img>
              <a
                class="btn-floating btn-medium waves-effect waves-light grey"
                onClick={() => this.handleRemove(2)}
              >
                <i class="material-icons">delete</i>
              </a>
            </div>
          </div>
        );
      }
    }
  };

  onSubmit = async (formValues) => {
    let formdata1 = new FormData();
    formdata1.append("itemImage", this.state.image1);

    await this.props.updateItemForSell(this.props.match.params.id, formValues);

    await this.props.uploadImage(this.props.item._id, formdata1);

    history.push("/sell");
    M.toast({ html: "Item Updated!" });
  };
  render() {
    return (
      <div className="container">
        <blockquote>
          <h2>Edit Item</h2>
        </blockquote>
        <br></br>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="name"
            component={this.renderInput}
            label="Title"
            v={this.props.item}
          ></Field>
          <Field
            name="description"
            component={this.renderInput}
            label="Description"
            data-length="10"
            v={this.props.item}
          ></Field>
          {this.renderFileUpload()}
          <Field
            name="quantity"
            component={this.renderInput}
            label="Quantity"
            v={this.props.item}
          ></Field>
          <Field
            name="price"
            component={this.renderInput}
            label="Price (in Rs.)"
            v={this.props.item}
          ></Field>
          <Field
            name="category"
            component={this.renderInput}
            label="Category"
            v={this.props.item}
          ></Field>
          <button
            type="submit"
            className="btn waves-effect waves-light right black"
          >
            Submit
          </button>
        </form>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    item: state.items,
  };
};

SellEdit = connect(mapStateToProps, {
  getItemById,
  updateItemForSell,
  deleteImage,
  uploadImage,
})(SellEdit);

export default reduxForm({
  form: "sellEditForm",
})(SellEdit);

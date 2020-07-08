import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { getItemById, updateItemForSell } from "../action";
import history from "../history";

class SellEdit extends Component {
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
  onSubmit = async (formValues) => {
    await this.props.updateItemForSell(this.props.match.params.id, formValues);
    history.push("/sell");
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.items,
  };
};

SellEdit = connect(mapStateToProps, { getItemById, updateItemForSell })(
  SellEdit
);

export default reduxForm({
  form: "sellEditForm",
})(SellEdit);

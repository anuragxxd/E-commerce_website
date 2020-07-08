import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { sellItem } from "../action";
import history from "../history";

class SellItem extends Component {
  async componentDidMount() {
    M.AutoInit();
  }
  renderInput(formProps) {
    console.log(formProps);
    return (
      <div className="input-field">
        <input
          {...formProps.input}
          required
          autoComplete="off"
          id={formProps.input.name}
          length="10"
        ></input>
        <label className="active" for={formProps.input.name}>
          {formProps.label}
        </label>
      </div>
    );
  }
  // renderFileUpload(formProps) {
  //   return (
  //     <div class="file-field input-field">
  //       <div class="btn">
  //         <span>File</span>
  //         <input type="file" />
  //       </div>
  //       <div class="file-path-wrapper">
  //         <input class="file-path validate" type="text" />
  //       </div>
  //     </div>
  //   );
  // }
  onSubmit = async (formValues) => {
    await this.props.sellItem(formValues);
    history.push("/sell");
  };
  render() {
    return (
      <div className="container">
        <blockquote>
          <h2>SELL ITEM</h2>
        </blockquote>
        <br></br>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="name" component={this.renderInput} label="Title"></Field>
          <Field
            name="description"
            component={this.renderInput}
            label="Description"
            length="10"
          ></Field>
          {/* <Field name="image" component={this.renderFileUpload}></Field> */}
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

SellItem = connect(null, { sellItem })(SellItem);

export default reduxForm({
  form: "sellItemForm",
})(SellItem);

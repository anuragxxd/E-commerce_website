import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../action";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

class CreateUser extends Component {
  async componentDidMount() {
    M.AutoInit();
  }
  renderInput(formProps) {
    return (
      <div className="input-field">
        <input
          {...formProps.input}
          required
          autoComplete="off"
          id={formProps.input.name}
        ></input>
        <label className="active" for={formProps.input.name}>
          {formProps.label}
        </label>
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.loginUser(formValues);
  };
  render() {
    return (
      <div className="container">
        <blockquote>
          <h2>LOGIN USER</h2>
        </blockquote>
        <br></br>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="email"
            component={this.renderInput}
            label="Email"
          ></Field>
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
          ></Field>
          <button
            type="submit"
            className="btn waves-effect waves-light right black"
          >
            Submit
          </button>
        </form>
        <Link to="/create">
          <div style={{ textAlign: "center", paddingTop: "100px" }}>
            Create new account?
          </div>
        </Link>
      </div>
    );
  }
}

CreateUser = connect(null, { loginUser })(CreateUser);

export default reduxForm({
  form: "userCreate",
})(CreateUser);

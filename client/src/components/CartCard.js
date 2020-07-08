import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import history from "../history";
import { Link } from "react-router-dom";

export class CartCard extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <li>
        <div className="collapsible-header hoverable">
          <i className="material-icons">keyboard_arrow_right</i>
          {this.props.name}
        </div>

        <div class="collapsible-body">
          <div>
            <div>Price: Rs. {this.props.price}</div> Quantity:{" "}
            <i
              className="material-icons grey-text"
              style={{
                fontSize: "20px",
                verticalAlign: "bottom",
                cursor: "pointer",
              }}
              onClick={() => {
                this.props.edit(this.props.id, this.props.quantity, "dec");
              }}
            >
              keyboard_arrow_left
            </i>{" "}
            {this.props.quantity}{" "}
            <i
              className="material-icons grey-text"
              style={{
                fontSize: "20px",
                verticalAlign: "bottom",
                cursor: "pointer",
              }}
              onClick={() => {
                this.props.edit(this.props.id, this.props.quantity, "inc");
              }}
            >
              keyboard_arrow_right
            </i>
          </div>
          <br />
          <div>
            <a
              class="waves-effect waves-light btn-small teal"
              onClick={() => history.push("/item/" + this.props.id)}
            >
              <i class="material-icons left">pageview</i>View
            </a>
            {"    "}
            <a
              class="waves-effect waves-light btn-small grey"
              onClick={() => this.props.remove(this.props.id)}
            >
              <i class="material-icons left">delete</i>Delete
            </a>
          </div>
          <br />
          <div>
            <b>Total Rs. {this.props.price * this.props.quantity}</b>
          </div>
        </div>
      </li>
    );
  }
}

export default CartCard;

import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import history from "../history";
import { Link } from "react-router-dom";
import moment from "moment";

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
            <div>Price: Rs. {this.props.price}</div>
            <div>Quantity: {this.props.quantity}</div>
            <div>
              Date:{" "}
              {moment(this.props.createdOn).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
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

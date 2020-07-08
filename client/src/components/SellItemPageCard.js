import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import moment from "moment";
import history from "../history";

class SellItemPageCard extends Component {
  async componentDidMount() {
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
          <div>Price: Rs. {this.props.price}</div>
          <div>Description: {this.props.description}</div>
          <div>Quantity: {this.props.quantity}</div>
          <div>Category: {this.props.category}</div>
          <div>
            Created On:{" "}
            {moment(this.props.createdOn).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
          <div className="grey-text">
            Last Updated At:{" "}
            {moment(this.props.updatedOn).endOf("hour").fromNow()}
          </div>
          <br />
          <div>
            <a
              class="waves-effect waves-light btn-small teal"
              onClick={() => history.push("/sell/edit/" + this.props.id)}
            >
              <i class="material-icons left">edit</i>Edit
            </a>
            {"    "}
            <a
              class="waves-effect waves-light btn-small grey"
              onClick={() => {
                this.props.remove(this.props.id);
              }}
            >
              <i class="material-icons left">delete</i>Delete
            </a>
          </div>
        </div>
      </li>
    );
  }
}

export default SellItemPageCard;

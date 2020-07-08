import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

class ItemCard extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <span style={{ display: "inline-block", padding: "5px" }}>
        <div className="row">
          <div className="col s12 m6">
            <div
              className="card hoverable"
              style={{ width: "140px", height: "auto" }}
            >
              <div className="card-image">
                <img src="/logo192.png" className="materialboxed" />
              </div>
              <Link to={`/item/${this.props.id}`} style={{ color: "black" }}>
                <div className="card-content">
                  <span
                    className="card-title truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {this.props.title}
                  </span>
                  <div style={{ fontSize: "15px" }}>Rs. {this.props.price}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

export default ItemCard;

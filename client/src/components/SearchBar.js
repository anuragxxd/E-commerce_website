import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <nav className="grey darken-3 hoverable">
        <div className="nav-wrapper">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-field">
              <input
                id="search"
                type="search"
                required
                value={this.props.value}
                onChange={(e) => this.props.change(e.target.value)}
                onKeyUp={() => this.props.filter()}
              />
              <label className="label-icon" for="search">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default SearchBar;

import React, { Component } from "react";
import HCL_logo from "./HCL_logo.svg";
import { Menu } from "semantic-ui-react";
import "../App.css"
export default class Footer1 extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary >
        <Menu.Item style={{marginRight: "175px"}}>
          <img
            style={{ width: "150px", height: "35px"}}
            alt="logo"
            src={HCL_logo}
          />
        </Menu.Item>
        <Menu.Item
          name="Shop"
          active={activeItem === "Shop"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Journal"
          active={activeItem === "Journal"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="About"
          active={activeItem === "About"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Contacts"
          active={activeItem === "Contacts"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
        <Menu.Item
          icon='facebook'
        />
        <Menu.Item
          icon='twitter'
        />
        <Menu.Item
          icon='instagram'
        />
        <Menu.Item
          icon='youtube'
        /> 
        </Menu.Menu>
      </Menu>
    );
  }
}

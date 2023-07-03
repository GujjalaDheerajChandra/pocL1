import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import "../App.css"
export default class Footer2 extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary>
        <Menu.Item
          style={{ marginRight: "210px" }}
          icon="copyright outline"
          name="2022 HCLTech"
        />
        <Menu.Item
          name="Privacy Policy"
          active={activeItem === "Privacy Policy"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Terms Of Use"
          active={activeItem === "Terms Of Use"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="Accepted payment methods"
            active={activeItem === "Accepted payment methods"}
            onClick={this.handleItemClick}
          />
          <Menu.Item>
            <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="visa card logo"/>
          </Menu.Item>
          <Menu.Item>
            <img src="https://cdn-icons-png.flaticon.com/512/349/349247.png" alt="paypal logo"/>
          </Menu.Item>
          <Menu.Item>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="mastercard logo"/>
          </Menu.Item>
          <Menu.Item>
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968220.png" alt="amazon pay logo"/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

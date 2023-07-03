import React, { Component } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

export default class Sidebar extends Component {
  state = { activeItem: 'account' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    

    return (
      <Menu secondary vertical>
        <Dropdown item text='💻 Computers' />
        <Dropdown item text='⌨ Apple Computers' />
        <Dropdown item text='💻 Laptops' />
        <Dropdown item text='👤 Friends' />
        <Dropdown item text='💾ComputerComponent' />
        <Dropdown item text='🖨 Accessories' />
        <Dropdown item text='📱 Cell Phones' />
        <Dropdown item text='📺 TV & Videos' />
        <Dropdown item text='🎮 Game Consoles' />
        <Dropdown item text='⌚ Watches' />
      </Menu>
    )
  }
}
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons'
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";


function RightMenu(props) {
  const user = useSelector(state => state.user)

  const SubMenu = Menu.SubMenu;
  const MenuItemGroup = Menu.ItemGroup;

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else if (user.userData && user.userData.role) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history" style={{ marginRight: -5 }}>
          <a href="/history">History</a>
        </Menu.Item>
        <SubMenu title={<span>Manage</span>}>
          <MenuItemGroup title="Products">
            <Menu.Item key="upload" style={{ marginRight: -5 }}>
              <a href="/product/upload">Upload</a>
            </Menu.Item>
            <Menu.Item key="update" style={{ marginRight: -5 }}>
              <a href="/product/products/list">Update & Delete</a>
            </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Members">
            <Menu.Item key="setting:3">회원관리</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="cart" style={{ marginBottom: -5 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" className="head-exam" style={{ marginRight: -22 }}>
              <ShoppingCartOutlined style={{ fontSize: '200%', marginLeft: -3 }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout" style={{ marginLeft: -5 }}>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>

      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history" style={{ marginRight: -5 }}>
          <a href="/history">History</a>
        </Menu.Item>
        <Menu.Item key="cart" style={{ marginBottom: -5 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" className="head-exam" style={{ marginRight: -22 }}>
              <ShoppingCartOutlined style={{ fontSize: '200%', marginLeft: -3 }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout" style={{ marginLeft: -5 }}>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

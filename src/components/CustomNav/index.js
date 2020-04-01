import React, { Component } from 'react';
import { Menu ,Icon} from 'antd';
import {withRouter} from 'react-router-dom'
import menuList from './menulist'

const { SubMenu } = Menu;

class CustomNav extends Component {
  handleClick = e => {
    console.log('click ', e);
    let {path} = e.item.props;
    this.props.history.replace(path)
  }
  renderItem(data){
    return data.map((item,index)=>{
      if(item.children){
        return(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.renderItem(item.children)}
          </SubMenu>
        )
      }else{
        return (
        <Menu.Item key={item.key} path={item.path}>
          <Icon type={item.icon} />
          {item.title}
        </Menu.Item>)
      }
    })
  }
  render(){
    return(
      <Menu
        onClick={this.handleClick}
        style={{ width: 200 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline" 
        theme='dark'
      >
        {this.renderItem(menuList)}
      </Menu>
    )
  }
}
 
export default withRouter(CustomNav);
import React, { Component ,Fragment} from 'react';

import { Menu, Dropdown, Icon } from 'antd';

function logout(){
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  window.location.reload()
}

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        <Icon type='user' />
        个人中心
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
      <Icon type='setting' />
        个人设置
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href onClick={logout}>
      <Icon type='logout' />
        退出登录
      </a>
    </Menu.Item>
  </Menu>
);



// let data = [
//     {name:'个人中心',icon:'user',divider:false},
//     {name:'个人设置',icon:'setting',divider:true},
//     {name:'退出登录',icon:'logout',divider:false}
// ]

// function createMenu(data){
//     return (
//         data.map((item,index)=>{
//             return (
//                 <Menu.Item>
//                     <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
//                     <Icon type={item.icon} />
//                         {item.name}
//                     </a>
//                 </Menu.Item>
//             )
//         })
//     )
// }

class HeaderNav extends Component {
  componentDidMount(){
    let user = localStorage.getItem('user')
    if(!user){
      user = '未登录,去登录'
      document.getElementById('user').onclick = ()=>{
        window.location.href = '/login'
      }
    }
    document.getElementById('user').innerText = user
  }
  
  render(){
    return(
      <Fragment>
        汽车管理系统
        <div style={{float:"right",margin:'0 10px'}}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href onClick={e => e.preventDefault()}>
              用户设置<Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div id='user' style={{float:"right",margin:'0 10px'}}></div>
      </Fragment>
    )
  }
}
 
export default HeaderNav;
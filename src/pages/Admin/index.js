import React, { Component } from 'react';
import CustomNav from '../../components/CustomNav'
import { Layout } from 'antd';
import style from './index.module.less'
import HeaderNav from '../../components/HeaderNav/index'

const { Header, Content, Sider ,Footer} = Layout;
class Admin extends Component {
  render() { 
    return ( 
      <Layout className={style.wrapper}>
        {/* 侧边栏 */}
      <Sider>
        <div className="logo" />
        <CustomNav></CustomNav>
      </Sider>
     
      <Layout >
        <Header style={ {background:'#FFF'} }>
          <HeaderNav></HeaderNav>
        </Header>
        <Content >
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>get by 2020 hhhhhhh group</Footer>
      </Layout>
    </Layout>
     );
  }
}
 
export default Admin;
import React,{Component} from 'react';
import style from './index.module.less'
import {message, Popconfirm, Spin, Button,Modal, Card,Table,notification,Input} from 'antd'
import api from '../../api/admin'


class Manager extends Component{
  state = {dataSource:[],spinning:false,columns:[
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title:'操作',
      key:'action',
      render:(record)=>{
        return(<div>
          <Popconfirm
            title="你确定要删除吗？"
            onConfirm={
              ()=>{
                console.log('删除',record._id)
                this.del(record._id)
                this.refreshList()
                message.success('删除成功！')
            }}
            onCancel={()=>{
              message.error('取消删除');
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type='danger' size='small'>删除</Button>
          </Popconfirm>,
        </div>)
      }
    }
  ]}
  del =async(_id)=>{
    let result = await api.del(_id)
    //console.log('删除')
    if(result.code === 0){
      this.refreshList()
    }else{
      return false
    }
  }
  async componentDidMount(){
    this.refreshList()
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideOk = async () => {
    let us = this.refs.us.state.value
    let ps = this.refs.ps.state.value
    console.log(us,ps)
    let result = await api.add(us,ps)
    //console.log(result)
    if(result.code === 0){
      this.setState({
        visible: false,
      });
      this.refreshList()
      notification.success({description:'管理员添加成功',message:'成功!',duration:1.5})
    }else{
      notification.error({description:'添加失败，请重试',message:'错误!',duration:1.5})
    }
  };

  //刷新列表数据
  refreshList= async()=>{
    this.setState({spinning:true})
    let result = await api.list()
    // console.log(result)
    this.setState({dataSource:result.adminList,spinning:false})
  }

  hideCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render(){
    let {dataSource,spinning,columns} =this.state
    return (
      <div className={style.manager}>
          <Card title='管理员列表' className={style.card}>
          <Button type='primary' onClick={this.showModal}>添加</Button>
            <Spin spinning={spinning}>
             <Table pagination={false} dataSource={dataSource} columns={columns} rowKey='_id' scroll={{ y: 200 }}></Table>
            </Spin>
          </Card>
          {/* 模态框 */}
          <Modal
            title="Modal"
            visible={this.state.visible}
            onOk={this.hideOk}
            onCancel={this.hideCancel}
            okText="确认"
            cancelText="取消"
          >
            <div style={{ marginBottom: 16 }}>
              <Input addonBefore="userName" ref='us' />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Input addonBefore="passWord" type='password' ref='ps' />
            </div>
          </Modal>
      </div>
    )
  }
}

export default Manager;

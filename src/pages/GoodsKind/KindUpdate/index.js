import React, { Component } from 'react';
import style from  './index.module.less'
import goodsApi from '../../../api/goods'
import {Card, message,Input,Button} from 'antd';
class KindAdd extends Component {
  state={
    'kindName':'',
    'id':''
  }
  
  submit= async()=>{
    let {code,msg}  = await goodsApi.kindUpdate(this.state.id,this.state.kindName)
    if(code){ return message.error(msg)}
    this.props.history.replace('/admin/goodskind')
    return message.success('修改成功！')
  }
  componentDidMount(){
    let param = this.props.location.search
    let data = param.substr(1,param.length-1).split('&')
    this.setState({kindName:decodeURI(data[1].split('=')[1]),id:data[0].split('=')[1]})
  }

  render() { 
    let {kindName} = this.state
    return ( 
      <div className={style.box}>
         <Card title='类别修改'>
            <div style={{ marginBottom: 16 ,width:300}}>
              <Input addonBefore="类别名称" value = {kindName} onChange={(e)=>{
                this.setState({kindName:e.target.value})
              }}/>
            </div>
            <Button type="primary" icon="redo" onClick={this.submit}>
              修改
            </Button>
         </Card>
      </div>
     );
  }
}
 
export default KindAdd;

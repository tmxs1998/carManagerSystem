import React, { Component } from 'react';
import style from  './index.module.less'
import {Card, message,Input,Select,Button} from 'antd';
import uploadApi from '../../../api/upload'
import config from '../../../config/index'
import goodsApi from '../../../api/goods'

const { Option } = Select
class GoodsAdd extends Component {
  state = {
    "name":"默认名字",
    "desc":'产品描述',
    "path":"",
    "link":"链接地址",
    "stock":0,
    "putaway":0,
    "price":0,
    "unit":"件",
    "kind":"婴儿车",
    'types':[]
  }
  async componentDidMount(){
    let {list} = await goodsApi.kindList()
    this.setState({types:list,kind:list[0]})
  }
  upload =async()=>{
    //获取图片里的内容
    
    let file = this.refs.img.files[0]
    if(!file){return message.error('请先选择一张图片！')}
    //console.log(file)
    let {size,type} = file
    if(size > 1000000){return message.warning('图片超过1M')}
    let types = ['jpg','jpeg','gif','png']
    if(types.indexOf(type.split('/')[1]) ===-1){
      return message.warning('只允许上传jpg、jpeg、png和gif')
    }

    //将图片转换为formData
    let fromData = new  FormData()
    fromData.append('hehe',file)
    let {code,msg,path} = await uploadApi.img(fromData)
    //console.log(result)
    if(code){
      return message.error(msg)
    }

    this.setState({path})
  }

  //提交
  submit = async()=>{
    if(!this.state.path){return message.info('请先上传图片！')}
    console.log(this.state)
    let {code,msg} = await goodsApi.add(this.state)
    if(code){return message.error(msg)}

    this.props.history.replace('/admin/goodsInfo')
  }
  render() { 
    let {types, name,desc,path,link,stock,price,unit} = this.state
    return ( 
      <div className={style.box}>
         <Card title='商品添加'>

          <div style={{ marginBottom: 16 }}>
            <Input addonBefore="名称" value={name} onChange={(e)=>{
              this.setState({name:e.target.value})
            }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore="描述" value={desc} onChange={(e)=>{
              this.setState({desc:e.target.value})
            }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore="链接" value={link} onChange={(e)=>{
              this.setState({link:e.target.value})
            }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore="库存" value={stock} type='number' onChange={(e)=>{
              if(e.target.value<0){e.target.value = 0}
              this.setState({stock:e.target.value})
            }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore="单位" value={unit} onChange={(e)=>{
              if(e.target.value<0){e.target.value = 0}
              this.setState({unit:e.target.value})
            }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="上架状态"
              optionFilterProp="children"
              onChange={(e)=>{
                console.log(e)
                this.setState({putaway:Number(e)})
              }}
            >
              
              <Option value={-1}>下架</Option>
              <Option value={0}>未上架</Option>
              <Option value={1}>上架</Option>
            </Select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore="价格" value={price} type='number' onChange={(e)=>{
              if(e.target.value<0){e.target.value = 0}
              this.setState({price:e.target.value})
            }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="类别"
                optionFilterProp="children"
                onChange={(e)=>{
                  console.log(e)
                  this.setState({kind:e})
                }}
              >
                {types.map((item,index)=>{
                return (<Option value={item.kindName} key={item._id}>{item.kindName}</Option>)
              })}
              </Select>
          </div>
            缩略图：
            <input type="file" ref='img' />
            <button onClick={this.upload}>上传图片</button><br/>
            <img width='120' height='80' src={config.serverIp+path} alt=""/><br />
            <Button type="primary" icon="plus" onClick={this.submit}>
              添加
            </Button>
         </Card>
      </div>
     );
  }
}
 
export default GoodsAdd;
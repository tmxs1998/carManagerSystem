import React, { Component } from 'react';
import style from  './index.module.less'
import {Card, message} from 'antd';
import uploadApi from '../../../api/upload'
import config from '../../../config/index'
import goodsApi from '../../../api/goods'
import { types } from '@babel/core';

class GoodsAdd extends Component {
  state = {
    "name":"默认名字",
    "desc":'超好吃,是真的超好吃不是假的超好吃',
    "path":"",
    "link":"http://www.baidu.com",
    "stock":0,
    "putaway":0,
    "price":0,
    "unit":"件",
    'types':[],
    "kind":""
  }
  async componentDidMount(){
    let {code,list} = await goodsApi.kindList()
    this.setState({types:list})
  }
  upload =async()=>{
     // 1. 获取图片里的内容
     let  file = this.refs.img.files[0]
     if(!file){ return message.error('请先选择一张图片')}
     // 图片的验证
     let {size,type} = file 
     console.log(type)
     let types = ['jpg',"jpeg",'gif','png']
     if(size>1000000){ return message.warning('图片超过1m')}
     if(types.indexOf(type.split('/')[1])===-1){ return message.warning('只允许jpg.jpeg,gif,png四种类型')}
     // 将图片变成base64 
     // 创建文件读取对象 
      let reader = new FileReader()
     //  文件转化为base64结束触发
      reader.onload=()=>{
        //console.log('转化完毕')
        //console.log(reader.result)
        this.setState({path:reader.result})
      }
     // 读取一个文件
      reader.readAsDataURL(file)
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
    let {types, name,desc,path,link,kind,stock,putaway,price,unit} = this.state
    return ( 
      <div className={style.box}>
         <Card title='商品添加'>
            名称: <input type='text' value={name} onChange={(e)=>{
              this.setState({name:e.target.value})
            }}/><br/>
            描述: <input type='text' value={desc} onChange={(e)=>{
              this.setState({desc:e.target.value})
            }}/><br/>
            链接: <input type='text' value={link} onChange={(e)=>{
              this.setState({link:e.target.value})
            }}/><br/>
            库存: <input type='number' value={stock} onChange={(e)=>{
              this.setState({stock:e.target.value})
            }}/><br/>
            发布状态: 
            <select value={putaway} onChange={(e)=>{
              this.setState({putaway:Number(e.target.value)})
            }}>
              <option value={-1}>下架</option>
              <option value={0}>未上架</option>
              <option value={1}>上架</option>
            </select>
            
            <br/>
            价格: <input type='number' value={price} onChange={(e)=>{
              this.setState({price:e.target.value})
            }}/><br/>
            单位: <input type='text' value={unit} onChange={(e)=>{
              this.setState({unit:e.target.value})
            }}/><br/>
            {/* 类别 */}
            类别
            <select value={kind} onChange={(e)=>{
              this.setState({kind:e.target.value})
            }}>
              {types.map((item,index)=>{
                return (<option value={item._id} key={item._id}>{item.kindName}</option>)
              })}
            </select><br />
            缩略图：
            <input type="file" ref='img' />
            <button onClick={this.upload}>上传图片</button><br/>
            <img width='120' height='80' src={path} alt=""/><br />
            <button onClick={this.submit}>添加</button>
         </Card>
      </div>
     );
  }
}
 
export default GoodsAdd;
/*
商品添加
1.用户输入信息
2.获取用户输入的信息
3.调用添加接口
4.添加成功后 可以在页面不动 也可以跳转回列表页
*/ 
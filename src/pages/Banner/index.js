import React,{Component} from 'react';
import { Table, Card, message, Button,Popconfirm,Spin,Modal,Input,Tag,Pagination} from 'antd'
import bannerApi from '../../api/banner'
import style from './index.module.less'
import XLSX from 'xlsx'
import config from '../../config/index'
import uploadApi from '../../api/upload'

let colorObj = {'0':{color:'yellow',msg:'未发布'},'1':{color:'green',msg:'已发布'}}
let publish = 0
let uid = ''

class Banner extends Component{
  state = {
    spinning:false,
    visible:false,
    updateVis:false,
    page:1,
    pageSize:50,
    list:[],
    path:'',
    count:0,
    columns:[
      {title:'id',key:'_id',dataIndex:'_id',width:220,fixed:'left'},
      {title:'名称',key:'name',dataIndex:'name',width:150},
      {title:'链接',key:'link',dataIndex:'link',width:150},
      {title:'描述',key:'desc',dataIndex:'desc'},
      {title:'图片',key:'path',dataIndex:'path',width:150,render(recode){
          return(<img src={recode} alt='轮播图' />)
      }},
      {title:'发布状态',key:'publish',dataIndex:'publish',width:120,render(state){
        return(<Tag color={colorObj[state].color}>{colorObj[state].msg}</Tag>)
      }},
      {title:'操作',key:'action',width:100,fixed:'right',render:(recode)=>{
        return(
          <div>
            <Popconfirm title='确定要删除吗?' onConfirm={()=>{
                this.del(recode._id)
            }} >
              <Button type='danger' size='small'>删除</Button>
            </Popconfirm>
            <Popconfirm title='确定要修改吗?' onConfirm={()=>{
              if(recode.publish){
                this.publish(recode._id,0)
              }else{
                this.publish(recode._id,1)
              }
            }} >
              <Button type='default' size='small' style={{margin:'10px 0'}}>发布</Button>
            </Popconfirm>
            <Popconfirm title='确定要修改吗?' onConfirm={()=>{
              this.props.history.replace('/admin/banner/'+recode._id)
              publish = recode.publish
              uid = recode._id
              this.setState({updateVis:true})
              this.upData(recode)
            }} >
              <Button type='primary' size='small' >修改</Button>
            </Popconfirm>
          </div>
        )
      }}
    ]
  }
  componentDidMount(){
    this.getListData()
  }
  publish= async(id,state)=>{
    let result = await bannerApi.publish(id,state)
    if(result.code){
      message.error(result.msg)
    }else{
      message.success('修改成功！')
      this.getListData()
    }
  }
  upload =async()=>{
    //获取图片里的内容
    let file = null
    if(this.refs.img){
      file = this.refs.img.files[0]
    }else{
      file = this.refs.fimg.files[0]
    }
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

  del = async(_id)=>{
    let result = await bannerApi.del(_id)
    //console.log(result)
    if(result.code === 0){
      message.success('删除成功！')
      this.getListData()
    }else{
      message.err('删除失败')
    }
  }

  getListData = async()=>{
    let {page,pageSize} = this.state
    this.setState({spinning:true})
    let result = await bannerApi.list(page,pageSize)
    this.setState({spinning:false,count:result.count})
    //console.log(result)
    let {code,msg,list} = result
    if(code !== 0){
      return message.error(msg)
    }
    this.setState({list})
  }
  exportAll=async ()=>{
    // 获取表头数据
    let thead = this.state.columns.map((item)=>{ return item.title})
    // 获取要导出的数据
    let {list} = await bannerApi.list(1,10000)
    let data = list.map((item)=>{
      let arr = [] 
      for (const key in item) {
         arr.push(item[key])
      }
      return arr
    })

    // 将数据合并为数组 
    let result = [thead,...data]
    console.log(result)
    //导出
    let  sheet = XLSX.utils.aoa_to_sheet(result) 
    let  wb =XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,sheet)
    XLSX.writeFile(wb,'商品.xlsx')
  }

  handleOk = async()=>{
    if(!this.state.path){return message.info('请先上传图片！')}
    let name = this.refs.name.state.value
    let link = this.refs.link.state.value
    let desc = this.refs.desc.state.value
    let img = config.serverIp+this.state.path
    console.log(name,link,desc,img)
    let {code,msg}  = await bannerApi.add({name,link,desc,path:img})
    if(code){ return message.error(msg)}
    this.getListData()
    this.setState({visible:false})
    return message.success('添加成功')
  }
  showModal =() =>{
    this.setState({visible:true})
  }
  handleCancel =()=>{
    this.setState({visible:false})
  }

  upOk = async()=>{
    if(!this.state.path){return message.info('请先上传图片！')}
    let name = this.refs.uname.input.value
    let link = this.refs.ulink.input.value
    let desc = this.refs.udesc.input.value
    let img = config.serverIp+this.state.path
    let {code,msg}  = await bannerApi.update(uid,{name,link,publish,desc,path:img})
    if(code){ return message.error(msg)}
    this.getListData()
    this.setState({updateVis:false})
    this.props.history.replace('/admin/banner')
    return message.success('修改成功！')
  }

  upData = (data)=>{
    //console.log(data)
    setTimeout(()=>{
      console.log(this.refs.uname)
      this.refs.uname.input.value = data.name
      this.refs.ulink.input.value = data.link
      this.refs.udesc.input.value = data.desc
      this.refs.uimg.src = data.path
    },200)
  }

  upCancel = ()=>{
    this.setState({updateVis:false})
  }

  render(){
    let {list,columns,spinning,visible,path,updateVis,page,pageSize,count} = this.state
    return (
      <div className={style.box}>
        <Card title='广告列表' className={style.card}>
            <Button type='primary' onClick={this.showModal}>添加</Button>
                <Modal
                    title="添加"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                <div style={{ marginBottom: 16 ,width:'300px'}}>
                    <Input addonBefore="名称" ref='name' />
                </div>
                <div style={{ marginBottom: 16 ,width:'300px'}}>
                    <Input addonBefore="链接" ref='link' />
                </div>
                <div style={{ marginBottom: 16 ,width:'300px'}}>
                    <Input addonBefore="描述" ref='desc' />
                </div>
                <input type="file" ref='img' />
                <button onClick={this.upload}>上传图片</button><br/>
                <img width='120' height='80' src={config.serverIp+path} alt=""/><br />
            </Modal>
            
            <Modal
                    title="修改"
                    visible={updateVis}
                    onOk={this.upOk}
                    onCancel={this.upCancel}
                >
                <div style={{ marginBottom: 16 ,width:'300px'}}>
                    <Input addonBefore="名称" ref='uname' />
                </div>
                <div style={{ marginBottom: 16 ,width:'300px'}}>
                    <Input addonBefore="链接" ref='ulink' />
                </div>
                <div style={{ marginBottom: 16 ,width:'300px'}}>
                    <Input addonBefore="描述" ref='udesc' />
                </div>
                <input type="file" ref='fimg'/>
                <button onClick={this.upload}>上传图片</button><br/>
                <img width='120' height='80' src={config.serverIp+path} ref='uimg' alt=""/><br />
            </Modal>


          <Button type='primary' style={{margin:'0 10px'}} onClick={()=>{
             let thead = document.getElementsByTagName('thead')[0]
             let table = document.getElementsByTagName('table')[1]
             table.prepend(thead)
            //  console.log(table,thead) 
             var wb = XLSX.utils.table_to_book(table, {sheet:"Sheet JS"});
              // 将工作薄导出为excel文件
              XLSX.writeFile(wb,'商品.xlsx');
           }}>DOM导出表格</Button>
          <Button type='primary' onClick={this.exportAll}>导出全部</Button>
          <Spin spinning = {spinning}>
            <Table pagination={false} style={{marginTop:'20px'}} bordered  scroll={{x: 1300, y:300}} dataSource={list} columns={columns} rowKey='_id'></Table>
          </Spin>
          <Pagination style={{margin:'10px 0'}} pageSize={pageSize} total={count} current={page} showQuickJumper onChange={(page,pageSize)=>{
            this.setState({page},()=>{
              this.getListData()
            })
          }}></Pagination>
        </Card>
      </div>
    )
  }
}

export default Banner;

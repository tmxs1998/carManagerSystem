import React,{Component} from 'react';
import { Table, Card, message, Button,Popconfirm,Spin,Modal,Input} from 'antd'
import goodsApi from '../../../api/goods'
import style from './index.module.less'
import XLSX from 'xlsx'

class Kind extends Component{
  state = {
    spinning:false,
    visible:false,
    list:[],
    count:0,
    columns:[
      {title:'id',key:'_id',dataIndex:'_id',width:120},
      {title:'类别名称',key:'kindName',dataIndex:'kindName',width:120},
      {title:'操作',key:'action',width:120,render:(recode)=>{
        return(
          <div>
            <Popconfirm title='确定要删除吗?' onConfirm={()=>{
              //console.log(recode)
              this.del(recode._id)
            }} >
              <Button type='danger' style={{margin:'10px'}} size='small'>删除</Button>
            </Popconfirm>
            
            <Popconfirm title='确定要修改吗?' onConfirm={()=>{
              this.props.history.replace('/admin/kindUpdate?id='+recode._id+'&val='+recode.kindName)
            }} >
              <Button type='primary' size='small'>修改</Button>
            </Popconfirm>
          </div>
        )
      }}
    ]
  }
  componentDidMount(){
    this.getListData()
  }
  
  del = async(_id)=>{
    let result = await goodsApi.kindDel(_id)
    //console.log(result)
    if(result.code === 0){
      message.success('删除成功！')
      this.getListData()
    }else{
      message.err('删除失败')
    }
  }
  //获取商品数据
  getListData = async()=>{
    //let {page,pageSize} = this.state
    this.setState({spinning:true})
    let result = await goodsApi.kindList()
    this.setState({spinning:false})
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
    let {list} = await goodsApi.list(1,10000)
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
  showModal =() =>{
    this.setState({visible:true})
  }
  handleOk = async()=>{
    let kindName = this.refs.input.state.value
    //console.log(kindName)
    let {code,msg}  = await goodsApi.kindAdd(kindName)
    if(code){ return message.error(msg)}
    this.getListData()
    this.setState({visible:false})
    return message.success('添加成功')
  }
  handleCancel =()=>{
    this.setState({visible:false})
  }
  render(){
    let {list,columns,spinning,visible} = this.state
    return (
      <div className={style.box}>
        <Card title='类别列表' className={style.card}>
          <Button type='primary' onClick={this.showModal}>添加</Button>
          <Modal
            title="添加类别"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{ marginBottom: 16 ,width:'300px'}}>
              <Input addonBefore="类别名称" ref='input' />
            </div>
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
            <Table pagination={false} style={{marginTop:'20px'}} bordered  scroll={{y:300}} dataSource={list} columns={columns} rowKey='_id'></Table>
          </Spin>
        </Card>
      </div>
    )
  }
}

export default Kind;

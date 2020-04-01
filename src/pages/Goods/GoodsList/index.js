import React,{Component} from 'react';
import {Pagination ,Table, Card, message,Tag, Button,Popconfirm,Spin} from 'antd'
import goodsApi from '../../../api/goods'
import style from './index.module.less'
import XLSX from 'xlsx'

let rootPath = 'http://116.62.11.16:3001'
class Goods extends Component{
  state = {
    spinning:false,
    page:1,
    pageSize:2,
    list:[],
    count:0,
    columns:[
      {title:'id',key:'_id',dataIndex:'_id',width:120,fixed:'left'},
      {title:'名称',key:'name',dataIndex:'name',width:120},
      {title:'库存',key:'stock',dataIndex:'stock',width:80},
      {title:'价格',key:'price',dataIndex:'price',width:120},
      
      {title: '类别',dataIndex: 'kind',key: 'kind',width:120,render(kind){
        console.log(kind)
        return( <span>{kind?kind:'暂无类别'}</span>)
      }},

      {title: '缩略图',dataIndex: 'path',key: 'path',render(path){
        // 图片是base64 还是正常的图片路径
        if(path==null){path = ''}
        let result = path
        if(path.indexOf('base64')===-1){
           result =rootPath+path
        }
        return(<img width ='150' height='80'src={result} alt='缩略图'/>)
      },width:150},
      {title:'描述',key:'desc',dataIndex:'desc'},
      {title:'单位',key:'unit',dataIndex:'unit',width:80},
      {title: '状态',dataIndex: 'putaway',key: 'putaway',render(putaway){
        if(putaway == null){putaway = 0}
        let obj={'-1':{color:'red',msg:'已下架'},'0':{color:'yellow',msg:'未上架'},'1':{color:'green',msg:'已上架'}}
        return(<Tag color={obj[putaway].color}>{obj[putaway].msg}</Tag>)  
      },width:120},
      {title:'操作',key:'action',width:120,render:(recode)=>{
        return(
          <div>
            <Popconfirm title='确定要删除吗?' onConfirm={()=>{
              //console.log(recode._id)
              this.del(recode._id)
            }} >
              <Button type='danger' size='small'>删除</Button>
            </Popconfirm>
            <Popconfirm title='确认修改?' style={{margin:'10px'}}  onConfirm={()=>{this.putAwayGoods(recode._id,recode.putaway)}} >
              <Button type='default' size='small' style={{margin:'10px 0'}}>上架</Button>
            </Popconfirm>
            <Button type='primary' size='small' onClick={()=>{
              // 跳转到修改页面 传递要修改的id 
              this.props.history.replace('/admin/goodsInfoUpdate/'+recode._id)
            }}>修改</Button>
          </div>
        )
      },fixed:'right'}
    ]
  }
  componentDidMount(){
    this.getListData()
  }
  putAwayGoods = async (_id,putaway)=>{
    console.log(_id,putaway)
    if(putaway ===0||putaway === -1){
      putaway = 1
    }else{
      putaway = -1
    }
    let {code,msg} = await goodsApi.putaway(_id,putaway)
    if(code){ return message.error(msg)}
    this.getListData()
  }
  del = async(_id)=>{
    let result = await goodsApi.del(_id)
    console.log(result)
    if(result.code === 0){
      message.success('删除成功！')
      this.getListData()
    }
  }
  //获取商品数据
  getListData = async()=>{
    let {page,pageSize} = this.state
    this.setState({spinning:true})
    let result = await goodsApi.list(page,pageSize)
    this.setState({spinning:false})
    //console.log(result)
    let {code,msg,list,count} = result
    if(code !== 0){
      return message.error(msg)
    }
    this.setState({list,count})
  }
  exportAll = async ()=>{
    
    let thead = this.state.columns.map((item)=>{ return item.title})
    
    let {list} = await goodsApi.list(1,10000)
    let data = list.map((item)=>{
      let arr = [] 
      for (const key in item) {
         arr.push(item[key])
      }
      return arr
    })

    let result = [thead,...data]
    //console.log(result)

    let  sheet = XLSX.utils.aoa_to_sheet(result) 
    let  wb =XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,sheet)
    XLSX.writeFile(wb,'商品.xlsx')
  }
  render(){
    let {list,columns,count,pageSize,page,spinning} = this.state
    return (
      <div className={style.box}>
        <Card title='商品列表' className={style.card}>
          <Button type='primary' onClick={()=>{
            this.props.history.push('/admin/goodsadd')
          }}>添加</Button>
          <Button type='primary' style={{margin:'0 10px'}} onClick={()=>{
             let thead = document.getElementsByTagName('thead')[0]
             let table = document.getElementsByTagName('table')[1]
             table.prepend(thead)
            //  console.log(table,thead) 
             var wb = XLSX.utils.table_to_book(table, {sheet:"Sheet JS"});
              
              XLSX.writeFile(wb,'商品.xlsx');
           }}>DOM导出表格</Button>
          <Button type='primary' onClick={this.exportAll}>导出全部</Button>
          <Spin spinning = {spinning}>
            <Table pagination={false} style={{marginTop:'20px'}} bordered scroll={{x: 1300, y: 300}} dataSource={list} columns={columns} rowKey='_id'></Table>
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

export default Goods;

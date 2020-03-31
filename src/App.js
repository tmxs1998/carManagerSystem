import React,{Component} from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import LoadAble from './utils/loadable'

//主页
const Home = LoadAble(()=>import('@pages/Home/index'))
//权限模态框
const TokenModal = LoadAble(()=>import('./components/TokenModal/index'))

//商品相关
const GoodsList = LoadAble(()=>import('@pages/Goods/GoodsList/index'))
const GoodsAdd = LoadAble(()=>import('@pages/Goods/GoodsAdd/index'))
const GoodsInfoUpdate = LoadAble(()=>import('@pages/Goods/GoodsUpdate'))

//类别相关
const KindList = LoadAble(()=>import('@pages/GoodsKind/kindList'))
const KindUpdate = LoadAble(()=>import('@pages/GoodsKind/KindUpdate/index'))

//管理员
const Manager = LoadAble(()=>import('@pages/Manager/index'))

//轮播图
const Banner = LoadAble(()=>import('@pages/Banner/index'))

const Login = LoadAble(()=>import('@pages/Login/index'))
const Admin = LoadAble(()=>import('@pages/Admin/index'))


class App extends Component{
  render(){
    return (
      <BrowserRouter>
        
        <TokenModal></TokenModal>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' render ={()=>{
            return(
              <Admin>
                  <Route path='/admin/home' component={Home}></Route>
                  <Route path='/admin/goodsInfo' component={GoodsList}></Route>
                  <Route path='/admin/goodsadd' component={GoodsAdd}></Route>
                  <Route path='/admin/goodsInfoUpdate/:id' component={GoodsInfoUpdate}></Route>
                  <Route path='/admin/goodskind' component={KindList}></Route>
                  <Route path='/admin/kindupdate' component={KindUpdate}></Route>
                  <Route path='/admin/manager' component={Manager}></Route>
                  <Route path='/admin/banner' component={Banner}></Route>
              </Admin>
            )
          }}></Route>
          <Redirect exact from='/' to='/admin/home'></Redirect>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;

import React,{Component} from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import LoadAble from './utils/loadable'

import Home from '@pages/Home/index'
import GoodsList from './pages/Goods/GoodsList/index'
import GoodsAdd from './pages/Goods/GoodsAdd/index'
import GoodsInfoUpdate from  './pages/Goods/GoodsUpdate'
import KindList from  './pages/GoodsKind/kindList'
import Manager from './pages/Manager/index'
import KindUpdate from '@pages/GoodsKind/KindUpdate/index'

import TokenModal from './components/TokenModal/index'

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

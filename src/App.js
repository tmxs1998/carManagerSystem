import React ,{Component} from 'react';
import {HashRouter,Route} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Admins from './pages/Administrator'
import User from './pages/User'
import GoodsInfoList from './pages/Goods/GoodsList'
import GoodsInfoAdd from './pages/Goods/GoodsAdd'
import GoodsInfoUpdate from './pages/Goods/GoodsUpdate'
import GoodsKindList from './pages/GoodsKind/GoodsKindList'
import GoodsKindAdd from './pages/GoodsKind/GoodsKindAdd'
 
class App extends Component {
  render() { 
    return (  
      <HashRouter>
        <Route path='/login' component={Login}></Route>
        <Route path='/admin' render ={() => {
          return(
            <Admin>
              <Route path = '/admin/user' component = { User }></Route>
              <Route path = '/admin/goodsinfo' component = { GoodsInfoList }></Route>
              <Route path = '/admin/goodsinfoadd' component = { GoodsInfoAdd }></Route>
              <Route path = '/admin/goodsinfoupdate' component = { GoodsInfoUpdate }></Route>
              <Route path = '/admin/goodskind' component = { GoodsKindList }></Route>
              <Route path = '/admin/goodskindadd' component = { GoodsKindAdd }></Route>
              <Route path = '/admin/administrator' component = { Admins } ></Route>
            </Admin>
          )
        }}></Route>
      </HashRouter>
    );
  }
}
 
export default App;




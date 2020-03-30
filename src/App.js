import React ,{Component} from 'react';
import {HashRouter,Route} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
class App extends Component {
  render() { 
    return (  
      <HashRouter>
        <Route path='/login' component={Login}></Route>
        <Route path='/admin' render ={() => {
          return(
            <Admin>
               
            </Admin>
          )
        }}></Route>
      </HashRouter>
    );
  }
}
 
export default App;




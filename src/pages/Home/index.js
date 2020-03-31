import React,{Component} from 'react';
import Config from '../../config/index'
import './index.css'

class Home extends Component{
  render(){
    return (
      <div className="banner-wp">
			<img src={Config.serverIp+ "/Y-blue2.jpg"} alt="背景图1" />
			<div className="wp banner">
				<p className="Y-p1 wp">welcome</p>
				<p className="Y-p2 wp">欢迎使用汽车管理系统</p>
				<img className="Y-img02" src={Config.serverIp+"/Y-img1.png"} alt="背景图3" />
			</div>
		</div>
    )
  }
}

export default Home;
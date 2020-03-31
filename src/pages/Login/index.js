import React, { Component } from 'react';
import api from '../../api/admin.js'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import style from './index.module.less'
class Login extends Component {
  login=()=>{
    let {validateFields} = this.props.form //用户获取表单数据的值
   
    validateFields((err,data)=>{
      //console.log(err,data)
      if(err){
        message.error('输入有误请重试')
      }else{
        api.login(data).then((res)=>{
          //console.log(res)
          if(res.code === 404){
            message.error('用户名密码错误')
          }else{
            message.success('登录成功，3s后跳转首页',3,()=>{
              localStorage.setItem('token',res.token)
              localStorage.setItem('user',data.userName)
              this.props.history.replace('/admin/home')
            })
          }
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    // getFieldDecorator返回一个高阶组件 用于和表单进行双向数据绑定
    return(
      <div className={style['login-box']}>

      <div className={style['login-form']}>
        {/* 用户名 */}
        <Form.Item>
          {getFieldDecorator('userName',{
            rules:[{requied:true,message:'用户名必须存在'},
            {min:3,message:'用户名最小长度3位'},
            {max:9,message:'用户名最大长度9位'}]
          })(
            <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            />
            )}
        </Form.Item>
        {/* 用户密码 */}
        <Form.Item>
          {getFieldDecorator('passWord',{
            rules:[{requied:true,message:'用户名必须存在'},
            {min:3,message:'用户名最小长度3位'},
            {max:9,message:'用户名最大长度9位'}]
          })(
            <Input
            prefix={<Icon type="eye-invisible" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="PassWord"
            />
            )}
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href>
            Forgot password
          </a>
          <Button type="primary" onClick={this.login} className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </div>
    </div>
    )
  }
  
}
// 通你Form 下的create的方法将组件进行处理  会将antd里的方法注册到 当前组件的Props里
export default  Form.create()(Login);
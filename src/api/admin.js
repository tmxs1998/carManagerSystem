import axios from '@utils/axios'

class Admin {
  // 登录
  login (payload) {
    let url = '/mall/admin/login'
    return axios.post(url, payload)
  }
  // 查询所有管理员信息
  list () {
    let url = '/mall/admin'
    return axios.get(url)
  }
  // 添加管理员
  add ({ userName, passWord }) {
    let url = '/mall/admin'
    return axios.post(url, {userName, passWord})
  }
  // 删除管理员
  del (_id) {
    let url = '/mall/admin'
    return axios.delete(url + '/' + _id)
  }
}

export default new Admin()

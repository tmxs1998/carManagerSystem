import axios from '@utils/axios'
class Goods {
  // 查询某个商品
  findOne (_id) {
    let url = '/mall/goods/' + _id
    return axios.get(url)
  } 
  // 查询所有商品并返回当前页码数据
  list (page = 1, pageSize = 2) {
    let url = '/mall/goods'
    return axios.get(url, {params: {page, pageSize}})
  }
  // 删除某一件商品
  del (_id) {
    let url = `/mall/goods/${_id}`
    return axios.delete(url)
  }
  // 商品是否上架
  putaway (_id, putaway) {
    let url = `/mall/goods/${_id}/putaway`
    return axios.put(url, putaway)
  }
  // 修改某件商品
  update (_id, payload) {
    let url = `/mall/goods/${_id}`
    return axios.put(url, payload)
  }
  // 添加某件商品
  add (payload) {
    let url = './mall/goods'
    return axios.post(url, payload)
  }
  // 获取商品列表
  kindlist () {
    let url = '/mall/kind'
    return axios.get(url)
  }
  // 添加商品类别
  kindadd (kindName) {
    let url = '/mall/kind'
    return axios.post(url, { kindName })
  }
  // 更新商品类别
  kindupdate(_id, kindName) {
    let url = '/mall/kind/' + _id
    return axios.put(url, { kindName })
  }
  // 删除商品类别
  kinddel (_id) {
    let url = '/mall/kind/' + _id
    return axios.delete(url)
  }
}

export default new Goods()

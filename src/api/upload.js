import axios from '@utils/axios'
class Upload {
  // 上传商品图片
  img (payload) {
    let url = '/mall/upload'
    return axios.post(url, payload)
  }
}

export default new Upload()

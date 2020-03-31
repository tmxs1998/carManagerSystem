import axios from '../utils/axios'

class Banner {
    
    list(page=1,pageSize=2){
        let url = '/mail/banner'
        return axios.get(url,{params:{page,pageSize}})
    }
    update(){

    }
    add(payload){
        let url = '/mail/banner'
        return axios.post(url,payload)
    }
    del(_id){
        let url = '/mail/banner/'+_id
        return axios.delete(url)
    }
}

export default new Banner()
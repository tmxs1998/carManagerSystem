import axios from '../utils/axios'

class Banner {
    
    list(page=1,pageSize=2){
        let url = '/mail/banner'
        return axios.get(url,{params:{page,pageSize}})
    }
    update(_id,payload){
        let url = '/mail/banner/'+_id
        return axios.put(url,payload)
    }
    add(payload){
        let url = '/mail/banner'
        return axios.post(url,payload)
    }
    del(_id){
        let url = '/mail/banner/'+_id
        return axios.delete(url)
    }
    publish(_id,state){
        let url = '/mail/banner/'+_id+'/publish'
        return axios.put(url,{publish:state})
    }
}

export default new Banner()
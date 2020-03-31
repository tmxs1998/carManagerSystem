import axios from '../utils/axios'

class Goods {
    findOne(id){
        let url ='/mail/goods/'+id
        return axios.get(url)
    }
    list(page=1,pageSize=2){
        let url = '/mail/goods'
        return axios.get(url,{params:{page,pageSize}})
    }
    del(_id){
        let url = '/mail/goods/'+_id
        return axios.delete(url)
    }payload
    update(_id,payload){
        let url =`/mail/goods/${_id}`
        return axios.put(url,payload)
    }
    putaway(_id,putaway){
        let url = '/mail/goods/'+_id+'/putaway'
        return axios.put(url,{putaway})
    }
    add(payload){
        let url = '/mail/goods'
        return axios.post(url,payload)
    }
    kindList(){
        let url = '/mail/kind'
        return axios.get(url)
    }
    kindAdd(kindName){
        let url = '/mail/kind'
        return axios.post(url,{kindName})
    }
    kindUpdate(_id,kindName){
        let url = '/mail/kind/'+_id
        return axios.put(url,{kindName})
    }
    kindDel(_id){
        let url = '/mail/kind/'+_id
        return axios.delete(url)
    }
}

export default new Goods()
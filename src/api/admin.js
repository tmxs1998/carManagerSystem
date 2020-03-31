import axios from '../utils/axios'

class Admin {
    login(obj){
        let url = '/mail/admin/login'
        return axios.post(url,obj)
    }
    list(){
        let url = '/mail/admin'
        return axios.get(url)
    }
    add(userName,passWord){
        let url = '/mail/admin'
        return axios.post(url,{userName,passWord})
    }
    del(_id){
        let url = '/mail/admin/'+_id
        return axios.delete(url)
    }
}

export default new Admin()
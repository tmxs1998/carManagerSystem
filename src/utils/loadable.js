import React,{Fragment} from 'react'
import LoadAble from 'react-loadable'
import {Spin,Icon} from 'antd'

//过渡组件
function LoadingComponent(){
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
    return(
        <Fragment>
            <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Spin  indicator={antIcon} size="large"/>
            </div>
        </Fragment>
    )
}

export default (LoadComponent)=>{
    return LoadAble({
        loader:LoadComponent,
        loading:LoadingComponent
    })
}
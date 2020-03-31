import React from 'react'
import LoadAble from 'react-loadable'
//本质是一个高阶组件

function Loading(){
    return(
        <div style={{width:'100vw',height:'100vh',background:'skyblue'}}>加载中...</div>
    )
}

export default LoadAble({
    loader:()=>import('./index') ,     //需要懒加载的组件
    loading:Loading    //切换过程中默认显示的组件
})

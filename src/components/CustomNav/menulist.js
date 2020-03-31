export default[{
    key:'1',
    title:'首页',
    path:'/admin/home',
    icon:'home'
  },
  {
    key:'2',
    title:'管理员管理',
    icon:'user',
    path:'/admin/manager'
  },
  {
    key:'3',
    title:'商品管理',
    icon:'shop',
    path:'/admin/goods',
    children:[
      {
        key:'3-1',
        title:'商品信息',
        path:'/admin/goodsinfo'
      },
      {
        key:'3-2',
        title:'商品类别',
        path:'/admin/goodsKind'
      }
    ]
  },
  {
    key:'4',
    title:'轮播图管理',
    icon:'file-image',
    path:'/admin/banner'
  },
  {
    key:'9',
    title:'设置',
    path:'/admin/set',
    icon:'setting'
  }]


// export default [{
//     key:'1',
//     title:'首页',
//     path:'/admin/home'
//   },
//   {
//     key:'2',
//     title:'管理员管理',
//     children:[
//       {
//         key:'2-1',
//         title:'管理员列表',
//         path:'/admin/manage/list'
//       },
//       {
//         key:'2-2',
//         title:'管理员添加',
//         path:'/admin/manage/add',
//         children:[
//             {
//               key:'2-2-1',
//               title:'多级1',
//               path:'/admin/manage/list'
//             },
//             {
//               key:'2-2-2',
//               title:'多级2',
//               path:'/admin/manage/add',
//               children:[
//                 {
//                   key:'2-2-2-1',
//                   title:'多级1',
//                   path:'/admin/manage/list'
//                 },
//                 {
//                   key:'2-2-2-2',
//                   title:'多级2',
//                   path:'/admin/manage/add'
//                 }
//               ]
//             }
//           ]
//       }
//     ]
//   },
//   {
//     key:'9',
//     title:'设置',
//     path:'/admin/set'
//   }]

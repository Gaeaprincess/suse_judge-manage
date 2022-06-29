import request from '@/utils/request'

// 获取所有管理员列表
export const getAdminList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/admin/gets/adminlist',
      method: 'get'
    }).then(res => {
      const _1 = []
      res.data.forEach(i => {
        _1.push({
          CreatedAt: i.CreatedAt,
          UpdatedAt: i.UpdatedAt,
          id: i.id,
          admin_account: i.admin_account,
          admin_name: i.admin_name,
          Password: i.Password,
          admin_roles: i.admin_roles
        })
      })
      resolve(_1)
    })
  })
}

// 创建一个管理员
export const createAdmin = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/admin/add',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      // console.log(res)
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

// 修改管理员
export const updateAdmin = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/admin/update',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      // console.log(res)
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

// // 分配权限
// export const doAssignRole = (admin_id, roles) => {
//   return new Promise((resolve, reject) => {
//     request({
//       url: '/gxa/admin/update/role',
//       method: 'post',
//       data: JSON.stringify({
//         admin_id,
//         roles
//       })
//     }).then(res => {
//       if (res.code !== 0) reject(res.msg)
//       resolve('操作成功')
//     })
//   })
// }

// 删除一个管理员
export const deleteAdmin = (item) => {
  return new Promise((resolve, reject) => {
    if (item.admin_roles === 'admin') reject('最高管理员禁止删除')
    else {
      request({
        url: '/onlinejudge/admin/manage/admin/delete',
        method: 'delete',
        data: JSON.stringify({
          delete_id: item.id
        })
      }).then(res => {
        // console.log(res)
        if (res.code !== 0) reject(res.msg)
        resolve(res)
      })
    }
  })
}

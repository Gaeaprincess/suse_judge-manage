import request from '@/utils/request'

// 获取所有用户信息
export const getTypeList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/goods/type/gets/goodstypelist',
      method: 'get'
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

// 创建一个用户
export const createType = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/goods/type/add',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

// 删除用户
export const deleteType = (item) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/goods/type/delete',
      method: 'delete',
      data: JSON.stringify({
        delete_id: item.id
      })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    })
  })
}

// 修改用户密码
export const updateType = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/goods/type/update',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

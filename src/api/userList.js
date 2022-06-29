import request from '@/utils/request'

// 获取所有用户信息
export const getUserInfoList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/user/gets/userlist',
      method: 'get'
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

// 创建一个用户
export const createUser = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/user/add',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

// 删除用户
export const deleteUser = (item) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/user/delete',
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

// 修改用户邮箱
export const updataUserEmail = (update_id, email) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/user/update',
      method: 'post',
      data: JSON.stringify({
        update_id,
        email
      })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    })
  })
}

// 修改用户密码
export const updataUserPassword = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/user/update',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    })
  })
}

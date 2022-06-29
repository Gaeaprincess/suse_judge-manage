import request from '@/utils/request'
// import qs from 'qs'

export const login = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/login',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
      localStorage.setItem('admin_name', res.data.admin_name)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getInfo = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/get/info',
      method: 'get'
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    }).catch(err => {
      console.log(err)
    })
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 200,
      data: null
    })
  })
}

export const userUpdate = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/info/update',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

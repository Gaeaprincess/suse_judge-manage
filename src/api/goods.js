import request from '@/utils/request'

const upload = (url, params) => {
  return request.post(url, params, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

export const getGoodsList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/goods/gets/goodslist',
      method: 'get'
    }).then(res => {
      const _1 = []
      res.data.forEach(i => {
        _1.push({
          CreatedAt: i.CreatedAt,
          UpdatedAt: i.UpdatedAt,
          id: i.id,
          goods_name: i.goods_name,
          goods_value: i.goods_value,
          goods_count: i.goods_count,
          goods_type: i.goods_type,
          goods_photo_url: i.goods_photo_url,
          goods_description: i.goods_description
        })
      })
      resolve(_1)
    })
  })
}
export const createGoods = (data) => {
  return new Promise((resolve, reject) => {
    const data1 = new FormData()
    data1.append('goods_name', data.goods_name)
    data1.append('goods_count', data.goods_count)
    data1.append('goods_value', data.goods_value)
    data1.append('goods_type', data.goods_type)
    data1.append('photo', data.photo)
    data1.append('goods_description', data.goods_description)
    upload('/onlinejudge/admin/manage/goods/add', data1).then(res => {
      resolve(res.msg)
    }).then(res => {
      // console.log(res)
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

export const updateGoods = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/goods/update',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      // console.log(res)
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

export const deleteGoods = (item) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/goods/delete',
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

export const updatePicture = (data) => {
  return new Promise((resolve, reject) => {
    const data1 = new FormData()
    data1.append('alter_id', data.alter_id)
    data1.append('photo', data.photo)
    upload('/onlinejudge/admin/manage/goods/picture/update', data1).then(res => {
      resolve(res.msg)
    }).catch(err => {
      reject(err.msg)
    })
  })
}

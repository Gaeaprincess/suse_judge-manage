import request from '@/utils/request'

export const getOrderList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/order/gets/orderlist',
      method: 'post',
      data: JSON.stringify({
        user_id: 0,
        goods_id: 0,
        status: 0
      })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

export const updateOrder = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/order/finish',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

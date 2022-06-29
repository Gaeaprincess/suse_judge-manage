import request from '@/utils/request'

export const getIntegralList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/user/integral/integrallist',
      method: 'get'
    }).then(res => {
      const _1 = []
      res.data.forEach(i => {
        _1.push({
          CreatedAt: i.CreatedAt,
          UpdatedAt: i.UpdatedAt,
          DeletedAt: i.DeletedAt,
          ID: i.ID,
          Value: i.Value,
          UserID: i.UserID,
          ConsumptionValue: i.ConsumptionValue
        })
      })
      resolve(_1)
    })
  })
}

// 修改积分
export const updateIntegral = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/user/integral/set',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

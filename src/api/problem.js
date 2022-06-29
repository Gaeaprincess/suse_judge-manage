import request from '@/utils/request'

// 获得所有竞赛信息
export const getProblemList = (datas) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/problem/gets/problemlist',
      method: 'post',
      data: JSON.stringify({
        contest_id: datas.ID
      })
    }).then(res => {
      if (res.code !== 0) reject(res.data.msg)
      resolve(res.data)
    })
  })
}

// 删除竞赛
export const deleteProblem = (item) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/problem/delete',
      method: 'delete',
      data: JSON.stringify({
        delete_id: item.ID
      })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    })
  })
}

// 修改竞赛
export const updateProblem = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/problem/update',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    })
  })
}

export const addProblem = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/problem/add',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}


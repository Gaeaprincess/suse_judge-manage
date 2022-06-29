import request from '@/utils/request'

// 获得所有竞赛信息
export const getExampleList = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/example/gets/examplelist',
      method: 'post',
      data: JSON.stringify({
        problem_id: data.ID
      })
    }).then(res => {
      if (res.code !== 0) reject(res.data.msg)
      resolve(res.data)
    })
  })
}

// 删除竞赛
export const deleteExample = (item) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/example/delete',
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
export const updateExample = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/example/update',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    })
  })
}

export const addExample = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/example/add',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}


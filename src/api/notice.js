import request from '@/utils/request'

const upload = (url, params) => {
  return request.post(url, params, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

export const getNoticeList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/announcement/gets/announcementlist',
      method: 'get'
    }).then(res => {
      const _1 = []
      res.data.forEach(i => {
        _1.push({
          create_at: i.create_at,
          id: i.id,
          title: i.title,
          content: i.content,
          publisher: i.publisher,
          picture_url: i.picture_url
        })
      })
      resolve(_1)
    })
  })
}

// export const createNotice = (data) => {
//   return new Promise((resolve, reject) => {
//     request({
//       url: '/onlinejudge/admin/manage/announcement/add',
//       method: 'post',
//       data: JSON.stringify(data),
//       headers: {
//         'Content-Type' : 'multipart/form-data'
//       }
//     }).then(res => {
//       console.log(res)
//       if (res.code !== 0) reject(res.msg)
//       resolve(res.msg)
//     })
//   })
// }
export const createNotice = (data) => {
  return new Promise((resolve, reject) => {
    const data2 = new FormData()
    data2.append('title', data.title)
    data2.append('content', data.content)
    data2.append('picture', data.picture)
    upload('/onlinejudge/admin/manage/announcement/add', data2).then(res => {
      resolve(res.msg)
    }).catch(err => {
      reject(err.msg)
    })
  })
}

export const updateNotice = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/announcement/update',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}
export const deleteNotice = (item) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/announcement/delete',
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
// 更新图片
export const updatePicture = (data) => {
  return new Promise((resolve, reject) => {
    const data1 = new FormData()
    data1.append('alter_id', data.alter_id)
    data1.append('title', data.title)
    data1.append('picture', data.picture)
    upload('/onlinejudge/admin/manage/announcement/picture/update', data1).then(res => {
      resolve(res.msg)
    }).catch(err => {
      reject(err.msg)
    })
  })
}

import request from '@/utils/request'

const upload = (url, params) => {
  return request.post(url, params, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

export const getCarouselList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/slideshow/gets/slideshowlist',
      method: 'get'
    }).then(res => {
      const _1 = []
      res.data.forEach(i => {
        _1.push({
          CreatedAt: i.CreatedAt,
          UpdatedAt: i.UpdatedAt,
          ID: i.ID,
          DeleteAt: i.DeleteAt,
          url: i.url,
          title: i.title
        })
      })
      resolve(_1)
    })
  })
}

export const createCarousel = (data) => {
  return new Promise((resolve, reject) => {
    const data1 = new FormData()
    data1.append('title', data.title)
    data1.append('picture', data.picture)
    upload('/onlinejudge/admin/manage/slideshow/add', data1).then(res => {
      resolve(res.msg)
    }).then(err => {
      reject(err.msg)
    })
  })
}

// 修改管理员
export const updateCarousel = (data) => {
  return new Promise((resolve, reject) => {
    const data1 = new FormData()
    // console.log(data.alter_id)
    data1.append('alter_id', data.alter_id)
    data1.append('title', data.title)
    data1.append('picture', data.picture)
    upload('/onlinejudge/admin/manage/slideshow/update', data1).then(res => {
      resolve(res.msg)
    }).then(err => {
      reject(err.msg)
    })
  })
}

// 删除一个管理员
export const deleteCarousel = (item) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/onlinejudge/admin/manage/slideshow/delete',
      method: 'delete',
      data: JSON.stringify({
        delete_id: item.ID
      })
    }).then(res => {
      // console.log(res)
      if (res.code !== 0) reject(res.msg)
      resolve(res)
    })
  })
}

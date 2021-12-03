const { api, callAPIWithToken } = require('./config')

const apiService = {
  createBook(params) {
    return callAPIWithToken(`${api}/book/Create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  updateBook(id, params) {
    return callAPIWithToken(`${api}/book/Update?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  deleteBook(id) {
    return callAPIWithToken(`${api}/book/Delete?id=${id}`, {
      method: 'DELETE',
    })
  },
  createBlog(params) {
    return callAPIWithToken(`${api}/blog/Create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  updateBlog(id, params) {
    return callAPIWithToken(`${api}/blog/Update?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  deleteBlog(id) {
    return callAPIWithToken(`${api}/blog/Delete?id=${id}`, {
      method: 'DELETE',
    })
  },
}

export default apiService

import axios from 'axios'

export const api = 'https://lt-book-api.herokuapp.com/api'

export const callAPIWithToken = (url, options) => {
  const token = JSON.parse(localStorage.getItem('token'))?.access_token
  return axios(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res)
    .catch(async(error) => {
      await refreshToken()
      let tokenRefreshed = JSON.parse(localStorage.getItem('token'))?.access_token
      return axios(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${tokenRefreshed}`,
        },
      }).then((res) => res)
    })
}

const refreshToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem('token'))?.refresh_token

  let res = await axios
    .get(`${api}/token/refresh`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then((res) => res)

  localStorage.setItem('token', JSON.stringify(res.data))
}

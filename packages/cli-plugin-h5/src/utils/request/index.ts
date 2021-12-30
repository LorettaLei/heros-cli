import { axios } from './axios'
import { AxiosPromise } from 'axios'
import store from '@/store'

export const postAction = (url:string, data:any, headers?:any): AxiosPromise<any> => {
  // console.log('postAction:::start', url, data, headers)
  let tokens = {}
  if (store.state.token) { tokens = JSON.parse(JSON.stringify({ token: store.state.token })) }
  return axios({
    url: url,
    method: 'post',
    data: data,
    headers: {
      ...headers,
      ...tokens
    },
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

export const getAction = (url:string, data:any, headers?:any): AxiosPromise<any> => {
  // console.log('getAction:::start', url, data, headers)
  return axios({
    url: url,
    method: 'get',
    params: data,
    headers: headers
  })
}

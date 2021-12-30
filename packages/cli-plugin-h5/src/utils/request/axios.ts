import axios from 'axios'
import { tooltip } from '../tools/tool'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_HOST,
  timeout: 60000
})

const err = (error:any) => {
  if (error.response) {
    const data = error.response.data
    console.log('------异常响应------', error.response.status)
    switch (error.response.status) {
      case 403:
        tooltip('拒绝访问')
        break
      case 404:
        tooltip('很抱歉，资源未找到')
        break
      case 504:
        tooltip('网络超时')
        break
      // case 501:
      //   window.location.href = process.env.VUE_APP_H5_BASEURL + '404.html'
      //   break
      // case 10000:
      //   window.location.href = process.env.VUE_APP_H5_BASEURL + '404.html'
      //   break
      // case 500:
      //   window.location.href = process.env.VUE_APP_H5_BASEURL + '404.html'
      //   break
      default:
        tooltip(data.message || '网络错误')
    }
  } else if (error.message) {
    if (error.message.includes('timeout')) {
      tooltip('网络超时')
    } else if (error.message.includes('Network')) {
      tooltip('网络错误')
    } else {
      tooltip(error.message)
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      ...config.headers,
      source: 'h5'
    }
  }
})

// response interceptor
service.interceptors.response.use((response) => {
  const { code, msg, data, success } = response.data
  if (Object.prototype.toString.call(data) === '[object Array]') {
    return response.data
  } else {
    return {
      code,
      msg,
      success,
      ...data
    }
  }
}, err)

export {
  service as axios
}

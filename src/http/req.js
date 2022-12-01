import axios from 'axios'
axios.interceptors.request.use((cfg) => {
  // console.log('请求拦截器')
  // 统一携带token
  if (localStorage.getItem('token')) {
    // header头是服务端定义的
    cfg.headers.Authorization = localStorage.getItem('token')
  }
  return cfg
})

axios.interceptors.response.use((res) => {
  return res
})

export default axios

import request from '@/utils/request'

/**
 * 登录接口
 */
export function loginPort(data){
  return request({
    url: '/login',
    method: 'post',
    data:data
  })
  
} 

/**
 * 注册接口
 */
export function registerPort(data){
  return request({
    url: baseURL + '/signUp',
    method: 'post',
    data:data
  })
}

/**
 * 忘记密码
 */
export function forgetPort(data){
  return request({
    url: baseURL + '/forgetPwd',
    method: 'post',
    data:data
  })
}

// 查看权限
export function permissionPort(data){
  return request({
    url:"/sysManager/selectRoleAndUser",
    method:"GET",
    params:data
  })
}
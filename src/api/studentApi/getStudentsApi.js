import request from '@/utils/request'

/**
 * 文件上传execl数据接口
 */
export function getStudentExcel(data){
  return request({
    url: '/postAddExcelStudent',
    method: 'post',
    data:data
  })
} 

//渲染学生
export function getStudents(data){
  return request({
    url: '/getStudents',
    method: 'post',
    data:data
  })
} 

//学院总数
export function getAcademy(){
  return request({
    url: '/getAcademy',
    method: 'get',
  })
} 

//班级总数
export function getClass(){
  return request({
    url: '/getClass',
    method: 'get',
  })
} 
//获取性别
export function getSex(){
  return request({
    url: '/getSex',
    method: 'get',
  })
}
//获取楼宇 getBuilding
export function getBuilding(){
  return request({
    url: '/getBuilding',
    method: 'get',
  })
}
//获取学院 getAcademy
export function getAcademyNum(){
  return request({
    url: '/getAcademyNum',
    method: 'get',
  })
}
//添加学生
export function addStu(data){
  return request({
    url: '/postAddStudent',
    method: 'post',
    data
  })
}

//编辑学生  postEditStudent
export function EditStu(data){
  return request({
    url: '/postEditStudent',
    method: 'post',
    data
  })
}

//删除学生 postDelStudent
export function delStu(data){
  return request({
    url: '/postDelStudent',
    method: 'post',
    data
  })
}

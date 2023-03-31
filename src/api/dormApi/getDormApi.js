import request from "@/utils/request";
//获取寝室的api getDorm

export function getDorms(data) {
  return request({
    url: "/getDorm",
    method: "post",
    data,
  });
}

//添加寝室  postAddDorm
export function addDorms(data) {
  return request({
    url: "/postAddDorm",
    method: "post",
    data,
  });
}

//编辑寝室  postEditDorm
export function editDorms(data) {
  return request({
    url: "/postEditDorm",
    method: "post",
    data,
  });
}
//删除寝室 postDelDorm
export function delDorms(data) {
  return request({
    url: "/postDelDorm",
    method: "post",
    data,
  });
}


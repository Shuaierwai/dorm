import request from "@/utils/request";
//获取寝室的api getDorm

export function getNotice(data) {
  return request({
    url: "/getNotice",
    method: "post",
    data,
  });
}
//添加
export function addNotice(data) {
  return request({
    url: "/postAddNotice",
    method: "post",
    data,
  });
}
//编辑
export function editNotice(data) {
  return request({
    url: "/postEditNotice",
    method: "post",
    data,
  });
}
//删除
export function delNotice(data) {
  return request({
    url: "/postDelNotice",
    method: "post",
    data,
  });
}
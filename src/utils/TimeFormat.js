//封装的时间格式

function toZero2(n) {
  return n < 10 ? "0" + n : "" + n;
}
function toDate(date) {
  let oDate = new Date(date);
  return (
    oDate.getFullYear() +
    "-" +
    toZero2(oDate.getMonth() + 1) +
    "-" +
    toZero2(oDate.getDate()) +
    " " +
    toZero2(oDate.getHours()) +
    ":" +
    toZero2(oDate.getMinutes()) +
    ":" +
    toZero2(oDate.getSeconds())
  );
}
//导出去
export{
    toZero2,
    toDate
}

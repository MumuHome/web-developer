// 这个方法把url的值解析成对象key:value eg:?id=12345&a=b
export function urlParse() {
   let url = window.location.search;
   let obj = {};
   let reg = /[?&][^?&]+=[^?&]+/g;
   let arr = url.match(reg);
   // 如果匹配就遍历这个数组
  // 数组拿到了 ['?id=12345','&a=b']
   if (arr){
     arr.forEach((item)=>{
       // 定义一个临时数组
       // 删掉每个数组的第一个，然后用'='做分隔
       let tempArr = item.substring(1).split('=');
       let key = decodeURIComponent(tempArr[0]);
       let value = decodeURIComponent(tempArr[1]);
       obj[key] = value;
     });
   };
   return obj;
};

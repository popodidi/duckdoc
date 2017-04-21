const fs = require('fs');
const path = require('path');
const fileType = require('file-type');
const endpoint = require('./_customer_photo_photo_name_GET.json');

let imgRaw = endpoint.tasks[0].res.body;
// console.log(imgRaw.toString('base64'));
// let buffer = Buffer(imgRaw);
// let arr = toArrayBuffer(buffer)

fs.writeFileSync(path.join(__dirname, './img.png'), imgRaw, 'binary');
// console.log(arr);
// console.log(fileType(arr));




function toArrayBuffer(buffer){
  var array = [];
  var json = buffer.toJSON();
  var list = json.data

  for(var key in list){
    array.push(fixcode(list[key].toString(16)))
  }

  function fixcode(key){
    if(key.length==1){
      return '0'+key.toUpperCase()
    }else{
      return key.toUpperCase()
    }
  }

  return array
}
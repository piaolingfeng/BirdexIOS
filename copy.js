/**
 * 把webpack编译生成的Web程序拷贝到 NativeIOS/BirdexWH/Source目录下. 
 * 
 * 只能在MAC电脑下运行此程序.
 * 
 * 拷贝的项目如下：
 *      app/index.html
 *      app/lib
 *      app/build
 * 
 * 拷贝完成后， 就可在MAC电脑上用XCode打开NativeIOS里面的工程， 编译出一个完整的IOS hybrid APP.
 * 
 */

var fs = require('fs');
var path = require('path');

//获得NativeIOS中存放JS程序的目录
var destPath = path.join(path.dirname(__filename), 'NativeIOS', 'BirdexWH', 'Source');
console.log('copy to ' + destPath);

//先删除原有内容
var exec = require('child_process').exec,child;
child = exec('rm -rf ' + destPath + '/*', function(err,out) { 
    console.log(out); err && console.log(err); 
});

//获得当前目录
var curPath = path.dirname(__filename);

//拷贝新内容
child = exec('cp -a ' + curPath + '/index.html' + ' ' + destPath, function(err,out) { 
    console.log(out); err && console.log(err); 
});
child = exec('cp -a ' + curPath + '/lib' + ' ' + destPath, function(err,out) { 
    console.log(out); err && console.log(err); 
});
child = exec('cp -a ' + curPath + '/build' + ' ' + destPath, function(err,out) { 
    console.log(out); err && console.log(err); 
});

console.log('OK');

console.log('/**----------------------------测试导出写法1------------------------------**/');
//导入以export var、export function的方式导出的变量
import {firstName1,lastName1,year1} from './es6-module/module-1.js'
console.log('导入module-1.js里面的firstName:', firstName1);
console.log('导入module-1.js里面的lastName:', lastName1);
console.log('导入module-1.js里面的year:', year1);

console.log('/**----------------------------测试导出写法2------------------------------**/');
//导入以export {firstName, lastName, year}方式导出的变量
import {firstName2,lastName2,year2} from './es6-module/module-2.js'
console.log('导入module-2.js里面的firstName2:', firstName2);
console.log('导入module-2.js里面的lastName2:', lastName2);
console.log('导入module-2.js里面的year2:', year2);

console.log('/**----------------------------测试导出多重写法------------------------------**/');
//不知道模块到底暴露了哪些export，可以直接以import * as 某个变量 全部导入,注意导入的里面包含了default变量
import  * as obj from  './es6-module/module-3.js'
console.log('导入module-3.js里面的所有接口到obj:', obj);

console.log('/**----------------------------测试默认导出------------------------------**/');
//不要括号默认是引入了模块里面的default导出
import selfDefineName from  './es6-module/module-4.js'
console.log('导入module-4.js里面的默认接口到selfDefineName:', selfDefineName);

console.log('/**----------------------------测试全部导入------------------------------**/');
//不知道模块到底暴露了哪些export，可以直接以import * as 某个变量 全部导入,注意导入的里面包含了default变量
import  * as globalObj from  './es6-module/module-5.js'
console.log('导入module-5.js里面的所有接口包括默认接口到globalObj:', globalObj);
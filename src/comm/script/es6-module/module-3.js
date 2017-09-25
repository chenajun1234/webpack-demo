//正确
export function multiply(x, y) {
    return x * y;
}

// 正确
function f() {
}
export {f};


function v1() {
}
function v2() {
}
//正确
export {v1 as streamV1,v2 as streamV2,v2 as streamLatestVersion};

// 写法一
export var m = 1;

// 写法二
var n = 1;
export {n};

// 写法三
var o = 1;
export {o,o as p};

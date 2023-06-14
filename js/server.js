// 1. 导入模块
const fs = require('fs');
const path = require('path');
const express = require('express');
const data = require('../data/search/data')

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
// search 服务
app.all('/search-server', (request, response) => {
    // console.log(data);
    // 设置响应头  设置语序跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // response.setHeader('Content-Type', 'application/json');

    // 读取data文件
    // fs.readFile(path.join(__dirname, '../data/search/data.js'), 'utf-8', function (err, data) {
    //     // 读取文件失败
    //     if (err) return console.log('读取文件失败！' + err.message);
    //     // 读取文件成功
    //     response.send(JSON.stringify(data));
    // })
    response.send(JSON.stringify(data));


})

// 4. 监听端口启动服务
app.listen(8000, () => {
    console.log("莫小楠服务已经启动，8000 端口监听中....");
})
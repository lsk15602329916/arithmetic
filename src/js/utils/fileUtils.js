// 文件处理函数
const fs = require('fs')
const Path = require('path')
const { creatExpression, formatFraction } = require('./getExpressionUtils')
const { evalRPN } = require('./eval')
const readLine = require("readline");





/**
 * 将随机生成运算式子写入Exercises.txt中
 * @param {*} path 
 * @param {*} Number 
 * @param {*} MAX_NUM 
 */
const writeFileExercises = (path1, path2, Number, MAX_NUM) => {
    console.log('Please wait for generation...')
    let num = 1
        // console.log(__dirname)
    fs.open(path1, 'w+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        // console.log("文件打开成功！");
    });
    fs.open(path2, 'w+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        // console.log("文件打开成功！");
    });
    while (num <= Number) {
        let data = creatExpression(MAX_NUM)
        let res = evalRPN(data)
        if (typeof res !== 'boolean') {
            fs.appendFileSync(path1, `${num}. ` + data + '\n', 'utf8')
            fs.appendFileSync(path2, `${num}. ` + res + '\n', 'utf8')
            num++
        }

    }
    console.log('OK!')
}

/**
 * 将结果写入Grade.txt
 * @param {*} path 
 * @param {*} correct 
 * @param {*} wrong 
 */
const writeResult = (path, correct, wrong) => {
    console.log('Please wait for generation...')
    fs.open(path, 'w+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
    });
    const correctlen = correct.length,
        wronglen = wrong.length
    let data = 'Correct: ' + `${correctlen}` + ' (' + `${correct.join(', ')}` + ')'
    fs.appendFileSync(path, data + '\n', 'utf8')
    data = 'Wrong: ' + `${wronglen}` + ' (' + `${wrong.join(', ')}` + ')'
    fs.appendFileSync(path, data + '\n', 'utf8')
    console.log('OK!')

}

/**
 * 整理数据格式
 * @param {*} content 
 * @returns 
 */
const formatContent = (content) => {
    return content.split(/[.]/).slice(1).join('')
}

/**
 * 按行读取文件内容
 *
 * @param fReadName 文件名路径
 * @return 字符串数组
 */
const readFileToArr = (fReadName) => {
    return new Promise((resolve) => {
        const arr = [];
        const readObj = readLine.createInterface({

            input: fs.createReadStream(fReadName)
        });

        readObj.on('line', function(line) {

            arr.push(formatContent(line));
        });
        readObj.on('close', function() {
            resolve(arr)
        });
    })
}

/**
 * 检查文件是否存在
 * @param {*} file 
 * @param {*} oldval 
 * @returns 
 */
const checkFile = (file, oldval) => {
    fs.open(file, function(err, fd) {
        if (err) {
            throw 'this file is inexistence!'
        }
    })
    return file
}

module.exports = {
    // checkFile: checkFile,
    writeFileExercises,
    readFileToArr,
    writeResult,
    checkFile
}
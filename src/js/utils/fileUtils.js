// 文件处理函数
const fs = require('fs')
const Path = require('path')
const { creatExpression, formatFraction } = require('./getExpressionUtils')
const { evalRPN } = require('./eval')

// const checkFile = (path) => {
//     let flag
//     fs.accessSync(path, (err) => {
//         // let flag = err
//         // console.log(err)
//         return err
//     });
// }



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

// console.log('0' == typeof false)


module.exports = {
    // checkFile: checkFile,
    writeFileExercises
}
// 主函数
const fs = require('fs')
const { writeFileExercises } = require('./js/utils/fileUtils')


function myParseInt(value, dummyPrevious) {
    // parseInt takes a string and an optional radix
    return parseInt(value);
}

const objectValid = (obj) => {
    let flag = true
    Object.keys(obj).forEach(function(key) {
        if (!obj[key] || isNaN(obj[key])) {
            flag = false
        }
    })
    return flag
}

const program = require('commander');
program
    .version('1.0.0')
    .requiredOption('-n, --number [num]', 'add a number', myParseInt)
    .option('-r, --range [range]', 'add a numeric range ', myParseInt, 10)
    .action((args) => {
        if (objectValid(args)) {
            writeFileExercises('./output/Exercises.txt', './output/answer.txt', args.number, args.range)
        }
        // writeFileExercises('./output/Exercises.txt', './output/answer.txt', 10000, 10)
    })
    .parse(process.argv);

// console.log(number)

// let MAX_NUM, expressionNum

// writeFileExercises('./output/Exercises.txt', './output/answer.txt', 10000, 10)





// inquirer.prompt(questionsByNum)
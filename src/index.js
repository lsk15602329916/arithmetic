// 主函数
const fs = require('fs')
const { writeFileExercises, readFileToArr, writeResult, checkFile } = require('./js/utils/fileUtils')
const { checkAnswer } = require('./js/utils/eval')

function myParseInt(value, dummyPrevious) {
    let reg = /^[0-9]*$/
        // parseInt takes a string and an optional radix
    if (reg.test(value)) return parseInt(value);
    throw 'has illegal Number!'
}

const objectValid = (obj) => {

    for (let i in obj) {
        if (typeof obj[i] === 'number' && (!obj[i] || isNaN(obj[i]))) {
            throw 'has illegal Number!'
        }
    }
    return true
}



const program = require('commander');
program
    .version('1.0.0')
    .description('a test cli program')
    .option('-n, --number [num]', 'add a number', myParseInt, 10)
    .option('-r, --range [range]', 'add a numeric range ', myParseInt, 10)
    .option('-e, --exer <exercisefile>', 'add a exercisefile ', checkFile)
    .option('-a, --ans <answerfile>', 'add a answerfile ', checkFile)
    .action((args) => {
        // console.log(args);
        if (args.exer && args.ans) {
            Promise.all([readFileToArr(args.exer), readFileToArr(args.ans)]).then((values) => {
                const exercisesStack = values[0]
                const answerStack = values[1]
                const correct = []
                const wrong = []
                for (let i in exercisesStack) {
                    if (checkAnswer(exercisesStack[i], answerStack[i])) {
                        correct.push(parseInt(i) + 1)
                        continue
                    }
                    wrong.push(parseInt(i) + 1)
                }
                writeResult('./output/Grade.txt', correct, wrong)
            });
            return
        }
        if (objectValid(args)) {
            writeFileExercises('./output/Exercises.txt', ' ', args.number, args.range)
        }
    })
    .parse(process.argv);
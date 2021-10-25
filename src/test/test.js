const { writeFileExercises, readFileToArr, writeResult, checkFile } = require('../js/utils/fileUtils')
const { checkAnswer } = require('../js/utils/eval')



writeFileExercises('./testOutput/Exercises1.txt', './testOutput/answer1.txt', 10, 10)

writeFileExercises('./testOutput/Exercises2.txt', './testOutput/answer2.txt', 100, 10)

try {
    writeFileExercises('./testOutput/Exercises3.txt', './testOutput/answer3.txt', as, 10)
} catch (error) {
    console.log(error);
}

try {
    writeFileExercises('./testOutput/Exercises3.txt', './testOutput/answer3.txt', 100, asai)
} catch (error) {
    console.log(error);
}

writeFileExercises('./testOutput/Exercises4.txt', './testOutput/answer4.txt', 10000, 10)

Promise.all([readFileToArr('./testOutput/Exercises1.txt'), readFileToArr('./testOutput/answer1.txt')]).then((values) => {
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
    writeResult('./testOutput/Grade1.txt', correct, wrong)
});


Promise.all([readFileToArr('./testOutput/Exercises1.txt'), readFileToArr('./testOutput/answerWrong.txt')]).then((values) => {
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
    writeResult('./testOutput/Grade2.txt', correct, wrong)
});

try {
    Promise.all([readFileToArr('./testOutcises1.txt'), readFileToArr('./testOutput/answWrong.txt')]).then((values) => {
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
        writeResult('./testOutput/Grade3.txt', correct, wrong)
    });
} catch (error) {
    console.log(error);
}
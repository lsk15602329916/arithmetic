const { getMaxFactor, formatFraction } = require('./eval')


// 获取表达式所需函数文件

// 运算符集合
const operators = ['+', '-', '*', '÷']

/**
 * 获取整数
 * @param MAX_NUM 随机数的最大值
 * @returns {Number} 返回随机数
 */
const getInteger = (MAX_NUM) => {
    return Math.round(Math.random() * MAX_NUM + 1) + ''
}



/**
 * 获取分数
 * @param MAX_NUM 随机数的最大值
 * @returns {String} 返回随机分数
 */
const getFraction = (MAX_NUM) => {
    let numerator = getInteger(MAX_NUM) // 分子
    let denominator = getInteger(MAX_NUM) // 分母

    // 分数化简
    const maxFac = getMaxFactor(numerator, denominator)
    numerator /= maxFac
    denominator /= maxFac

    return formatFraction(numerator, denominator)
}


/**
 * 随机生成运算式
 * @param MAX_NUM 随机数的最大值
 * @returns {String} 返回运算式
 */
const creatExpression = (MAX_NUM) => {
    const express = new Array() // 运算式集合
    let operands = Math.floor(Math.random() * 3 + 1) // 运算符个数
    let isInteger = Math.floor(Math.random() * 4) <= 3 // 单项是整数还是分数
    let isBracket = Math.round(Math.random()) // 是否要有括号
    let bracketNum = 0 //  括号个数
    const BracketMap = new Map() //  括号哈希表

    // 如果项数多于2则可以添加括号
    if (isBracket && operands > 1) {
        express.push('(')
        BracketMap.set('(', 1)
        BracketMap.set(')', 0)
    }
    let item = isInteger ? getInteger(MAX_NUM) : getFraction(MAX_NUM)
    express.push(item)
    while (operands) {
        operands--
        isInteger = Math.round(Math.random())
        isBracket = Math.round(Math.random())
        let hadBracket = false

        // 随机生成符号
        const operator = operators[Math.floor(Math.random() * 4)]
        express.push(' ' + operator + ' ')
        if (isBracket && !BracketMap.get('(') && operands > 0) {
            express.push('(')
            BracketMap.set('(', 1)
            BracketMap.set(')', 0)
            hadBracket = true
        }
        item = isInteger ? getInteger(MAX_NUM) : getFraction(MAX_NUM)
        express.push(item)
        if (isBracket && BracketMap.get('(') && !hadBracket && operands > 0) {
            express.push(')')
            BracketMap.set(')', 1)
            BracketMap.set('(', 0)
            bracketNum++
        }
    }

    //  对括号对进行处理
    if (BracketMap.get('(') && !BracketMap.get(')')) {
        if (express[0] === '(' && !bracketNum) {
            express.shift()
        } else {
            express.push(')')
        }
    }
    express.push(' = ')
    return express.join('')
}


module.exports = {
    getFraction,
    creatExpression
}
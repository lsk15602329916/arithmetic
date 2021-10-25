// const { formatFraction } = require('./getExpressionUtils')

// 计算函数

// 运算符集合
const symbol = ['#', '(', '+', '-', '*', '÷', ')']
const symbolPriority = {
    '#': 0,
    '(': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '÷': 3,
    ')': 4
}

/**
 * 将分数字符串中多余的空格和等于号去掉
 * @param {*} expression 
 * @returns 
 */
const formatExpression = (expression) => {
    return expression.split(/[=\s]/).join("");
}

/**
 * 
 * @param {*} char 符号字符
 * @param {*} symArr 存储符号表达式
 * @param {*} resArr 记录后缀表达式元素
 * @returns 
 */
const operaSymbol = (char, symArr, resArr) => {
    let lastChar = symArr[symArr.length - 1]
    let curChar
    if (!lastChar) {
        symArr.push(char)
        return
    }
    // 如果遇到左括号则直接入栈
    if (char === '(') {
        symArr.push(char)
    }
    // 如果遇到右括号,则弹出栈内只到出现左括号为止
    else if (char === ')') {
        curChar = symArr.pop()
        while (symArr && curChar != '(') {
            resArr.push(curChar)
            curChar = symArr.pop()
        }
    }
    // 如果栈外操作符的优先级高于栈内的优先级则入栈
    else if (symbolPriority[char] > symbolPriority[lastChar]) {
        symArr.push(char)
    }
    // 如果栈外的操作符优先级低于或等于栈内的优先级，输出栈内的符号，并入栈外的符号
    else if (symbolPriority[char] <= symbolPriority[lastChar]) {
        while (lastChar && (symbolPriority[char] <= symbolPriority[lastChar])) {
            curChar = symArr.pop()
            resArr.push(curChar)
            lastChar = symArr[symArr.length - 1]
        }
        //      operaSymbol(char, symArr, resArr)
        symArr.push(char)
    } else {
        symArr.push(char)
    }
}

/**
 * 中缀表达式转化为后缀表达式（逆波兰表达式）
 * @param {*} str 中缀表达式字符串
 * @returns 
 */
const toSuffixExpre = (str) => {
    const resArr = new Array() // 记录后缀表达式
    const symArr = new Array() // 记录符号表达式
        // 用于记录数字
    let substr = ''
    for (let i = 0, len = str.length; i < len; i++) {
        // 判断是否是符号
        if (symbol.includes(str[i])) {
            if (substr.length) resArr.push(substr)
            substr = ''
            operaSymbol(str[i], symArr, resArr)
        } else {
            //  收集符号间的数字元素
            substr += str[i]
        }
    }

    if (substr !== '') resArr.push(substr)

    // 如果符号栈中还有元素，需要再推入存储后缀表达式的栈中
    while (symArr.length > 0) {
        const curChar = symArr.pop()
        resArr.push(curChar)
    }
    return resArr
}


/**
 * 逆波兰运算
 * @param {*} expression 运算式
 * @returns 
 */
const evalRPN = (expression) => {
    // 将运算式多余的空格删除
    let str = formatExpression(expression)

    //  将中缀运算式按后缀运算式推入栈中
    let tokens = toSuffixExpre(str)
    const stack = [];
    const n = tokens.length;
    for (let i = 0; i < n; i++) {
        const token = tokens[i];
        if (isNumber(token)) {
            if (isFraction(token)) stack.push(token);
            else stack.push(parseInt(token));
        } else {
            let num2 = stack.pop();
            let num1 = stack.pop();
            if (token === '+') {
                // 整数直接运算，分数则需要用另外的方法计算
                if (!isFraction(num1) && !isFraction(num2)) {
                    stack.push(num1 + num2);
                } else {
                    stack.push(evalFraction(num1, num2, '+'))
                }
            } else if (token === '-') {
                if (!compareNum(num1, num2)) return false
                if (!isFraction(num1) && !isFraction(num2)) {
                    stack.push(num1 - num2);
                } else {
                    stack.push(evalFraction(num1, num2, '-'))
                }
            } else if (token === '*') {
                if (!isFraction(num1) && !isFraction(num2)) {
                    stack.push(num1 * num2);
                } else {
                    stack.push(evalFraction(num1, num2, '*'))
                }
            } else if (token === '÷') {
                if (num2 === 0) return false
                stack.push(evalFraction(num1, num2, '÷'))
            }
        }
    }
    return stack.pop();
};

/**
 * 判断是否为运算符
 * @param {*} token 
 * @returns 
 */
const isNumber = (token) => {
    return !('+' === token || '-' === token || '*' === token || '÷' === token);
}

/**
 * 判断是否为分数
 * @param {*} token 
 * @returns 
 */
const isFraction = (token) => {
    return typeof token !== 'number' && (token.includes('/') || token.includes('`'))
}

/**
 * 判断是否为带分数
 * @param {*} fraction  分数
 */
const isMixNum = (fraction) => {
    return typeof fraction !== 'number' && fraction.includes('`')
}

/**
 * 将带分数化为假分数
 * @param {*} fraction 带分数
 * @returns 
 */
const turnImFraction = (fraction) => {
    const arr = fraction.split(/[\/`]/)
    let integer = parseInt(arr[0])
    let numerator = parseInt(arr[1])
    let denominator = parseInt(arr[2])
    return integer * denominator + numerator + '/' + denominator
}

/**
 * 分数式化简
 * @param {*} numerator  分子
 * @param {*} denominator   分母
 * @returns 
 */
const formatFraction = (numerator, denominator) => {
    // 如果分母为1,则直接返回分子
    if (denominator === 1) return numerator + ''

    // 获取整数部分
    let integerPart = Math.floor(numerator / denominator)
        // 判断是否为假分数，是则转化为带分数
    if (integerPart) {
        // 抽出带分数的整数部分
        numerator -= integerPart * denominator
        return integerPart + '`' + numerator + '/' + denominator
    }

    return numerator + '/' + denominator
}

/**
 * 分数式运算
 * @param {*} num1 
 * @param {*} num2 
 * @param {*} symbol 运算符
 */
const evalFraction = (num1, num2, symbol) => {
    if (isMixNum(num1)) num1 = turnImFraction(num1)
    if (isMixNum(num2)) num2 = turnImFraction(num2)
    const stackNum1 = resolveImFraction(num1)
    const stackNum2 = resolveImFraction(num2)
    let numerator = 0 // 分子
    let denominator = 0 // 分母
    let maxFac = 0 // 最大公约数
    let ans
    switch (symbol) {
        case '+':
            numerator = stackNum1[0] * stackNum2[1] + stackNum2[0] * stackNum1[1]
            denominator = stackNum1[1] * stackNum2[1]
            maxFac = getMaxFactor(numerator, denominator)
            ans = formatFraction(numerator / maxFac, denominator / maxFac)
            break;
        case '-':
            numerator = stackNum1[0] * stackNum2[1] - stackNum2[0] * stackNum1[1]
            denominator = stackNum1[1] * stackNum2[1]
            maxFac = getMaxFactor(numerator, denominator)
            ans = formatFraction(numerator / maxFac, denominator / maxFac)
            break;
        case '*':
            numerator = stackNum1[0] * stackNum2[0]
            denominator = stackNum1[1] * stackNum2[1]
            maxFac = getMaxFactor(numerator, denominator)
            ans = formatFraction(numerator / maxFac, denominator / maxFac)
            break;
        case '÷':
            numerator = stackNum1[0] * stackNum2[1]
            denominator = stackNum1[1] * stackNum2[0]
            maxFac = getMaxFactor(numerator, denominator)
            ans = formatFraction(numerator / maxFac, denominator / maxFac)
            break;
        default:
            throw new Error("this symbol is not an operator!")
            break;
    }
    return ans
}

/**
 * 分解数字
 * @param {*} num  
 * @returns 
 */
const resolveImFraction = (num) => {
    let stack = []

    // 分解假分数，若为整数则分母设为1
    if (isFraction(num)) {
        let strArr = num.split(/[\/]/)
        stack = strArr.map(val => {
            return +val
        })
    } else {
        stack[0] = parseInt(num)
        stack[1] = 1
    }
    return stack
}

/**
 * 比较两个数的大小
 * @param {*} num1 
 * @param {*} num2 
 */
const compareNum = (num1, num2) => {
    // 如果两个数都不是分数直接比较
    if (!isFraction(num1) && !isFraction(num2)) {
        return num1 >= num2
    }

    if (isMixNum(num1)) num1 = turnImFraction(num1)
    if (isMixNum(num2)) num2 = turnImFraction(num2)
    const stackNum1 = resolveImFraction(num1)
    const stackNum2 = resolveImFraction(num2)

    return (stackNum1[0] * stackNum2[1] >= stackNum1[1] * stackNum2[0])
}

/**
 * 获取最大公约数
 * @param {*} x 整数
 * @param {*} y 整数
 * @returns {Number} 返回最大公约数
 */
const getMaxFactor = (x, y) => {
    let temp = 0
    if (x < y)[x, y] = [y, x]
    while (y) {
        temp = x % y
        x = y
        y = temp
    }
    return x
}

/**
 * 获取最小公倍数
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
const getMinMultiple = (x, y) => {
    return x * y / getMaxFactor(x, y)
}

/**
 * 判断答案是否正确
 * @param {*} que 
 * @param {*} ans 
 * @returns 
 */
const checkAnswer = (que, ans) => {
    return evalRPN(que).toString() === ans.split(/[=\s]/).join("")
}




module.exports = {
    getMaxFactor,
    evalRPN,
    formatFraction,
    checkAnswer
}
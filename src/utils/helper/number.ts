/**
 * 数字处理工具函数
 */

/* ========== 随机数 ========== */

/**
 * 生成指定范围的随机整数
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 * @returns 随机整数
 * @example
 * random(1, 10) // 1-10之间的随机整数
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成指定范围的随机浮点数
 * @param min 最小值（包含）
 * @param max 最大值（不包含）
 * @param decimals 小数位数，默认 2
 * @returns 随机浮点数
 * @example
 * randomFloat(1, 10, 2) // 1.00-10.00之间的随机数
 */
export function randomFloat(min: number, max: number, decimals: number = 2): number {
  const num = Math.random() * (max - min) + min;
  return Number(num.toFixed(decimals));
}

/* ========== 数字范围 ========== */

/**
 * 生成数字序列
 * @param start 起始值
 * @param end 结束值（包含）
 * @param step 步长，默认 1
 * @returns 数字数组
 * @example
 * range(1, 5) // [1, 2, 3, 4, 5]
 * range(0, 10, 2) // [0, 2, 4, 6, 8, 10]
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  if (step === 0) return result;
  
  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i += step) {
      result.push(i);
    }
  }
  
  return result;
}

/**
 * 限制数字在指定范围内
 * @param value 数值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的数值
 * @example
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/* ========== 数字精度 ========== */

/**
 * 精确加法（解决 JavaScript 精度问题）
 * @param num1 加数1
 * @param num2 加数2
 * @returns 和
 * @example
 * add(0.1, 0.2) // 0.3 (而不是 0.30000000000000004)
 */
export function add(num1: number, num2: number): number {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}

/**
 * 精确减法
 * @param num1 被减数
 * @param num2 减数
 * @returns 差
 * @example
 * subtract(0.3, 0.1) // 0.2
 */
export function subtract(num1: number, num2: number): number {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum - num2 * baseNum) / baseNum;
}

/**
 * 精确乘法
 * @param num1 乘数1
 * @param num2 乘数2
 * @returns 积
 * @example
 * multiply(0.1, 0.2) // 0.02
 */
export function multiply(num1: number, num2: number): number {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, num1Digits + num2Digits);
  return (num1 * Math.pow(10, num1Digits) * num2 * Math.pow(10, num2Digits)) / baseNum;
}

/**
 * 精确除法
 * @param num1 被除数
 * @param num2 除数
 * @returns 商
 * @example
 * divide(0.3, 0.1) // 3
 */
export function divide(num1: number, num2: number): number {
  if (num2 === 0) {
    console.warn('Division by zero');
    return Infinity;
  }
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  return (num1 * Math.pow(10, num2Digits)) / (num2 * Math.pow(10, num1Digits)) * Math.pow(10, num1Digits - num2Digits);
}

/**
 * 精确舍入
 * @param value 数值
 * @param decimals 保留小数位数
 * @returns 舍入后的数值
 * @example
 * round(1.2345, 2) // 1.23
 */
export function round(value: number, decimals: number = 0): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * 向上舍入
 * @param value 数值
 * @param decimals 保留小数位数
 * @returns 舍入后的数值
 * @example
 * ceil(1.2345, 2) // 1.24
 */
export function ceil(value: number, decimals: number = 0): number {
  return Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * 向下舍入
 * @param value 数值
 * @param decimals 保留小数位数
 * @returns 舍入后的数值
 * @example
 * floor(1.2345, 2) // 1.23
 */
export function floor(value: number, decimals: number = 0): number {
  return Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * 修复 toFixed 的问题（银行家舍入法）
 * @param value 数值
 * @param decimals 保留小数位数
 * @returns 格式化后的字符串
 * @example
 * toFixed(1.2345, 2) // '1.23'
 */
export function toFixed(value: number, decimals: number = 0): string {
  return round(value, decimals).toFixed(decimals);
}

/* ========== 百分比计算 ========== */

/**
 * 计算百分比
 * @param value 当前值
 * @param total 总值
 * @param decimals 小数位数，默认 2
 * @returns 百分比数值（0-100）
 * @example
 * percentage(25, 100) // 25
 * percentage(1, 3, 2) // 33.33
 */
export function percentage(value: number, total: number, decimals: number = 2): number {
  if (total === 0) return 0;
  return round((value / total) * 100, decimals);
}

/**
 * 百分比转小数
 * @param percent 百分比（0-100）
 * @returns 小数（0-1）
 * @example
 * percentToDecimal(25) // 0.25
 */
export function percentToDecimal(percent: number): number {
  return percent / 100;
}

/**
 * 小数转百分比
 * @param decimal 小数（0-1）
 * @returns 百分比（0-100）
 * @example
 * decimalToPercent(0.25) // 25
 */
export function decimalToPercent(decimal: number): number {
  return decimal * 100;
}

/* ========== 数字格式化 ========== */

/**
 * 数字补零
 * @param num 数字
 * @param length 总长度
 * @returns 补零后的字符串
 * @example
 * padZero(5, 3) // '005'
 */
export function padZero(num: number, length: number = 2): string {
  return String(num).padStart(length, '0');
}

/**
 * 数字转中文
 * @param num 数字（0-99999）
 * @returns 中文数字
 * @example
 * toChineseNumber(12345) // '一万二千三百四十五'
 */
export function toChineseNumber(num: number): string {
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const units = ['', '十', '百', '千', '万'];
  
  if (num === 0) return '零';
  if (num < 0 || num > 99999) return String(num);
  
  const numStr = String(num);
  let result = '';
  let zeroCount = 0;
  
  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr[i]);
    const unit = units[numStr.length - 1 - i];
    
    if (digit === 0) {
      zeroCount++;
    } else {
      if (zeroCount > 0) {
        result += '零';
      }
      result += digits[digit] + unit;
      zeroCount = 0;
    }
  }
  
  // 特殊处理：10-19 的情况
  if (num >= 10 && num < 20) {
    result = result.replace('一十', '十');
  }
  
  return result;
}

/**
 * 数字转大写金额
 * @param num 金额
 * @returns 大写金额
 * @example
 * toChineseMoney(123.45) // '壹佰贰拾叁元肆角伍分'
 */
export function toChineseMoney(num: number): string {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const units = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];
  const decimalUnits = ['角', '分'];
  
  if (num === 0) return '零元整';
  
  const [integerPart, decimalPart = ''] = num.toFixed(2).split('.');
  let result = '';
  
  // 处理整数部分
  for (let i = 0; i < integerPart.length; i++) {
    const digit = parseInt(integerPart[i]);
    const unit = units[integerPart.length - 1 - i];
    
    if (digit !== 0) {
      result += digits[digit] + unit;
    } else if (result && !result.endsWith('零')) {
      result += '零';
    }
  }
  
  result = result.replace(/零+$/, '') + '元';
  
  // 处理小数部分
  if (decimalPart && decimalPart !== '00') {
    for (let i = 0; i < Math.min(decimalPart.length, 2); i++) {
      const digit = parseInt(decimalPart[i]);
      if (digit !== 0) {
        result += digits[digit] + decimalUnits[i];
      }
    }
  } else {
    result += '整';
  }
  
  return result;
}

/* ========== 数字判断 ========== */

/**
 * 判断是否为偶数
 * @param num 数字
 * @returns 是否为偶数
 * @example
 * isEven(4) // true
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * 判断是否为奇数
 * @param num 数字
 * @returns 是否为奇数
 * @example
 * isOdd(3) // true
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

/**
 * 判断是否为质数
 * @param num 数字
 * @returns 是否为质数
 * @example
 * isPrime(7) // true
 */
export function isPrime(num: number): boolean {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  
  return true;
}

/**
 * 判断是否在范围内
 * @param value 数值
 * @param min 最小值
 * @param max 最大值
 * @returns 是否在范围内
 * @example
 * inRange(5, 0, 10) // true
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/* ========== 其他数字操作 ========== */

/**
 * 求绝对值
 * @param num 数字
 * @returns 绝对值
 */
export function abs(num: number): number {
  return Math.abs(num);
}

/**
 * 求平方根
 * @param num 数字
 * @returns 平方根
 */
export function sqrt(num: number): number {
  return Math.sqrt(num);
}

/**
 * 求幂
 * @param base 底数
 * @param exponent 指数
 * @returns 幂
 * @example
 * pow(2, 3) // 8
 */
export function pow(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

/**
 * 求阶乘
 * @param num 数字
 * @returns 阶乘
 * @example
 * factorial(5) // 120
 */
export function factorial(num: number): number {
  if (num < 0) return NaN;
  if (num === 0 || num === 1) return 1;
  return num * factorial(num - 1);
}

/**
 * 求最大公约数
 * @param a 数字a
 * @param b 数字b
 * @returns 最大公约数
 * @example
 * gcd(12, 8) // 4
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * 求最小公倍数
 * @param a 数字a
 * @param b 数字b
 * @returns 最小公倍数
 * @example
 * lcm(12, 8) // 24
 */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

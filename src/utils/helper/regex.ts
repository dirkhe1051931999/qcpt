/**
 * 正则验证工具函数
 */

/* ========== 辅助函数 ========== */

/**
 * 将正则验证函数转换为 Quasar 表单验证规则
 * @param validatorFn 验证函数，返回 boolean
 * @param errorMessage 错误提示信息（可以是字符串或返回字符串的函数）
 * @returns Quasar 表单验证函数
 * @example
 * const phoneRule = createFormRule(isPhone, (t) => t('messages.formRules.phoneInvalid'));
 * // 在表单中使用: :rules="[phoneRule]"
 */
export function createFormRule(
  validatorFn: (value: string) => boolean,
  errorMessage: string | ((t?: any) => string)
): (val?: any) => true | string {
  return (val?: any) => {
    const strVal = String(val || '').trim();
    if (!strVal) return true; // 空值校验留给 required 规则处理
    const isValid = validatorFn(strVal);
    if (isValid) return true;
    return typeof errorMessage === 'function' ? errorMessage() : errorMessage;
  };
}

/* ========== 正则验证函数 ========== */

/**
 * 验证手机号（中国大陆）
 * 支持 13x, 14x, 15x, 16x, 17x, 18x, 19x 开头的 11 位手机号
 * @param phone 手机号字符串
 * @returns 是否为有效手机号
 * @example
 * isPhone('13812345678') // true
 * isPhone('12345678901') // false
 */
export function isPhone(phone: string): boolean {
  if (!phone) return false;
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
}

/**
 * 验证邮箱地址
 * @param email 邮箱字符串
 * @returns 是否为有效邮箱
 * @example
 * isEmail('test@example.com') // true
 * isEmail('test@example') // false
 */
export function isEmail(email: string): boolean {
  if (!email) return false;
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(email);
}

/**
 * 验证身份证号（15位或18位）
 * @param idCard 身份证号字符串
 * @returns 是否为有效身份证号
 * @example
 * isIdCard('320123199001011234') // true
 * isIdCard('320123900101123') // true (15位)
 * isIdCard('123456') // false
 */
export function isIdCard(idCard: string): boolean {
  if (!idCard) return false;
  // 15位或18位，18位最后一位可以是X
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(idCard);
}

/**
 * 验证银行卡号（16-19位）
 * @param card 银行卡号字符串
 * @returns 是否为有效银行卡号
 * @example
 * isBankCard('6222021234567890123') // true
 * isBankCard('123456') // false
 */
export function isBankCard(card: string): boolean {
  if (!card) return false;
  const reg = /^\d{16,19}$/;
  return reg.test(card);
}

/**
 * 验证车牌号（新能源+普通）
 * @param carNumber 车牌号字符串
 * @returns 是否为有效车牌号
 * @example
 * isCarNumber('京A12345') // true
 * isCarNumber('京AD12345') // true (新能源)
 * isCarNumber('ABC123') // false
 */
export function isCarNumber(carNumber: string): boolean {
  if (!carNumber) return false;
  // 普通车牌：省份简称 + 字母 + 5位数字/字母
  // 新能源车牌：省份简称 + 字母 + 6位数字/字母
  const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
  return reg.test(carNumber);
}

/**
 * 验证 URL 地址
 * @param url URL字符串
 * @returns 是否为有效URL
 * @example
 * isUrl('https://www.example.com') // true
 * isUrl('http://example.com/path') // true
 * isUrl('www.example.com') // false
 */
export function isUrl(url: string): boolean {
  if (!url) return false;
  const reg = /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]+)?(\/.*)?$/;
  return reg.test(url);
}

/**
 * 验证 IP 地址（IPv4）
 * @param ip IP地址字符串
 * @returns 是否为有效IP地址
 * @example
 * isIP('192.168.1.1') // true
 * isIP('256.1.1.1') // false
 */
export function isIP(ip: string): boolean {
  if (!ip) return false;
  const reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  return reg.test(ip);
}

/**
 * 验证是否为纯中文
 * @param str 字符串
 * @returns 是否为纯中文
 * @example
 * isChinese('中文测试') // true
 * isChinese('中文test') // false
 */
export function isChinese(str: string): boolean {
  if (!str) return false;
  const reg = /^[\u4e00-\u9fa5]+$/;
  return reg.test(str);
}

/**
 * 验证是否包含中文
 * @param str 字符串
 * @returns 是否包含中文
 * @example
 * hasChinese('中文test') // true
 * hasChinese('test123') // false
 */
export function hasChinese(str: string): boolean {
  if (!str) return false;
  const reg = /[\u4e00-\u9fa5]/;
  return reg.test(str);
}

/**
 * 验证是否为纯数字
 * @param str 字符串
 * @returns 是否为纯数字
 * @example
 * isNumber('123456') // true
 * isNumber('123.456') // false
 */
export function isNumber(str: string): boolean {
  if (!str) return false;
  const reg = /^\d+$/;
  return reg.test(str);
}

/**
 * 验证是否为数字（包含小数）
 * @param str 字符串
 * @returns 是否为数字
 * @example
 * isNumeric('123.456') // true
 * isNumeric('123') // true
 * isNumeric('abc') // false
 */
export function isNumeric(str: string): boolean {
  if (!str) return false;
  const reg = /^-?\d+\.?\d*$/;
  return reg.test(str);
}

/**
 * 验证是否为正整数
 * @param str 字符串
 * @returns 是否为正整数
 * @example
 * isPositiveInteger('123') // true
 * isPositiveInteger('0') // false
 * isPositiveInteger('-123') // false
 */
export function isPositiveInteger(str: string): boolean {
  if (!str) return false;
  const reg = /^[1-9]\d*$/;
  return reg.test(str);
}

/**
 * 验证是否为非负整数（正整数 + 0）
 * @param str 字符串
 * @returns 是否为非负整数
 * @example
 * isNonNegativeInteger('123') // true
 * isNonNegativeInteger('0') // true
 * isNonNegativeInteger('-123') // false
 */
export function isNonNegativeInteger(str: string): boolean {
  if (!str && str !== '0') return false;
  const reg = /^(0|[1-9]\d*)$/;
  return reg.test(str);
}

/**
 * 验证是否为 QQ 号（5-11位数字）
 * @param qq QQ号字符串
 * @returns 是否为有效QQ号
 * @example
 * isQQ('123456789') // true
 * isQQ('123') // false
 */
export function isQQ(qq: string): boolean {
  if (!qq) return false;
  const reg = /^[1-9]\d{4,10}$/;
  return reg.test(qq);
}

/**
 * 验证是否为微信号（6-20位，字母开头，可包含字母数字下划线减号）
 * @param wechat 微信号字符串
 * @returns 是否为有效微信号
 * @example
 * isWechat('test_123') // true
 * isWechat('123test') // false (不能数字开头)
 */
export function isWechat(wechat: string): boolean {
  if (!wechat) return false;
  const reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
  return reg.test(wechat);
}

/**
 * 验证是否为邮政编码（中国）
 * @param postcode 邮政编码字符串
 * @returns 是否为有效邮政编码
 * @example
 * isPostcode('100000') // true
 * isPostcode('12345') // false
 */
export function isPostcode(postcode: string): boolean {
  if (!postcode) return false;
  const reg = /^[1-9]\d{5}$/;
  return reg.test(postcode);
}

/**
 * 验证强密码（至少8位，包含大小写字母、数字、特殊字符）
 * @param password 密码字符串
 * @returns 是否为强密码
 * @example
 * isStrongPassword('Abc123!@#') // true
 * isStrongPassword('abc123') // false
 */
export function isStrongPassword(password: string): boolean {
  if (!password) return false;
  // 至少8位，包含大写字母、小写字母、数字、特殊字符
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return reg.test(password);
}

/**
 * 验证中等强度密码（至少6位，包含字母和数字）
 * @param password 密码字符串
 * @returns 是否为中等强度密码
 * @example
 * isMediumPassword('abc123') // true
 * isMediumPassword('123456') // false
 */
export function isMediumPassword(password: string): boolean {
  if (!password) return false;
  // 至少6位，包含字母和数字
  const reg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
  return reg.test(password);
}

/**
 * 验证 MAC 地址
 * @param mac MAC地址字符串
 * @returns 是否为有效MAC地址
 * @example
 * isMac('00:11:22:33:44:55') // true
 * isMac('00-11-22-33-44-55') // true
 * isMac('001122334455') // false
 */
export function isMac(mac: string): boolean {
  if (!mac) return false;
  const reg = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return reg.test(mac);
}

/**
 * 验证端口号（1-65535）
 * @param port 端口号字符串
 * @returns 是否为有效端口号
 * @example
 * isPort('8080') // true
 * isPort('65536') // false
 */
export function isPort(port: string): boolean {
  if (!port) return false;
  const portNum = Number(port);
  return /^\d+$/.test(port) && portNum >= 1 && portNum <= 65535;
}

/**
 * 验证 IPv6 地址
 * @param ip IPv6地址字符串
 * @returns 是否为有效IPv6地址
 * @example
 * isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334') // true
 * isIPv6('192.168.1.1') // false
 */
export function isIPv6(ip: string): boolean {
  if (!ip) return false;
  const reg = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^::$|^([\da-fA-F]{1,4}:){1,6}:$|^:((:[\da-fA-F]{1,4}){1,6})$/;
  return reg.test(ip);
}

/**
 * 验证十六进制颜色值
 * @param color 颜色值字符串
 * @returns 是否为有效十六进制颜色值
 * @example
 * isHexColor('#fff') // true
 * isHexColor('#ffffff') // true
 * isHexColor('fff') // false
 */
export function isHexColor(color: string): boolean {
  if (!color) return false;
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  return reg.test(color);
}

/* ========== 快捷表单规则创建方法 ========== */

/**
 * 创建手机号表单验证规则
 * @param errorMessage 错误提示信息
 * @returns Quasar 表单验证函数
 * @example
 * // 在组件中使用
 * :rules="[jqTool.regex.phoneRule((t) => t('messages.formRules.phoneInvalid'))]"
 */
export function phoneRule(errorMessage: string | ((t?: any) => string) = '请输入有效的手机号') {
  return createFormRule(isPhone, errorMessage);
}

/**
 * 创建邮箱表单验证规则
 * @param errorMessage 错误提示信息
 * @returns Quasar 表单验证函数
 */
export function emailRule(errorMessage: string | ((t?: any) => string) = '请输入有效的邮箱地址') {
  return createFormRule(isEmail, errorMessage);
}

/**
 * 创建身份证号表单验证规则
 * @param errorMessage 错误提示信息
 * @returns Quasar 表单验证函数
 */
export function idCardRule(errorMessage: string | ((t?: any) => string) = '请输入有效的身份证号') {
  return createFormRule(isIdCard, errorMessage);
}

/**
 * 创建银行卡号表单验证规则
 * @param errorMessage 错误提示信息
 * @returns Quasar 表单验证函数
 */
export function bankCardRule(errorMessage: string | ((t?: any) => string) = '请输入有效的银行卡号') {
  return createFormRule(isBankCard, errorMessage);
}

/**
 * 创建车牌号表单验证规则
 * @param errorMessage 错误提示信息
 * @returns Quasar 表单验证函数
 */
export function carNumberRule(errorMessage: string | ((t?: any) => string) = '请输入有效的车牌号') {
  return createFormRule(isCarNumber, errorMessage);
}

/**
 * 创建 URL 表单验证规则
 * @param errorMessage 错误提示信息
 * @returns Quasar 表单验证函数
 */
export function urlRule(errorMessage: string | ((t?: any) => string) = '请输入有效的 URL 地址') {
  return createFormRule(isUrl, errorMessage);
}

/**
 * 创建 IP 地址表单验证规则
 * @param errorMessage 错误提示信息
 * @returns Quasar 表单验证函数
 */
export function ipRule(errorMessage: string | ((t?: any) => string) = '请输入有效的 IP 地址') {
  return createFormRule(isIP, errorMessage);
}

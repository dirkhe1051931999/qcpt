/**
 * 字符串处理工具函数
 */

/* ========== 脱敏处理 ========== */

/**
 * 手机号脱敏
 * @param phone 手机号
 * @returns 脱敏后的手机号，格式：138****5678
 * @example
 * phoneDesensitize('13812345678') // '138****5678'
 */
export function phoneDesensitize(phone: string): string {
  if (!phone || phone.length !== 11) return phone;
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 身份证号脱敏
 * @param idCard 身份证号
 * @returns 脱敏后的身份证号，格式：320***********1234
 * @example
 * idCardDesensitize('320123199001011234') // '320***********1234'
 */
export function idCardDesensitize(idCard: string): string {
  if (!idCard || idCard.length < 8) return idCard;
  const len = idCard.length;
  return idCard.substring(0, 3) + '*'.repeat(len - 7) + idCard.substring(len - 4);
}

/**
 * 姓名脱敏
 * @param name 姓名
 * @returns 脱敏后的姓名，格式：张** 或 欧阳**
 * @example
 * nameDesensitize('张三') // '张*'
 * nameDesensitize('欧阳锋') // '欧阳*'
 * nameDesensitize('司马懿') // '司马*'
 */
export function nameDesensitize(name: string): string {
  if (!name || name.length === 0) return name;
  if (name.length === 1) return name;
  if (name.length === 2) return name[0] + '*';
  // 3个字符及以上：保留前面部分，最后一个字符用*代替
  return name.substring(0, name.length - 1) + '*';
}

/**
 * 银行卡号脱敏
 * @param card 银行卡号
 * @returns 脱敏后的银行卡号，格式：6222 **** **** 1234
 * @example
 * bankCardDesensitize('6222021234567890123') // '6222 **** **** 0123'
 */
export function bankCardDesensitize(card: string): string {
  if (!card || card.length < 8) return card;
  const len = card.length;
  const start = card.substring(0, 4);
  const end = card.substring(len - 4);
  return `${start} **** **** ${end}`;
}

/**
 * 邮箱脱敏
 * @param email 邮箱地址
 * @returns 脱敏后的邮箱，格式：t***@example.com
 * @example
 * emailDesensitize('test@example.com') // 't***@example.com'
 */
export function emailDesensitize(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [username, domain] = email.split('@');
  if (username.length <= 1) return email;
  return username[0] + '***@' + domain;
}

/**
 * 地址脱敏
 * @param address 地址
 * @param keepLength 保留前面多少个字符，默认 6
 * @returns 脱敏后的地址
 * @example
 * addressDesensitize('北京市朝阳区xxx街道xxx号') // '北京市朝阳区***'
 */
export function addressDesensitize(address: string, keepLength: number = 6): string {
  if (!address || address.length <= keepLength) return address;
  return address.substring(0, keepLength) + '***';
}

/* ========== 格式化处理 ========== */

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 * @example
 * capitalize('hello') // 'Hello'
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 每个单词首字母大写
 * @param str 字符串
 * @returns 每个单词首字母大写的字符串
 * @example
 * capitalizeWords('hello world') // 'Hello World'
 */
export function capitalizeWords(str: string): string {
  if (!str) return str;
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * 下划线转驼峰
 * @param str 下划线字符串
 * @returns 驼峰格式字符串
 * @example
 * toCamelCase('user_name') // 'userName'
 * toCamelCase('user_name_list') // 'userNameList'
 */
export function toCamelCase(str: string): string {
  if (!str) return str;
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 驼峰转下划线
 * @param str 驼峰字符串
 * @returns 下划线格式字符串
 * @example
 * toUnderlineCase('userName') // 'user_name'
 * toUnderlineCase('userNameList') // 'user_name_list'
 */
export function toUnderlineCase(str: string): string {
  if (!str) return str;
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 驼峰转中划线
 * @param str 驼峰字符串
 * @returns 中划线格式字符串
 * @example
 * toKebabCase('userName') // 'user-name'
 */
export function toKebabCase(str: string): string {
  if (!str) return str;
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 千分位格式化数字
 * @param num 数字或数字字符串
 * @returns 千分位格式的字符串
 * @example
 * formatNumber(1234567) // '1,234,567'
 * formatNumber(1234567.89) // '1,234,567.89'
 */
export function formatNumber(num: number | string): string {
  if (num === null || num === undefined || num === '') return '';
  const numStr = String(num);
  const parts = numStr.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * 金额格式化
 * @param amount 金额
 * @param options 配置选项
 * @returns 格式化后的金额字符串
 * @example
 * formatMoney(1234.56) // '¥1,234.56'
 * formatMoney(1234.56, { currency: '$', decimals: 2 }) // '$1,234.56'
 * formatMoney(1234, { decimals: 0 }) // '¥1,234'
 */
export function formatMoney(
  amount: number | string,
  options?: {
    currency?: string;
    decimals?: number;
    thousandsSeparator?: string;
    decimalSeparator?: string;
  }
): string {
  const {
    currency = '¥',
    decimals = 2,
    thousandsSeparator = ',',
    decimalSeparator = '.',
  } = options || {};

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return amount.toString();

  // 保留指定小数位
  const fixed = num.toFixed(decimals);
  const [integer, decimal] = fixed.split('.');

  // 添加千分位分隔符
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  // 组合结果
  let result = formattedInteger;
  if (decimals > 0 && decimal) {
    result += decimalSeparator + decimal;
  }

  return currency + result;
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 保留小数位数，默认 2
 * @returns 格式化后的文件大小字符串
 * @example
 * formatFileSize(1024) // '1.00 KB'
 * formatFileSize(1234567) // '1.18 MB'
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B';
  if (!bytes) return '';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * 格式化银行卡号（添加空格）
 * @param card 银行卡号
 * @returns 格式化后的银行卡号，每 4 位一个空格
 * @example
 * formatBankCard('6222021234567890') // '6222 0212 3456 7890'
 */
export function formatBankCard(card: string): string {
  if (!card) return card;
  return card.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
}

/**
 * 格式化手机号（添加空格）
 * @param phone 手机号
 * @returns 格式化后的手机号，格式：138 1234 5678
 * @example
 * formatPhone('13812345678') // '138 1234 5678'
 */
export function formatPhone(phone: string): string {
  if (!phone) return phone;
  return phone.replace(/\s/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
}

/* ========== 字符串操作 ========== */

/**
 * 生成随机字符串
 * @param length 字符串长度
 * @param type 字符类型：'alpha' | 'number' | 'alphanumeric'
 * @returns 随机字符串
 * @example
 * randomString(8) // 'aB3dE9fG'
 * randomString(6, 'alpha') // 'aBcDeF'
 * randomString(6, 'number') // '123456'
 */
export function randomString(length: number = 8, type: 'alpha' | 'number' | 'alphanumeric' = 'alphanumeric'): string {
  const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const alphanumericChars = alphaChars + numberChars;

  let chars = alphanumericChars;
  if (type === 'alpha') chars = alphaChars;
  if (type === 'number') chars = numberChars;

  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 生成唯一 ID（基于时间戳和随机数）
 * @param prefix 前缀
 * @returns 唯一 ID
 * @example
 * generateUUID() // '1704067200000_a3b2c1'
 * generateUUID('user') // 'user_1704067200000_a3b2c1'
 */
export function generateUUID(prefix?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

/**
 * 截断字符串
 * @param str 字符串
 * @param maxLength 最大长度
 * @param suffix 后缀，默认 '...'
 * @returns 截断后的字符串
 * @example
 * truncate('这是一个很长的字符串', 5) // '这是一个很...'
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength) + suffix;
}

/**
 * 移除字符串中的 HTML 标签
 * @param html HTML 字符串
 * @returns 纯文本字符串
 * @example
 * removeHtmlTags('<p>Hello <strong>World</strong></p>') // 'Hello World'
 */
export function removeHtmlTags(html: string): string {
  if (!html) return html;
  return html.replace(/<[^>]*>/g, '');
}

/**
 * 转义 HTML 特殊字符
 * @param html HTML 字符串
 * @returns 转义后的字符串
 * @example
 * escapeHtml('<div>Hello & "World"</div>') // '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
 */
export function escapeHtml(html: string): string {
  if (!html) return html;
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return html.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * 反转义 HTML 特殊字符
 * @param html 转义后的 HTML 字符串
 * @returns 原始字符串
 * @example
 * unescapeHtml('&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;') // '<div>Hello & "World"</div>'
 */
export function unescapeHtml(html: string): string {
  if (!html) return html;
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  };
  return html.replace(/&(amp|lt|gt|quot|#x27|#x2F);/g, (match) => map[match]);
}

/**
 * 判断字符串是否为空（null、undefined、空字符串、仅空格）
 * @param str 字符串
 * @returns 是否为空
 * @example
 * isEmpty('') // true
 * isEmpty('  ') // true
 * isEmpty('hello') // false
 */
export function isEmpty(str: string | null | undefined): boolean {
  return str === null || str === undefined || str.trim() === '';
}

/**
 * 反转字符串
 * @param str 字符串
 * @returns 反转后的字符串
 * @example
 * reverse('hello') // 'olleh'
 */
export function reverse(str: string): string {
  if (!str) return str;
  return str.split('').reverse().join('');
}

/**
 * 重复字符串
 * @param str 字符串
 * @param count 重复次数
 * @returns 重复后的字符串
 * @example
 * repeat('ab', 3) // 'ababab'
 */
export function repeat(str: string, count: number): string {
  if (!str || count <= 0) return '';
  return str.repeat(count);
}

/**
 * 补齐字符串（左侧）
 * @param str 字符串
 * @param length 目标长度
 * @param char 填充字符，默认空格
 * @returns 补齐后的字符串
 * @example
 * padStart('5', 3, '0') // '005'
 */
export function padStart(str: string, length: number, char: string = ' '): string {
  if (!str) str = '';
  return str.padStart(length, char);
}

/**
 * 补齐字符串（右侧）
 * @param str 字符串
 * @param length 目标长度
 * @param char 填充字符，默认空格
 * @returns 补齐后的字符串
 * @example
 * padEnd('5', 3, '0') // '500'
 */
export function padEnd(str: string, length: number, char: string = ' '): string {
  if (!str) str = '';
  return str.padEnd(length, char);
}

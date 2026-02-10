import { 
  isEmail as regexIsEmail, 
  isPort as regexIsPort, 
  isIP as regexIsIP,
  isPhone as regexIsPhone,
  isIdCard as regexIsIdCard,
  isBankCard as regexIsBankCard,
  isCarNumber as regexIsCarNumber,
  isUrl as regexIsUrl,
  isQQ as regexIsQQ,
  isWechat as regexIsWechat,
  isPostcode as regexIsPostcode,
  isChinese as regexIsChinese,
  hasChinese as regexHasChinese,
  isNumber as regexIsNumber,
  isNumeric as regexIsNumeric,
  isPositiveInteger as regexIsPositiveInteger,
  isNonNegativeInteger as regexIsNonNegativeInteger,
  isMac as regexIsMac,
  isIPv6 as regexIsIPv6,
  isHexColor as regexIsHexColor,
} from '../../utils/helper/regex';

export function parseRuleString(ruleString: string): { name: keyof ReturnType<typeof formRules> | ''; args: any[] } {
  if (!ruleString) {
    return { name: '', args: [] };
  }
  const match = ruleString.match(/^([a-zA-Z]+)\(([^)]*)\)$/);
  if (match) {
    const name = match[1] as keyof ReturnType<typeof formRules>;
    let args: any[] = [];
    if (match[2]) {
      const paramsStr = match[2].trim();

      // 检测是否包含数组字面量：以 [ 开头
      if (paramsStr.startsWith('[')) {
        // 查找匹配的 ]
        const arrayEndIndex = paramsStr.indexOf(']');
        if (arrayEndIndex !== -1) {
          // 提取数组内容（去掉 [ 和 ]）
          const arrayContent = paramsStr.substring(1, arrayEndIndex);

          // 解析数组元素：按逗号分割，去掉引号和空格
          const arrayItems = arrayContent
            .split(',')
            .map((item) => item.trim().replace(/^['"](.*)['"]$/, '$1'))
            .filter((item) => item.length > 0);

          args.push(arrayItems);

          // 检查数组后是否还有其他参数
          const remainingParams = paramsStr.substring(arrayEndIndex + 1).trim();
          if (remainingParams.startsWith(',')) {
            // 解析剩余参数
            const restArgs = remainingParams
              .substring(1)
              .split(',')
              .map((arg) => {
                const trimmedArg = arg.trim();
                // 处理布尔值
                if (trimmedArg === 'true') return true;
                if (trimmedArg === 'false') return false;
                // 处理数字
                const num = Number(trimmedArg);
                return isNaN(num) ? trimmedArg : num;
              });
            args.push(...restArgs);
          }
        }
      } else {
        // 不包含数组，使用原有的逗号分割逻辑
        args = paramsStr.split(',').map((arg) => {
          const trimmedArg = arg.trim();
          // 处理布尔值
          if (trimmedArg === 'true') return true;
          if (trimmedArg === 'false') return false;
          // 处理数字
          const num = Number(trimmedArg);
          return isNaN(num) ? trimmedArg : num;
        });
      }
    }
    return { name, args };
  }
  return { name: ruleString as keyof ReturnType<typeof formRules>, args: [] };
}

export function executeValidation(ruleName: keyof ReturnType<typeof formRules>, value: string, ruleArgs: any[] = [], t: any): true | string {
  const allRules = formRules(t);
  const ruleDef = allRules[ruleName];
  if (!ruleDef) {
    console.warn(`Rule '${ruleName}' not found in formRules.`);
    return true;
  }

  let validationFunctions: ((val: any) => true | string)[] = [];

  if (Array.isArray(ruleDef)) {
    validationFunctions = ruleDef;
  } else if (typeof ruleDef === 'function') {
    const result = (ruleDef as any)(...ruleArgs);

    if (Array.isArray(result)) {
      validationFunctions = result;
    } else {
      console.error(`[JQSelectNewValue] Rule '${ruleName}' function did not return an array of validation functions.`);
      return true;
    }
  }

  for (const validateFn of validationFunctions) {
    const result = validateFn(value);
    if (result !== true) {
      return result;
    }
  }
  return true;
}

export function formRules(t: any) {
  return {
    required: [
      (val?: any) => {
        const isEmptyArray = Array.isArray(val) && val.length === 0;
        const isFalsey = val === null || val === undefined || val === '';
        return (!isEmptyArray && !isFalsey) || t('messages.formRules.required');
      },
    ],
    arrMaxLength(max: number) {
      return [
        (val?: any) => {
          if (Array.isArray(val) && val.length > max) {
            return t('messages.formRules.arrMaxLength', { max });
          }
        },
      ];
    },
    percentageRules(boundary: ('left' | 'right')[] = ['left', 'right']) {
      const includesZero = boundary.includes('left');
      const includesHundred = boundary.includes('right');
      const formatRegex = /^(100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/;
      return [
        (val?: any) => {
          const strVal = String(val).trim();
          if (!formatRegex.test(strVal)) {
            return t('messages.formRules.percentageInvalid');
          }
          const numVal = parseFloat(strVal);
          if (!includesZero && numVal === 0) {
            return t('messages.formRules.over0');
          }
          if (!includesHundred && numVal === 100) {
            return t('messages.formRules.less100');
          }
          return true;
        },
      ];
    },
    file: [(val?: any) => !!val?.length || t('messages.formRules.required')],
    addressRules(types: ('url' | 'domain' | 'ip' | 'ip-port' | 'path')[] = ['url', 'domain', 'ip', 'ip-port'], required: boolean = true) {
      // 正则表达式定义
      const regex: {
        url: RegExp;
        domain: RegExp;
        ip: (val: string) => boolean;
        ipPort: RegExp;
        path: RegExp;
      } = {
        // 1. 完整的 URL (包括协议、域名、路径)
        url: new RegExp(/^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)$/i),
        // 2. 域名 (www.example.com, example.com)
        domain: new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])(\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]))*$/),
        // 3. 仅 IP 地址 (IPv4) - 复用 regex.ts 的验证逻辑
        ip: (val: string) => regexIsIP(val),
        // 4. IP:Port (1.1.1.1:8080)
        ipPort: new RegExp(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
        ),
        // 5. 相对或绝对路径 (/test/cmp/here, test/cmp/here)
        path: new RegExp(/^((\/|\\)?[a-zA-Z0-9_\-.]+(\/|\\)?)+$/),
      };

      const exampleAddress: any = {
        url: 'https://example.com',
        domain: 'example.com',
        ip: '1.1.1.1',
        ipPort: '1.1.1.1:8080',
        path: '/test/example',
      };

      const validationRule = (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true; // 空值校验留给 required 规则处理
        let example = '';

        const isMatch = types.some((type) => {
          switch (type) {
            case 'url':
              example = exampleAddress.url;
              return regex.url.test(strVal);
            case 'domain':
              example = exampleAddress.domain;
              return regex.domain.test(strVal);
            case 'ip':
              if (strVal.includes(':')) return false;
              example = exampleAddress.ip;
              // regex.ip 现在是函数而不是正则对象
              return regex.ip(strVal);
            case 'ip-port':
              example = exampleAddress['ipPort'];
              return regex.ipPort.test(strVal);
            case 'path':
              example = exampleAddress.path;
              return regex.path.test(strVal);
            default:
              return false;
          }
        });

        if (!isMatch) {
          return t('messages.formRules.addressInvalid', {
            example,
          });
        }
        return true;
      };

      const rules = [validationRule];

      if (required) {
        rules.unshift((val?: any) => {
          const isEmptyArray = Array.isArray(val) && val.length === 0;
          const isFalsey = val === null || val === undefined || val === '';
          return (!isEmptyArray && !isFalsey) || t('messages.formRules.required');
        });
      }

      return rules;
    },
    email: [
      (val?: any) => {
        // 复用 regex.ts 的验证逻辑
        const strVal = String(val || '').trim();
        if (!strVal) return true; // 空值校验留给 required 规则处理
        return regexIsEmail(strVal) || t('messages.formRules.emailInvalid');
      },
    ],
    port: [
      (val?: any) => {
        // 复用 regex.ts 的验证逻辑
        const strVal = String(val || '').trim();
        if (!strVal) return true; // 空值校验留给 required 规则处理
        return regexIsPort(strVal) || t('messages.formRules.invalidPort');
      },
    ],
    rangeInt(min: number, max: number) {
      return [
        (val?: any) => {
          val = Number(val);
          const isInt = Number.isInteger(val);
          const isInRange = val >= min && val <= max;
          return (isInt && isInRange) || t('messages.formRules.rangeInt', { min, max });
        },
      ];
    },
    rangeNumber(min: number, max: number) {
      return [
        (val?: any) => {
          val = Number(val);
          const isInRange = val >= min && val <= max;
          return isInRange || t('messages.formRules.rangeNumber', { min, max });
        },
      ];
    },
    positiveInteger(includeZero: boolean = false) {
      return [
        (val?: any) => {
          val = Number(val);
          const isInt = Number.isInteger(val);
          const isPositive = includeZero ? val >= 0 : val > 0;
          return (isInt && isPositive) || t(includeZero ? 'messages.formRules.nonNegativeInt' : 'messages.formRules.positiveInt');
        },
      ];
    },
    phone: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsPhone(strVal) || t('messages.formRules.phoneInvalid');
      },
    ],
    idCard: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsIdCard(strVal) || t('messages.formRules.idCardInvalid');
      },
    ],
    bankCard: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsBankCard(strVal) || t('messages.formRules.bankCardInvalid');
      },
    ],
    carNumber: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsCarNumber(strVal) || t('messages.formRules.carNumberInvalid');
      },
    ],
    url: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsUrl(strVal) || t('messages.formRules.urlInvalid');
      },
    ],
    ip: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsIP(strVal) || t('messages.formRules.ipInvalid');
      },
    ],
    ipv6: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsIPv6(strVal) || t('messages.formRules.ipv6Invalid');
      },
    ],
    qq: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsQQ(strVal) || t('messages.formRules.qqInvalid');
      },
    ],
    wechat: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsWechat(strVal) || t('messages.formRules.wechatInvalid');
      },
    ],
    postcode: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsPostcode(strVal) || t('messages.formRules.postcodeInvalid');
      },
    ],
    chinese: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsChinese(strVal) || t('messages.formRules.chineseOnly');
      },
    ],
    containsChinese: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexHasChinese(strVal) || t('messages.formRules.mustContainChinese');
      },
    ],
    number: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsNumber(strVal) || t('messages.formRules.numberOnly');
      },
    ],
    numeric: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsNumeric(strVal) || t('messages.formRules.numericOnly');
      },
    ],
    mac: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsMac(strVal) || t('messages.formRules.macInvalid');
      },
    ],
    hexColor: [
      (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true;
        return regexIsHexColor(strVal) || t('messages.formRules.hexColorInvalid');
      },
    ],
  };
}

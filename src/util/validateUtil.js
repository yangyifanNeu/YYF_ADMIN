const validataConfig = {
  phone: {
    regx: /^1[3456789]\d{9}$/,
    message: '请输入一个手机号',
  },
  ip: {
    regx: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    message: '请输入一个ip地址',
  },
};
const validateFunc = function(type, rule, value, callback) {
  if (
    validataConfig[type].regx.test(value) ||
    value === null ||
    typeof value == 'undefined' ||
    (typeof value == 'string' && value == '')
  ) {
    callback();
  } else {
    callback(validataConfig[type]['message']);
  }
};
export default {
  phoneValidator() {
    validateFunc('phone', ...arguments);
  },
  ipValidator() {
    validateFunc('ip', ...arguments);
  },
};

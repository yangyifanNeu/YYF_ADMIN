import axios from 'axios';
const API_PREFIX_URL = 'http://10.4.50.59:8999';
export default {
  get: (option) => {
    const resetUrl = API_PREFIX_URL + option.url;
    return axios.get(resetUrl);
  },
  post: (option) => {
    const resetUrl = API_PREFIX_URL + option.url;
    const data = option.data;
    return axios.post(resetUrl, data);
  },
  downLoad: (option) => {
    const resetUrl = API_PREFIX_URL + option.url;
    const data = option.data;
    return axios.post(resetUrl, data, {responseType: 'blob'}).then((res) => {
      console.log('response: ', res);
      // new Blob([data])用来创建URL的file对象或者blob对象
      let url = window.URL.createObjectURL(new Blob([res.data]));
      // 生成一个a标签
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      // 生成时间戳
      let timestamp = new Date().getTime();
      let fileName = option.fileName || timestamp + '.xlsx';
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href); //释放url
      document.body.removeChild(link); //释放标签
    });
  },
};

export default {
  namespaced: true,
  state: {
    ucReportStructure: [
      {
        name: 'vehicleStatus',
        label: '车辆状态',
      },
      {
        name: 'ocuTypeName',
        label: 'UC类别',
      },
      {
        name: 'applyStatus',
        label: '申请状态',
      },
      {
        name: 'vin',
        label: '车架号',
      },
      {
        name: 'vinVerify',
        label: '车架号校验',
      },
      {
        name: 'handoverDate',
        label: '交车日期',
      },
      {
        name: 'applyDate',
        label: '申请日期',
      },
      {
        name: 'saleType',
        label: '销售类型',
      },
      {
        name: 'cbuNo',
        label: 'cbu编号',
      },
      {
        name: 'ckdNo',
        label: 'CKD编号',
      },
      {
        name: 'region',
        label: '区域',
      },
      {
        name: 'dealerName',
        label: '经销商名称',
      },
      {
        name: 'city',
        label: '市',
      },
      {
        name: 'nscOrBba',
        label: '进口/出口',
      },
      {
        name: 'brand',
        label: '品牌',
      },
      {
        name: 'carType',
        label: '车辆类型',
      },
    ],
    dealerInfoStructure: [
      {
        name: 'cbuNo',
        label: 'cbu编号',
      },
      {
        name: 'ckdNo',
        label: 'CKD编号',
      },
      {
        name: 'dealerName',
        label: '经销商名称',
      },
      {
        name: 'region',
        label: '区域',
      },
    ],
    carInfoStructure: [
      {
        name: 'vehicleStatus',
        label: '车辆状态',
      },
      {
        name: 'vin',
        label: '车架号',
      },
      {
        name: 'saleType',
        label: '销售类型',
      },
      {
        name: 'source',
        label: '车辆来源',
      },
      {
        name: 'ucCarSeries',
        label: '车系',
      },
      {
        name: 'mode',
        label: '车型',
      },
      {
        name: 'ecode',
        label: 'E-Code',
      },
      {
        name: 'nscOrBba',
        label: '进口、出口',
      },
      {
        name: 'bodyColor',
        label: '车身颜色',
      },
      {
        name: 'interiorColor',
        label: '内饰颜色',
      },
      {
        name: 'carType',
        label: '车辆类型',
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    ucReportStructure: (state) => {
      return state.ucReportStructure;
    },
    dealerInfoStructure: (state) => {
      return state.dealerInfoStructure;
    },
    carInfoStructure: (state) => {
      return state.carInfoStructure;
    },
  },
};

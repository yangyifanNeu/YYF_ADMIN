export default {
  namespaced: true,
  state: {
    ucReportStructure: [
      'vehicleStatus',
      'applyStatus',
      'statusCode',
      'vin',
      'vinVerify',
      'handoverDate',
      'applyDate',
      'saleType',
      'cbuNo',
      'ckdNo',
      'region',
      'dealerName',
      'city',
      'brand',
      'nscOrBba',
      'carType',
      'ucCarSeries',
      'model',
      'ecode',
      'source',
      'plateNo',
      'plateType',
      'bodyColor',
      'interiorColor',
      'retailInvoiceDate',
      'productionDate',
      'ucFirstRegistration',
      'registrationTransferDate',
      'ucMileage',
      'newCarWarrantyStartDate',
      'newCarWarrantyEndDate',
      'ageInMonth',
      'stockStartDate',
      'stockPlace',
      'stockDays',
      'registrationTransferFee',
      'pointCheckFee',
      'repairAndMaintenanceFee',
      'beautyFee',
      'saleCommission',
      'otherExpenses',
      'warrantyFund',
      'marketFee',
      'purchasePrice',
      'totalStockCost',
      'redbookCode',
      'redbookRetailPrice',
      'redbookWhoesalePrice',
      'usedCarCondition',
      'finalRetailPrice',
      'qualityCerificateNo',
      'usedCarWarrantyNo',
      'bonusAndService',
      'bussinessAndStampTax',
      'usedCarValue_addedTax',
      'grossMargin_1',
      'grossMarginrate1',
      'grossMargin_2',
      'grossMarginRate2',
      'commission',
      'commissionRate',
      'salesConsultant',
      'customerName',
      'customerPhoneOrMobileNo',
      'trade_inNcVin',
      'coveredByNewCarWarranty',
      'partWarrSelfFundWarr',
      'warrantyNo',
      'usedCarWarrantyStartDate',
      'usedCarWarrantyEndDate',
      'warrantyStartDate',
      'warrantyEndDate',
      'customerOrOrganizationName',
      'address',
      'importOrHomegrown',
      'warrantyStartMileage',
      'warrantyEndMileage',
      'ocuTypeName',
      'ocuType',
      'otherMarketGift',
      'extendedPremium',
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
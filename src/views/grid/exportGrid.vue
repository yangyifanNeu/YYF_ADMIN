<template>
  <div>
    <h2>代码从表格页面，有冗余代码，开发者可自行精简，改样例主要演示导出功能</h2>
    <a-table :columns="antGridStructure" :data-source="tableData" size="small">
      <template slot="startDate" slot-scope="startDate">
        {{ dataFormatter(startDate) }}
      </template>
      <template slot="endDate" slot-scope="endDate">
        {{ dataFormatter(endDate) }}
      </template>
      <template slot="sex" slot-scope="sex, record">
        {{ commonFormatter(sex, record, 'sex', true) }}
      </template>
    </a-table>
    <a-tooltip placement="top">
      <template slot="title">
        <span>导出表格</span>
      </template>
      <a-button type="primary" icon="cloud-download" @click="exportGrid" class="export-btn" />
    </a-tooltip>
  </div>
</template>

<script>
import axios from 'axios';
const API_PREFIX_URL = 'http://127.0.0.1:3000';
const GRID_DATA_URL = '/getGridData';
const GRID_STRUCTURE_URL = '/getGridStructure';
var Excel = require('exceljs');
import moment from 'moment';
export default {
  data: () => {
    return {
      tableData: [],
      eleTableData: [],
      tableStructure: [],
      eleTableStructure: [],
    };
  },
  mounted() {},
  beforeMount() {},
  created() {
    axios
      .get(API_PREFIX_URL + GRID_STRUCTURE_URL)
      .then((res) => {
        this.tableStructure = res.data.map((item) => Object.assign({}, item, {key: item.name}));
        this.eleTableStructure = res.data.map((item) => Object.assign({}, item));
        return axios.get(API_PREFIX_URL + GRID_DATA_URL);
      })
      .then((res) => {
        this.tableData = res.data.map((item) => Object.assign({}, item, {key: item.name}));
        this.eleTableData = res.data.map((item) => Object.assign({}, item));
      });
  },
  computed: {
    antGridStructure: function() {
      // const $this = this;
      return this.tableStructure.map((item) => {
        let newItem = Object.assign({}, item, {dataIndex: item.name, title: item.label, key: item.name});
        if (newItem.type == 'date') {
          newItem.scopedSlots = {customRender: newItem.name};
        }
        if (newItem.store && newItem.store.length > 0) {
          newItem.scopedSlots = {customRender: newItem.name};
        }
        return newItem;
      });
    },
  },
  methods: {
    dataFormatter(row, column) {
      const value = column ? row[column.property] : row;
      return moment(value).format('YYYY-MM-DD');
    },
    commonFormatter(row, column, attrName, Ant) {
      let propertyName,
        curColStructure,
        rowItem = null;
      if (typeof Ant == 'boolean') {
        propertyName = attrName;
        curColStructure = this.tableStructure.filter((item) => item.name == attrName);
        rowItem = column;
      } else {
        propertyName = column.property;
        curColStructure = this.tableStructure.filter((item) => item.name == propertyName);
        rowItem = row;
      }
      if (curColStructure && curColStructure.length == 1 && curColStructure[0]['store']) {
        let store = curColStructure[0]['store'];
        let valueObj = store.filter((item) => item.codevalue == rowItem[propertyName]);
        return valueObj.length > 0 ? valueObj[0]['codename'] : '-';
      } else {
        return rowItem[propertyName];
      }
    },
    exportGrid() {
      let head = this.tableStructure;
      let $this = this;
      let fileName = '表格导出';
      var wb = new Excel.Workbook();
      var ws = wb.addWorksheet('table');
      ws.columns = head.map((item) => Object.assign({}, {header: item.label, key: item.name, width: 20}));
      let cloneTableData = this.tableData.map((item) => Object.assign({}, item));
      ws.addRows(
        cloneTableData.map((item) => {
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              const element = item[key];
              let type = null;
              let store = null;
              for (let index = 0; index < $this.tableStructure.length; index++) {
                const element_1 = $this.tableStructure[index];
                if (element_1.name == key) {
                  type = element_1.type;
                  store = element_1.store;
                  if (type == 'date') {
                    item[key] = moment(element).format('YYYY-MM-DD');
                  }
                  if (store) {
                    for (let i = 0; i < store.length; i++) {
                      const storeItem = store[i];
                      if (storeItem['codevalue'] == element) {
                        item[key] = storeItem['codename'];
                        break;
                      }
                    }
                  }
                  break;
                }
              }
            }
          }
          return item;
        }),
      );
      wb.xlsx
        .writeBuffer({
          base64: true,
        })
        .then(function(xls64) {
          // build anchor tag and attach file (works in chrome)
          var a = document.createElement('a');
          var data = new Blob([xls64], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });

          var url = URL.createObjectURL(data);
          a.href = url;
          a.download = `${fileName}.xlsx`;
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        });
    },
  },
};
</script>

<style scoped>
.export-btn {
  position: absolute;
  margin-top: -43px;
}
</style>

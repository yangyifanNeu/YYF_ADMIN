<template>
  <div>
    <h1>Element Ui Grid</h1>
    <el-table :data="eleTableData" style="width: 100%">
      <template v-for="item in eleTableStructure">
        <el-table-column
          :label="item.label"
          :width="item.width"
          :key="item.name"
          :prop="item.name"
          :formatter="dataFormatter"
          v-if="item.type == 'date'"
        />
        <el-table-column
          :label="item.label"
          :width="item.width"
          :key="item.name"
          :prop="item.name"
          :formatter="commonFormatter"
          v-if="item.type !== 'date'"
        />
      </template>
    </el-table>
    <h1>Ant Design Grid</h1>
    <a-table :columns="antGridStructure" :data-source="tableData">
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
  </div>
</template>

<script>
import axios from 'axios';
const API_PREFIX_URL = 'http://127.0.0.1:3000';
const GRID_DATA_URL = '/getGridData';
const GRID_STRUCTURE_URL = '/getGridStructure';
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
          // newItem.customRender = (text) => {
          //   return moment(text).format('YYYY-MM-DD');
          // };
          newItem.scopedSlots = {customRender: newItem.name};
        }
        if (newItem.store && newItem.store.length > 0) {
          // newItem.customRender = (text) => {
          //   return newItem.filter((item) => item.codevalue == text)[0]['codename'];
          // };
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
  },
};
</script>

<style></style>

<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <template v-for="item in tableStructure">
        <el-table-column
          :label="item.label"
          :width="item.width"
          :key="item.name"
          :prop="item.name"
          :formatter="dataFormatter"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
const API_PREFIX_URL = 'http://127.0.0.1:3000';
const GRID_DATA_URL = '/getGridData';
const GRID_STRUCTURE_URL = '/getGridStructure';
export default {
  data: () => {
    return {
      tableData: [],
      tableStructure: [],
    };
  },
  mounted() {},
  created() {
    axios
      .get(API_PREFIX_URL + GRID_STRUCTURE_URL)
      .then((res) => {
        this.tableStructure = res.data;
        return axios.get(API_PREFIX_URL + GRID_DATA_URL);
      })
      .then((res) => {
        this.tableData = res.data;
      });
  },
  computed: {
    demo: () => {
      return 'demo';
    },
  },
  methods: {
    dataFormatter(row, column) {
      var date = row[column.property];
      return date;
    },
  },
};
</script>

<style></style>

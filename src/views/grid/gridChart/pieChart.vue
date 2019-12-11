<template>
  <el-container v-loading.fullscreen.lock="loading">
    <el-aside width="300px">
      <el-select v-model="searchType" placeholder="" size="small" style="width:100%" @change="selectChange">
        <el-option v-for="item in searchTypeStore" :key="item.value" :label="item.name" :value="item.value">
        </el-option>
      </el-select>
      <el-table :data="gridData" style="width: 100%">
        <template v-for="item in gridStructure">
          <el-table-column :label="item.label" :width="item.width || 150" :key="item.name" :prop="item.name">
          </el-table-column>
        </template>
      </el-table>
    </el-aside>
    <el-main height="">
      <v-chart :options="pieOptions" ref="chart" style="width:100%" />
    </el-main>
  </el-container>
</template>

<script>
import restUtil from '../../../util/restUtil.js';
const restUrl = '/report/pie';
export default {
  props: {
    searchCondition: {
      type: Object,
      default: function() {
        return {Ecode: null};
      },
    },
  },
  data: () => {
    return {
      gridData: [],
      searchType: 'REGION',
      searchTypeStore: [
        {
          value: 'REGION',
          name: '区域',
        },
        {
          value: 'BRAND',
          name: '品牌',
        },
      ],
      loading: false,
    };
  },
  computed: {
    gridStructure() {
      let searchTypeName;
      var $this = this;
      this.searchTypeStore.forEach((item) => {
        if (item.value == $this.searchType) {
          searchTypeName = item.name;
        }
      });
      return [
        {
          name: this.searchType,
          label: searchTypeName,
        },
        {
          name: 'total',
          label: '总计',
        },
      ];
    },
    pieOptions() {
      let $this = this;
      return {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.gridData.map((item) => {
              return {
                name: item[$this.searchType],
                value: item.total,
              };
            }),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    },
  },
  mounted() {
    this.getdataByCondition();
  },
  methods: {
    selectChange() {
      this.getdataByCondition();
    },
    getdataByCondition() {
      this.loading = true;
      let searchType = this.searchType;
      let url = restUrl + `?col=${searchType}`;
      restUtil.get({url}).then((res) => {
        this.loading = false;
        this.gridData = res.data.map((item) => {
          return {
            total: item.total,
            [searchType]: item.columnOne,
          };
        });
      });
    },
    downLoad() {
      window.console.log('下载表格和饼图');
    },
  },
};
</script>

<style></style>

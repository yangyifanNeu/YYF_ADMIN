<template>
  <el-container v-loading.fullscreen.lock="loading">
    <el-aside width="300px">
      <el-select v-model="searchType" placeholder="" size="small" style="width:100%" @change="selectChange">
        <el-option v-for="item in searchTypeStore" :key="item.value" :label="item.name" :value="item.value">
        </el-option>
      </el-select>
      <el-table :data="currentPageData" style="width: 100%">
        <template v-for="item in gridStructure">
          <el-table-column :label="item.label" :width="item.width || 150" :key="item.name" :prop="item.name">
          </el-table-column>
        </template>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, ->, total"
        :total="total"
      />
    </el-aside>
    <el-main height="">
      <v-chart :options="pieOptions" ref="chart" style="width:100%" />
    </el-main>
  </el-container>
</template>

<script>
import restUtil from '../../../util/restUtil.js';
const restUrl = '/report/pie';
const downLoadUrl = '/report/download';
// const pageSize = 10;
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
      pageNo: 1,
      pageSize: 10,
      total: 0,
      currentPageData: [],
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
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
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
      let $this = this;
      restUtil
        .get({url})
        .then((res) => {
          this.loading = false;
          this.gridData = res.data.map((item) => {
            return {
              total: item.total,
              [searchType]: item.columnOne,
            };
          });
          this.total = this.gridData.length;
          this.pageNo = 1;
          this.handleCurrentChange(1);
        })
        .catch((exception) => {
          console.error(exception);
          $this.gridInfo.loading = false;
          $this.$notify({
            title: '错误',
            message: '获取数据失败',
            type: 'error',
          });
        });
    },
    handleCurrentChange(pageIndex) {
      this.pageNo = pageIndex;
      let start = (pageIndex - 1) * this.pageSize;
      let end = start + this.pageSize;
      this.currentPageData = this.gridData.slice(start, end);
    },
    downLoad() {
      window.console.log('下载表格和饼图');
      let gridStructure = this.gridStructure;
      let gridData = this.gridData;
      let header = [];
      let data = [];
      let headPropName = [];
      let $this = this;
      gridStructure.forEach((item) => {
        header.push([item.label]);
        headPropName.push(item.name);
      });
      gridData.forEach((item) => {
        let dataItem = [];
        headPropName.forEach((headerItem) => {
          dataItem.push(item[headerItem]);
        });
        data.push(dataItem);
      });
      let baseImage = this.$refs.chart.getDataURL();
      baseImage = baseImage.slice(baseImage.indexOf(',') + 1);
      let option = {
        url: downLoadUrl,
        data: {
          head: header,
          data,
          baseImage,
          fileName: '饼图报表',
        },
        fileName: '饼图报表.xlsx',
      };
      restUtil.downLoad(option).catch((exception) => {
        console.error(exception);
        $this.gridInfo.loading = false;
        $this.$notify({
          title: '错误',
          message: '下载失败',
          type: 'error',
        });
      });
    },
  },
};
</script>

<style></style>

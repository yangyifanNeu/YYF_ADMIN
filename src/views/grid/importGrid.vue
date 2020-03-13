<template>
  <div>
    <h2>使用xlxs实现table的导入功能</h2>
    <a-upload
      :accept="acceptFile"
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
      ref="uploadWidget"
    >
      <a-button> <a-icon type="upload" />选择文件</a-button>
    </a-upload>
    <template v-if="gridStructure.length > 0">
      <a-table :columns="gridStructure" :data-source="gridData" size="small"> </a-table>
    </template>
  </div>
</template>
<script>
import XLSX from 'xlsx';
export default {
  data: () => {
    return {
      gridStructure: [],
      gridData: [],
      file: null,
      acceptFile: 'xlxs,xls',
      fileList: [],
    };
  },
  mounted() {},
  methods: {
    handleRemove() {
      this.file = null;
    },
    beforeUpload(file) {
      let $this = this;
      this.file = file;
      let f = file;
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        // eslint-disable-next-line no-unused-vars
        var workbook = XLSX.read(data, {type: 'array'});
        for (const sheetName in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheetName)) {
            const sheetItem = workbook.Sheets[sheetName];

            let tabledata = XLSX.utils.sheet_to_json(sheetItem);
            let columns = [];
            let rowData = [];
            if (tabledata.length > 0) {
              let index = 0;
              for (const key in tabledata[0]) {
                if (tabledata[0].hasOwnProperty(key)) {
                  columns.push({
                    name: 'column' + index,
                    label: key,
                    key: 'column' + index,
                    title: key,
                    dataIndex: 'column' + index,
                  });
                  index++;
                }
              }
              rowData = tabledata.map((item, index) => {
                let newObj = {key: index};
                for (const key in item) {
                  if (item.hasOwnProperty(key)) {
                    for (let i = 0; i < columns.length; i++) {
                      const headItem = columns[i];
                      if (key == headItem.label) {
                        newObj[headItem.name] = item[key];
                        break;
                      }
                    }
                  }
                }
                return newObj;
              });
              $this.gridStructure = columns;
              $this.gridData = rowData;
              break;
            }
          }
        }
      };
      reader.readAsArrayBuffer(f);
      return false;
    },
    removeFile() {
      this.$refs.uploadWidget.fileList = [];
    },
  },
};
</script>

<style></style>

<template>
  <div class="wrapper">
    <a-button type="primary" @click="handler($event)">
      <icon-font type="icon-shaixuan" />
      筛选显示字段
    </a-button>
    <div class="down" v-if="isPositon" :style="positon">
      <p class="selMore">选择更多需要查看的数据项</p>
      <div class="content" @click.stop>
        <a-checkbox-group v-model="value" :options="options" />
      </div>
      <div class="operation" @click.stop>
        <a-button @click="allSel">全选</a-button>
        <a-button type="primary" @click="confirm">确定</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    columns: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      positon: {},
      isPositon: false,
      options: [],
      value: [],
      defaulVals: [],
      copyColumns: [],
      isClose: false
    }
  },
  watch: {},
  computed: {},
  mounted() {
    let defaulVals = []
    let columns = this.copyColumns.length ? this.copyColumns : this.columns
    this.copyColumns = JSON.parse(JSON.stringify(columns))
    let options = columns.map((item) => {
      item.label = item.title
      item.value = item.title
      defaulVals.push(item.title)
      return item
    })

    this.options = options
    this.value = JSON.parse(JSON.stringify(defaulVals))
  },
  methods: {
    handler(e) {
      this.isPositon = !this.isPositon
      document.addEventListener('click', this.closeMenu)
      this.isClose = false
    },
    closeMenu() {
      if (this.isClose) {
        this.isPositon = false
        document.removeEventListener('click', this.closeMenu)
      }
      this.isClose = true
    },
    /**
     * 全选
     */
    allSel() {
      let defaulVals = []
      this.copyColumns.map((item) => {
        defaulVals.push(item.title)
        return item
      })

      this.value = defaulVals
    },
    /**
     * 确认筛选
     */
    confirm() {
      let copyColumns = this.copyColumns
      let value = this.value
      this.isPositon = false
      let columns = []
      copyColumns.map((item) => {
        if (value.includes(item.title)) {
          if(item.title === '序号' || item.key === 'rowIndex'){
            item.customRender = function (t,r,index) {
              return parseInt(index)+1;
            }
          }
          columns.push(item)
        }
        return item
      })
      this.$emit('changeColumns', columns)
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  display: inline-block;
  position: relative;

  .down {
    position: absolute;
    width: 300px;
    background: #fff;
    z-index: 2;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
  }

  .selMore {
    padding: 10px 0 10px 10px;
  }

  .content {
    max-height: 180px;
    overflow: auto;
  }

  .operation {
    margin-top: 20px;
    text-align: right;

    /deep/ .ant-btn {
      margin: 0 5px;
    }
  }
}

/deep/ .ant-checkbox-wrapper {
  display: block;
  padding-left: 20px;
}
</style>
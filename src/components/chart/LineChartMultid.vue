<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale" :onClick="handleClick">
      <v-tooltip/>
      <v-axis/>
      <v-legend/>
      <v-line position="type*y" color="x"/>
      <v-point position="type*y" color="x" :size="4" :v-style="style" :shape="'circle'"/>
    </v-chart>
  </div>
</template>

<script>
  import { DataSet } from '@antv/data-set'
  import { ChartEventMixins } from './mixins/ChartMixins'

  export default {
    name: 'LineChartMultid',
    mixins: [ChartEventMixins],
    props: {
      title: {
        type: String,
        default: ''
      },
      dataSource: {
        type: Array,
        default: () => [
          { type: 'Jan', shccs: 7.0, jeebt: 3.9 },
          { type: 'Feb', shccs: 6.9, jeebt: 4.2 },
          { type: 'Mar', shccs: 9.5, jeebt: 5.7 },
          { type: 'Apr', shccs: 14.5, jeebt: 8.5 },
          { type: 'May', shccs: 18.4, jeebt: 11.9 },
          { type: 'Jun', shccs: 21.5, jeebt: 15.2 },
          { type: 'Jul', shccs: 25.2, jeebt: 17.0 },
          { type: 'Aug', shccs: 26.5, jeebt: 16.6 },
          { type: 'Sep', shccs: 23.3, jeebt: 14.2 },
          { type: 'Oct', shccs: 18.3, jeebt: 10.3 },
          { type: 'Nov', shccs: 13.9, jeebt: 6.6 },
          { type: 'Dec', shccs: 9.6, jeebt: 4.8 }
        ]
      },
      fields: {
        type: Array,
        default: () => ['shccs', 'jeebt']
      },
      // 别名，需要的格式：[{field:'name',alias:'姓名'}, {field:'sex',alias:'性别'}]
      aliases:{
        type: Array,
        default: () => []
      },
      height: {
        type: Number,
        default: 254
      }
    },
    data() {
      return {
        scale: [{
          dataKey: 'x',
          min: 0,
          max: 1
        }],
        style: { stroke: '#fff', lineWidth: 1 }
      }
    },
    computed: {
      data() {
        const dv = new DataSet.View().source(this.dataSource)
        dv.transform({
          type: 'fold',
          fields: this.fields,
          key: 'x',
          value: 'y'
        })
        let rows =  dv.rows
        // 替换别名
        rows.forEach(row => {
          for (let item of this.aliases) {
            if (item.field === row.x) {
              row.x = item.alias
              break
            }
          }
        })
        return rows
      }
    }
  }
</script>

<style scoped>

</style>
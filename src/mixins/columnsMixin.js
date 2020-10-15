/**
 * @description: 动态设置表格宽度
 * @params 表格数组
 * @return any
*/
const getScroll = (arr)=> {
  const { length } = arr
  const flag = arr.some(item => item['title'].length > 5)
  return flag ? 180 * length : 100 * length
}
export const columnsMixin = {
  computed:{
    scroll() {
      const x = getScroll(this.columns)
      return {x}
    }
  },
  mounted() {
    this.columns.map(item=> {
      if (item['title'].length > 6){
        this.$set(item,"width", 200)
      }
    })
  },
  watch: {
    columns(arr){
      this.scroll['x'] = getScroll(arr)
    }
  }
}

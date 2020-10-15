<template>
  <div class="wrapper">
    <canvas
      width="1000"
      height="850"
      id="canvas"
      style="background-color: rgb(238, 238, 238); border: 1px solid rgb(68, 68, 68); cursor: default;"
    ></canvas>
  </div>
</template>

<script>
import topo from './linkDiagram.js'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    new topo.Wktopo({
      el: 'canvas',
      data: topo.data,
    })
  },
  methods: {},
}
</script>
<style lang="less" scoped>
</style>
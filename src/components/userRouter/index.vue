<template>
  <div class="wrapper-router">
    <ul>
      <li
        v-for="(item,idx) in routers"
        :key="idx"
        :class="item.checked?'active':''"
        @click="routerHandle(idx,item.id)"
      >
        {{item.meta.title}}
        <span v-if="item.checked"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      routers: [
        {
          name: '资源',
          checked: true,
          meta: {},
        },
      ],
      fullPath: '',
    }
  },
  computed: {
    ...mapState({
      // 主路由
      mainRouters: (state) => state.permission.addRouters,
      // 后台菜单
      permissionMenuList: (state) => state.user.permissionList,
    }),
  },
  watch: {
    permissionMenuList(val) {
      console.log(val)
    },
    $route: {
      immediate: true,
      handler() {
        let route = this.$route
        this.fullPath = this.$route.fullPath
        this.mainRoute()
      },
    },
  },
  mounted() {
    this.mainRoute()
  },
  methods: {
    ...mapMutations(['SET_CURRROUTERID']),
    mainRoute() {
      let routers = []
      this.permissionMenuList.map((item, index) => {
        if (item.path == '/resources' || item.path == '/infrastructure' || item.path == '/isystem') {
          routers.push(item)
        }
        return item
      })

      let fullPath = this.fullPath || this.$route.fullPath
      let currId = ''
      this.routers = routers.map((item, index) => {
        item.checked = false
        if (index === 0) {
          currId = item.id
          item.checked = true
        }
        if (fullPath != '/dashboard/analysis') {
          item.checked = false
          if (item.path == '/' + fullPath.split('/')[1]) {
            item.checked = true
            currId = item.id
          }
        }
        return item
      })
      this.SET_CURRROUTERID(currId)
    },
    routerHandle(idx, id) {
      let firstChild = ''
      this.routers = this.routers.map((item, index) => {
        item.checked = false
        if (index == idx) {
          item.checked = true
        }
        return item
      })
      this.SET_CURRROUTERID(id)
      this.$router.push(firstChild)
    },
  },
}
</script>
<style lang="less" scoped>
@size: 16px;
@color: #5d81f9;
.wrapper-router {
  display: inline-block;
  ul {
    margin-left: 30px;
    padding: 0;
    li {
      float: left;
      list-style: none;
      min-width: 80px;
      padding: 0 10px;
      margin: 0 20px;
      font-size: @size;
      text-align: center;
      position: relative;
      cursor: pointer;
      span {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        width: 70%;
        text-align: center;
        height: 2px;
        border-radius: 10px;
        background: #fff;
      }
    }
    li.active {
      color: #fff;
    }
  }
}
</style>
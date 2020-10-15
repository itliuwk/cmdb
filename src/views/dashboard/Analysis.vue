<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ nickname() }}
        <span class="welcome-text">{{ welcome }}</span>
      </div>
      <!-- <div>企业级快速开发平台</div> -->
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="服务数" content="15" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="8">
          <head-info title="正在运行" content="15/15" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="8">
          <head-info title="项目访问" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px"
            :bordered="false"
            title="运行中的服务"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra">全部项目</a>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <!--@click="goProjects(item)"-->
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar
                        size="small"
                        src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
                      />
                      <a>{{ item.chineseName }}</a>
                    </div>
                    <div slot="description" class="card-description">{{ item.descript }}</div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/"></a>
                    <span class="datetime">1分钟前</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span
                    >&nbsp; 在&nbsp; <a href="#">{{ item.project.name }}</a
                    >&nbsp; <span>{{ item.project.action }}</span
                    >&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <!-- <a-card title="快速开始 / 便捷导航" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card>-->
          <!-- <a-card title="XX 指数" style="margin-bottom: 24px" :loading="radarLoading" :bordered="false"
                  :body-style="{ padding: 0 }">
            <div style="min-height: 400px;">
              <radar :data="radarData"/>
            </div>
          </a-card>-->
          <!-- <a-card :loading="loading" title="团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar"/>
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>-->
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
import Vue from 'vue'
import { timeFix, welcome } from '@/utils/util'
import { mapGetters } from 'vuex'
// import common from '@/components/common/common'

import PageLayout from '@/components/page/PageLayout'
import HeadInfo from '@/components/tools/HeadInfo'
import Radar from '@/components/chart/Radar'
import { getRoleList, getServiceList } from '@/api/manage'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageLayout,
    HeadInfo,
    Radar,
  },
  data() {
    return {
      timeFix: timeFix(),
      welcome: welcome(),
      avatar: '',
      user: {},

      projects: [
        {
          id: '6367801b7bdb584d134e2addc5be7ba0',
          name: 'testSys',
          protocol: 'http',
          host: '192.168.0.51',
          descript: 'erp项目',
          port: '90',
          context: '',
          delFlag: '1',
          createBy: 'admin',
          createTime: '2019-09-12 15:56:10',
          updateBy: 'admin',
          updateTime: '2019-09-16 17:31:28',
          sort: 1,
          chineseName: '测试系统',
          mainframe: '1',
          applicatonKey: '测试',
          securityCode: 'test',
          isAvailable: 0,
          isReturn: '1',
          loginUrl: 'http://192.168.0.53:10015/sys/ssoLogin?applicatonId=6367801b7bdb584d134e2addc5be7ba0',
          parameterMap: null,
        },
        {
          id: 'affe087c2b5afebf983a1ea4fed605f6',
          name: 'platform',
          protocol: 'http',
          host: '192.168.50.193',
          descript: '开发平台',
          port: '80',
          context: null,
          delFlag: '0',
          createBy: 'admin',
          createTime: '2019-11-19 16:08:25',
          updateBy: 'admin',
          updateTime: '2019-11-19 16:09:21',
          sort: 0,
          chineseName: '开发平台',
          mainframe: '11',
          applicatonKey: '1',
          securityCode: '1',
          isAvailable: 0,
          isReturn: '1',
          loginUrl: 'http://192.168.0.53:10015/sys/ssoLogin?applicatonId=affe087c2b5afebf983a1ea4fed605f6',
          parameterMap: null,
        },
        {
          id: 'c1dda66d2077284cdd92442066596190',
          name: 'pmp',
          protocol: 'http',
          host: '192.168.120.142',
          descript: 'pmp-项目管理',
          port: '8080',
          context: '',
          delFlag: '0',
          createBy: 'admin',
          createTime: '2019-09-12 14:32:16',
          updateBy: 'admin',
          updateTime: '2019-09-12 15:36:45',
          sort: 1,
          chineseName: '项目管理',
          mainframe: '1',
          applicatonKey: '1',
          securityCode: '1',
          isAvailable: 0,
          isReturn: '1',
          loginUrl: 'http://192.168.0.53:10015/sys/ssoLogin?applicatonId=c1dda66d2077284cdd92442066596190',
          parameterMap: null,
        },
        {
          id: 'e4799ab85fc9189da801fef2764b85b5',
          name: 'srm',
          protocol: 'http',
          host: '192.168.120.140',
          descript: 'SRM-供应商管理',
          port: '8080',
          context: null,
          delFlag: '0',
          createBy: 'admin',
          createTime: '2019-11-12 10:11:37',
          updateBy: 'admin',
          updateTime: '2019-11-12 11:10:37',
          sort: 3,
          chineseName: '供应商管理',
          mainframe: 'host',
          applicatonKey: 'srm',
          securityCode: 'srm',
          isAvailable: 0,
          isReturn: '1',
          loginUrl: 'http://192.168.0.53:10015/sys/ssoLogin?applicatonId=e4799ab85fc9189da801fef2764b85b5',
          parameterMap: null,
        },
        {
          id: 'eb1235fb7af0cfb3bd220bc254b98a2e',
          name: 'STF',
          protocol: 'http',
          host: '192.168.50.193',
          descript: '上通服-管理',
          port: '19380',
          context: null,
          delFlag: '0',
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          sort: 5,
          chineseName: '上通服',
          mainframe: '192.168.50.193',
          applicatonKey: '111',
          securityCode: '10000',
          isAvailable: 0,
          isReturn: '1',
          loginUrl: 'http://192.168.0.53:10015/sys/ssoLogin?applicatonId=eb1235fb7af0cfb3bd220bc254b98a2e',
          parameterMap: null,
        },
      ],
      loading: false,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null,
          },
          hideFirstLine: false,
        },
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null,
          },
        },
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80,
        },
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 },
      ],
      radarData: [],
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  created() {
    this.user = this.userInfo
    this.avatar = window._CONFIG['imgDomainURL'] + '/' + this.userInfo.avatar
    console.log('this.avatar :' + this.avatar)

    getRoleList().then((res) => {
      console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then((res) => {
      console.log('workplace -> call getServiceList()', res)
    })
  },
  mounted() {
    // this.getProjects()
    // this.getActivity()
    // this.getTeams()
    // this.initRadar()
  },
  methods: {
    ...mapGetters(['nickname']),
    getProjects() {
      this.$http
        .get(common.system + '/sysApplicaton/sysApplication/list?isAvailable=0&field=isAvailable')
        .then((res) => {
          this.projects = res.result && res.result.records
          this.loading = false
        })
    },
    getActivity() {
      this.$http.get(common.system + '/api/workplace/activity').then((res) => {
        this.activities = res.result
      })
    },
    getTeams() {
      this.$http.get(common.system + '/api/workplace/teams').then((res) => {
        this.teams = res.result
      })
    },
    initRadar() {
      this.radarLoading = true

      this.$http.get(common.system + '/api/workplace/radar').then((res) => {
        const dv = new DataSet.View().source(res.result)
        dv.transform({
          type: 'fold',
          fields: ['个人', '团队', '部门'],
          key: 'user',
          value: 'score',
        })

        this.radarData = dv.rows
        this.radarLoading = false
      })
    },
    goProjects(item) {
      var token = Vue.ls.get(ACCESS_TOKEN)
      var url =
        item.protocol +
        '://' +
        item.host +
        ':' +
        item.port +
        '?token=' +
        token +
        '&applicatonId=' +
        item.id +
        '&isReturn=' +
        item.isReturn
      window.open(url)
    },
  },
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
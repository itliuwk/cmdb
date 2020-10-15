import { Icon } from 'ant-design-vue';
import Vue from 'vue'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2046229_rrd3nfmpjpl.js',
});

Vue.component('IconFont', IconFont)
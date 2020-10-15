import Vue from 'vue'
import Print from './src/print.js';
Vue.directive('print', Print);



/**
基于 vue-print-nb



main.js   引用  import './directive/print/index'
使用方法


  指令`v-print`,默认打印整个窗口
  传入参数`v-print="'#id'"` , 参数为需要打印局部的盒子标识.



<div id="printMe" style="background:red;">
      <p>葫芦娃，葫芦娃</p>
      <p>一根藤上七朵花</p>
      <p>小小树藤是我家 啦啦啦啦</p>
      <p>叮当当咚咚当当 浇不大</p>
      <p>叮当当咚咚当当 是我家</p>
      <p>啦啦啦啦</p>
      <p>...</p>
    </div>

<button v-ylprint="#printMe">Print local range</button>



 */
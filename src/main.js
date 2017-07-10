// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/css/defined.postcss' // 注：
                               //   1.  在 webpack.prod.conf 中， utils.styleLoaders 生成了对 .postcss 文件的加载器
                               //   2.  不要在 App.vue 中 import，因为 vue-loader 只会只会把 import 部分不作处理放进源码
                               //       而且， vue-loader 处理出来的东西无法再使用其他 loader 进行处理。参见：https://segmentfault.com/a/1190000004944322
                               //   3.  要使 .postcss 被 postcss-loader 处理，需要做两件事：
                               //         1)  安装 postcss-loader 并 --save-dev 因为 vue-cli 没有安装
                               //         2)  在 utils.js 里修改 postcss: generateLoaders('postcss') 因为 vue-cli 没有加 'postcss'
                               //   4.  .postcss 文件在 vsc 中安装 postcss-syntax 进行高亮显示

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

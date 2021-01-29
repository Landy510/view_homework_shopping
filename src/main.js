// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';  // 引入overlay元件
import 'vue-loading-overlay/dist/vue-loading.css';  // 引入overlay元件
import 'bootstrap'
import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'



Vue.use(VueAxios, axios)
//Vue.use(VeeValidate);
Vue.config.productionTip = false
Vue.component('Loading', Loading);  // 啟用overlay元件
Vue.filter('currency', currencyFilter);  // 啟用fiter元件

VeeValidate.Validator.localize('zh_TW', zhTWValidate);

axios.defaults.withCredentials = true;
/* eslint-disable no-new */

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((reponse)=>{
      console.log(reponse.data.success);
      if(reponse.data.success){
        next();
      } else{
        next({
          path:'/login',
        })
      }
    })
  } else {
    next();
  }
  
})
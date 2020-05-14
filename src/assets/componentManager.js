/* eslint-disable no-unused-vars */
import Vue from 'vue'

export default () => {
    Vue.config.productionTip = false;

    const files = require.context('../components/', true, /\.vue$/i)
    files.keys().map(key => {
      const name = key.split('/')[key.split('/').length - 1].split('.')[0]
      console.log("Adding component: " + name);

      return Vue.component(name, files(key).default)
    })
  }


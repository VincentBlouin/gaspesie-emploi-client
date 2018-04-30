import moment from 'moment'
import Vue from 'vue'

moment.locale(
  'fr'
)
const dateUtil = {
  setup: function () {
    Vue.filter('date', function (value) {
      if (value) {
        return moment(String(value)).format('D MMMM YYYY, HH:mm:ss')
      }
    })
    Vue.filter('dayDate', dateUtil.getDayDate)
    dateUtil.refreshLocale()
  },
  refreshLocale: function () {

  },
  getDayDate: function (value) {
    if (value) {
      return moment(String(value)).format('D MMMM YYYY')
    }
  }
}

export default dateUtil

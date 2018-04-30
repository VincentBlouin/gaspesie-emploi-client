import Service from '@/service/service'

export default {
  list: function () {
    return Service.api().get('/employers')
  }
  // create: function (offer) {
  //   return Service.api().post(
  //     '/offers',
  //     offer
  //   )
  // },
  // update: function (offer) {
  //   return Service.api().put(
  //     '/offers/' + offer.id,
  //     offer
  //   )
  // },
  // get: function (offer) {
  //   return Service.api().get(
  //     '/offers/' + offer.id
  //   )
  // }
}

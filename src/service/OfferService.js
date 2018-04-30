import Service from '@/service/service'

export default {
  listAvailable: function () {
    return Service.api().get('/offers')
  },
  create: function (offer) {
    return Service.api().post(
      '/offers',
      offer
    )
  },
  update: function (offer) {
    return Service.api().put(
      '/offers/' + offer.id,
      offer
    )
  },
  get: function (offer) {
    return Service.api().get(
      '/offers/' + offer.id
    )
  },
  listForUser: function (user) {
    return Service.api().get(
      '/user-offers/' + user.id
    )
  }
}

import Service from '@/service/service'

export default {
  listAll: function () {
    return Service.api().get('/users')
  },
  listCandidates: function () {
    return Service.api().get('/candidates')
  },
  create: function (user) {
    return Service.api().post(
      '/users',
      user
    )
  },
  update: function (user) {
    return Service.api().put(
      '/users/' + user.id,
      user
    )
  },
  get: function (user) {
    return Service.api().get(
      '/users/' + user.id
    )
  }
}

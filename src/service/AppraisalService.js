import Service from '@/service/service'

export default {
  listForEmployerUser: function (user) {
    return Service.api().get('/user-employer-appraisals/' + user.id)
  },
  create: function (appraisal) {
    return Service.api().post(
      '/appraisals',
      appraisal
    )
  }
}

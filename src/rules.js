export default {
  required: function (value) {
    return !!value || 'requis'
  },
  email: function (value) {
    /* eslint-disable */
    if (!value) {
      return true
    }
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Courriel invalide'
  },
  integer: function (value) {
    var x = parseFloat(value)
    return (!isNaN(value) && (x | 0) === x) || 'Doit être un nombre entier'
  }
}

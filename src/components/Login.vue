<template>
  <panel title="Connexion" small="true">
    <v-alert v-if="error" icon="priority_high" value="true" color="error">
      Mauvais courriel ou mot de passe
    </v-alert>
    <v-form name="login" ref="form">
      <v-text-field
        name="email"
        label="courriel"
        required
        :rules="[rules.required, rules.email]"
        v-model="email"
      ></v-text-field>
      <br>
      <v-text-field
        name="password"
        label="password"
        type="password"
        required
        :rules="[rules.required]"
        v-model="password"
      ></v-text-field>
      <router-link to="/send-change-password-email" color="accent">
        Modifier votre mot de passe
      </router-link>
    </v-form>
    <v-btn
      @click="login()" color="secondary">
      Connecter
    </v-btn>
  </panel>
</template>

<script>
  import Rules from '@/rules'
  import AuthenticationService from '@/service/AuthenticationService'

  export default {
    data () {
      return {
        email: '',
        password: '',
        error: null,
        rules: Rules
      }
    },
    name: 'Login',
    methods: {
      login: function () {
        if (!this.$refs.form.validate()) {
          return
        }
        return AuthenticationService.login({
          email: this.email,
          password: this.password
        }).then(function (response) {
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: this.$store.state.baseComponent
          })
        }.bind(this)).catch(function (error) {
          this.error = error.response.data.error
        }.bind(this))
      }
    }
  }
</script>

<style scoped>

</style>

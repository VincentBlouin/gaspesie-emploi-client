<template>
  <panel title="Employeur">
    <v-card>
      <v-card-text>
        <v-form name="userForm" ref="userForm">
          <v-text-field
            label="Courriel"
            v-model="user.email"
            :rules="[rules.required]"
          />
          <v-text-field
            label="Prénom"
            v-model="user.firstName"
            :rules="[rules.required]"
          />
          <v-text-field
            label="Nom"
            v-model="user.lastName"
            :rules="[rules.required]"
          />
          <v-text-field
            label="Téléphone"
            v-model="user.telephone"
            :rules="[rules.required]"
          />
          <v-radio-group v-model="user.status">
            <p>Type</p>
            <v-radio
              label="Candidat"
              value="recruitee"
            ></v-radio>
            <v-radio
              label="Employeur"
              value="recruiter"
            ></v-radio>
            <v-radio
              label="Admin"
              value="admin"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            label="Profil du candidat"
            v-model="user.candidateProfile"
            v-if="user.status === 'recruitee'"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="create()" v-if="isCreate">
          Ajouter
        </v-btn>
        <v-btn color="primary" @click="edit()" v-if="!isCreate">
          Modifier
        </v-btn>
      </v-card-actions>
    </v-card>
  </panel>
</template>

<script>
  import UserService from '@/service/UserService'
  import Rules from '@/rules'

  export default {
    name: 'User',
    data () {
      return {
        user: {},
        rules: Rules
      }
    },
    methods: {
      create: function () {
        if (!this.$refs.userForm.validate()) {
          return
        }
        UserService.create(this.user).then(function (response) {
          this.user = response.data
          this.$router.push({
            path: '/usagers'
          })
        }.bind(this))
      },
      edit: function () {
        if (!this.$refs.userForm.validate()) {
          return
        }
        UserService.update(this.user).then(function () {
          this.$router.push({
            path: '/usagers'
          })
        }.bind(this))
      }
    },
    computed: {
      isCreate: function () {
        return this.user.id === undefined
      }
    },
    mounted: function () {
      this.user.id = this.$route.params.userId
      if (!this.user.id) {
        return
      }
      UserService.get(this.user).then(function (response) {
        this.user = response.data
      }.bind(this))
    }
  }
</script>

<style scoped>

</style>

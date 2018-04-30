<template>
  <panel title="Usagers">
    <v-card>
      <!--<v-card-actions v-if="isAdmin">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn icon color="primary" dark @click="addOffer()" large>-->
          <!--<v-icon>add</v-icon>-->
        <!--</v-btn>-->
      <!--</v-card-actions>-->
      <v-card-title>
        <v-text-field
          append-icon="search"
          label="Chercher"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        hide-actions
        disable-initial-sort
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <td>
            {{props.item.fullName}}
          </td>
          <td>
            <span v-if="props.item.status === 'admin'">
              Admin
            </span>
            <span v-if="props.item.status === 'recruiter'">
              Employeur
            </span>
            <span v-if="props.item.status === 'recruitee'">
              Candidat
            </span>
          </td>
          <td>
            {{ props.item.createdAt | dayDate}}
          </td>
          <td>
            <v-btn icon class="mx-0" @click="editUser(props.item)">
              <v-icon color="secondary">edit</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </panel>
</template>

<script>
  import UserService from '@/service/UserService'

  export default {
    name: 'Users',
    data () {
      return {
        users: [],
        pagination: {
          sortBy: 'createdAt',
          descending: true,
          rowsPerPage: -1
        },
        search: '',
        headers: [
          {
            text: 'Nom',
            value: 'fullName'
          },
          {
            text: 'Statut',
            value: 'status'
          },
          {
            text: 'Date',
            value: 'createdAt'
          },
          {
            text: '',
            value: ''
          }
        ]
      }
    },
    mounted: function () {
      UserService.listAll().then(function (users) {
        this.users = users.data.map(function (user) {
          user.fullName = user.firstName + ' ' + user.lastName
          return user
        })
      }.bind(this))
    },
    methods: {
      addOffer: function () {
        this.$router.push({
          name: 'AddOffer'
        })
      },
      editUser: function (user) {
        this.$router.push({
          path: '/usager/' + user.id
        })
      }
    }
  }
</script>

<style scoped>

</style>

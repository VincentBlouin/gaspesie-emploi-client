<template>
  <panel title="Employeurs">
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
        :items="employers"
        :search="search"
        hide-actions
        disable-initial-sort
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <td>
            {{props.item.name}}
          </td>
          <td>
            {{props.item.city}}
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
  import EmployerService from '@/service/EmployerService'

  export default {
    name: 'Employers',
    data () {
      return {
        employers: [],
        pagination: {
          sortBy: 'createdAt',
          descending: true,
          rowsPerPage: -1
        },
        search: '',
        headers: [
          {
            text: 'Nom',
            value: 'name'
          },
          {
            text: 'Ville',
            value: 'city'
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
      EmployerService.list().then(function (response) {
        this.employers = response.data
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

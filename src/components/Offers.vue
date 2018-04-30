<template>
  <panel title="Offres">
    <v-card>
      <v-card-actions v-if="isAdmin">
        <v-spacer></v-spacer>
        <v-btn icon color="primary" dark @click="addOffer()" large>
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
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
        :items="offers"
        :search="search"
        hide-actions
        disable-initial-sort
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <td>
            {{props.item.title}}
          </td>
          <td>
            {{ props.item.createdAt | dayDate}}
          </td>
          <td v-if="isAdmin">
            <v-btn icon class="mx-0" @click="editOffer(props.item)">
              <v-icon color="secondary">edit</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </panel>
</template>

<script>
  import OfferService from '@/service/OfferService'

  export default {
    name: 'Offers',
    data () {
      return {
        offers: [],
        pagination: {
          sortBy: 'createdAt',
          descending: true,
          rowsPerPage: -1
        },
        search: ''
      }
    },
    mounted: function () {
      OfferService.listAvailable().then(function (offers) {
        this.offers = offers.data
      }.bind(this))
    },
    methods: {
      addOffer: function () {
        this.$router.push({
          name: 'AddOffer'
        })
      },
      editOffer: function (offer) {
        this.$router.push({
          path: '/offre/' + offer.id
        })
      }
    },
    computed: {
      isAdmin: function () {
        return this.$store.state.user.status === 'admin'
      },
      headers: function () {
        const headers = [
          {
            text: 'Titre',
            value: 'title'
          },
          {
            text: 'Date',
            value: 'createdAt'
          }
        ]
        if (this.isAdmin) {
          headers.push({
            text: '',
            value: ''
          })
        }
        return headers
      }
    }
  }
</script>

<style scoped>

</style>

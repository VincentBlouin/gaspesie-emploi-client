<template>
  <panel title="Match" v-if="loaded">
    <v-carousel style="height:100%" :cycle="false" interval="999999999999" hide-delimiters light :value="carouselIndex">
      <v-carousel-item v-for="(offer,i) in offers" :key="i">
        <v-card>
          <v-card-actions>
            <v-btn icon large color="primary" class="ml-4" @click="dislike(offer)">
              <v-icon>
                thumb_down
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn large icon color="primary" class="mr-4" @click="like(offer)">
              <v-icon>
                thumb_up
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-title>
            <h4 class="display-1">
              {{offer.title}}
            </h4>
          </v-card-title>
          <v-card-text>
            <v-list two-line>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon color="secondary">business</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{offer.Employer.name}}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon color="secondary">today</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{offer.dateOfHiring | dayDate}}, date d'embauche
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon color="secondary">schedule</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <span v-if="offer.hoursType === 'full'">
                    Temps plein
                  </span>
                  <span v-if="offer.hoursType === 'part time'">
                    Temps partiel
                  </span>
                  <span v-if="offer.hoursType === 'custom'">
                    {{offer.nbHours}}
                  </span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="" v-if="offer.type">
                <v-list-tile-action>
                  <v-icon color="secondary">date_range</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <span v-if="offer.type === 'seasonal'">
                    Saisonnier
                  </span>
                  <span v-if="offer.type === 'student'">
                    Emploi étudiant
                  </span>
                  <span v-if="offer.type === 'onCall'">
                    Sur appel
                  </span>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <p>{{offer.details}}</p>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <v-dialog v-if="showMatch" v-model="showMatch" width="600px">
      <v-card class="">
        <v-card-title class="subheading text-xs-center" style="justify-content: center">
          <v-icon color="primary" large class="text-xs-center" style="font-size:125px !important;">favorite</v-icon>
        </v-card-title>
        <v-card-text class="text-xs-center">
          <h3>MATCH !</h3>
          <v-list two-line>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="secondary">business</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{matchEmployer.name}}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="secondary">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{matchEmployer.telephone}}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="secondary">email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{matchEmployer.email}}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="secondary">location_city</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{matchEmployer.city}}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="secondary">store</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{matchEmployer.address}}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat
                 @click.native="showMatch = false;">
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </panel>
</template>

<script>
  import OfferService from '@/service/OfferService'
  import AppraisalService from '@/service/AppraisalService'
  export default {
    name: 'OffersMatch',
    data () {
      return {
        loaded: false,
        offers: [],
        showMatch: false,
        matchEmployer: null,
        carouselIndex: 0
      }
    },
    mounted: function () {
      OfferService.listAvailable().then(function (offers) {
        this.offers = offers.data
        this.loaded = true
      }.bind(this))
    },
    methods: {
      like: function (offer) {
        AppraisalService.create({
          'value': 'like',
          'OfferId': offer.id
        })
        const hasMatch = offer.appraisals.some(function (appraisal) {
          return appraisal.value === 'like' && appraisal.subjectId === this.$store.state.user.id
        }.bind(this))
        if (hasMatch) {
          this.matchEmployer = offer.Employer
          this.showMatch = true
        } else {
          this.incrementIndex()
        }
      },
      dislike: function (offer) {
        AppraisalService.create({
          'value': 'dislike',
          'OfferId': offer.id
        })
        this.incrementIndex()
      },
      incrementIndex: function () {
        if (this.carouselIndex === this.getFilteredOffers().length) {
          this.carouselIndex = 0
        } else {
          this.carouselIndex++
        }
      },
      getFilteredOffers: function () {
        return this.offers
      }
    }
  }
</script>

<style scoped>

</style>

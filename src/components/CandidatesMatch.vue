<template>
  <panel title="Match" v-if="loaded">
    <v-select
      class="text-xs-center"
      :items="yourOffers"
      v-model="selectedOffer"
      label="Votre offre"
      single-line
    ></v-select>
    <v-carousel style="height:100%" :cycle="false" interval="999999999999" hide-delimiters light :value="carouselIndex">
      <v-carousel-item v-for="(candidate,i) in getFilteredCandidates()" :key="i">
        <v-card class="text-xs-center">
          <v-card-actions>
            <v-btn icon large color="primary" class="ml-4" @click="dislike(candidate)" v-if="selectedOffer">
              <v-icon>
                thumb_down
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn large icon color="primary" class="mr-4" @click="like(candidate)" v-if="selectedOffer">
              <v-icon>
                thumb_up
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-title class="text-xs-center" style="justify-content: center">
            <h4 class="display-1">
              {{candidate.firstName}} {{candidate.lastName}}
            </h4>
          </v-card-title>
          <v-card-text>
            <p class="subheading">
              {{candidate.candidateProfile}}
            </p>
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
          {{matchCandidate.firstName}} {{matchCandidate.lastName}}
          <v-list two-line>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="secondary">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{matchCandidate.telephone}}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="secondary">email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{matchCandidate.email}}
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
  import UserService from '@/service/UserService'
  import AppraisalService from '@/service/AppraisalService'
  import OfferService from '@/service/OfferService'

  export default {
    name: 'CandidatesMatch',
    data() {
      return {
        loaded: false,
        candidates: [],
        appraisals: [],
        showMatch: false,
        matchCandidate: null,
        carouselIndex: 0,
        yourOffers: [],
        selectedOffer: null
      }
    },
    mounted: function () {
      OfferService.listForUser(this.$store.state.user).then(function (response) {
        this.yourOffers = response.data.map(function (offer) {
          offer.text = offer.title
          return offer
        })
        AppraisalService.listForEmployerUser(this.$store.state.user).then(function (response) {
          this.appraisals = response.data
        }.bind(this))
      }.bind(this)).then(function () {
        return UserService.listCandidates()
      }).then(function (response) {
        this.candidates = response.data
        this.loaded = true
      }.bind(this))
    },
    methods: {
      like: function (candidate) {
        AppraisalService.create({
          'value': 'like',
          'subjectId': candidate.id,
          'OfferId': this.selectedOffer.id
        })
        const hasMatch = this.appraisals.some(function (appraisal) {
          return appraisal.value === 'like' && appraisal.judgeId === candidate.id
        })
        if (hasMatch) {
          this.matchCandidate = candidate
          this.showMatch = true
        } else {
          this.incrementIndex()
        }
      },
      dislike: function (candidate) {
        AppraisalService.create({
          'value': 'like',
          'subjectId': candidate.id,
          'OfferId': this.selectedOffer.id
        })
        this.incrementIndex()
      },
      incrementIndex: function () {
        if (this.carouselIndex === this.getFilteredCandidates().length) {
          this.carouselIndex = 0
        } else {
          this.carouselIndex++
        }
      },
      getFilteredCandidates: function () {
        return this.candidates
      }
    }
  }
</script>

<style scoped>

</style>

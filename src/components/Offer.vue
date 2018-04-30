<template>
  <panel title="Offre">
    <v-card>
      <v-card-text>
        <v-form name="offerForm" ref="offerForm">
          <v-text-field
            label="Titre du poste"
            v-model="offer.title"
            :rules="[rules.required]"
          />
          <v-select
            :items="employers"
            v-model="offer.EmployerId"
            label="Employeur"
            single-line
            item-value="id"
            :rules="[rules.required]"
          ></v-select>
          <p>
            Date d’embauche
          </p>
          <v-date-picker v-model="offer.dateOfHiring" locale="fr">
          </v-date-picker>
          <v-text-field
            label="Salaire"
            v-model="offer.salary"
            :rules="[rules.required]"
          />
          <v-radio-group v-model="offer.hoursType">
            <p>Nombre d’heures</p>
            <v-radio
              label="Temps plein"
              value="full"
            ></v-radio>
            <v-radio
              label="Temps partiel"
              value="part time"
            ></v-radio>
            <v-radio
              label="Précisez"
              value="custom"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            label="Nombre d’heures"
            v-model="offer.nbHours"
            v-if="offer.hoursType === 'custom'"
          />

          <v-radio-group v-model="offer.type">
            <p>Type d’emploi</p>
            <v-radio
              label="Saisonnier"
              value="seasonal"
            ></v-radio>
            <v-radio
              label="Emploi-étudiant"
              value="student"
            ></v-radio>
            <v-radio
              label="Sur appel"
              value="onCall"
            ></v-radio>
          </v-radio-group>

          <v-radio-group v-model="offer.requirements">
            <p>Exigences particulières</p>
            <v-radio
              label="Secourisme"
              value="firstAid"
            ></v-radio>
            <v-radio
              label="Santé et sécurité sur un chantier"
              value="constructionSecurity"
            ></v-radio>
            <v-radio
              label="Permis de conduire classe V"
              value="driverLicenseClassV"
            ></v-radio>
            <v-radio
              label="Permis de conduire autres classes"
              value="driverLicenseOtherClass"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            label="Description"
            v-model="offer.details"
            multi-line
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
  import OfferService from '@/service/OfferService'
  import Rules from '@/rules'
  import moment from 'moment'
  import EmployerService from '@/service/EmployerService'
  export default {
    name: 'Offer',
    data () {
      return {
        offer: {
          dateOfHiring: null
        },
        rules: Rules,
        employers: []
      }
    },
    methods: {
      create: function () {
        if (!this.$refs.offerForm.validate()) {
          return
        }
        OfferService.create(this.offer).then(function (response) {
          this.offer = response.data
          this.$router.push({
            path: '/offres'
          })
        }.bind(this))
      },
      edit: function () {
        if (!this.$refs.offerForm.validate()) {
          return
        }
        OfferService.update(this.offer).then(function () {
          this.$router.push({
            path: '/offres'
          })
        }.bind(this))
      }
    },
    computed: {
      isCreate: function () {
        return this.offer.id === undefined
      }
    },
    mounted: function () {
      EmployerService.list().then(function (response) {
        this.employers = response.data.map(function (employer) {
          employer.text = employer.name
          return employer
        })
      }.bind(this))
      this.offer.id = this.$route.params.offerId
      if (!this.offer.id) {
        return
      }
      OfferService.get(this.offer).then(function (response) {
        this.offer = response.data
        this.offer.dateOfHiring = moment(this.offer.dateOfHiring).format('YYYY-MM-DD')
      }.bind(this))
    }
  }
</script>

<style scoped>

</style>

<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      v-if="this.$store.state.user"
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in menuItems"
          :key="i"
          @click="goTo(item.path)"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{item.title}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      dark
      color="primary"
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon v-if="this.$store.state.user" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!--<v-btn icon @click.stop="miniVariant = !miniVariant">-->
      <!--<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>-->
      <!--</v-btn>-->
      <!--<v-btn icon @click.stop="clipped = !clipped">-->
      <!--<v-icon>web</v-icon>-->
      <!--</v-btn>-->
      <!--<v-btn icon @click.stop="fixed = !fixed">-->
      <!--<v-icon>remove</v-icon>-->
      <!--</v-btn>-->
      <!--<a href="#" class="no-style-link">-->
      <!--<img :src=  "require('@/assets/image.png')" class="mr-2" height="38px;" style="vertical-align: middle">-->
      <!--</a>-->
      <v-toolbar-title dark>
        Gaspésie Emploi
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" v-if="this.$store.state.user">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
      v-if="this.$store.state.user"
    >

      <v-list>
        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Déconnecter
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span></span>
    </v-footer>
  </v-app>
</template>

<script>
  const loggedOutOnlyPages = ['Login', 'Register', 'ForgotPassword', 'ChangePassword', 'SendChangePasswordEmail']
  export default {
    data () {
      // i18n.i18next.addResources('en', 'header', {
      //   title: 'Self service basket Potagers Partagés',
      //   logout: 'Logout',
      //   requestError: 'There\'s a connection problem with our server. Try again later.',
      //   subscriber: 'Subscribers',
      //   products: 'Products',
      //   transactions: 'Transactions',
      //   accountStatement: 'Account statement',
      //   transaction: 'Transaction'
      // })
      // i18n.i18next.addResources('fr', 'header', {
      //   title: 'Panier libre service Potagers Partagés',
      //   logout: 'Déconnexion',
      //   requestError: 'Il y a un problème de connexion avec notre serveur. Essayez de nouveau plus tard.',
      //   subscriber: 'Abonnés',
      //   products: 'Produits',
      //   transactions: 'Transactions',
      //   accountStatement: 'Relevé de compte',
      //   transaction: 'Transaction'
      // })
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'assignment',
          title: 'Offres',
          path: '/offres'
        }, {
          icon: 'people',
          title: 'Usagers',
          path: '/usagers'
        }, {
          icon: 'business',
          title: 'Employeurs',
          path: '/employeurs'
        }],
        candidateItems: [{
          icon: 'favorite',
          title: 'Match',
          path: '/offres-match'
        }, {
          icon: 'assignment',
          title: 'Offres',
          path: '/offres'
        }, {
          icon: 'person',
          title: 'Mon profil',
          path: '/client-transaction'
        }],
        employerItems: [{
          icon: 'favorite',
          title: 'Match',
          path: '/candidats-match'
        }, {
          icon: 'assignment',
          title: 'Vos offres',
          path: '/vos-offres'
        }, {
          icon: 'business',
          title: 'Vos entreprises',
          path: '/client-transaction'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },
    name: 'App',
    methods: {
      logout: function () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        window.location.href = '/login'
      },
      redirectToBasePage: function () {
        if (window.location.pathname !== '/') {
          return
        }
        this.$router.push({
          name: this.$store.state.baseComponent
        })
      },
      redirectIfOnWrongPage: function () {
        const isOnLoggedOutOnlyPage = loggedOutOnlyPages.indexOf(this.$route.name) !== -1
        const isLoggedInAndOnWrongPage = this.$store.state.isUserLoggedIn && isOnLoggedOutOnlyPage
        const isLoggedOutAndOnWrongPage = !this.$store.state.isUserLoggedIn && !isOnLoggedOutOnlyPage
        if (isLoggedInAndOnWrongPage || isLoggedOutAndOnWrongPage) {
          this.$router.push({
            name: this.$store.state.baseComponent
          })
        }
      },
      goTo: function (path) {
        this.$router.push({
          path: path
        })
      }
    },
    mounted: function () {
      this.redirectToBasePage()
      this.redirectIfOnWrongPage()
    },
    beforeUpdate: function () {
      this.redirectIfOnWrongPage()
    },
    computed: {
      menuItems: function () {
        if (!this.$store.state.user) {
          return
        }
        switch (this.$store.state.user.status) {
          case 'admin':
            return this.items
          case 'recruitee':
            return this.candidateItems
          case 'recruiter':
            return this.employerItems
        }
      }
    }
  }
</script>

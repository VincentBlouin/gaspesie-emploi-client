<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center justify-center>
        <v-flex :md8="small" :md12="!small" xs12>
          <div class="white elevation-2">
            <v-toolbar flat dense color="secondary" dark  >
              <v-toolbar-title>
                {{title}}
              </v-toolbar-title>
            </v-toolbar>
            <div class="pl-4 pr-4 pt-2 pb-2">
              <slot>
                {{noContent || 'Pas de contenu'}}
              </slot>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    name: 'panel',
    props: [
      'title',
      'noContent',
      'small'
    ]
  }
</script>

<style scoped>

</style>

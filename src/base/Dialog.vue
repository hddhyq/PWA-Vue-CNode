<template>
<div>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span>{{title}}</span>
      </v-card-title>
      <v-btn icon siot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'Dialog',
  props: {
    dialog: {

    },
    title: {

    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
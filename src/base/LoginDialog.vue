<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <!-- <v-card-title class="headline">Use Google's location service?</v-card-title> -->
        <v-card-text>是否立即登录</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" flat @click.native="cancel">取消</v-btn>
          <v-btn color="green darken-1" flat @click.native="confirm">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'LoginDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancel() {
      this.$emit('hasClick')
    },
    confirm() {
      this.$emit('hasClick')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

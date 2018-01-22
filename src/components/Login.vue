<template>
<div class="login">
    <div class="login-input">
      <v-text-field label="AccessToken，微信扫描后再复制粘贴" v-model="accessToken" :counter="36" required></v-text-field>
      <v-btn color="blue" block dark @click.native="login">登录</v-btn>
    </div>
    <div>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>{{dialogTitle}}</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="blue" flat @click.stop="dialog=false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import { getLogin } from '@/api/index'
export default {
  name: 'Login',
  data() {
    return {
      accessToken: '',
      dialog: false,
      dialogTitle: ''
    }
  },
  methods: {
    login() {
      if (this.accessToken === '') {
        this.dialogTitle = 'accesstoken不能为空，请输入acesstoken!'
        this.dialog = true
        return
      }
      getLogin(this.accessToken).then((res) => {
        if (res.success) {
          const user = {
            name: res.loginname,
            avatarUrl: res.avatar_url,
            userId: res.id,
            token: this.accessToken
          }
          window.localStorage.setItem('user', JSON.stringify(user))
          this.setUserInfo(user)
          this.$router.back()
        }
      }).catch(e => {
        this.dialogTitle = '很遗憾，登录失败　:(，请检查accesstoken'
        this.dialog = true
      })
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO'
    })
  }
}
</script>
<style lang="stylus" scoped>
.login
    display: flex; 
    justify-content: center; 
    align-items: center;
    height: 100%
  .login-input
      width 80%
</style>

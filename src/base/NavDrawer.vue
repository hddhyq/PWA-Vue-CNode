<template>
  <div class="">
    <v-card tile fixed flat color="primary" dark height="160px">
      <v-container v-show="!login" class="avatar-container">
        <div>
          <v-avatar size="80px" class="elevation-5">
            <img src="https://avatars0.githubusercontent.com/u/24468747?v=4&s=460" alt="">
          </v-avatar>
        </div>
        <div class="text">
          <span>hddhyqsadfsdf</span>
        </div>
      </v-container>
      <v-container v-show="login" class="avatar-container">
        <div>
          <v-btn round color="primary lighten-3" dark>立即登录</v-btn>
        </div>
      </v-container>
    </v-card>
    <v-list>
      <v-list-tile v-for="item in sidebars" :key="item.title" @click="selectPage(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'NavDrawer',
  data() {
    return {
      sidebars: [
        {
          title: '个人中心',
          icon: 'account_circle'
        },
        {
          title: '我的收藏',
          icon: 'stars'
        },
        {
          title: '我的消息',
          icon: 'message'
        },
        {
          title: '关于',
          icon: 'info'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.avatar-container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100%
  .text
    margin: 10px auto
</style>

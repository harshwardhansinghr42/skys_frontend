<template>
  <div id="app">
    <div class="logout" :class="logout_display">
      <img alt="logout" src="./assets/logout.png" title="logout" v-on:click="sessionExpire" >
    </div>
    <div>
      <img alt="logo" src="./assets/logo.png">
    </div>
    <router-view />
  </div>
</template>

<script>
import { utilFunctionService } from "@/utils/utils.service"
export default {
  name: 'App',
  mounted(){
    if (utilFunctionService.getLocalStorageService("AuthenticationToken")) {
      this.logout_display = 'd-block'
    }
    else{
      this.logout_display = 'd-none'
    }
  },
  data() {
    return {
      logout_display: 'd-none'
    }
  },
  methods: {
    sessionExpire: function(){
      if(confirm("Are you sure you want to logout?")){
        utilFunctionService.sessionExpire()
        this.logout_display = 'd-none'
        this.$router.replace({ name: "login" });
      }
    }
  }
}
</script>

<style>
@import './styles/application.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logout{
  text-align: right;
  margin-right: 30px;
}
.logout img{
  cursor: pointer;
}
.logout span {
  display: none;
}
img:hover span {display: block; }
</style>

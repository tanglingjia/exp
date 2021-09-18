<template>
  <div id="app">
    <div id="menuList" class="menuList" :style="{'margin-left':'10px','margin-top':'10px',width:'120px',height:'50px',border:'5px'}">
        <select v-model="selected" @change="changeHref(parseInt(selected))">
          <option value="1">asyncupdatedqueue</option>
          <option value="2">elementuitablesort</option>
          <option value="3">draganddrop</option>
          <option value="4">rolling</option>
          <option value="5">draganddropad</option>
          <option value="6">echartgeomap</option>
          <option value="7">groupmodule</option>
          <option value="8">echarttooltip</option>
        </select>
     </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    changeHref: function (sortnum) {
      switch (sortnum) {
        case 1: this.$router.push({path: '/asyncupdatedqueue'}); break;
        case 2: this.$router.push({path: '/elementuitablesort'}); break;
        case 3: this.$router.push({path: 'draganddrop'}); break;
        case 4: this.$router.push({path: '/rolling'}); break;
        case 5: this.$router.push({path: '/draganddropad'}); break;
        case 6: this.$router.push({path: '/echartgeomap'}); break;
        case 7: this.$router.push({path: '/groupmodule'}); break;
        case 8: this.$router.push({path: '/echarttooltip'}); break;
      }
    }
   }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
}
#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <button @click="changeVariable">
    test
  </button>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'show time'
    }
  },
  methods: {
    changeVariable () {
      this.msg = (new Date()).getTime().toString()
      this.$nextTick(function () {
        console.log(this.msg)
      })
      this.msg = 'show time'
    }
  },
  watch: {
    msg (newValue) {
      console.log(newValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

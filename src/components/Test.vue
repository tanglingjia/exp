<template>
  <div>
    {{ `${isMe ? 'lingjia' : 'nobody'}, hello`}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMe: true
    }
  },
  computed: {
  },
  methods: {
    declareVar () {
      let myName = 'lingjia'
      myName = 'Tanglingjia'
      console.log(myName)
      const staticName = 'lingjia'
      // staticName = 'Tanglingjia'
      console.log(staticName)
    },
    multipleParas (num, ...remains) {
      console.log(num)
      console.log(remains)
    },
    defaultParas (firstName, lastName = 'Tang') {
      console.log(`${firstName} ${lastName}`)
    },
    sortAll () {
      const myArr = [4, 2, 1, 9, 10]
      myArr.sort((a1, a2) => a1 - a2)
      myArr.forEach(a => console.log(a))
    },
    *generator () {
      let id = 0
      while (true) {
        yield ++id
      }
    }
  },
  mounted () {
    this.declareVar()
    this.multipleParas(1, 2, 3, 4, 5)
    this.defaultParas('lingjia')
    this.sortAll()
    const myGenerator = this.generator()
    console.log(myGenerator.next())
    console.log(myGenerator.next())
  }
}
</script>
<style>
</style>

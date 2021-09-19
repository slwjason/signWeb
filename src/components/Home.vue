<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
export default {
  inject:['reload'],
  name: 'Home',
  components: {NavMenu},
  data(){
    return {
      num:1
    }
  },
  mounted(){


  }
}
</script>

<style scoped>

</style>

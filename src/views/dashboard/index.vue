<template>
  <div class="homeBox">
    <components :is="componentOn" />
  </div>
</template>

<script>
import adminComponent from './admin'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userName']),
    componentOn() {
      return 'adminComponent'
    }
  },
  components: {
    adminComponent
  }
}
</script>

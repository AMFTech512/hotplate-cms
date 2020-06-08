<template>
  <div class="reg-pg-index">
      I am a Regular Page index.
  </div>
</template>

<script>
import database from '@/firebase/firestore.js';
import { RegularPages } from '@/pages/index.js';

export default {
  data() {
    return {
      isLoading: true
    }
  }
}
</script>

<style>

</style>
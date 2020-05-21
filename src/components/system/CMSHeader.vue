<template>
  <h2>{{ headerTxt }}</h2>
</template>

<script>
export default {
    name: 'CMSHeader',
    props: {
        props: {
            type: Object,
            default: function() {
                return {
                    headerTxt: 'Header'
                }
            }
        }
    }
}
</script>

<style>

</style>
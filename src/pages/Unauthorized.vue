<template>
    <div id="unauth-page">
        <v-alert type="error">
            Oops! It looks like you are unauthorized to view this page. Please sign in with a webmaster account.
        </v-alert>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.commit('setPageTitle', 'Unauthorized');
    }
}
</script>

<style lang="scss">

#unauth-page {
    padding: 20px;
}

</style>
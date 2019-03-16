<template>
    <div>
        <div>
            <router-link :to="{name:'publish'}">publish</router-link>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ManageHome"
    }
</script>

<style scoped>

</style>
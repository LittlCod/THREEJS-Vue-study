<template>
    <div>
        <RouterView></RouterView>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';

</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

canvas {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
}
</style>

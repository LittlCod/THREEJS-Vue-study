<template>
    <div class="menu">
        <div class="item" v-for="item in asyncRoutes.slice(1)" @click="go(item)">
            {{ item.meta.title }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import asyncRoutes from "@/router/asyncRoutes";

const $router = useRouter();
const go = item => {
    $router.push(item.path);
};
</script>

<style lang="scss" scoped>
.menu{
    margin: 50px 150px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    .item{
        padding: 20px;
        background-color: brown;
        text-align: center;
        cursor: pointer;
        color: aliceblue;
    }
}
</style>

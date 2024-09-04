<!-- src/components/HomePage.vue -->
<template>
    <div>
        <h1>ホームページ</h1>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'

export default {
    name: "HomePage",
    components: {
        HelloWorld
    }
};
</script>
<!-- src\components\NewItem.vue -->
<template>
    <div>
        <h1>{{ pageTitle }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        pageTitle: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
h1 {
    color: black;
}
</style>
<!-- src/components/companyPage.vue -->
<template>
    <div>
        <h1>{{ pageTitle }}</h1>
        <p>{{ pageContent }}</p>
    </div>
</template>

<script>
export default {
    props: {
        pageTitle: {
            type: String,
            required: true,
        },
        pageContent: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.company-page {
    text-align: center;
}

.company-page h1 {
    margin-top: 0;
}
</style>
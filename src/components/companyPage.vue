<!-- /src/CompanyPage.vue -->
<template>
    <div class="company-page">
        <h1>{{ pageTitle }}</h1>
        <div v-html="pageContent"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        pageTitle: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            pageContent: '', // データプロパティとして定義
            apiUrl: process.env.VUE_APP_API_URL
        };
    },
    async created() {
        console.log('API URL:', this.apiUrl);
        try {
            const apiUrl = process.env.VUE_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/pages/${encodeURIComponent(this.pageTitle)}`);
            console.log('API Response:', response.data); // 追加
            this.pageContent = response.data.content;
        } catch (error) {
            console.error('Error fetching page content:', error);
            this.pageContent = 'ページの内容を取得できませんでした。';
        }
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

.company-page div {
    text-align: left;
    margin-top: 20px;
}
</style>
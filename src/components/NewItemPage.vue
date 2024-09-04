<!-- src/components/NewItemPage.vue -->
<template>
    <div>
        <h2>新規項目の作成</h2>
        <form @submit.prevent="registerPage">
            <div>
                <label for="title">タイトル:</label>
                <input type="text" v-model="title" id="title" required />
            </div>
            <div>
                <label for="content">本文:</label>
                <textarea v-model="content" id="content" required></textarea>
            </div>
            <button type="submit">登録</button>
        </form>
    </div>
</template>

<script>
import emitter from '../eventBus';

export default {
    data() {
        return {
            title: "",
            content: "",
        };
    },
    methods: {
        registerPage() {
            if (this.title.trim() && this.content.trim()) {
                // 'add-page' イベントを発火
                emitter.emit("add-page", {
                    title: this.title.trim(),
                    content: this.content.trim(),
                });
                // 入力フィールドをクリア
                this.title = "";
                this.content = "";
                // 登録後にホームページにリダイレクト
                this.$router.push("/");
            }
        },
    },
};
</script>
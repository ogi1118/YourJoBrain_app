<!-- src\components\NewItemPage.vue -->
<template>
    <div class="form-container">
        <h2>新規項目の作成</h2>
        <form @submit.prevent="registerPage">
            <div>
                <label for="title">会社名:</label>
                <input type="text" v-model="title" id="title" required class="fixed-width-input" />
            </div>
            <div>
                <label for="content">memo:</label>
                <EditorContent :editor="editor" class="editor-content fixed-width-editor" />
            </div>
            <button type="submit" class="submit-button">登録</button>
        </form>
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import emitter from '../eventBus';
import axios from 'axios';

export default {
    components: {
        EditorContent,
    },
    data() {
        return {
            title: '',
            editor: null,
        };
    },
    mounted() {
        this.editor = new Editor({
            extensions: [StarterKit],
            content: '',
        });
    },
    methods: {
        async registerPage() {
        const content = this.editor.getHTML();
        console.log('Sending data:', { title: this.title, content });  // ログで確認

        try {
            const apiUrl = process.env.VUE_APP_API_URL;
            const response = await axios.post(`${apiUrl}/api/pages`, {
                title: this.title,
                content: content,
            });
            emitter.emit('add-page', {
                title: this.title,
                content: content,
            });
            this.$router.push(`/${encodeURIComponent(this.title)}`);
            console.log('Page created:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    },
    },
};
</script>


<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fixed-width-input {
    width: 400px;
    /* 固定幅の設定 */
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.fixed-width-editor {
    width: 400px;
    /* エディタの幅も同じに設定 */
    min-height: 200px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
}

.submit-button {
    width: 100px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>

<template>
  <div class="appsidebar">
    <header>
      <button type="button" class="mypage-button">マイページ</button>
    </header>
    <ul>
      <li><router-link to="/">ホーム</router-link></li>
      <li v-for="page in pages" :key="page.title">
        <router-link :to="`/${encodeURIComponent(page.title)}`">{{ page.title }}</router-link>
      </li>
      <li><router-link to="/new-item">新規項目</router-link></li>
    </ul>
    <footer>
      <button class="setting-button">設定</button>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import emitter from '../eventBus';

export default {
  data() {
    return {
      pages: [],
    };
  },
  async created() {
    try {
      const apiUrl = process.env.VUE_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/pages`);  // APIからページリストを取得
      this.pages = response.data;

      this.pages.forEach(page => {
        this.addRoute(page);
      });

      // 'add-page' イベントをリッスン
      emitter.on('add-page', this.addPage);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  },
  beforeUnmount() {
    emitter.off('add-page', this.addPage);
  },
  methods: {
    addPage(newPage) {
      // タイトルの重複をチェック
      if (this.pages.find(page => page.title === newPage.title)) {
        alert('同じタイトルのページが既に存在します。');
        return;
      }
      this.pages.push(newPage);
      this.addRoute(newPage);
    },
    addRoute(page) {
      const path = `/${encodeURIComponent(page.title)}`;
      this.$router.addRoute({
        path: path,
        name: page.title,
        component: () => import('@/components/CompanyPage.vue'),
        props: { pageTitle: page.title }, // propsを渡す
      });
    },
  },
};
</script>

<style scoped>
.appsidebar {
  height: 100%;
  background-color: #f4f4f4;
  padding: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.setting-button {
  width: 100%;
  padding: 10px;
  background-color: #9f9c9c;
  color: #fff;
  text-align: center;
  border: none;
}

.mypage-button {
  width: 100%;
  background-color: #9f9c9c;
  color: #fff;
  height: 60px;
  border: none;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
}

ul::-webkit-scrollbar {
  width: 6px;
}

ul::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

ul::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

li {
  margin: 10px 0;
  height: 50px;
  background-color: transparent;
  border-radius: 25%;
  text-align: center;
}

li a {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 50px;
  background-color: rgb(164, 235, 177);
  border-radius: 0 50px 50px 0;
  text-decoration: none;
}

li a:hover {
  background-color: rgba(164, 235, 177, 0.5);
  transition: background-color 0.3s ease;
}
</style>

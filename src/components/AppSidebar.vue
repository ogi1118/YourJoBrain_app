<!-- src/components/AppSidebar.vue -->
<template>
  <div class="appsidebar">
    <header>
      <button type="button" class="mypage-button">マイページ</button>
    </header>
    <ul>
      <li><router-link to="/">ホーム</router-link></li>
      <li><router-link to="/about">アバウト</router-link></li>
      <li><router-link to="/services">サービス</router-link></li>
      <li><router-link to="/contact">お問い合わせ</router-link></li>
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
import emitter from '../eventBus';

export default {
  data() {
    return {
      pages: [],
    };
  },
  created() {
    // ローカルストレージからページを読み込む
    const savedPages = localStorage.getItem('pages');
    if (savedPages) {
      this.pages = JSON.parse(savedPages);
      // 保存されている各ページに対してルートを追加
      this.pages.forEach(page => {
        this.addRoute(page);
      });
    }
    // 'add-page' イベントをリスン
    emitter.on('add-page', this.addPage);
  },
  beforeUnmount() {
    // イベントリスナーの解除
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
      // 更新されたページリストをローカルストレージに保存
      localStorage.setItem('pages', JSON.stringify(this.pages));
    },
    addRoute(page) {
      // タイトルをURLエンコード
      const path = `/${encodeURIComponent(page.title)}`;
      // 動的にルートを追加
      this.$router.addRoute({
        path: path,
        name: page.title,
        component: () => import('@/components/companyPage.vue'),
        props: { pageTitle: page.title, pageContent: page.content },
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
  flex-direction: column; /* フレックスボックスで縦方向に配置 */
  justify-content: space-between; /* 上下に要素を配置し、スクロールバーの範囲を調整 */
}

.setting-button {
  width: 100%; /* 幅をサイドバー全体に合わせる */
  padding: 10px;
  background-color: #9f9c9c;
  color: #fff;
  text-align: center;
  border: none; /* ボタンのデフォルトの枠線を消す */
  position: relative; /* positionをrelativeに設定 */
}


.mypage-button {
  width: 100%;
  background-color: #9f9c9c;
  color: #fff;
  height: 60px;
  border: none;
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1; /* ボディ部分は残りの空間を埋める */
  overflow-y: auto; /* ボディ部分をスクロール可能にする */
}

ul::-webkit-scrollbar {
  width: 6px; /* スクロールバーの幅を細くする */
}

ul::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3); /* スクロールバーのつまみを薄く表示 */
  border-radius: 3px; /* スクロールバーの角を丸くする */
}

ul::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5); /* マウスオーバー時に少し濃くする */
}

li {
  margin: 10px 0;
  height: 50px;
  color: #333;
  background-color: transparent; /* `li` の背景色を透明に設定 */
  border-radius: 25%;
  text-align: center;
  display: block;
  text-decoration: none;
}

li a {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 50px; /* `li` の高さと合わせることで、テキストが中央に揃います */
  color: #333; /* テキストの色を白に変更して、背景色とのコントラストを高める */
  background-color: rgb(164, 235, 177); /* デフォルトの背景色 */
  border-radius: 0 50px 50px 0;
  text-decoration: none;
}

li a:hover {
  background-color: rgba(164, 235, 177, 0.5); /* マウスオーバー時の背景色を薄くする */
  transition: background-color 0.3s ease; /* 背景色の変化にスムーズなトランジションを追加 */
  text-decoration: none;
}


.add-content {
  padding: 10px;
}

.add-content input {
  width: calc(100% - 80px);
  padding: 5px;
  margin-right: 5px;
}

.add-content button {
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}

.add-content button:hover {
  background-color: #555;
}
</style>

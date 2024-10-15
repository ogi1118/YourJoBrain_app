# ベースイメージを指定
FROM node:18

# アプリケーションディレクトリの作成
WORKDIR /YourJoBrain

# パッケージのインストール
COPY package.json yarn.lock ./
RUN yarn install

# アプリケーションコードのコピー
COPY . .

# アプリケーションのビルド（必要な場合）
RUN yarn build

# アプリケーションの起動
CMD ["yarn", "serve"]

# コンテナがリッスンするポート
EXPOSE 3000

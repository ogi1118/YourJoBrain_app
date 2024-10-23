# YourJoBrain

## プロジェクトの概要

YourJoBrainは、Vue.jsとNode.jsを使用したアプリケーションで、ユーザーが企業情報を管理できるプラットフォームです。このアプリケーションは、データベースに保存された企業情報を表示し、ユーザーが新しいページを追加できる機能を提供します。

## Dockerに関して
Docker-compose.ymlファイルで管理しています。
`port8080`でアプリケーション、`port5000`でバックエンドサーバー、`port3306`でデータベースサーバーを起動しています。

## リポジトリ

- GitHubリポジトリ: [YourJoBrain_app](https://github.com/ogi1118/YourJoBrain_app.git)

## プロジェクトのセットアップ

以下の手順に従って、GitHubからクローンし、ローカル環境で起動する方法を説明します。

### 1. 必要なソフトウェアのインストール

#### 1.1 Gitのインストール

Gitがインストールされていない場合は、以下のリンクからインストールしてください。

- [Gitのダウンロード](https://git-scm.com/downloads)

#### 1.2 Node.jsのインストール

Node.jsがインストールされていない場合は、以下のリンクからインストールしてください。

- [Node.jsのダウンロード](https://nodejs.org/)

Node.jsをインストールすると、npm（Node Package Manager）も自動的にインストールされます。

#### 1.3 Dockerのインストール

Dockerがインストールされていない場合は、以下のリンクからインストールしてください。

- [Dockerのダウンロード](https://www.docker.com/products/docker-desktop)

インストール後、Docker Desktopを起動し、必要な設定を行ってください。
基本は起動するだけで大丈夫です。

### 2. リポジトリのクローン

以下のコマンドを使用して、リポジトリをクローンします。

```bash
git clone https://github.com/ogi1118/YourJoBrain_app.git
```

### 3. プロジェクトディレクトリに移動

クローンしたプロジェクトのディレクトリに移動します。

```bash
cd YourJoBrain_app
```

### 4. 環境変数の設定

プロジェクトのルートディレクトリにある`.env`ファイルを確認し、必要な環境変数を設定します。
`.env`ファイルがなければ作成し、以下の内容を記述します。

```
DB_HOST=db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=3306
VUE_APP_API_URL=http://localhost:5000
```

### 5. 依存関係のインストール

以下のコマンドを実行して、プロジェクトの依存関係をインストールします。

```bash
yarn install
```

### 6. Dockerコンテナの起動

以下のコマンドを実行して、Dockerコンテナを起動します。

```bash
docker compose up --build
```

### 7. アプリケーションのアクセス

ブラウザで `http://localhost:8080` にアクセスすると、アプリケーションが表示されます。

### 8. プロダクションビルドの作成

プロダクション用にアプリケーションをビルドするには、以下のコマンドを実行します。

```bash
yarn build
```

ビルドされたファイルは、`dist`フォルダに出力されます。

### 9. コードのリントと修正

コードのリントを行い、修正するには、以下のコマンドを実行します。

```bash
yarn lint
```

### 10. カスタマイズ設定

詳細な設定については、[Configuration Reference](https://cli.vuejs.org/config/)を参照してください。

---

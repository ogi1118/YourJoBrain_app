// /server/index.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "YourJoBrain API",
      version: "1.0.0",
      description: "API for YourJoBrain",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// APIエンドポイント

/**
 * @swagger
 * /:
 *   get:
 *     summary: テスト用エンドポイント
 *     description: テスト用エンドポイント
 *     responses:
 *       200:
 *         description: 成功
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * @swagger
 * /api/pages:
 *   post:
 *     summary: 新規ページの作成
 *     description: Companiesテーブルに新しいページを追加
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: ページが作成されました
 */
app.post("/api/pages", (req, res) => {
  const { title, content } = req.body;
  const userId = 1;
  const query =
    "INSERT INTO Companies (user_id, company_name, memo) VALUES (?, ?, ?)";

  connection.query(query, [userId, title, content], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Page created", id: results.insertId });
  });
});

/**
 * @swagger
 * /api/pages:
 *   get:
 *     summary: ページリストを取得
 *     description: 保存されているページ情報を取得します
 *     responses:
 *       200:
 *         description: ページ情報のリスト
 */
app.get("/api/pages", (req, res) => {
  const query = "SELECT company_name AS title, memo AS content FROM Companies";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/pages/{title}:
 *   get:
 *     summary: 特定のページを取得
 *     description: 指定されたタイトルに基づいてページの内容を取得します
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: ページのタイトル
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ページの内容
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: ページが見つかりません
 *       500:
 *         description: データベースエラー
 */
app.get("/api/pages/:title", (req, res) => {
  const title = req.params.title;
  const query =
    "SELECT company_name AS title, memo AS content FROM Companies WHERE company_name = ?";

  connection.query(query, [title], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  });
});

// サーバーの起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});

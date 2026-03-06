# 🚀 AI LinkedIn Post Generator

A full-stack web application that uses AI to generate high-quality, engaging LinkedIn posts based on your topic, tone, and keywords.

![Node.js](https://img.shields.io/badge/Node.js-v22-green) ![React](https://img.shields.io/badge/React-Frontend-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen) ![Groq](https://img.shields.io/badge/Groq-AI-orange)

---

## ✨ Features

- 🤖 AI-powered post generation using Groq (LLaMA 3.3 70B)
- 🎨 Multiple tone options — Professional, Casual, Motivational, Storytelling, Humorous
- 🔑 Keyword integration for SEO-optimized posts
- #️⃣ Auto-generated relevant hashtags
- 💾 Save and manage your generated posts (MongoDB)
- 🔒 Rate limiting & security headers
- 📱 Responsive frontend built with React

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Database | MongoDB |
| AI Model | Groq API (LLaMA 3.3 70B) |
| Security | Helmet, CORS, Rate Limiting |

---

## 📁 Project Structure

```
AI Linkedin Post Generator/
├── linkedin-backend/
│   ├── controllers/
│   │   └── generateController.js
│   ├── routes/
│   │   ├── generate.js
│   │   └── posts.js
│   ├── models/
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── config/
│   │   └── db.js
│   ├── .env
│   └── server.js
└── linkedin-frontend/
    └── linkedin-frontend/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   └── App.jsx
        └── package.json
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Groq API Key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the repository
```bash
git clone https://github.com/prathmesh183/ai-linkedin-post-generator.git
cd ai-linkedin-post-generator
```

### 2. Backend Setup
```bash
cd linkedin-backend
npm install
```

Create a `.env` file in `linkedin-backend/`:
```env
GROQ_API_KEY=your_groq_api_key_here
MONGO_URI=mongodb://localhost:27017/linkedin_generator
NODE_ENV=development
PORT=5000
```

Start the backend:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd linkedin-frontend/linkedin-frontend
npm install
npm start
```

---

## 🚀 Usage

1. Open [http://localhost:3000](http://localhost:3000)
2. Enter your **topic**
3. Select a **tone** (Professional, Casual, etc.)
4. Add optional **keywords**
5. Click **Generate** and get your LinkedIn post!

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate` | Generate a LinkedIn post |
| GET | `/api/posts` | Get all saved posts |
| DELETE | `/api/posts/:id` | Delete a saved post |
| GET | `/health` | Health check |

---

## 🌱 Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key |
| `MONGO_URI` | MongoDB connection string |
| `NODE_ENV` | Environment (development/production) |
| `PORT` | Server port (default: 5000) |

---

## 📄 License

MIT License — feel free to use and modify!

---

## 👤 Author

**Prathmesh** — [@prathmesh183](https://github.com/prathmesh183)

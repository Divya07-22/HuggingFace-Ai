# 🤖 KodBank + Hugging Face AI Integration

> **Banking App** with an embedded **Hugging Face AI Assistant** — chat with AI models (Kimi/Qwen, Deepseek, Mistral, Qwen-Coder) right inside your banking dashboard!

Frontend URL : https://hugging-face-ai-3gvw.vercel.app/
Backend URL : https://hugging-face-ai-roan.vercel.app/
## 🎯 What This Project Does

```
You type "How can I save money?" in the Banking Dashboard
       ↓
React Frontend → Node.js Backend → Hugging Face Inference API
       ↓
AI Response appears in the chat widget (bottom-right corner)
```

---

## 📸 Architecture

```
Banking Dashboard (React)
  └── AiChat.jsx (floating 🤖 button)
        └── POST /api/ai/chat (Express backend)
              └── Hugging Face API (your deployed model)
```

---

## 🚀 Step-by-Step Setup (Hugging Face)

### Step 1 — Create a Hugging Face Account
1. Go to [huggingface.co](https://huggingface.co)
2. Click **Sign Up** → create account with email
3. Verify your email

### Step 2 — Select a Model
Models used in this project (choose one):
| UI Name | Hugging Face Model ID |
|---|---|
| **Kimi** | `Qwen/Qwen2.5-72B-Instruct` |
| **Deepseek** | `deepseek-ai/DeepSeek-R1` |
| **GPT-3** | `mistralai/Mistral-7B-Instruct-v0.3` |
| **Quin** | `Qwen/Qwen2.5-Coder-32B-Instruct` |

### Step 3 — Create a Space
1. Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. Name it: `kodbank-ai` (or any name)
3. Select **Gradio** as the SDK
4. Set visibility to **Public**
5. Click **Create Space**

### Step 4 — Deploy the Model in Your Space
1. In your Space, go to **Files** tab
2. Upload `huggingface-space/app.py` and `requirements.txt` from this repo
3. Go to **Settings** → **Variables and secrets**
4. Add secret: `HF_TOKEN = your_token_here`
5. The Space will auto-build and deploy ✅

### Step 5 — Get Your API Token
1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Click **New token** → name it `kodbank-token`
3. Select **Read** permissions
4. Copy the token (starts with `hf_...`)

### Step 6 — Configure the Backend
Add to `Backend/.env`:
```env
# Existing vars
DB_HOST=your_aiven_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173

# NEW: Hugging Face
HF_API_TOKEN=hf_your_token_here
```

### Step 7 — Run the App
```bash
# Backend
cd BankingApp/Backend
npm install
npm run dev

# Frontend (new terminal)
cd BankingApp/Frontend
npm install
npm run dev
```

Open http://localhost:5173 → Login → See the **🤖 AI button** in bottom-right!

---

## 📁 Project Structure

```
hugging-face-ai/
├── BankingApp/
│   ├── Backend/
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # Existing auth
│   │   │   └── aiRoutes.js         ⭐ NEW: AI proxy
│   │   └── index.js                ⭐ MODIFIED: registers /api/ai
│   └── Frontend/
│       └── src/
│           ├── components/
│           │   └── AiChat.jsx      ⭐ NEW: Chat widget
│           └── pages/
│               └── Dashboard.jsx   ⭐ MODIFIED: embeds AiChat
└── huggingface-space/
    ├── app.py                      ⭐ NEW: Gradio Space
    └── requirements.txt
```

---

## 🔑 Environment Variables

### Backend (`BankingApp/Backend/.env`)
| Variable | Description |
|---|---|
| `HF_API_TOKEN` | Your Hugging Face API token (`hf_...`) |
| `DB_HOST` | MySQL host (Aiven) |
| `DB_PORT` | MySQL port |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | JWT signing secret |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend (`BankingApp/Frontend/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend URL (e.g. `http://localhost:5000`) |

---

## 🌐 Live Deployment

- **Banking App Frontend**: https://banking-app-theta-nine.vercel.app/
- **Hugging Face Space**: *(deploy your Space and add URL here)*

---

## 📚 Resources
- [Hugging Face Inference API Docs](https://huggingface.co/docs/api-inference)
- [Gradio Documentation](https://gradio.app/docs/)
- [Hugging Face Spaces Guide](https://huggingface.co/docs/hub/spaces)

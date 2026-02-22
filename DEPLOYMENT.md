# 🚀 Vercel Deployment Guide — KodBank + AI

Follow these steps to deploy your full-stack banking app with Hugging Face AI to Vercel.

---

## 1. Deploy the Backend (`BankingApp/Backend`)

1.  Open your browser and go to [vercel.com](https://vercel.com).
2.  Click **Add New** → **Project**.
3.  Select your GitHub repository: `HuggingFace-Ai`.
4.  For the **Root Directory**, select `BankingApp/Backend`.
5.  In **Environment Variables**, add the following (copy from your local `.env`):
    - `DB_HOST`
    - `DB_PORT`
    - `DB_USER`
    - `DB_PASSWORD`
    - `DB_NAME`
    - `JWT_SECRET`
    - `HF_API_TOKEN`
    - `FRONTEND_URL` (You can set this to `*` for now or update it later)
6.  Click **Deploy**.
7.  **Once deployed**, copy the **Production URL** (e.g., `https://your-backend.vercel.app`).

---

## 2. Deploy the Frontend (`BankingApp/Frontend`)

1.  Go back to your Vercel Dashboard.
2.  Click **Add New** → **Project**.
3.  Select the same GitHub repository again.
4.  For the **Root Directory**, select `BankingApp/Frontend`.
5.  In **Environment Variables**, add:
    - `VITE_API_URL` → Paste the **Backend Production URL** you copied in Step 1.
6.  Click **Deploy**.
7.  **Once deployed**, copy the **Frontend URL**.

---

## 3. Final Step: Secure your Backend (Optional but Recommended)

Go back to your **Backend Project** settings on Vercel:
1.  Go to **Settings** → **Environment Variables**.
2.  Update `FRONTEND_URL` with your actual **Frontend URL** (from Step 2).
3.  Redeploy the backend to apply the change.

---

## ✅ Deployment Checklist

- [ ] Can I see "KodBank API is running..." at `https://your-backend.vercel.app`?
- [ ] Can I log in on the frontend?
- [ ] Does the AI Chat robot respond in the dashboard?

### 💡 Troubleshooting
- **CORS Error**: Ensure `FRONTEND_URL` in backend Vercel settings matches your frontend's actual URL.
- **AI not responding**: Ensure `HF_API_TOKEN` is correctly set in Vercel.

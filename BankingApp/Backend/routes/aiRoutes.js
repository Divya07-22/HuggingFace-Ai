const express = require('express');
const router = express.Router();

// ✅ Node 18+ has fetch built-in.
router.post('/chat', async (req, res) => {
    const { message, model } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ error: 'Message is required and must be a non-empty string' });
    }

    const HF_API_TOKEN = process.env.HF_API_TOKEN;
    if (!HF_API_TOKEN) {
        return res.status(500).json({ error: 'AI service not configured on server' });
    }

    const modelMap = {
        kimi: 'Qwen/Qwen2.5-72B-Instruct',
        deepseek: 'deepseek-ai/DeepSeek-R1',
        gpt3: 'mistralai/Mistral-7B-Instruct-v0.3',
        quin: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    };

    const hfModelId = modelMap[model] || modelMap['kimi'];
    const apiUrl = `https://api-inference.huggingface.co/models/${hfModelId}/v1/chat/completions`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${HF_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: hfModelId,
                messages: [
                    {
                        role: 'system',
                        content: 'You are KodBank AI Assistant. Help users with banking queries and financial advice.',
                    },
                    { role: 'user', content: message.trim() },
                ],
                max_tokens: 512,
                temperature: 0.7,
                stream: false,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            return res.status(response.status).json({ error: 'AI model error', details: errText });
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content?.trim() || 'Sorry, no response.';
        return res.json({ reply, model: hfModelId });
    } catch (err) {
        return res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;

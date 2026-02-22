import { useState, useRef, useEffect } from "react";

const MODELS = [
    { id: "kimi", label: "Kimi / Qwen", color: "#ff6b35" },
    { id: "deepseek", label: "Deepseek", color: "#4f8ef7" },
    { id: "gpt3", label: "GPT-3 / Mistral", color: "#10b981" },
    { id: "quin", label: "Quin / Coder", color: "#a855f7" },
];

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "👋 Hi! I'm your **KodBank AI Assistant**. Ask me anything about your finances, transactions, savings goals, or banking!",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState("kimi");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMsg = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/ai/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, model: selectedModel }),
            });

            const data = await res.json();
            const reply = data.reply || "Sorry, I couldn't get a response right now.";
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "⚠️ Could not connect to AI. Make sure the backend is running and `HF_API_TOKEN` is set.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const currentModel = MODELS.find((m) => m.id === selectedModel);

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen((v) => !v)}
                id="ai-chat-toggle"
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    zIndex: 9999,
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #ff6b35, #f7c59f)",
                    boxShadow: "0 4px 20px rgba(255,107,53,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                title="KodBank AI Assistant"
            >
                {isOpen ? "✕" : "🤖"}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div
                    id="ai-chat-panel"
                    style={{
                        position: "fixed",
                        bottom: "92px",
                        right: "24px",
                        zIndex: 9998,
                        width: "380px",
                        maxHeight: "560px",
                        borderRadius: "16px",
                        background: "#1a1a2e",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: "16px",
                            background: "linear-gradient(135deg, #16213e, #0f3460)",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <div
                            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}
                        >
                            <span style={{ fontSize: "22px" }}>🤖</span>
                            <div>
                                <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>
                                    KodBank AI Assistant
                                </div>
                                <div style={{ color: "#a0aec0", fontSize: "12px" }}>
                                    Powered by Hugging Face
                                </div>
                            </div>
                            <div
                                style={{
                                    marginLeft: "auto",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: loading ? "#fbbf24" : "#10b981",
                                    boxShadow: `0 0 8px ${loading ? "#fbbf24" : "#10b981"}`,
                                }}
                            />
                        </div>

                        {/* Model Selector */}
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {MODELS.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => setSelectedModel(m.id)}
                                    style={{
                                        padding: "4px 10px",
                                        borderRadius: "20px",
                                        border: `1px solid ${m.color}`,
                                        background: selectedModel === m.id ? m.color : "transparent",
                                        color: selectedModel === m.id ? "#fff" : m.color,
                                        fontSize: "11px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#333 transparent",
                        }}
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: "85%",
                                        padding: "10px 14px",
                                        borderRadius:
                                            msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                        background:
                                            msg.role === "user"
                                                ? `linear-gradient(135deg, ${currentModel.color}, ${currentModel.color}bb)`
                                                : "rgba(255,255,255,0.06)",
                                        color: "#e2e8f0",
                                        fontSize: "13px",
                                        lineHeight: "1.6",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                        wordBreak: "break-word",
                                        whiteSpace: "pre-wrap",
                                    }}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        borderRadius: "16px 16px 16px 4px",
                                        padding: "12px 16px",
                                        display: "flex",
                                        gap: "5px",
                                        alignItems: "center",
                                    }}
                                >
                                    {[0, 1, 2].map((i) => (
                                        <span
                                            key={i}
                                            style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "50%",
                                                background: currentModel.color,
                                                animation: "bounce 1.2s infinite",
                                                animationDelay: `${i * 0.2}s`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div
                        style={{
                            padding: "12px",
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            gap: "8px",
                            alignItems: "flex-end",
                        }}
                    >
                        <textarea
                            id="ai-chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about your finances..."
                            rows={1}
                            style={{
                                flex: 1,
                                padding: "10px 14px",
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.12)",
                                background: "rgba(255,255,255,0.05)",
                                color: "#e2e8f0",
                                fontSize: "13px",
                                resize: "none",
                                outline: "none",
                                fontFamily: "inherit",
                                lineHeight: "1.5",
                                maxHeight: "100px",
                                overflowY: "auto",
                            }}
                        />
                        <button
                            id="ai-chat-send"
                            onClick={sendMessage}
                            disabled={!input.trim() || loading}
                            style={{
                                padding: "10px 16px",
                                borderRadius: "12px",
                                border: "none",
                                background:
                                    !input.trim() || loading
                                        ? "rgba(255,255,255,0.1)"
                                        : `linear-gradient(135deg, ${currentModel.color}, ${currentModel.color}bb)`,
                                color: "#fff",
                                fontWeight: 700,
                                cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                                fontSize: "16px",
                                transition: "all 0.2s",
                                flexShrink: 0,
                            }}
                        >
                            ➤
                        </button>
                    </div>

                    <style>{`
            @keyframes bounce {
              0%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-6px); }
            }
          `}</style>
                </div>
            )}
        </>
    );
}

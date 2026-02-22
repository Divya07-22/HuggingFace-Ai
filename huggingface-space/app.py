import gradio as gr
import os
from huggingface_hub import InferenceClient

# ====================================================
# KodBank AI Assistant — Hugging Face Space
# Model: Qwen/Qwen2.5-72B-Instruct (Kimi-like)
# Deploy this file as a Gradio Space on huggingface.co
# Set HF_TOKEN in Space Settings → Variables and secrets
# ====================================================

HF_TOKEN = os.environ.get("HF_TOKEN")  # Set this in Space secrets

client = InferenceClient(
    model="Qwen/Qwen2.5-72B-Instruct",
    token=HF_TOKEN,
)

SYSTEM_PROMPT = """You are KodBank AI Assistant — a helpful, concise, and knowledgeable banking assistant.
Help users with their banking queries, financial advice, account management, spending analysis,
savings goals, and general financial questions. Keep answers clear and actionable."""


def chat(message, history):
    """
    Chat function for Gradio 4+ ChatInterface.
    history: list of {"role": ..., "content": ...} dicts (messages format)
    """
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Gradio 4+ passes history as list of dicts with "role" and "content"
    for h in history:
        messages.append({"role": h["role"], "content": h["content"]})

    messages.append({"role": "user", "content": message})

    response = ""
    for token in client.chat_completion(
        messages=messages,
        max_tokens=512,
        temperature=0.7,
        stream=True,
    ):
        delta = token.choices[0].delta.content
        if delta:
            response += delta
            yield response


# ====================================================
# Gradio UI
# ====================================================
with gr.Blocks(
    theme=gr.themes.Base(
        primary_hue="orange",
        secondary_hue="purple",
        neutral_hue="slate",
    ),
    title="KodBank AI Assistant",
    css="""
    body { background: #0d0d1a !important; }
    .gradio-container { background: #0d0d1a !important; }
    """,
) as demo:
    gr.Markdown(
        """
        # 🏦 KodBank AI Assistant
        **Powered by Hugging Face Inference API**
        Ask me anything about your banking, finances, or investments!
        """
    )

    gr.ChatInterface(
        fn=chat,
        type="messages",
        chatbot=gr.Chatbot(
            height=480,
            show_label=False,
            bubble_full_width=False,
            type="messages",
        ),
        textbox=gr.Textbox(
            placeholder="e.g. How can I save more money each month?",
            container=False,
            scale=7,
        ),
        examples=[
            "What is a savings account?",
            "How do I improve my credit score?",
            "Give me tips to reduce monthly expenses",
            "What is the difference between a debit and credit card?",
            "How do I set a realistic budget?",
        ],
        title=None,
    )

if __name__ == "__main__":
    demo.launch()

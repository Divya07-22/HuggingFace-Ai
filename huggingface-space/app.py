import gradio as gr
import os
from huggingface_hub import InferenceClient

# ====================================================
# KodBank AI Assistant — Hugging Face Space
# Model: Qwen/Qwen2.5-72B-Instruct (Kimi-like)
# Deploy this file as a Gradio Space on huggingface.co
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
    Chat function called by Gradio.
    history: list of [user, assistant] message pairs
    """
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for user_msg, assistant_msg in history:
        messages.append({"role": "user", "content": user_msg})
        messages.append({"role": "assistant", "content": assistant_msg})
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
    .gradio-container { background: #0d0d1a !important; }
    .chat-bubble-bot { background: #1a1a2e !important; color: #e2e8f0 !important; }
    .chat-bubble-user { background: #ff6b35 !important; color: white !important; }
    """,
) as demo:
    gr.Markdown(
        """
        # 🏦 KodBank AI Assistant
        **Powered by Hugging Face Inference API**  
        Ask me anything about your banking, finances, or investments!
        """
    )

    chatbot = gr.ChatInterface(
        fn=chat,
        chatbot=gr.Chatbot(
            height=480,
            show_label=False,
            bubble_full_width=False,
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

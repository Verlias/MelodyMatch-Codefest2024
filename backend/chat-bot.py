from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def chat_with_chatGPT(prompt):
    response = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "user", "content": prompt}  
        ]
    )

    return response.choices[0].message.content.strip() 

if __name__ == "__main__":
    print(chat_with_chatGPT("What is the meaning of life?")) 

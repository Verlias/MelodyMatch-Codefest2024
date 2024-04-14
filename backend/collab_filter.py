from dotenv import load_dotenv
import os
import json
import base64
from requests import post, get

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

def get_token():
    auth_str = CLIENT_ID + ":" + CLIENT_SECRET
    auth_bytes = auth_str.encode('utf-8')
    auth_base64 = str(base64.b64encode(auth_bytes), 'utf-8')
    
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "client_credentials"
    }
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.text)
    token = json_result["access_token"]
    
    return token
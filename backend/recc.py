from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:5000/callback"
SCOPE = 'playlist-read-private user-read-private'
CACHE = '.spotipyoauthcache'

auth_manager = SpotifyOAuth(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI, scope=SCOPE, cache_path=CACHE)
sp = spotipy.Spotify(auth_manager=auth_manager)

recommend = sp.recommendations(seed_genres=['pop'], limit=1)['tracks']
print(recommend[0]['name'])
import os
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from collections import Counter
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:5000/callback"
SCOPE = 'playlist-read-private user-read-private'
CACHE = '.spotipyoauthcache'

auth_manager = SpotifyOAuth(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI, scope=SCOPE, cache_path=CACHE)
spotify = spotipy.Spotify(auth_manager=auth_manager)

birdy_uri = 'spotify:artist:2WX2uTcsvV5OnS0inACecP'
#spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

results = spotify.artist_albums(birdy_uri, album_type='album')
albums = results['items']
while results['next']:
    results = spotify.next(results)
    albums.extend(results['items'])

for album in albums:
    print(album['name'])

print(spotify.recommendations(seed_genres=['pop'], limit=1))
import os
from dotenv import load_dotenv
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

def extract_genres(track_id):
    track_info = sp.track(track_id)
    artist_id = track_info['artists'][0]['id']
    artist_info = sp.artist(artist_id)
    return artist_info.get('genres', [])

def user_playlist_genres():
    followed_playlist = sp.current_user_playlists(limit=10, offset=0)
    playlist_IDs = []
    playlist_track_ids = []
    genre_list = set()
    
    for item in followed_playlist['items']:
        playlist_IDs.append(item['id'])
    
    for id in playlist_IDs:
        playlist_tracks = sp.playlist_tracks(id, market=None, fields='items.track.id', limit=5, offset=0)
        for track_info in playlist_tracks.get('items', []):
            if 'track' in track_info and 'id' in track_info['track']:
                playlist_track_ids.append(track_info['track']['id'])
    
    for track_id in playlist_track_ids:
        genres = extract_genres(track_id)
        genre_list.update(genres)    
    genre_list = set(list(genre_list))
    return genre_list

def recommend_songs_by_genres():
    genres = user_playlist_genres()
    recommended_tracks = []
    for genre in genres:
        tracks = sp.recommendations(seed_genres=[genre], limit=5)['tracks']
        for track in tracks:
            recommended_tracks.append((track['name'], track['id']))
    return recommended_tracks

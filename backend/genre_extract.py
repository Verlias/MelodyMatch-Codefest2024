from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from spotifysearch.client import Client
import random

load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:5000/callback"
SCOPE = 'playlist-read-private user-read-private'
CACHE = '.spotipyoauthcache'

myclient = Client(CLIENT_ID, CLIENT_SECRET)
auth_manager = SpotifyOAuth(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI, scope=SCOPE, cache_path=CACHE)
sp = spotipy.Spotify(auth_manager=auth_manager)

# Get the user's top artist's id
def get_user_top_artists():
    top_artists = sp.current_user_top_artists(limit=50, offset=0, time_range='long_term')
    artist_id_list = []
    for i in top_artists['items']:
        artist_id_list.append(i['id'])
    return artist_id_list



# Get the user's followed playlist's id
def get_followed_playlist():
    followed_playlist = sp.current_user_playlists(limit=10, offset=0)
    playlist_id_list = []
    for i in followed_playlist['items']:
        playlist_id_list.append(i['id'])
    return playlist_id_list



# Gets each individual playlist's info
# Gets each individual playlist's track IDs
def extract_playlist_info():
    playlist_IDS = get_followed_playlist()
    track_ids = []
    
    for playlist_id in playlist_IDS:
        playlist_tracks = sp.playlist_tracks(playlist_id, market=None, fields='items.track.id', limit=5, offset=0)
        for track_info in playlist_tracks['items']:
            if 'track' in track_info and 'id' in track_info['track']:
                track_ids.append(track_info['track']['id'])
    
    return track_ids


# The following functions help extract genres from the track ID
def extract_genres(track_id):
    track_info = sp.track(track_id)
    artist_id = track_info['artists'][0]['id']
    artist_info = sp.artist(artist_id)
    return artist_info['genres']

def get_genres_from_followed_playlist():
    followed_playlists = extract_playlist_info()
    genre_set = set() 
    
    for track_id in followed_playlists:
        genres = extract_genres(track_id)
        genre_set.update(genres)
    
    return list(genre_set)

def recommend_user_songs():
    genres = get_genres_from_followed_playlist()
    recommended_tracks = []
    total_tracks = 0
    
    for genre in genres:
        if total_tracks >= 10:
            break
        
        tracks = sp.recommendations(seed_genres=[genre], limit=5)
        if len(tracks['tracks']) > 0:
            recommended_tracks.extend(tracks['tracks'])
            total_tracks += len(tracks['tracks'])
    
    return recommended_tracks[:10]  

def main():
    print(recommend_user_songs())

if __name__ == "__main__":
    main()
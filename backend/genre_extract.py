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
SCOPE = 'playlist-read-private user-read-private user-top-read'
CACHE = '.spotipyoauthcache'

auth_manager = SpotifyOAuth(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI, scope=SCOPE, cache_path=CACHE)
sp = spotipy.Spotify(auth_manager=auth_manager)

def get_user_top_artists():
    top_artist = sp.current_user_top_artists(limit=10, offset=0, time_range='short_term')
    return top_artist['items'][0]['id']

def search_artist_top_tracks():
    artist_id = get_user_top_artists()
    artist_top_track = sp.artist_top_tracks(artist_id, country='US')['tracks'][0]['id']
    return artist_top_track

def get_audio_features(track_id):
    audio_features = sp.audio_features(track_id)
    if audio_features:
        return audio_features[0]
    else:
        return None
    

def find_similar_tracks(seed_track_id, num_tracks=50, k=10):
    tracks = sp.recommendations(seed_tracks=[seed_track_id], limit=num_tracks)['tracks']
    candidate_track_ids = [track['id'] for track in tracks]
    candidate_track_names = [track['name'] for track in tracks]

    seed_features = get_audio_features(seed_track_id)
    candidate_features = [get_audio_features(track_id) for track_id in candidate_track_ids]

    X = [[track['tempo'], track['energy'], track['danceability']] for track in candidate_features]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    knn_model = NearestNeighbors(n_neighbors=k).fit(X_scaled)

    seed_features_scaled = scaler.transform([[seed_features['tempo'], seed_features['energy'], seed_features['danceability']]])
    distances, indices = knn_model.kneighbors(seed_features_scaled)

    similar_tracks = [(candidate_track_names[i], candidate_track_ids[i]) for i in indices[0] if candidate_track_ids[i] != seed_track_id]
    return similar_tracks

def main():
    seed_track_id = search_artist_top_tracks()
    similar_tracks = find_similar_tracks(seed_track_id)
    print("Similar tracks:")
    for track_name, track_id in similar_tracks:
        print(f"{track_name} - Track ID: {track_id}")
    

if __name__ == "__main__":
    main()
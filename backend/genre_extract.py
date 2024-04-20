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
sp = spotipy.Spotify(auth_manager=auth_manager)

def extract_genres(track_id):
    track_info = sp.track(track_id)
    artist_id = track_info['artists'][0]['id']
    artist_info = sp.artist(artist_id)
    return artist_info['genres']

def user_playlist_genres():
    followed_playlist = sp.current_user_playlists(limit=10, offset=0)
    playlist_IDs = []
    playlist_track_ids = []
    genre_list = []
    
    for item in followed_playlist['items']:
        playlist_IDs.append(item['id'])
    
    for id in playlist_IDs:
        playlist_tracks = sp.playlist_tracks(id, market=None, fields='items.track.id', limit=5, offset=0)
        for track_info in playlist_tracks.get('items', []):
            if 'track' in track_info and 'id' in track_info['track']:
                playlist_track_ids.append(track_info['track']['id'])
    
    for track_id in playlist_track_ids:
        genres = extract_genres(track_id)
        genre_list = genre_list + genres
    
    counter = Counter(genre_list)
    return counter.most_common(1)[0][0]

def search_top_genre():
    genre = user_playlist_genres()
    search = sp.search(q=str(genre),offset=0,limit=1,type='track')
    return search['tracks']['items'][0]['id']

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
    seed_track_id = search_top_genre()
    similar_tracks = find_similar_tracks(seed_track_id)
    print("Similar tracks:")
    for track_name, track_id in similar_tracks:
        print(f"{track_name} - Track ID: {track_id}")

if __name__ == "__main__":
    main()
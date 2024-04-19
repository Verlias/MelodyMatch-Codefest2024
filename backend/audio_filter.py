import spotipy
import os
from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyClientCredentials
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler


load_dotenv()
# Initialize Spotify client
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


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


seed_track_id = '5JEx7HbmvHQQswJCsoo9rA' #Close To Me by Ellie Goulding
similar_tracks = find_similar_tracks(seed_track_id)
print("Similar tracks:")
for track_name, track_id in similar_tracks:
    print(f"{track_name} - Track ID: {track_id}")
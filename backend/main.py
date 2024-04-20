from flask import Flask
from flask_migrate import Migrate
#from flask_marshmallow import Marshmallow
from flask_cors import CORS

from audio_filter import *
from genre_extract import *


app = Flask(__name__)

audio_output = find_similar_tracks('5JEx7HbmvHQQswJCsoo9rA')
genre_output = recommend_songs_by_genres()

@app.route('/audio')
def audio():
    return audio_output

@app.route('/genre')
def genre():
    return genre_output

if __name__ == '__main__':
    app.run(debug=True)

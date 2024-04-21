from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from audio_and_artist import *
from audio_filter import *

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    input_text = data.get('input')
    button_clicked = data.get('buttonClicked')
    sliced_slash = input_text.split('/')[-1]
    sliced_question = sliced_slash.split('?')[0]
    seed_id = sliced_question
    if len(seed_id) == 22:
        if button_clicked == "GenreFiltering" or button_clicked == "CombinedAlgo":
            print(f'Input Text: {seed_id}, Button Clicked: {button_clicked}')
            return jsonify({'input': input_text, 'buttonClicked': button_clicked})
    return jsonify({'error': 'Input is wrong'}), 400  # Return error response with status code 400

@app.route('/fetch', methods=['GET'])
def fetch():
    input_text = request.args.get('input')
    button_clicked = request.args.get('buttonClicked')
    return jsonify({'input': input_text, 'buttonClicked': button_clicked})


@app.route('/similar_tracks', methods=['GET'])
def get_similar_tracks():
    try:
        seed_track_id = search_artist_top_tracks()
        similar_tracks = find_similar_tracks(seed_track_id)
        return jsonify({'similarTracks': similar_tracks})
    except Exception as e:
        return jsonify({'error': str(e)}), 500 
    
@app.route('/audio_tracks', methods=['POST'])
def get_audio_tracks():
    try:
        data = request.json
        input_text = data.get('input')
        button_clicked = data.get('buttonClicked')
        sliced_slash = input_text.split('/')[-1]
        seed_track_id = sliced_slash.split('?')[0]
        
        if len(seed_track_id) == 22 and (button_clicked == "GenreFiltering" or button_clicked == "CombinedAlgo"):
            similar_tracks = find_similar_tracks(seed_track_id)
            return jsonify({'similarTracks': similar_tracks})
        else:
            return jsonify({'error': 'Invalid input or button clicked'}), 400 
    except Exception as e:
        return jsonify({'error': str(e)}), 500 

if __name__ == '__main__':
    app.run(port=5000, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    input_text = data.get('input')
    button_clicked = data.get('buttonClicked')
    sliced_slash = input_text.split('/')[-1]
    sliced_question = sliced_slash.split('?')[0]
    seed_id = sliced_question
    if button_clicked == "GenreFiltering":
        print("genre filtering if")
        print(f'Input Text: {seed_id}, Button Clicked: {button_clicked}')
        return jsonify({'input': input_text, 'buttonClicked': button_clicked})
    elif button_clicked == "CombinedAlgo":
        print("genre filtering if")
        print(f'Input Text: {seed_id}, Button Clicked: {button_clicked}')
        return jsonify({'input': input_text, 'buttonClicked': button_clicked})
    

if __name__ == '__main__':
    app.run(port=5000, debug=True)
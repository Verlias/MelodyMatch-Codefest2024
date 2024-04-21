from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/submit', methods=['POST', 'GET'])
def submit():
    if request.method == 'POST':
        data = request.json
        input_text = data.get('input')
        button_clicked = data.get('buttonClicked')
        sliced_slash = input_text.split('/')[-1]
        sliced_question = sliced_slash.split('?')[0]
        seed_id = sliced_question
        if len(seed_id) == 22:
            if button_clicked == "GenreFiltering":
                print("genre filtering if")
                print(f'Input Text: {seed_id}, Button Clicked: {button_clicked}')
                return jsonify({'input': input_text, 'buttonClicked': button_clicked})
            elif button_clicked == "CombinedAlgo":
                print("genre filtering if")
                print(f'Input Text: {seed_id}, Button Clicked: {button_clicked}')
                return jsonify({'input': input_text, 'buttonClicked': button_clicked})
        else:
            return jsonify({'error': 'Input is wrong'}), 400  # Return error response with status code 400
    elif request.method == 'GET':
        input_text = request.args.get('input')
        button_clicked = request.args.get('buttonClicked')
        return jsonify({'input': input_text, 'buttonClicked': button_clicked})
    else:
        return jsonify({'error': 'Method not allowed'}), 405  # Method Not Allowed

if __name__ == '__main__':
    app.run(port=5000, debug=True)

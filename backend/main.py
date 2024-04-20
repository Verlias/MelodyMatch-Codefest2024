from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    input_text = data.get('input')
    button_clicked = data.get('buttonClicked')
    if button_clicked == ""
    print(f'Input Text: {input_text}, Button Clicked: {button_clicked}')
    return jsonify({'input': input_text, 'buttonClicked': button_clicked})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
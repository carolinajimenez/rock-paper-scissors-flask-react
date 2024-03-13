#!/usr/bin/env python3
"""
Rock-Paper-Scissors Game

References:
- How to Create a Flask + React Project | Python Backend + React Frontend - https://www.youtube.com/watch?v=7LNl2JlZKHA
- Python + JavaScript - Full Stack App Tutorial - https://www.youtube.com/watch?v=PppslXOR7TA
"""

__version__ = "1.0.0"

# Standard library imports.
import random

# Third party imports.
from flask import Flask, request


# * * *
# APP CONFIGURATIONS
app = Flask(__name__)
# * * *

# * * *
# ENDPOINTS
@app.route("/play_game", methods=["POST"])
def play_game():
    user_action = request.json['action']
    computer_action = random.choice(['r', 'p', 's'])
    if user_action == computer_action:
        return {"result": "It's a tie", "computer_action": computer_action}

    if get_winner(user_action, computer_action):
        return {"result": "Player wins!", "computer_action": computer_action}

    return {"result": "Player lost!", "computer_action": computer_action}
# * * *

# * * *
# FUNCTIONS
def get_winner(player, opponent):
    if (player == 'r' and opponent == 's') or \
    (player == 's' and opponent == 'p') or \
        (player == 'p' and opponent == 'r'):
        return True
    return False
# * * *


if __name__ == "__main__":
    app.run(debug=True)
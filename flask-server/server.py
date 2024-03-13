#!/usr/bin/env python3
"""
Rock-Paper-Scissors Game

References:
- https://www.youtube.com/watch?v=7LNl2JlZKHA
- https://www.youtube.com/watch?v=PppslXOR7TA
"""

__author__ = "Carolina Jiménez Moreno <cjimenezm0794@gmail.com>"
__version__ = "1.0.0"

# Standard library imports.
import json
import random

# Third party imports.
from flask import Flask, jsonify


# * * *
# APP CONFIGURATIONS
app = Flask(__name__)
# * * *

# * * *
# ENDPOINTS
@app.route("/", methods=["GET"])
def home():
    game_details = {"games": ["rock", "paper", "scissors"]}
    return jsonify(game_details)

@app.route("/set_user_choise", methods=["GET"])
def set_user_choise():
    user = input("What's your choise?: 'r' for rock, 'p' for paper, 's' for scissors\n")
    return user

@app.route("/get_pc_choise", methods=["GET"])
def get_pc_choise():
    computer = random.choice(['r', 'p', 's'])
    return computer

@app.route("/play_game", methods=["POST"])
def play_game():
    if user == computer:
        return "It's a tie"
# * * *

if __name__ == "__main__":
    app.run(debug=True)
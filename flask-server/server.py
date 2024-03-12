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

# Third party imports.
from flask import Flask, jsonify


# * * *
# APP CONFIGURATIONS
app = Flask(__name__)
# * * *

# * * *
# ENDPOINTS
@app.route("/game", methods=["GET"])
def game():
    game_details = {"games": ["rock", "paper", "scissors"]}
    return jsonify(game_details)
# * * *

if __name__ == "__main__":
    app.run(debug=True)
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
    """
    Endpoint to play a game of rock, paper, scissors.

    Returns:
        dict: A dictionary containing the game result and computer's action.
            Keys:
                "result" (str): The result of the game ("It's a tie", "Player won!", or "Player lost!").
                "computer_action" (str): The computer's chosen action.
    """
    # Retrieve user's action from the request payload
    user_action = request.json['action']
    # Generate a random action for the computer
    computer_action = random.choice(['r', 'p', 's'])

    # Determine the game result based on the user's and computer's actions
    if user_action == computer_action:
        # If both actions are the same, it's a tie
        return {"result": "It's a tie", "computer_action": computer_action}

    # If the user wins, return the result indicating player victory
    if get_winner(user_action, computer_action):
        return {"result": "Player won!", "computer_action": computer_action}

    # If the user loses, return the result indicating player's defeat
    return {"result": "Player lost!", "computer_action": computer_action}
# * * *

# * * *
# FUNCTIONS
def get_winner(player, opponent):
    """
    Determines the winner of a rock, paper, scissors game.

    Args:
        player (str): The action chosen by the player ('r' for rock, 'p' for paper, 's' for scissors).
        opponent (str): The action chosen by the opponent.

    Returns:
        bool: True if the player wins, False otherwise.
    """
    # Define winning conditions for the player
    if (player == 'r' and opponent == 's') or \
    (player == 's' and opponent == 'p') or \
        (player == 'p' and opponent == 'r'):
        return True

    # If none of the winning conditions match, the player loses
    return False
# * * *


if __name__ == "__main__":
    app.run(debug=True)
#!/usr/bin/env python3
"""
Rock-Paper-Scissors Game

References:
- https://www.youtube.com/watch?v=8ext9G7xspg
"""

import random

def play():
    user = input("What's your choise?: 'r' for rock, 'p' for paper, 's' for scissors\n")
    computer = random.choice(['r', 'p', 's'])

    if user == computer:
        return "It's a tie"

    if get_winner(user, computer):
        return "You won!"

    return "You lost!"


def get_winner(player, opponent):
    if (player == 'r' and opponent == 's') or \
    (player == 's' and opponent == 'p') or \
        (player == 'p' and opponent == 'r'):
        return True
    return False

if __name__ == "__main__":
    print(play())
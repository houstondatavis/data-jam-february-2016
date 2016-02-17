# This codes a Raspberry Pi with a SenseHat to parse through Tweets with the word "suicide" in them,
# pull out the negative ones, and display the Tweet on the SenseHat LED Matrix.

import json
import time
from sense_hat import SenseHat
sense = SenseHat()
sense.set_rotation(90)

with open ('./data/suicide.json', 'r') as f:
    data = json.load(f)

for tweet in data:
    if (tweet['Neg'])==1:
        sense.show_message (tweet['Tweet'], scroll_speed=0.11, text_colour=[255,0,0])
        time.sleep(2)]
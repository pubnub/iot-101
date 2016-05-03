import os
import time
import sys
from pubnub import Pubnub
import Adafruit_DHT as dht


pubnub = Pubnub(publish_key='enter_your_pubkey', subscribe_key='enter_your_subkey')


def callback(message):
    print(message)

#published in this fashion to comply with Eon
while True:
    h,t = dht.read_retry(dht.DHT22, 4)
    pubnub.publish('tempeon', {
        'columns': [
            ['temp-pi', t]
            ]
        })
    pubnub.publish('humeon', {
        'columns': [
            ['humidity', h]
            ]

        })

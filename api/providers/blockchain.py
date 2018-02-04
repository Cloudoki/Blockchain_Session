# coding: utf-8
import requests, json
from models.block import Block
from datetime import datetime

class Blockchain(object):


    def get(self, endpoint):

        response = requests.get(self.api_url + endpoint, headers=self.headers)
        return response

    def post(self, endpoint, payload=None, payload_string=None, headers=None):

        if headers is None: headers = self.headers
        if payload_string is None: payload_string = json.dumps(payload)

        response = requests.post(self.api_url + endpoint, headers=headers, data=payload_string)
        return response

    def genesis (self, first_block = None):

        data = "TEX Event Genesis block"
        nonce, hash, timestamp = Block.pow(data=data, previous_hash="0")

        return Block(data=data, hash=hash, previous_hash="0", nonce=nonce, creation_date=timestamp)

        # return hash, nonce
        #
        # if first_block is not None:
        #
        #     hash = first_block.previous_hash
        #     nonce = self.generateHash()
        #
        # else:
        #
        #
        # return Block(
        #     hash=hash,
        #     previous_hash="0",
        #     data="TEX Event Genesis block",
        #     nonce=,
        #
        #
        # )
        #
        # genesis = Block(nonce = Column(Integer)
        # hash = Column(String(254))
        # previous_hash = Column(String(254))
        # data)

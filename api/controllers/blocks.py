import json
from flask import jsonify, request
from flask_restful import Resource, reqparse
from models.block import Block
from models.profile import Profile

from __init__ import db, blockchain, abort_none_exists

parser = reqparse.RequestParser()
parser.add_argument('email')
parser.add_argument('name')
parser.add_argument('password')
parser.add_argument('profile_id')
parser.add_argument('miner_id')
parser.add_argument('feedback')

class BlocksController(Resource):
    def get(self, id):
        block = db.query(Block).filter_by(id=id).first()
        abort_none_exists(block, Block)

        return jsonify(block)

    def put(self, id):
        return 200

class BlocksListController(Resource):
    def get(self):
        blocks = db.query(Block).all()
        if not len(blocks):
            self.generateFirst()
            blocks = db.query(Block).all()

        return jsonify(blocks[::-1])

    def post(self):
        args = parser.parse_args()
        profile = db.query(Profile).filter_by(id=args['profile_id']).first()
        miner = db.query(Profile).filter_by(id=args['miner_id']).first()
        previous = db.query(Block).order_by('-id').first()

        data = {"message": profile.message, "feedback": args["feedback"], "initiator": profile.email, "miner": miner.email, "reward": 30}

        nonce, hash, timestamp = Block.pow(data=json.dumps(data), previous_hash=previous.hash)

        block = Block(data=json.dumps(data), hash=hash, previous_hash=previous.hash, nonce=nonce, creation_date=timestamp)

        miner.thelmies += 30
        profile.thelmies -= 5


        # remove message from profile
        profile.message = "";

        db.add(block)
        db.commit()

        return jsonify(block)

    def generateFirst(self):

        data = '{"message": "TEX Event Genesis block"}'
        nonce, hash, timestamp = Block.pow(data=data, previous_hash="0")

        first = Block(data=data, hash=hash, previous_hash="0", nonce=nonce, creation_date=timestamp)
        # genesis = blockchain.genesis()
        db.add(first)
        db.commit()

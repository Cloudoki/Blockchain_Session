# coding: utf-8
import hashlib, json, requests
from flask import jsonify, request
from flask_restful import Resource, reqparse
from models.block import Block
from models.profile import Profile

from __init__ import db, blockchain, abort_none_exists

parser = reqparse.RequestParser()
parser.add_argument('email')
parser.add_argument('name')
parser.add_argument('password')
parser.add_argument('message')

class ProfilesController(Resource):
    def get(self, id):
        profile = db.query(Profile).filter_by(id=id).first()
        abort_none_exists(profile, Profile)

        return jsonify(profile)

    def put(self, id):
        args = parser.parse_args()
        profile = db.query(Profile).filter_by(id=id).first()

        profile.message = args['message']
        db.commit()

        return jsonify(profile)


class ProfilesListController(Resource):
    def get(self):
        profiles = db.query(Profile).all()
        return jsonify(profiles)

    def post(self):
        args = parser.parse_args()

        profile = Profile(
            email=args['email'],
            name=args['name'],
            password=hashlib.sha224(args['password'].encode('utf-8')).hexdigest(),
            thelmies=100
         )
        db.add(profile)
        db.commit()

        return jsonify(profile)

class ProfilesLoginController(Resource):
    def get(self):
        args = parser.parse_args()
        password = hashlib.sha224(args['password'].encode('utf-8')).hexdigest()
        profile = db.query(Profile).filter_by(email=args['email']).filter_by(password=password).first()

        abort_none_exists(profile, Profile)

        return jsonify(profile)

#!/usr/bin/env python3
import os, sys
from flask import Flask
from flask_cors import CORS
from flask_restful import Resource, Api
from __init__ import db, CustomJSONEncoder

from controllers.blocks import BlocksController, BlocksListController
from controllers.profiles import ProfilesController, ProfilesListController, ProfilesLoginController

app = Flask(__name__)
api = Api(app)
app.json_encoder = CustomJSONEncoder
CORS(app)

# Endpoints list
api.add_resource(BlocksListController, '/v1/blocks')
api.add_resource(BlocksController, '/v1/blocks/<string:id>')
api.add_resource(ProfilesListController, '/v1/profiles')
api.add_resource(ProfilesController, '/v1/profiles/<string:id>')
api.add_resource(ProfilesLoginController, '/v1/login')


if __name__ == '__main__':
    app.run(debug=True, port=5001)

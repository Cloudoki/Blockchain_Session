import os
from os.path import join, dirname
from datetime import datetime
from dotenv import load_dotenv
from flask.json import JSONEncoder
from flask_restful import abort

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlite3 import dbapi2 as sqlite

from models.base import Base
from models.block import Block
from providers.blockchain import Blockchain


# Settings
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

# SQL Alchemy
engine = create_engine(os.environ.get("SQL_ENGINE"), module=sqlite, convert_unicode=True)
session = scoped_session(sessionmaker(bind=engine))
Base.metadata.create_all(engine)

db = session()

# Provider class
blockchain = Blockchain()


class CustomJSONEncoder(JSONEncoder):

    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            return obj.to_dict()
        elif isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d')
        return super(CustomJSONEncoder, self).default(obj)

def abort_none_exists(element, model):
    if not element:
        abort(404, message="Requested {} doesn't exist".format(model.__name__.lower()))

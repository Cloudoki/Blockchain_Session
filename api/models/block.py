# coding: utf-8
import hashlib
from sqlalchemy import Column, String, Text, ForeignKey, Integer, DateTime
from sqlalchemy.orm import relationship, backref
from datetime import datetime
from models.base import Base


class Block(Base):
    __tablename__ = 'blocks'

    data = Column(Text)
    hash = Column(String(254))
    previous_hash = Column(String(254))
    nonce = Column(Integer)
    creation_date = Column(DateTime, default=datetime.utcnow)

    miner_id = Column(Integer, ForeignKey('profiles.id'))

    def pow (data, previous_hash, creation_date=None):
        nonce = 0
        if creation_date is None:
            creation_date = datetime.utcnow()

        contents = data + creation_date.strftime("%s") + previous_hash
        hash = hashlib.sha224(contents.encode('utf-8')).hexdigest()
        nonce += 1

        while hash[0:3] != "000":
            base = contents + str(nonce)
            hash = hashlib.sha224(base.encode('utf-8')).hexdigest()
            nonce += 1

        return nonce, hash, creation_date

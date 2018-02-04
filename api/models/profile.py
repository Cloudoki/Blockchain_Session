# coding: utf-8
from datetime import date, datetime
from sqlalchemy import Table, Column, ForeignKey, String, Integer, Text
from sqlalchemy.orm import relationship, backref
from models.base import Base


class Profile(Base):
    __tablename__ = 'profiles'

    email = Column(String(128))
    name = Column(String(128))
    password = Column(String(254))
    thelmies = Column(Integer)
    message = Column(Text)

    blocks = relationship("Block", backref="profiles")

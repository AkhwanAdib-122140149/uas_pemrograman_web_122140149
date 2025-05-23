from sqlalchemy import Column, Integer, String
from .meta import Base

class Menu(Base):
    __tablename__ = 'menus'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(String)
    image_url = Column(String)

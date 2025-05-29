from sqlalchemy import Column, Integer, String, UnicodeText, DateTime
from .meta import Base
import bcrypt # Anda perlu menginstal bcrypt: pip install bcrypt
import datetime # Tambahkan ini
import secrets # Tambahkan ini untuk token yang aman

class AdminUser(Base):
    __tablename__ = 'admin_users'
    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=True)
    password_hash = Column(UnicodeText, nullable=False)
    reset_token = Column(String(255), unique=True, nullable=True)
    reset_token_expiration = Column(DateTime, nullable=True)

    def set_password(self, pw):
        pwhash = bcrypt.hashpw(pw.encode('utf8'), bcrypt.gensalt())
        self.password_hash = pwhash.decode('utf8')

    def check_password(self, pw):
        if self.password_hash is not None:
            expected_hash = self.password_hash.encode('utf8')
            return bcrypt.checkpw(pw.encode('utf8'), expected_hash)
        return False
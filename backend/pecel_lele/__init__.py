from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models.meta import Base
from .models import Menu
from pyramid.events import NewRequest

__all__ = ['Base', 'Menu']

def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        })
        return response
    event.request.add_response_callback(cors_headers)

def main(global_config, **settings):
    engine = engine_from_config(settings, 'sqlalchemy.')
    from sqlalchemy.orm import sessionmaker
    DBSession = sessionmaker(bind=engine)

    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.include('.models')
    config.include('.routes')  # penting

    config.add_static_view(name='static', path='pecel_lele:static')

    config.add_subscriber(add_cors_headers_response_callback, NewRequest)

    config.add_route('home', '/')
    config.scan('.views')  # pastikan folder views ada
    config.add_request_method(lambda r: DBSession(), 'dbsession', reify=True)
    return config.make_wsgi_app()


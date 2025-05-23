from pyramid.config import Configurator

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('.my_cors_tween') 
    config.include('pyramid_jinja2')
    config.include('.models')
    config.include('.routes')
    config.add_static_view(name='static', path='pecel_lele:static') #
    config.add_route('home', '/')
    config.scan('.views')

    return config.make_wsgi_app()
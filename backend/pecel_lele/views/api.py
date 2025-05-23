from pyramid.view import view_config
from pyramid.response import Response
from pecel_lele.models import Menu

@view_config(route_name='api_home', renderer='json')
def api_home(request):
    return {
        'message': 'Welcome to Pecel Lele UMKM API',
        'endpoints': ['/api/menus', '/api/menus/{id}']
    }

@view_config(route_name='get_menus_api', renderer='json', request_method='GET')
def get_menus_api(request):
    menus = request.dbsession.query(Menu).all()
    return [
        {
            'id': menu.id,
            'name': menu.name,
            'price': menu.price,
            'description': menu.description,
            'image_url': menu.image_url
        }
        for menu in menus
    ]

@view_config(route_name='add_menu_api', renderer='json', request_method='POST')
def add_menu_api(request):
    token = request.headers.get('Authorization', '')
    if token != 'Bearer dummy-token':
        return Response(json_body={'error': 'Unauthorized'}, status=401)

    data = request.json_body
    menu = Menu(
        name=data['name'],
        price=data['price'],
        description=data.get('description', ''),
        image_url=data.get('image_url', '')
    )
    request.dbsession.add(menu)
    return {'message': 'Menu added successfully'}

@view_config(route_name='get_menu_api', renderer='json', request_method='PUT')
def update_menu_api(request):
    token = request.headers.get('Authorization', '')
    if token != 'Bearer dummy-token':
        return Response(json_body={'error': 'Unauthorized'}, status=401)

    id = int(request.matchdict['id'])
    data = request.json_body
    menu = request.dbsession.query(Menu).get(id)

    if menu is None:
        return Response(json_body={'error': 'Not found'}, status=404)

    menu.name = data['name']
    menu.price = data['price']
    menu.description = data.get('description', '')
    menu.image_url = data.get('image_url', '')
    return {'message': 'Menu updated'}

@view_config(route_name='get_menu_api', renderer='json', request_method='DELETE')
def delete_menu_api(request):
    token = request.headers.get('Authorization', '')
    if token != 'Bearer dummy-token':
        return Response(json_body={'error': 'Unauthorized'}, status=401)

    id = int(request.matchdict['id'])
    menu = request.dbsession.query(Menu).get(id)

    if menu is None:
        return Response(json_body={'error': 'Not found'}, status=404)

    request.dbsession.delete(menu)
    return {'message': 'Menu deleted'}

# Untuk menghindari error preflight dari browser (OPTIONS)
@view_config(route_name='get_menu_api', request_method='OPTIONS', renderer='string')
@view_config(route_name='add_menu_api', request_method='OPTIONS', renderer='string')
@view_config(route_name='get_menus_api', request_method='OPTIONS', renderer='string')
def handle_options(request):
    return ''

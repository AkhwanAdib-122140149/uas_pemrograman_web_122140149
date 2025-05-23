from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from ..models import Menu
import json

# @view_config(route_name='get_menus_web', renderer='json', request_method='GET')
# def get_menus_web(request):
#     try:
#         menus = request.dbsession.query(Menu).all()
#         return [
#             {
#                 'id': m.id,
#                 'name': m.name,
#                 'price': m.price,
#                 'description': m.description,
#                 'image_url': m.image_url
#             }
#             for m in menus
#         ]
#     except DBAPIError:
#         return Response(json.dumps({'error': 'DB error'}), content_type='application/json', status=500)

# @view_config(route_name='add_menu_web', renderer='json', request_method='POST')
# def add_menu_web(request):
#     data = request.json_body
#     menu = Menu(
#         name=data['name'],
#         price=data['price'],
#         description=data.get('description', ''),
#         image_url=data.get('image_url', '')
#     )
#     request.dbsession.add(menu)
#     return {'message': 'Menu added successfully'}

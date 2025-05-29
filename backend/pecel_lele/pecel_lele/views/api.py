# /uaspemweb/backend/pecellele/pecellele/views/api.py

from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError, IntegrityError # <-- Tambahkan IntegrityError
import json

# Impor yang diperlukan untuk login dan keamanan
from pyramid.httpexceptions import HTTPUnauthorized, HTTPBadRequest # <-- TAMBAHKAN INI
import jwt # <-- TAMBAHKAN INI
import datetime # <-- TAMBAHKAN INI
from ..models import Menu, AdminUser # <-- Tambahkan AdminUser

# Kunci rahasia untuk membuat token, GANTI DENGAN STRING ACAK YANG KUAT!
JWT_SECRET_KEY = 'kunci-rahasia-anda-yang-sangat-aman-dan-panjang' # <-- TAMBAHKAN INI

# --- FUNGSI KEAMANAN DAN LOGIN ---

def verify_jwt_token(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPUnauthorized(json_body={'error': 'Authorization header missing or invalid'})

    token = auth_header.split(' ')[1]
    try:
        # Gunakan secret key yang sama dengan saat membuat token
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPUnauthorized(json_body={'error': 'Token has expired'})
    except jwt.InvalidTokenError:
        raise HTTPUnauthorized(json_body={'error': 'Invalid token'})

@view_config(route_name='admin_login', renderer='json', request_method='POST') # <-- TAMBAHKAN VIEW INI
def admin_login_view(request):
    try:
        json_body = request.json_body
        username = json_body.get('username')
        password = json_body.get('password')
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'Invalid JSON payload'})

    if not username or not password:
        return HTTPBadRequest(json_body={'error': 'Username and password are required'})

    # Di sini kita menggunakan 'admins' sesuai nama tabel di database Anda
    admin_user = request.dbsession.query(AdminUser).filter_by(username=username).first()

    if admin_user and admin_user.check_password(password):
        # Buat token JWT
        payload = {
            'user_id': admin_user.id,
            'username': admin_user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1) # Token berlaku 1 jam
        }
        token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
        return {'message': 'Login successful', 'token': token}
    else:
        return HTTPUnauthorized(json_body={'error': 'Invalid username or password'})

# --- API ENDPOINTS UNTUK MENU ---

@view_config(route_name='api_home', renderer='json')
def api_home(request):
    return {
        'message': 'Welcome to Pecel Lele UMKM API',
        'endpoints': ['/api/menus', '/api/menus/{id}']
    }

@view_config(route_name='api_menus_collection', renderer='json', request_method='GET')
def get_menus_collection_api(request):
    try:
        dbsession = request.dbsession
        menus = dbsession.query(Menu).all()
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
    except DBAPIError:
        return Response(json.dumps({'error': 'Database error while fetching menus'}), content_type='application/json', status=500)

@view_config(route_name='api_menus_collection', renderer='json', request_method='POST')
def add_menu_collection_api(request):
    try:
        verify_jwt_token(request) # <--- TAMBAHKAN INI UNTUK KEAMANAN
    except HTTPUnauthorized as e:
        return e
        
    try:
        data = request.json_body
        
        if not data.get('name') or not data.get('price'):
            return Response(json.dumps({'error': 'Missing required fields: name and price'}),
                            content_type='application/json', status=400)

        menu = Menu(
            name=data['name'],
            price=data['price'],
            description=data.get('description', ''),
            image_url=data.get('image_url', '')
        )
        request.dbsession.add(menu)
        request.dbsession.flush()

        return {
            'message': 'Menu added successfully',
            'menu': {
                'id': menu.id, 'name': menu.name, 'price': menu.price,
                'description': menu.description, 'image_url': menu.image_url
            }
        }
    except IntegrityError as e:
        request.dbsession.rollback()
        return Response(json.dumps({'error': f'Integrity error: {e.orig}'}),
                        content_type='application/json', status=409)
    except DBAPIError as e:
        return Response(json.dumps({'error': f'Database error: {e}'}),
                        content_type='application/json', status=500)
    except KeyError as e:
        return Response(json.dumps({'error': f'Missing field in JSON body: {str(e)}'}),
                        content_type='application/json', status=400)
    except Exception as e:
        return Response(json.dumps({'error': f'An unexpected error occurred: {str(e)}'}),
                        content_type='application/json', status=500)

@view_config(route_name='api_menu_item', renderer='json', request_method='GET')
def get_menu_item_api(request):
    try:
        menu_id = request.matchdict['id']
        menu = request.dbsession.query(Menu).filter(Menu.id == menu_id).first()
        if not menu:
            return Response(json.dumps({'error': 'Menu not found'}), content_type='application/json', status=404)
        return {
            'id': menu.id, 'name': menu.name, 'price': menu.price,
            'description': menu.description, 'image_url': menu.image_url
        }
    except DBAPIError:
        return Response(json.dumps({'error': 'Database error while fetching menu item'}), content_type='application/json', status=500)

@view_config(route_name='api_menu_item', renderer='json', request_method='PUT')
def update_menu_item_api(request):
    try:
        verify_jwt_token(request) # <--- TAMBAHKAN INI UNTUK KEAMANAN
    except HTTPUnauthorized as e:
        return e
        
    try:
        menu_id = request.matchdict['id']
        menu = request.dbsession.query(Menu).filter(Menu.id == menu_id).first()

        if not menu:
            return Response(json.dumps({'error': 'Menu not found'}), content_type='application/json', status=404)

        data = request.json_body
        menu.name = data.get('name', menu.name)
        menu.price = data.get('price', menu.price)
        menu.description = data.get('description', menu.description)
        menu.image_url = data.get('image_url', menu.image_url)
        
        request.dbsession.flush()
        return {'message': f'Menu {menu_id} updated successfully',
                'menu': {
                    'id': menu.id, 'name': menu.name, 'price': menu.price,
                    'description': menu.description, 'image_url': menu.image_url
                }
               }
    except KeyError as e:
        return Response(json.dumps({'error': f'Invalid data: {str(e)}'}), content_type='application/json', status=400)
    except DBAPIError:
        return Response(json.dumps({'error': 'Database error while updating menu'}), content_type='application/json', status=500)
    except Exception as e:
        return Response(json.dumps({'error': f'An unexpected error occurred: {str(e)}'}), content_type='application/json', status=500)

@view_config(route_name='api_menu_item', renderer='json', request_method='DELETE')
def delete_menu_item_api(request):
    try:
        verify_jwt_token(request) # <--- TAMBAHKAN INI UNTUK KEAMANAN
    except HTTPUnauthorized as e:
        return e
        
    try:
        menu_id = request.matchdict['id']
        menu = request.dbsession.query(Menu).filter(Menu.id == menu_id).first()

        if not menu:
            return Response(json.dumps({'error': 'Menu not found'}), content_type='application/json', status=404)

        request.dbsession.delete(menu)
        request.dbsession.flush()
        return {'message': f'Menu {menu_id} deleted successfully'}
    except DBAPIError:
        return Response(json.dumps({'error': 'Database error while deleting menu'}), content_type='application/json', status=500)
    except Exception as e:
        return Response(json.dumps({'error': f'An unexpected error occurred: {str(e)}'}), content_type='application/json', status=500)
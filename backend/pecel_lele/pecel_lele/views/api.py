# /uaspemweb/backend/pecellele/pecellele/views/api.py

from pyramid.view import view_config
from pyramid.response import Response # Pastikan ini diimpor
from sqlalchemy.exc import DBAPIError # Untuk error handling database
import json # Untuk membuat response error manual

from pecel_lele.models import Menu # [cite: 17]

@view_config(route_name='api_home', renderer='json') # [cite: 74]
def api_home(request):
    return {
        'message': 'Welcome to Pecel Lele UMKM API',
        'endpoints': ['/api/menus', '/api/menus/{id}']
    } # [cite: 74]

@view_config(route_name='api_menus_collection', renderer='json', request_method='GET')
def get_menus_collection_api(request): # Menggantikan get_menus_api lama
    try:
        dbsession = request.dbsession
        menus = dbsession.query(Menu).all()
        return [
            {
                'id': menu.id,
                'name': menu.name, # [cite: 31]
                'price': menu.price, # [cite: 31]
                'description': menu.description, # [cite: 31]
                'image_url': menu.image_url # [cite: 31]
            }
            for menu in menus
        ]
    except DBAPIError:
        return Response(json.dumps({'error': 'Database error while fetching menus'}), content_type='application/json', status=500)

@view_config(route_name='api_menus_collection', renderer='json', request_method='POST')
def add_menu_collection_api(request):
    try:
        data = request.json_body
        
        # Validasi data dasar (contoh sederhana)
        if not data.get('name') or not data.get('price'):
            return Response(json.dumps({'error': 'Missing required fields: name and price'}),
                            content_type='application/json', status=400)

        menu = Menu(
            name=data['name'],
            price=data['price'], #
            description=data.get('description', ''),
            image_url=data.get('image_url', '')
        )
        request.dbsession.add(menu) #
        request.dbsession.flush()   # Kirim ke DB, dapatkan ID, tapi belum commit transaksi

        return {
            'message': 'Menu added successfully',
            'menu': {
                'id': menu.id,
                'name': menu.name,
                'price': menu.price,
                'description': menu.description,
                'image_url': menu.image_url
            }
        }
    except IntegrityError as e: # Misal jika ada unique constraint yang dilanggar
        request.dbsession.rollback() # Rollback sesi saat ini jika ada error integrity
        return Response(json.dumps({'error': f'Integrity error: {e.orig}'}),
                        content_type='application/json', status=409) # 409 Conflict
    except DBAPIError as e: # Error database lainnya
        # pyramid_tm akan otomatis rollback karena ada exception
        return Response(json.dumps({'error': f'Database error: {e}'}),
                        content_type='application/json', status=500)
    except KeyError as e: # Jika field wajib (name/price) tidak ada di json_body
        return Response(json.dumps({'error': f'Missing field in JSON body: {str(e)}'}),
                        content_type='application/json', status=400)
    except Exception as e: # Tangkap error umum lainnya
        # pyramid_tm akan otomatis rollback
        # Pertimbangkan untuk logging error ini
        # import logging
        # log = logging.getLogger(__name__)
        # log.error(f"Unexpected error in add_menu_collection_api: {e}", exc_info=True)
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
            'id': menu.id,
            'name': menu.name,
            'price': menu.price,
            'description': menu.description,
            'image_url': menu.image_url
        }
    except DBAPIError:
        return Response(json.dumps({'error': 'Database error while fetching menu item'}), content_type='application/json', status=500)

@view_config(route_name='api_menu_item', renderer='json', request_method='PUT')
def update_menu_item_api(request):
    try:
        menu_id = request.matchdict['id']
        menu = request.dbsession.query(Menu).filter(Menu.id == menu_id).first()

        if not menu:
            return Response(json.dumps({'error': 'Menu not found'}), content_type='application/json', status=404)

        data = request.json_body
        # Update field yang ada di data, biarkan yang lama jika tidak ada di data
        menu.name = data.get('name', menu.name)
        menu.price = data.get('price', menu.price)
        menu.description = data.get('description', menu.description)
        menu.image_url = data.get('image_url', menu.image_url)
        
        # request.dbsession.add(menu) # Tidak perlu jika objek sudah di-track oleh session
        request.dbsession.flush() # Memastikan perubahan tersimpan sebelum commit
        return {'message': f'Menu {menu_id} updated successfully',
                'menu': {
                    'id': menu.id,
                    'name': menu.name,
                    'price': menu.price,
                    'description': menu.description,
                    'image_url': menu.image_url
                }
               }
    except KeyError as e: # Jika json_body tidak valid atau field salah
        return Response(json.dumps({'error': f'Invalid data: {str(e)}'}), content_type='application/json', status=400)
    except DBAPIError:
        return Response(json.dumps({'error': 'Database error while updating menu'}), content_type='application/json', status=500)
    except Exception as e:
        return Response(json.dumps({'error': f'An unexpected error occurred: {str(e)}'}), content_type='application/json', status=500)

# Opsional: Tambahkan view untuk DELETE jika Anda memerlukannya
@view_config(route_name='api_menu_item', renderer='json', request_method='DELETE')
def delete_menu_item_api(request):
    try:
        menu_id = request.matchdict['id']
        menu = request.dbsession.query(Menu).filter(Menu.id == menu_id).first()

        if not menu:
            return Response(json.dumps({'error': 'Menu not found'}), content_type='application/json', status=404)

        request.dbsession.delete(menu)
        request.dbsession.flush() # Memastikan penghapusan tersimpan sebelum commit
        return {'message': f'Menu {menu_id} deleted successfully'}
    except DBAPIError:
        return Response(json.dumps({'error': 'Database error while deleting menu'}), content_type='application/json', status=500)
    except Exception as e:
        return Response(json.dumps({'error': f'An unexpected error occurred: {str(e)}'}), content_type='application/json', status=500)
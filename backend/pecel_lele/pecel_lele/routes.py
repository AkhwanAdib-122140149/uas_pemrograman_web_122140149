# /uaspemweb/backend/pecellele/pecellele/routes.py

def includeme(config):
    # API routes
    config.add_route('api_home', '/api')

    # Route untuk koleksi menu (GET list, POST create)
    config.add_route('api_menus_collection', '/api/menus')

    # Route untuk item menu individual (GET one, PUT update, DELETE delete)
    config.add_route('api_menu_item', '/api/menus/{id}')
    
    # Route baru untuk login admin <-- TAMBAHKAN BARIS INI
    config.add_route('admin_login', '/api/admin/login')
    
    # Web routes (jika masih digunakan, biarkan atau sesuaikan)
    config.add_route('get_menus_web', '/menus')
    config.add_route('add_menu_web', '/menus/add')
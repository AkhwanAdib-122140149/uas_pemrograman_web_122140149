# /uaspemweb/backend/pecellele/pecellele/routes.py

def includeme(config):
    # API routes
    config.add_route('api_home', '/api') # Tetap [cite: 3]

    # Route untuk koleksi menu (GET list, POST create)
    config.add_route('api_menus_collection', '/api/menus')

    # Route untuk item menu individual (GET one, PUT update, DELETE delete)
    config.add_route('api_menu_item', '/api/menus/{id}')
    
    # Web routes (jika masih digunakan, biarkan atau sesuaikan)
    config.add_route('get_menus_web', '/menus') # [cite: 3]
    config.add_route('add_menu_web', '/menus/add') # [cite: 3]

    # Hapus atau komentari route lama yang mungkin konflik jika ada
    # config.add_route('get_menus_api', '/api/menus') # Digantikan oleh api_menus_collection
    # config.add_route('add_menu_api', '/api/menus/add') # Digantikan oleh api_menus_collection
    # config.add_route('get_menu_api', '/api/menus/{id}') # Digantikan oleh api_menu_item
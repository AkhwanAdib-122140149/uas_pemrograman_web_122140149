def includeme(config):
    # API routes only
    config.add_route('api_home', '/api')
    config.add_route('get_menus_api', '/api/menus')          # GET all
    config.add_route('add_menu_api', '/api/menus')           # POST
    config.add_route('get_menu_api', '/api/menus/{id}')      # GET by id, PUT, DELETE

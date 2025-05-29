# backend/pecel_lele/create_admin.py
import os
import sys
import transaction
from pyramid.paster import bootstrap, setup_logging
from pyramid.scripts.common import parse_vars
from pecel_lele.models import AdminUser, get_tm_session
from pecel_lele.models.meta import Base

def main(argv=sys.argv):
    if len(argv) < 2:
        sys.exit("Usage: python create_admin.py <config_uri> [var=value]")
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    env = bootstrap(config_uri, options=options)

    with env['request'].tm:
        dbsession = env['request'].dbsession

        # Cek jika admin sudah ada
        existing_admin = dbsession.query(AdminUser).filter_by(username='admin').first()
        if existing_admin:
            print("Admin user 'admin' already exists.")
            return

        # Buat admin baru
        admin = AdminUser(username='admin')
        admin.set_password('admin123') # Password di-hash secara otomatis oleh model
        dbsession.add(admin)

        print("Admin user 'admin' with password 'admin123' created successfully.")

if __name__ == '__main__':
    main()
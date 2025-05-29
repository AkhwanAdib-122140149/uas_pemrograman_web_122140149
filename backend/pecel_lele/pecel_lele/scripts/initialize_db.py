# backend/pecel_lele/pecel_lele/scripts/initialize_db.py

import os
import sys
from pyramid.paster import get_appsettings, setup_logging
from pyramid.scripts.common import parse_vars
from alembic.config import Config
from alembic import command
from ..models.meta import Base
from ..models import get_engine

def main(argv=sys.argv):
    if len(argv) < 2:
        sys.exit(
            'Usage: %s <config_uri> [var=value]\n'
            '(example: "%s development.ini")' % (argv[0], argv[0])
        )
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    settings = get_appsettings(config_uri, options=options)
    engine = get_engine(settings)

    # 1. Buat semua tabel berdasarkan model yang ada (Menu, AdminUser)
    print("Creating database tables...")
    Base.metadata.create_all(engine)
    print("Tables created successfully.")

    # 2. Tandai database dengan versi Alembic terbaru
    print("Stamping database with Alembic head...")
    alembic_cfg = Config(config_uri)
    command.stamp(alembic_cfg, "head")
    print("Database stamped successfully.")
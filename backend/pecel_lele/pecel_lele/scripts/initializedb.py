# import os
# import sys
# from sqlalchemy import engine_from_config
# from sqlalchemy.orm import sessionmaker

# from pecel_lele.models import Base, Menu

# def usage(argv):
#     cmd = os.path.basename(argv[0])
#     print(f'usage: {cmd} <config_uri>')
#     print(f'(example: "{cmd} development.ini")')
#     sys.exit(1)

# def main(argv=sys.argv):
#     print("=== Memulai script initializedb ===")
#     if len(argv) != 2:
#         usage(argv)
#     config_uri = argv[1]
#     from pyramid.paster import get_appsettings
#     settings = get_appsettings(config_uri)
#     engine = engine_from_config(settings, 'sqlalchemy.')
#     DBSession = sessionmaker(bind=engine)

#     print("Creating tables...")
#     Base.metadata.drop_all(engine)
#     Base.metadata.create_all(engine)

#     session = DBSession()
#     session.add_all([
#         Menu(name='Lele Goreng', price=15000, description='Lele goreng dengan sambal', image_url='https://example.com/lele.jpg'),
#         Menu(name='Ayam Penyet', price=18000, description='Ayam penyet sambal terasi', image_url='https://example.com/ayam.jpg'),
#         Menu(name='Tahu Tempe', price=5000, description='Tahu tempe goreng', image_url='https://example.com/tahu.jpg'),
#     ])
#     session.commit()
#     print("Database initialized with dummy data.")
#     print("=== Selesai ===")

# # ✅ Tambahkan ini agar main() dipanggil
# if __name__ == '__main__':
#     main()

# /uaspemweb/backend/pecellele/pecellele/my_cors_tween.py

from pyramid.response import Response as PyramidResponse

class CORSTweenFactory:
    def __init__(self, handler, registry):
        self.handler = handler
        self.registry = registry # Simpan registry jika suatu saat dibutuhkan

    def __call__(self, request):
        # Untuk request preflight OPTIONS, kita perlu mengatur header CORS
        # dan mengembalikan response OK secepatnya.
        if request.method == 'OPTIONS':
            # Membuat response kosong yang akan diisi header CORS
            response = PyramidResponse(status=200)
        else:
            # Untuk metode lain, proses request seperti biasa melalui handler berikutnya
            try:
                response = self.handler(request)
            except Exception as e:
                # Jika ada error saat memproses request utama, biarkan Pyramid menanganinya
                # (misalnya, melalui exception view yang akan memicu pyramid_tm untuk rollback)
                # Namun, kita tetap ingin menambahkan header CORS ke response error jika memungkinkan.
                # Jika self.handler(request) gagal dan tidak mengembalikan response,
                # kita tidak bisa menambahkan header ke sana. pyramid_tm akan rollback.
                # Jadi, kita re-raise error agar ditangani oleh sistem exception Pyramid.
                raise # Re-raise error untuk ditangani oleh exception view Pyramid

        # Tambahkan header CORS ke SEMUA response (baik itu dari OPTIONS atau metode lain)
        # Pastikan ini selalu dijalankan jika 'response' sudah terdefinisi.
        response.headers.update({
            'Access-Control-Allow-Origin': 'http://localhost:3000', # Ganti jika port frontend berbeda
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '3600' # Cache preflight selama 1 jam
        })
        return response

def includeme(config):
    # Pastikan path ke CORSTweenFactory benar sesuai struktur direktori Anda
    config.add_tween('pecel_lele.my_cors_tween.CORSTweenFactory', #
                     under='pyramid.tweens.excview_tween_factory')
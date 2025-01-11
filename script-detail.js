document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const makananId = urlParams.get('id');

    const namaMakanan = document.getElementById('nama-makanan');
    const gambarMakanan = document.getElementById('gambar-makanan');
    const deskripsiMakanan = document.getElementById('deskripsi-makanan');

    // Data Makanan (bisa Anda pindahkan ke file JSON terpisah jika perlu)
    const dataMakanan = {
        "nasi-goreng": {
            "nama": "Nasi Goreng",
            "gambar": "https://assets.unileversolutions.com/recipes-v2/242794.jpg",
            "deskripsi": "Nasi goreng adalah makanan khas Indonesia yang terbuat dari nasi yang digoreng dengan bumbu-bumbu seperti bawang merah, bawang putih, cabai, dan kecap manis. Biasanya disajikan dengan telur, ayam, atau seafood."
        },
        "mie-ayam": {
            "nama": "Mie Ayam",
            "gambar": "https://kurio-img.kurioapps.com/21/12/01/c0002ce2-2ee1-4f6e-aa6a-ac6aa9387e01.jpe",
            "deskripsi": "Mie ayam adalah makanan yang terbuat dari mie kuning yang direbus dan dicampur dengan daging ayam yang sudah dibumbui. Biasanya disajikan dengan kuah kaldu, sayuran, dan pangsit."
        },
        "ayam-bakar":{
            "nama": "Ayam Bakar",
            "gambar": "https://kurio-img.kurioapps.com/21/12/13/4b216ab9-72c4-491f-8eb7-c463f5bc6d43.jpe",
            "deskripsi": "Ayam bakar adalah makanan yang terbuat dari ayam yang dibumbui dengan rempah-rempah dan kemudian dibakar. Biasanya disajikan dengan nasi, lalapan, dan sambal."
        },
        "es-teh":{
            "nama": "Es Teh",
            "gambar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr42zinHkcmw-8fHMUQbShTOuR4tHjZpPAmg&s",
            "deskripsi": "Es teh adalah minuman yang terbuat dari teh yang diseduh dan kemudian didinginkan dengan es batu. Biasanya disajikan dengan gula atau pemanis lainnya."
        },
        "jus-alpukat":{
            "nama": "Jus Alpukat",
            "gambar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy2T_pRM3RRbSSBrLuaTiJqZ88R02O96ygKQ&s",
            "deskripsi": "Jus alpukat adalah minuman yang terbuat dari buah alpukat yang diblender dengan air, susu, dan gula. Biasanya disajikan dengan es batu."
        }
    };

    if (dataMakanan[makananId]) {
        namaMakanan.textContent = dataMakanan[makananId].nama;
        gambarMakanan.src = dataMakanan[makananId].gambar;
        deskripsiMakanan.textContent = dataMakanan[makananId].deskripsi;
    } else {
        namaMakanan.textContent = "Makanan tidak ditemukan";
    }
});
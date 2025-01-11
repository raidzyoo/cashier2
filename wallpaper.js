const starsContainer = document.getElementById('stars-container');
const numStars = 150; // Jumlah bintang

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // Ukuran bintang random
    const size = Math.random() * 3;
    if (size < 1) {
        star.classList.add('star-small');
    } else if (size < 2) {
        star.classList.add('star-medium');
    } else {
        star.classList.add('star-large');
    }

    // Posisi random (hanya horizontal)
    const x = Math.random() * window.innerWidth;
    const y = -Math.random() * 50;  // Mulai dari atas layar (negatif)

    star.style.left = x + 'px';
    star.style.top = y + 'px';

    // Durasi animasi random (fall dan twinkle)
    const duration = 4 + Math.random() * 6; // Durasi antara 4 dan 10 detik
    star.style.animationDuration = duration + 's, ' + (duration * 0.5) + 's';

    starsContainer.appendChild(star);

    // Hapus bintang setelah animasi selesai
    star.addEventListener('animationend', function() {
        if (this.parentNode) {
            starsContainer.removeChild(this);
            createStar(); // Buat bintang baru sebagai pengganti
        }
    });
}

// Membuat bintang-bintang
for (let i = 0; i < numStars; i++) {
    createStar();
}

// Fungsi untuk membuat bintang-bintang baru saat ukuran layar berubah (resize)
function handleResize() {
    // Sesuaikan jumlah bintang berdasarkan resolusi jika perlu
    // ... (opsional)

    // Hapus bintang-bintang yang sudah ada
    starsContainer.innerHTML = '';

    // Buat bintang-bintang baru
    for (let i = 0; i < numStars; i++) {
        createStar();
    }
}

// Event listener untuk resize
window.addEventListener('resize', handleResize);
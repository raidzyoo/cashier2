// URL webhook Discord Anda
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1327285421343768697/dbICQOnLBIT5sdqLno7kkig2Mk4ze1RH2pD5YS-VqCOfwatvr79t5qkd-BLb5AhrNo2g"; // Ganti dengan URL webhook Anda

function resizeInput(element) {
    // ... (fungsi ini tidak berubah) ...
}

function initializeInputWidths() {
    // ... (fungsi ini tidak berubah) ...
}

window.addEventListener('load', initializeInputWidths);

let totalHargaSemua = 0; // Variabel untuk menyimpan total harga

function kumpulkanPesanan() {
    const menuItems = document.querySelectorAll('.menu-item');
    const daftarPesanan = [];
    totalHargaSemua = 0; // Reset total harga

    menuItems.forEach(item => {
        const nama = item.querySelector('h2').innerText;
        const hargaText = item.querySelector('p').innerText.match(/Rp(\d{1,3}(?:\.\d{3})*)/);
        const harga = parseInt(hargaText[1].replace(/\./g, ''));
        const input = item.querySelector('input[type="number"]');
        const jumlah = parseInt(input.value);

        if (jumlah > 0) {
            daftarPesanan.push({ nama, harga, jumlah });
            totalHargaSemua += harga * jumlah;
        }
    });

    // Cek apakah ada item yang dipesan
    if (daftarPesanan.length === 0) {
        alert('Silakan pilih minimal satu item untuk dipesan.');
        return; // Hentikan eksekusi fungsi jika tidak ada item yang dipesan
    }

    // Tampilkan total harga
    document.getElementById('total-harga-text').textContent = `Total Harga: Rp${totalHargaSemua.toLocaleString('id-ID')}`;

    // Tampilkan bagian pembayaran
    document.getElementById('payment-section').style.display = 'block';

    // Reset nominal input menjadi 0 setelah menekan "Pesan Semua"
    document.getElementById('nominal-nasi-goreng').value = 0;
    document.getElementById('nominal-mie-ayam').value = 0;
    document.getElementById('nominal-ayam-bakar').value = 0;
    document.getElementById('nominal-es-teh').value = 0;
    document.getElementById('nominal-jus-alpukat').value = 0;
}

function hitungKembalian() {
    const uangDibayar = parseFloat(document.getElementById('uang-dibayar').value);

    if (isNaN(uangDibayar)) {
        alert('Masukkan nominal uang yang dibayarkan!');
        return;
    }

    if (uangDibayar < totalHargaSemua) {
        alert('Uang yang dibayarkan kurang!');
        return;
    }

    const kembalian = uangDibayar - totalHargaSemua;
    document.getElementById('kembalian-text').textContent = `Kembalian: Rp${kembalian.toLocaleString('id-ID')}`;
}

function konfirmasiDanKirim() {
    const namaPemesan = document.getElementById('nama-pemesan').value;
    const nomorMeja = document.getElementById('nomor-meja').value;

    // Validasi nama pemesan dan nomor meja
    if (!namaPemesan || !nomorMeja) {
        alert('Harap isi nama pemesan dan nomor meja.');
        return;
    }
    const menuItems = document.querySelectorAll('.menu-item');
    const urlParams = new URLSearchParams();
    let daftarPesanan = [];

    menuItems.forEach(item => {
        const nama = item.querySelector('h2').innerText;
        const hargaText = item.querySelector('p').innerText.match(/Rp(\d{1,3}(?:\.\d{3})*)/);
        const harga = parseInt(hargaText[1].replace(/\./g, ''));
        const input = item.querySelector('input[type="number"]');
        const jumlah = parseInt(input.value);

        if (jumlah > 0) {
            daftarPesanan.push({ nama, harga, jumlah });
            const encodedNama = encodeURIComponent(nama);
            const encodedHarga = encodeURIComponent(harga);
            urlParams.append(`pesanan_${encodedNama}_${encodedHarga}`, jumlah);
        }
    });

    // Ambil data pembayaran
    const uangDibayar = parseFloat(document.getElementById('uang-dibayar').value);
    if (isNaN(uangDibayar)) {
        alert('Masukkan nominal uang yang dibayarkan sebelum konfirmasi!');
        return;
    }

    const kembalian = uangDibayar - totalHargaSemua;

    // Simpan data yang diperlukan ke localStorage
    localStorage.setItem('daftarPesanan', JSON.stringify(daftarPesanan));
    localStorage.setItem('totalHarga', totalHargaSemua);
    localStorage.setItem('uangDibayar', uangDibayar);
    localStorage.setItem('kembalian', kembalian);
    localStorage.setItem('namaPemesan', namaPemesan);
    localStorage.setItem('nomorMeja', nomorMeja);

    // Alihkan ke halaman konfirmasi dengan membawa data pesanan di URL
    window.location.href = `konfirmasi.html?${urlParams.toString()}`;
}

function resetForm() {
    // Reset semua input jumlah pesanan
    const inputs = document.querySelectorAll('.menu-item input[type="number"]');
    inputs.forEach(input => {
        input.value = 0;
        resizeInput(input); // Sesuaikan kembali lebar input setelah di-reset
    });

    // Reset nilai total harga dan kembalian
    totalHargaSemua = 0;
    document.getElementById('total-harga-text').textContent = `Total Harga: Rp0`;
    document.getElementById('kembalian-text').textContent = '';
    document.getElementById('uang-dibayar').value = 0;

    // Sembunyikan kembali bagian pembayaran
    document.getElementById('payment-section').style.display = 'none';
}
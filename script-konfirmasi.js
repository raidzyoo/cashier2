document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const customerDetails = document.getElementById('customer-details'); // Dapatkan elemen customer-details
    const detailPesanan = document.getElementById('detailPesanan');
    const paymentDetailsContainer = document.getElementById('payment-details-container');

    // Mengambil data dari localStorage
    const uangDibayar = parseFloat(localStorage.getItem('uangDibayar')) || 0;
    const kembalian = parseFloat(localStorage.getItem('kembalian')) || 0;
    let totalHarga = parseFloat(localStorage.getItem('totalHarga')) || 0;
    const namaPemesan = localStorage.getItem('namaPemesan');
    const Kelas = localStorage.getItem('nomorMeja');

    // Menampilkan informasi pemesan di atas detail pesanan
    const infoPemesan = document.createElement('div');
    infoPemesan.classList.add('info-pemesan'); // Tambahkan class untuk styling
    infoPemesan.innerHTML = `
        <p><strong>Nama Pemesan:</strong> ${namaPemesan}</p>
        <p><strong>Nomor Meja:</strong> ${nomorMeja}</p>
        <hr>
    `;
    customerDetails.appendChild(infoPemesan); // Menambahkan info pemesan ke customerDetails

    // Menampilkan detail pesanan
    let calculatedTotal = 0; // Untuk menghitung total harga dari pesanan
    for (const [key, value] of urlParams) {
        if (key.startsWith('pesanan_')) {
            const item = key.replace('pesanan_', '');
            const [nama, harga] = item.split('_');
            const jumlah = parseInt(value);
            const hargaSatuan = parseInt(harga);
            const subtotal = jumlah * hargaSatuan;

            calculatedTotal += subtotal; // Menambahkan subtotal ke calculatedTotal

            const div = document.createElement('div');
            div.classList.add('pesanan-item');
            div.innerHTML = `
                <h3>${decodeURIComponent(nama)}</h3>
                <p>Jumlah: ${jumlah}</p>
                <p>Harga Satuan: Rp${hargaSatuan.toLocaleString('id-ID')}</p>
                <p>Subtotal: Rp${subtotal.toLocaleString('id-ID')}</p>
                <hr>
            `;
            detailPesanan.appendChild(div);
        }
    }

    // Memastikan totalHarga adalah nilai yang lebih besar antara calculatedTotal dan totalHarga dari localStorage
    totalHarga = Math.max(totalHarga, calculatedTotal);

    // Menampilkan total harga di dalam detailPesanan
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-harga');
    totalDiv.innerHTML = `
        <strong>Total Harga: Rp${totalHarga.toLocaleString('id-ID')}</strong>
    `;
    detailPesanan.appendChild(totalDiv);

    // Menampilkan detail pembayaran di dalam paymentDetailsContainer
    const paymentDetails = document.getElementById('payment-details');
    paymentDetails.innerHTML = `
        <h3>Detail Pembayaran</h3>
        <p>Uang Dibayar: Rp${uangDibayar.toLocaleString('id-ID')}</p>
        <p>Total Harga: Rp${totalHarga.toLocaleString('id-ID')}</p>
        <p>Kembalian: Rp${kembalian.toLocaleString('id-ID')}</p>
    `;

    // Membersihkan localStorage setelah data diambil dan ditampilkan
    localStorage.removeItem('daftarPesanan');
    localStorage.removeItem('totalHarga');
    localStorage.removeItem('uangDibayar');
    localStorage.removeItem('kembalian');
    localStorage.removeItem('namaPemesan');
    localStorage.removeItem('nomorMeja');
});

// ... (fungsi kirimKeDiscord tidak berubah) ...

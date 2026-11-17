/* ==========================================================================
   TASKMATE - Sistem Manajemen Data Mahasiswa
   script.js - Seluruh logika aplikasi (Vanilla JavaScript)
   ========================================================================== */

/* ---------- 0. Konfigurasi & Konstanta ---------- */

// Kunci penyimpanan di Local Storage
const STORAGE_KEY = 'taskmate_mahasiswa_v1';

// Daftar program studi beserta fakultasnya
const DAFTAR_PRODI = [
  { nama: 'Teknik Informatika', fakultas: 'Fakultas Ilmu Komputer' },
  { nama: 'Sistem Informasi', fakultas: 'Fakultas Ilmu Komputer' },
  { nama: 'Teknik Komputer', fakultas: 'Fakultas Ilmu Komputer' },
  { nama: 'Manajemen', fakultas: 'Fakultas Ekonomi dan Bisnis' },
  { nama: 'Akuntansi', fakultas: 'Fakultas Ekonomi dan Bisnis' },
  { nama: 'Ilmu Hukum', fakultas: 'Fakultas Hukum' },
  { nama: 'Psikologi', fakultas: 'Fakultas Psikologi' },
  { nama: 'Desain Komunikasi Visual', fakultas: 'Fakultas Seni dan Desain' }
];

// Daftar fakultas unik
const DAFTAR_FAKULTAS = [...new Set(DAFTAR_PRODI.map(p => p.fakultas))];

// Daftar tahun angkatan
const DAFTAR_ANGKATAN = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// Jumlah baris per halaman pada tabel
const ROWS_PER_PAGE = 8;

/* ---------- 1. Data Dummy (10 mahasiswa fiktif) ---------- */
const DATA_AWAL = [
  {
    id: 'mhs-001', nim: '20231001', nama: 'Ahmad Fauzi Pratama', jenisKelamin: 'Laki-laki',
    prodi: 'Teknik Informatika', fakultas: 'Fakultas Ilmu Komputer', angkatan: '2023',
    email: 'ahmad.fauzi@mahasiswa.ac.id', telepon: '081234567801',
    alamat: 'Jl. Melati No. 12, Bandung', status: 'Aktif', createdAt: 1700000000001
  },
  {
    id: 'mhs-002', nim: '20231002', nama: 'Siti Nurhaliza', jenisKelamin: 'Perempuan',
    prodi: 'Sistem Informasi', fakultas: 'Fakultas Ilmu Komputer', angkatan: '2023',
    email: 'siti.nurhaliza@mahasiswa.ac.id', telepon: '081234567802',
    alamat: 'Jl. Anggrek No. 45, Jakarta', status: 'Aktif', createdAt: 1700000000002
  },
  {
    id: 'mhs-003', nim: '20221003', nama: 'Budi Santoso', jenisKelamin: 'Laki-laki',
    prodi: 'Manajemen', fakultas: 'Fakultas Ekonomi dan Bisnis', angkatan: '2022',
    email: 'budi.santoso@mahasiswa.ac.id', telepon: '081234567803',
    alamat: 'Jl. Kenanga No. 8, Surabaya', status: 'Aktif', createdAt: 1700000000003
  },
  {
    id: 'mhs-004', nim: '20211004', nama: 'Dewi Kartika Sari', jenisKelamin: 'Perempuan',
    prodi: 'Akuntansi', fakultas: 'Fakultas Ekonomi dan Bisnis', angkatan: '2021',
    email: 'dewi.kartika@mahasiswa.ac.id', telepon: '081234567804',
    alamat: 'Jl. Mawar No. 21, Yogyakarta', status: 'Lulus', createdAt: 1700000000004
  },
  {
    id: 'mhs-005', nim: '20231005', nama: 'Rizky Ramadhan', jenisKelamin: 'Laki-laki',
    prodi: 'Teknik Komputer', fakultas: 'Fakultas Ilmu Komputer', angkatan: '2023',
    email: 'rizky.ramadhan@mahasiswa.ac.id', telepon: '081234567805',
    alamat: 'Jl. Lily No. 33, Semarang', status: 'Aktif', createdAt: 1700000000005
  },
  {
    id: 'mhs-006', nim: '20201006', nama: 'Alya Putri Maharani', jenisKelamin: 'Perempuan',
    prodi: 'Ilmu Hukum', fakultas: 'Fakultas Hukum', angkatan: '2020',
    email: 'alya.putri@mahasiswa.ac.id', telepon: '081234567806',
    alamat: 'Jl. Cempaka No. 7, Medan', status: 'Nonaktif', createdAt: 1700000000006
  },
  {
    id: 'mhs-007', nim: '20241007', nama: 'Fajar Nugroho', jenisKelamin: 'Laki-laki',
    prodi: 'Psikologi', fakultas: 'Fakultas Psikologi', angkatan: '2024',
    email: 'fajar.nugroho@mahasiswa.ac.id', telepon: '081234567807',
    alamat: 'Jl. Kamboja No. 19, Malang', status: 'Aktif', createdAt: 1700000000007
  },
  {
    id: 'mhs-008', nim: '20221008', nama: 'Nadia Aulia Rahman', jenisKelamin: 'Perempuan',
    prodi: 'Desain Komunikasi Visual', fakultas: 'Fakultas Seni dan Desain', angkatan: '2022',
    email: 'nadia.aulia@mahasiswa.ac.id', telepon: '081234567808',
    alamat: 'Jl. Geranium No. 5, Depok', status: 'Cuti', createdAt: 1700000000008
  },
  {
    id: 'mhs-009', nim: '20191009', nama: 'Gilang Permana', jenisKelamin: 'Laki-laki',
    prodi: 'Teknik Informatika', fakultas: 'Fakultas Ilmu Komputer', angkatan: '2019',
    email: 'gilang.permana@mahasiswa.ac.id', telepon: '081234567809',
    alamat: 'Jl. Rampai No. 14, Bekasi', status: 'Lulus', createdAt: 1700000000009
  },
  {
    id: 'mhs-010', nim: '20241010', nama: 'Putri Amelia Zustira', jenisKelamin: 'Perempuan',
    prodi: 'Sistem Informasi', fakultas: 'Fakultas Ilmu Komputer', angkatan: '2024',
    email: 'putri.amelia@mahasiswa.ac.id', telepon: '081234567810',
    alamat: 'Jl. Flamboyan No. 27, Tangerang', status: 'Aktif', createdAt: 1700000000010
  }
];

/* ---------- 2. State Aplikasi ---------- */
let mahasiswa = [];                       // Seluruh data mahasiswa
let filteredData = [];                    // Data setelah pencarian/filter/urutan
let currentPage = 1;                      // Halaman pagination aktif
let currentEditId = null;                 // ID data yang sedang diedit
let pendingDeleteId = null;               // ID data yang menunggu konfirmasi hapus
let prodiChart = null;                    // Instance Chart.js

/* ---------- 3. Helper DOM ---------- */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

// Render ulang ikon Feather (dipanggil setelah menambah elemen dinamis)
function refreshIcons() {
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

// Escape HTML untuk mencegah injeksi saat menampilkan data
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = String(text ?? '');
  return div.innerHTML;
}

// Buat ID unik
function generateId() {
  return 'mhs-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Isi nilai <select>. Jika nilainya belum ada di opsi, tambahkan opsi tersebut.
// Ini mencegah data lama/hasil import gagal tampil saat diedit.
function setSelectValue(select, value) {
  if (!select) return;
  const val = String(value ?? '');
  if (!val) {
    select.value = '';
    return;
  }
  if (!Array.from(select.options).some(o => o.value === val)) {
    const option = document.createElement('option');
    option.value = val;
    option.textContent = val;
    select.appendChild(option);
  }
  select.value = val;
}

/* ---------- 4. Local Storage ---------- */

// Muat data dari Local Storage. Jika belum ada, gunakan data awal.
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        mahasiswa = parsed;
      } else {
        mahasiswa = [...DATA_AWAL];
      }
    } else {
      mahasiswa = [...DATA_AWAL];
      saveData();
    }
  } catch (error) {
    console.error('Gagal memuat data:', error);
    mahasiswa = [...DATA_AWAL];
  }
}

// Simpan data ke Local Storage
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mahasiswa));
  } catch (error) {
    console.error('Gagal menyimpan data:', error);
    showToast('Gagal menyimpan data ke browser', 'Penyimpanan tidak tersedia.', 'error');
  }
}

/* ---------- 5. Notifikasi (Toast) ---------- */
function showToast(title, message, type = 'success') {
  const container = $('#toastContainer');
  const icons = { success: 'check-circle', error: 'x-circle', info: 'info' };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <i data-feather="${icons[type]}"></i>
    <div class="toast__text">
      <strong>${escapeHTML(title)}</strong>
      <span>${escapeHTML(message)}</span>
    </div>
  `;
  container.appendChild(toast);
  refreshIcons();

  // Hilangkan otomatis setelah 3.5 detik
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ---------- 6. Navigasi Halaman ---------- */
const PAGE_INFO = {
  dashboard:  { title: 'Dashboard', subtitle: 'Ringkasan data mahasiswa TaskMate' },
  mahasiswa:  { title: 'Data Mahasiswa', subtitle: 'Kelola seluruh data mahasiswa TaskMate' },
  tambah:     { title: 'Tambah Mahasiswa', subtitle: 'Tambahkan data mahasiswa baru' },
  prodi:      { title: 'Program Studi', subtitle: 'Daftar program studi di TaskMate' },
  laporan:    { title: 'Laporan', subtitle: 'Ringkasan laporan data mahasiswa' },
  pengaturan: { title: 'Pengaturan', subtitle: 'Kelola data dan preferensi aplikasi' }
};

function navigateTo(page) {
  if (!PAGE_INFO[page]) return;

  // Jika sedang mode edit (modal/form) dan meninggalkan halaman terkait, reset form
  const sedangDiForm = $('#page-tambah') && $('#page-tambah').classList.contains('active');
  if (page !== 'tambah' && sedangDiForm && (currentEditId || $('#mhsId').value)) {
    resetForm();
  }

  // Update menu aktif
  $$('.nav__item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  // Update judul header
  $('#pageTitle').textContent = PAGE_INFO[page].title;
  $('#pageSubtitle').textContent = PAGE_INFO[page].subtitle;

  // Tampilkan halaman yang sesuai
  $$('.page').forEach(section => {
    section.classList.toggle('active', section.id === `page-${page}`);
  });

  // Tutup sidebar di layar kecil
  closeSidebar();

  // Render konten sesuai halaman
  if (page === 'dashboard') renderDashboard();
  if (page === 'mahasiswa') renderTable();
  if (page === 'prodi') renderProdi();
  if (page === 'laporan') renderLaporan();
  if (page === 'pengaturan') renderPengaturan();

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Buka sidebar (layar kecil)
function openSidebar() {
  $('#sidebar').classList.add('open');
  $('#sidebarOverlay').classList.add('show');
}

// Tutup sidebar (layar kecil)
function closeSidebar() {
  $('#sidebar').classList.remove('open');
  $('#sidebarOverlay').classList.remove('show');
}

/* ---------- 7. Render Dashboard ---------- */
function renderDashboard() {
  // Hitung statistik
  const total = mahasiswa.length;
  const aktif = mahasiswa.filter(m => m.status === 'Aktif').length;
  const jumlahProdi = new Set(mahasiswa.map(m => m.prodi)).size;
  const jumlahAngkatan = new Set(mahasiswa.map(m => m.angkatan)).size;

  $('#statTotal').textContent = total;
  $('#statAktif').textContent = aktif;
  $('#statProdi').textContent = jumlahProdi;
  $('#statAngkatan').textContent = jumlahAngkatan;

  // Ringkasan status
  const statuses = [
    { label: 'Aktif', color: 'var(--green-500)', key: 'Aktif' },
    { label: 'Nonaktif', color: 'var(--red-500)', key: 'Nonaktif' },
    { label: 'Lulus', color: 'var(--blue-500)', key: 'Lulus' },
    { label: 'Cuti', color: 'var(--orange-500)', key: 'Cuti' }
  ];
  $('#statusSummary').innerHTML = statuses.map(s => `
    <div class="status-summary__item">
      <span class="status-summary__label">
        <span class="status-summary__dot" style="background:${s.color}"></span>
        ${s.label}
      </span>
      <span class="status-summary__count">${mahasiswa.filter(m => m.status === s.key).length}</span>
    </div>
  `).join('');

  // Tabel mahasiswa terbaru (5 terakhir berdasarkan createdAt)
  const terbaru = [...mahasiswa]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 5);

  $('#recentTableBody').innerHTML = terbaru.length
    ? terbaru.map(m => `
        <tr>
          <td class="table-nim">${escapeHTML(m.nim)}</td>
          <td class="table-nama">${escapeHTML(m.nama)}</td>
          <td>${escapeHTML(m.prodi)}</td>
          <td>${escapeHTML(m.angkatan)}</td>
          <td>${badgeStatus(m.status)}</td>
          <td>
            <div class="action-buttons">
              <button class="action-btn action-btn--edit" data-action="edit" data-id="${m.id}" title="Edit data ${escapeHTML(m.nama)}" aria-label="Edit ${escapeHTML(m.nama)}">
                <i data-feather="edit-2"></i><span>Edit</span>
              </button>
            </div>
          </td>
        </tr>
      `).join('')
    : `<tr><td colspan="6" class="text-center">Belum ada data mahasiswa.</td></tr>`;

  renderChart();
  refreshIcons();
}

// Render grafik Chart.js
function renderChart() {
  if (typeof Chart === 'undefined') return; // Lewati jika Chart.js tidak termuat

  // Hitung jumlah mahasiswa per program studi
  const counts = {};
  DAFTAR_PRODI.forEach(p => { counts[p.nama] = 0; });
  mahasiswa.forEach(m => {
    if (counts[m.prodi] !== undefined) counts[m.prodi]++;
    else counts[m.prodi] = (counts[m.prodi] || 0) + 1;
  });

  const labels = Object.keys(counts).filter(k => counts[k] > 0);
  const values = labels.map(k => counts[k]);

  const ctx = $('#prodiChart').getContext('2d');

  // Hancurkan chart lama agar tidak bertumpuk
  if (prodiChart) {
    prodiChart.destroy();
    prodiChart = null;
  }

  prodiChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Jumlah Mahasiswa',
        data: values,
        backgroundColor: 'rgba(37, 99, 235, 0.85)',
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 42
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0b1b3a',
          padding: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} mahasiswa`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#64748b', font: { size: 10, family: 'Inter' }, maxRotation: 35, minRotation: 0 }
        },
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, precision: 0, color: '#64748b', font: { size: 11, family: 'Inter' } },
          grid: { color: '#f1f5f9' }
        }
      }
    }
  });
}

/* ---------- 8. Badge Status ---------- */
function badgeStatus(status) {
  const map = {
    'Aktif': 'badge--aktif',
    'Nonaktif': 'badge--nonaktif',
    'Lulus': 'badge--lulus',
    'Cuti': 'badge--cuti'
  };
  return `<span class="badge ${map[status] || 'badge--cuti'}">${escapeHTML(status)}</span>`;
}

/* ---------- 9. Pencarian, Filter, Urutan ---------- */
function getFilteredData() {
  const keyword = ($('#tableSearch').value || '').toLowerCase().trim();
  const filterProdi = $('#filterProdi').value;
  const filterAngkatan = $('#filterAngkatan').value;
  const sort = $('#sortBy').value;

  let result = mahasiswa.filter(m => {
    const cocokKeyword = !keyword ||
      m.nim.toLowerCase().includes(keyword) ||
      m.nama.toLowerCase().includes(keyword);
    const cocokProdi = !filterProdi || m.prodi === filterProdi;
    const cocokAngkatan = !filterAngkatan || m.angkatan === filterAngkatan;
    return cocokKeyword && cocokProdi && cocokAngkatan;
  });

  // Pengurutan
  result.sort((a, b) => {
    switch (sort) {
      case 'oldest':   return (a.createdAt || 0) - (b.createdAt || 0);
      case 'nim-asc':  return a.nim.localeCompare(b.nim);
      case 'nim-desc': return b.nim.localeCompare(a.nim);
      case 'nama-asc': return a.nama.localeCompare(b.nama);
      case 'nama-desc':return b.nama.localeCompare(a.nama);
      case 'newest':
      default:         return (b.createdAt || 0) - (a.createdAt || 0);
    }
  });

  return result;
}

/* ---------- 10. Render Tabel + Pagination ---------- */
function renderTable() {
  filteredData = getFilteredData();

  const totalRows = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / ROWS_PER_PAGE));

  // Pastikan halaman aktif masih valid
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const pageRows = filteredData.slice(start, start + ROWS_PER_PAGE);

  // Isi baris tabel
  $('#mahasiswaTableBody').innerHTML = pageRows.map(m => `
    <tr>
      <td class="table-nim">${escapeHTML(m.nim)}</td>
      <td class="table-nama">${escapeHTML(m.nama)}</td>
      <td>${escapeHTML(m.prodi)}</td>
      <td>${escapeHTML(m.fakultas)}</td>
      <td>${escapeHTML(m.angkatan)}</td>
      <td>${escapeHTML(m.email)}</td>
      <td>${badgeStatus(m.status)}</td>
      <td>
        <div class="action-buttons">
          <!-- Edit cepat lewat modal -->
          <button class="action-btn action-btn--edit" data-action="edit" data-id="${m.id}" title="Edit cepat: ${escapeHTML(m.nama)}" aria-label="Edit ${escapeHTML(m.nama)}">
            <i data-feather="edit-2"></i><span>Edit</span>
          </button>
          <!-- Edit lengkap lewat halaman form -->
          <button class="action-btn action-btn--form" data-action="edit-form" data-id="${m.id}" title="Edit di form lengkap: ${escapeHTML(m.nama)}" aria-label="Edit di form lengkap ${escapeHTML(m.nama)}">
            <i data-feather="maximize-2"></i>
          </button>
          <button class="action-btn action-btn--delete" data-action="delete" data-id="${m.id}" title="Hapus: ${escapeHTML(m.nama)}" aria-label="Hapus ${escapeHTML(m.nama)}">
            <i data-feather="trash-2"></i><span>Hapus</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Empty state
  $('#emptyState').hidden = totalRows !== 0;
  $('#mahasiswaTable').style.display = totalRows === 0 ? 'none' : 'table';

  // Informasi pagination
  const dari = totalRows === 0 ? 0 : start + 1;
  const sampai = Math.min(start + ROWS_PER_PAGE, totalRows);
  $('#paginationInfo').textContent = `Menampilkan ${dari}–${sampai} dari ${totalRows} data`;

  renderPagination(totalPages);

  // Sinkronkan pencarian global dengan pencarian tabel
  const globalVal = $('#globalSearch').value;
  if (globalVal !== $('#tableSearch').value && globalVal !== '') {
    $('#tableSearch').value = globalVal;
  }

  refreshIcons();
}

// Render tombol-tombol pagination
function renderPagination(totalPages) {
  const container = $('#paginationControls');
  let html = '';

  // Tombol Prev
  html += `<button class="page-btn" onclick="gotoPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} aria-label="Sebelumnya">
             <i data-feather="chevron-left"></i>
           </button>`;

  // Tombol angka halaman
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="gotoPage(${i})">${i}</button>`;
  }

  // Tombol Next
  html += `<button class="page-btn" onclick="gotoPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Berikutnya">
             <i data-feather="chevron-right"></i>
           </button>`;

  container.innerHTML = html;
  refreshIcons();
}

// Pindah halaman pagination
function gotoPage(page) {
  currentPage = page;
  renderTable();
}

/* ---------- 11. Isi Dropdown ---------- */
function isiDropdown(select, values, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>` +
    values.map(v => `<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join('');
}

function initDropdowns() {
  // Dropdown filter di halaman tabel
  isiDropdown($('#filterProdi'), DAFTAR_PRODI.map(p => p.nama), 'Semua Prodi');
  isiDropdown($('#filterAngkatan'), DAFTAR_ANGKATAN, 'Semua Angkatan');

  // Dropdown form tambah
  isiDropdown($('#prodi'), DAFTAR_PRODI.map(p => p.nama), 'Pilih Program Studi');
  isiDropdown($('#fakultas'), DAFTAR_FAKULTAS, 'Pilih Fakultas');
  isiDropdown($('#angkatan'), DAFTAR_ANGKATAN, 'Pilih Angkatan');

  // Dropdown modal edit
  isiDropdown($('#editProdi'), DAFTAR_PRODI.map(p => p.nama), 'Pilih Program Studi');
  isiDropdown($('#editFakultas'), DAFTAR_FAKULTAS, 'Pilih Fakultas');
  isiDropdown($('#editAngkatan'), DAFTAR_ANGKATAN, 'Pilih Angkatan');
}

/* ---------- 12. Validasi Form ---------- */
const REQUIRED_FIELDS = ['nim', 'nama', 'jenisKelamin', 'prodi', 'fakultas', 'angkatan', 'email', 'telepon', 'alamat', 'status'];

function clearErrors(prefix = '') {
  $$('.error-text').forEach(el => { el.textContent = ''; });
  $$('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

// Validasi form tambah. Mengembalikan true jika valid.
function validateForm() {
  clearErrors();
  let valid = true;

  for (const field of REQUIRED_FIELDS) {
    const input = document.getElementById(field);
    const error = document.getElementById(`${field}-error`);
    const value = (input.value || '').trim();

    if (!value) {
      if (error) error.textContent = 'Field ini wajib diisi.';
      input.classList.add('is-invalid');
      valid = false;
      continue;
    }

    // Validasi format email
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error.textContent = 'Format email tidak valid.';
      input.classList.add('is-invalid');
      valid = false;
    }

    // Validasi nomor telepon (angka, 8-15 digit)
    if (field === 'telepon' && !/^[0-9]{8,15}$/.test(value)) {
      error.textContent = 'Nomor telepon harus 8–15 digit angka.';
      input.classList.add('is-invalid');
      valid = false;
    }
  }

  // Cek duplikat NIM (abaikan jika sedang edit dengan id yang sama)
  const nimValue = $('#nim').value.trim();
  const duplikat = mahasiswa.some(m =>
    m.nim.toLowerCase() === nimValue.toLowerCase() && m.id !== $('#mhsId').value
  );
  if (duplikat && nimValue) {
    $('#nim-error').textContent = 'NIM sudah digunakan mahasiswa lain.';
    $('#nim').classList.add('is-invalid');
    valid = false;
  }

  if (!valid) {
    showToast('Validasi gagal', 'Mohon periksa kembali data yang diisi.', 'error');
  }
  return valid;
}

/* ---------- 13. Create / Update lewat form lengkap ---------- */
function tambahMahasiswa(event) {
  event.preventDefault();
  if (!validateForm()) return;

  // Jika mhsId terisi, form sedang berada dalam mode EDIT
  const editId = $('#mhsId').value;
  const index = editId ? mahasiswa.findIndex(m => m.id === editId) : -1;

  const formData = {
    nim: $('#nim').value.trim(),
    nama: $('#nama').value.trim(),
    jenisKelamin: $('#jenisKelamin').value,
    prodi: $('#prodi').value,
    fakultas: $('#fakultas').value,
    angkatan: $('#angkatan').value,
    email: $('#email').value.trim(),
    telepon: $('#telepon').value.trim(),
    alamat: $('#alamat').value.trim(),
    status: $('#status').value
  };

  if (index !== -1) {
    // Mode UPDATE: pertahankan id & createdAt semula
    mahasiswa[index] = { ...mahasiswa[index], ...formData };
    showToast('Berhasil!', `Data ${formData.nama} telah diperbarui.`);
  } else {
    // Mode CREATE: data baru
    mahasiswa.push({ id: generateId(), ...formData, createdAt: Date.now() });
    showToast('Berhasil!', `Data ${formData.nama} telah ditambahkan.`);
  }

  saveData();
  resetForm();
  renderDashboard();
  navigateTo('mahasiswa');
}

// Buka form lengkap dalam mode EDIT untuk data mahasiswa tertentu
function editDataDiForm(id) {
  const m = mahasiswa.find(item => item.id === id);
  if (!m) return;

  // Isi hidden field sebagai penanda mode edit
  $('#mhsId').value = m.id;

  $('#nim').value = m.nim;
  $('#nama').value = m.nama;
  setSelectValue($('#jenisKelamin'), m.jenisKelamin);
  setSelectValue($('#prodi'), m.prodi);
  setSelectValue($('#fakultas'), m.fakultas);
  setSelectValue($('#angkatan'), m.angkatan);
  $('#email').value = m.email;
  $('#telepon').value = m.telepon;
  $('#alamat').value = m.alamat;
  setSelectValue($('#status'), m.status);

  clearErrors();
  $('#formTitle').textContent = 'Edit Data Mahasiswa';
  $('#formSubtitle').textContent = `Ubah data ${m.nama} (${m.nim}) lalu simpan perubahan`;
  $('#submitBtn').innerHTML = '<i data-feather="save"></i> Simpan Perubahan';

  navigateTo('tambah');
  refreshIcons();
  showToast('Mode Edit', 'Form telah diisi dengan data mahasiswa terpilih.', 'info');
}

/* ---------- 14. Reset Form ---------- */
function resetForm() {
  $('#mahasiswaForm').reset();
  $('#mhsId').value = '';
  currentEditId = null;
  clearErrors();
  $('#formTitle').textContent = 'Tambah Mahasiswa Baru';
  $('#formSubtitle').textContent = 'Lengkapi form di bawah untuk menyimpan data mahasiswa';
  $('#submitBtn').innerHTML = '<i data-feather="save"></i> Simpan Data';
  refreshIcons();
}

/* ---------- 15. Update (Modal Edit) ---------- */
function bukaModalEdit(id) {
  const m = mahasiswa.find(item => item.id === id);
  if (!m) return;

  currentEditId = id;
  $('#editId').value = m.id;
  $('#editNim').value = m.nim;
  $('#editNama').value = m.nama;
  setSelectValue($('#editJenisKelamin'), m.jenisKelamin);
  setSelectValue($('#editProdi'), m.prodi);
  setSelectValue($('#editFakultas'), m.fakultas);
  setSelectValue($('#editAngkatan'), m.angkatan);
  $('#editEmail').value = m.email;
  $('#editTelepon').value = m.telepon;
  $('#editAlamat').value = m.alamat;
  setSelectValue($('#editStatus'), m.status);

  clearErrors();
  $('#editModal').hidden = false;
  document.body.style.overflow = 'hidden'; // Kunci scroll halaman
  refreshIcons();
}

// Tutup modal edit
function tutupModalEdit() {
  $('#editModal').hidden = true;
  currentEditId = null;
  document.body.style.overflow = '';
}

// Simpan perubahan edit
function simpanEdit(event) {
  event.preventDefault();
  clearErrors();

  const id = $('#editId').value;
  const index = mahasiswa.findIndex(m => m.id === id);
  if (index === -1) return;

  const nimBaru = $('#editNim').value.trim();

  // Validasi sederhana field wajib
  const fields = ['editNim', 'editNama', 'editEmail', 'editTelepon', 'editAlamat'];
  let valid = true;
  fields.forEach(f => {
    if (!(document.getElementById(f).value || '').trim()) {
      const err = document.getElementById(`${f}-error`);
      if (err) err.textContent = 'Field ini wajib diisi.';
      document.getElementById(f).classList.add('is-invalid');
      valid = false;
    }
  });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#editEmail').value.trim())) {
    $('#editEmail-error').textContent = 'Format email tidak valid.';
    $('#editEmail').classList.add('is-invalid');
    valid = false;
  }

  // Cek duplikat NIM
  const duplikat = mahasiswa.some(m => m.nim.toLowerCase() === nimBaru.toLowerCase() && m.id !== id);
  if (duplikat) {
    $('#editNim-error').textContent = 'NIM sudah digunakan mahasiswa lain.';
    $('#editNim').classList.add('is-invalid');
    valid = false;
  }

  if (!valid) {
    showToast('Validasi gagal', 'Mohon periksa kembali data yang diisi.', 'error');
    return;
  }

  // Update data (createdAt dipertahankan)
  mahasiswa[index] = {
    ...mahasiswa[index],
    nim: nimBaru,
    nama: $('#editNama').value.trim(),
    jenisKelamin: $('#editJenisKelamin').value,
    prodi: $('#editProdi').value,
    fakultas: $('#editFakultas').value,
    angkatan: $('#editAngkatan').value,
    email: $('#editEmail').value.trim(),
    telepon: $('#editTelepon').value.trim(),
    alamat: $('#editAlamat').value.trim(),
    status: $('#editStatus').value
  };

  saveData();
  tutupModalEdit();
  showToast('Berhasil!', 'Data mahasiswa telah diperbarui.');
  renderTable();
  renderDashboard();
}

/* ---------- 16. Delete (Hapus dengan konfirmasi) ---------- */
function konfirmasiHapus(id) {
  const m = mahasiswa.find(item => item.id === id);
  if (!m) return;

  pendingDeleteId = id;
  $('#confirmTitle').textContent = 'Hapus Data Mahasiswa';
  $('#confirmMessage').textContent = `Apakah Anda yakin ingin menghapus data "${m.nama}" (${m.nim})? Tindakan ini tidak dapat dibatalkan.`;
  $('#confirmModal').hidden = false;
  document.body.style.overflow = 'hidden';
}

function tutupKonfirmasi() {
  $('#confirmModal').hidden = true;
  pendingDeleteId = null;
  document.body.style.overflow = '';
}

function hapusDataDikonfirmasi() {
  if (!pendingDeleteId) return;

  // Aksi khusus: kembalikan data awal
  if (pendingDeleteId === 'RESET_DATA') {
    mahasiswa = DATA_AWAL.map((m, i) => ({ ...m, createdAt: Date.now() + i }));
    saveData();
    tutupKonfirmasi();
    showToast('Berhasil!', 'Data contoh awal telah dikembalikan.');
    renderTable();
    renderDashboard();
    renderPengaturan();
    navigateTo('mahasiswa');
    return;
  }

  // Aksi khusus: hapus semua data
  if (pendingDeleteId === 'HAPUS_SEMUA') {
    mahasiswa = [];
    saveData();
    tutupKonfirmasi();
    showToast('Berhasil!', 'Seluruh data mahasiswa telah dihapus.', 'info');
    renderTable();
    renderDashboard();
    renderPengaturan();
    return;
  }

  // Aksi standar: hapus satu data mahasiswa
  const m = mahasiswa.find(item => item.id === pendingDeleteId);
  mahasiswa = mahasiswa.filter(item => item.id !== pendingDeleteId);
  saveData();
  tutupKonfirmasi();
  showToast('Terhapus!', `Data ${m ? m.nama : 'mahasiswa'} telah dihapus.`, 'info');
  renderTable();
  renderDashboard();
}

/* ---------- 17. Halaman Program Studi ---------- */
function renderProdi() {
  const icons = ['cpu', 'layers', 'monitor', 'briefcase', 'bar-chart-2', 'scale', 'heart', 'pen-tool'];

  $('#prodiGrid').innerHTML = DAFTAR_PRODI.map((p, i) => {
    const jumlah = mahasiswa.filter(m => m.prodi === p.nama).length;
    return `
      <div class="prodi-card">
        <div class="prodi-card__icon"><i data-feather="${icons[i % icons.length]}"></i></div>
        <h4>${escapeHTML(p.nama)}</h4>
        <p>${escapeHTML(p.fakultas)}</p>
        <div class="prodi-card__count">${jumlah} <span>mahasiswa</span></div>
      </div>
    `;
  }).join('');

  refreshIcons();
}

/* ---------- 18. Halaman Laporan ---------- */
function renderLaporan() {
  // Ringkasan atas
  const total = mahasiswa.length;
  const aktif = mahasiswa.filter(m => m.status === 'Aktif').length;
  const prodiUnik = new Set(mahasiswa.map(m => m.prodi)).size;
  const angkatanUnik = new Set(mahasiswa.map(m => m.angkatan)).size;

  $('#reportSummary').innerHTML = `
    <div class="report-box"><p>Total Mahasiswa</p><h4>${total}</h4></div>
    <div class="report-box"><p>Mahasiswa Aktif</p><h4>${aktif}</h4></div>
    <div class="report-box"><p>Program Studi</p><h4>${prodiUnik}</h4></div>
    <div class="report-box"><p>Angkatan</p><h4>${angkatanUnik}</h4></div>
  `;

  // Tabel rekap per prodi
  $('#laporanTableBody').innerHTML = DAFTAR_PRODI.map(p => {
    const list = mahasiswa.filter(m => m.prodi === p.nama);
    const count = status => list.filter(m => m.status === status).length;
    return `
      <tr>
        <td class="table-nama">${escapeHTML(p.nama)}</td>
        <td>${escapeHTML(p.fakultas)}</td>
        <td><strong>${list.length}</strong></td>
        <td>${count('Aktif')}</td>
        <td>${count('Nonaktif')}</td>
        <td>${count('Lulus')}</td>
        <td>${count('Cuti')}</td>
      </tr>
    `;
  }).join('');
}

/* ---------- 19. Halaman Pengaturan ---------- */
function renderPengaturan() {
  $('#storageInfo').textContent = `Total data: ${mahasiswa.length} mahasiswa · Estimasi: ${Math.round(new Blob([JSON.stringify(mahasiswa)]).size / 1024 * 10) / 10} KB`;
}

/* ---------- 20. Ekspor CSV ---------- */
function eksporCSV() {
  if (mahasiswa.length === 0) {
    showToast('Gagal mengekspor', 'Tidak ada data untuk diekspor.', 'error');
    return;
  }

  const headers = ['NIM', 'Nama Lengkap', 'Jenis Kelamin', 'Program Studi', 'Fakultas', 'Angkatan', 'Email', 'Nomor Telepon', 'Alamat', 'Status'];
  const rows = mahasiswa.map(m => [
    m.nim, m.nama, m.jenisKelamin, m.prodi, m.fakultas,
    m.angkatan, m.email, m.telepon, m.alamat, m.status
  ]);

  // Fungsi escape nilai CSV (bungs dengan tanda kutip jika mengandung koma/kutip)
  const escapeCSV = value => {
    const str = String(value ?? '');
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const csv = [headers, ...rows]
    .map(row => row.map(escapeCSV).join(','))
    .join('\r\n');

  // Tambahkan BOM agar karakter UTF-8 terbaca benar di Excel
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `data-mahasiswa-taskmate-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('Berhasil!', 'Data mahasiswa telah diekspor ke CSV.');
}

/* ---------- 21. Inisialisasi Event Listener ---------- */
function initEvents() {
  // Navigasi sidebar
  $$('.nav__item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      // Klik "Tambah Mahasiswa" dari sidebar selalu mulai form kosong
      if (item.dataset.page === 'tambah' && $('#mhsId').value) resetForm();
      navigateTo(item.dataset.page);
    });
  });

  // Tombol "Lihat Semua", "Tambah" di dashboard & tabel
  $$('[data-go-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.goPage === 'tambah' && $('#mhsId').value) resetForm();
      navigateTo(btn.dataset.goPage);
    });
  });

  // Event delegation untuk tombol aksi di tabel (tabel utama & tabel dashboard).
  // Memakai delegation agar tombol yang dibuat dinamis tetap berfungsi.
  ['#mahasiswaTableBody', '#recentTableBody'].forEach(selector => {
    const body = $(selector);
    if (!body) return;
    body.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.action === 'edit') {
        bukaModalEdit(id);
      } else if (btn.dataset.action === 'edit-form') {
        editDataDiForm(id);
      } else if (btn.dataset.action === 'delete') {
        konfirmasiHapus(id);
      }
    });
  });

  // Sidebar toggle (layar kecil)
  $('#menuToggle').addEventListener('click', openSidebar);
  $('#sidebarClose').addEventListener('click', closeSidebar);
  $('#sidebarOverlay').addEventListener('click', closeSidebar);

  // Pencarian global -> arahkan ke halaman data mahasiswa
  $('#globalSearch').addEventListener('input', (e) => {
    $('#tableSearch').value = e.target.value;
    currentPage = 1;
    if (!$('#page-mahasiswa').classList.contains('active')) {
      navigateTo('mahasiswa');
    } else {
      renderTable();
    }
  });

  // Pencarian & filter di tabel
  $('#tableSearch').addEventListener('input', () => {
    currentPage = 1;
    renderTable();
  });
  $('#filterProdi').addEventListener('change', () => { currentPage = 1; renderTable(); });
  $('#filterAngkatan').addEventListener('change', () => { currentPage = 1; renderTable(); });
  $('#sortBy').addEventListener('change', () => { currentPage = 1; renderTable(); });

  // Form tambah
  $('#mahasiswaForm').addEventListener('submit', tambahMahasiswa);
  $('#resetFormBtn').addEventListener('click', resetForm);
  $('#batalFormBtn').addEventListener('click', () => {
    resetForm();
    navigateTo('mahasiswa');
  });

  // Hapus error saat pengguna mulai mengetik
  $$('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('is-invalid');
      const err = document.getElementById(`${el.id}-error`);
      if (err) err.textContent = '';
    });
  });

  // Modal edit
  $('#editForm').addEventListener('submit', simpanEdit);
  $$('[data-close-modal]').forEach(el => el.addEventListener('click', tutupModalEdit));

  // Modal konfirmasi hapus
  $('#confirmDeleteBtn').addEventListener('click', hapusDataDikonfirmasi);
  $$('[data-close-confirm]').forEach(el => el.addEventListener('click', tutupKonfirmasi));

  // Tombol ESC untuk menutup modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!$('#confirmModal').hidden) tutupKonfirmasi();
      else if (!$('#editModal').hidden) tutupModalEdit();
      else closeSidebar();
    }
  });

  // Ekspor CSV
  $('#exportBtn').addEventListener('click', eksporCSV);
  $('#exportBtnLaporan').addEventListener('click', eksporCSV);

  // Tombol notifikasi -> info ringkas
  $('#notificationBtn').addEventListener('click', () => {
    const aktif = mahasiswa.filter(m => m.status === 'Aktif').length;
    showToast('Notifikasi TaskMate', `Terdapat ${mahasiswa.length} data mahasiswa, ${aktif} di antaranya berstatus aktif.`, 'info');
    $('#notificationDot').style.display = 'none';
  });

  // Pengaturan: kembalikan data awal
  $('#resetDataBtn').addEventListener('click', () => {
    $('#confirmTitle').textContent = 'Kembalikan Data Awal';
    $('#confirmMessage').textContent = 'Seluruh data saat ini akan diganti dengan 10 data contoh awal. Lanjutkan?';
    pendingDeleteId = 'RESET_DATA';
    $('#confirmModal').hidden = false;
    document.body.style.overflow = 'hidden';
  });

  // Pengaturan: hapus semua data
  $('#hapusSemuaBtn').addEventListener('click', () => {
    $('#confirmTitle').textContent = 'Hapus Semua Data';
    $('#confirmMessage').textContent = 'Seluruh data mahasiswa akan dihapus permanen. Lanjutkan?';
    pendingDeleteId = 'HAPUS_SEMUA';
    $('#confirmModal').hidden = false;
    document.body.style.overflow = 'hidden';
  });
}

/* ---------- 22. Bootstrap Aplikasi ---------- */
function init() {
  loadData();
  initDropdowns();
  initEvents();
  renderDashboard();
  renderTable();
  refreshIcons();

  // Tangani navigasi dari hash URL (opsional)
  const hash = window.location.hash.replace('#', '');
  if (PAGE_INFO[hash]) navigateTo(hash);
}

// Jalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', init);
console.log('%cTaskMate siap digunakan!', 'color:#2563eb;font-weight:bold;font-size:14px;');

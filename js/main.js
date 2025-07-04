function loadPage(page) {
  fetch(page)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('content').innerHTML = `<p>Halaman gagal dimuat.</p>`;
    });
}

// Load default halaman (home)
loadPage('home.html');

// Tambahkan event listener ke semua link navigasi
document.querySelectorAll('a[data-page]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const page = this.getAttribute('data-page');
    loadPage(page);
  });
});
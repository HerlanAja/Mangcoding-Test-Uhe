// Fungsi Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');

      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
});

// KODE UNTUK EFEK SCROLL PADA NAVBAR
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        // Jika scroll ke bawah & sudah melewati 100px dari atas
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Tambahkan kelas untuk menyembunyikan navbar
            navbar.classList.add('navbar-hidden');
        } else {
            // Jika scroll ke atas
            navbar.classList.remove('navbar-hidden');
        }
    }

    // Perbarui posisi scroll terakhir untuk perbandingan berikutnya
    lastScrollY = currentScrollY;
});
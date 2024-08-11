// navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    const delta = 5;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(lastScrollTop - scrollTop) >= delta) {
            if (scrollTop > lastScrollTop) {
                // Scroll Down
                navbar.classList.remove('scrolled');
                navbar.classList.add('transparent');
            } else {
                // Scroll Up
                navbar.classList.remove('transparent');
                navbar.classList.add('scrolled');
            }
            lastScrollTop = scrollTop;
        }
    });

    // Set active link based on the current section
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

    function setActiveLink() {
        const scrollPosition = window.pageYOffset + 100; // Offset for better visibility

        sections.forEach((section, index) => {
            if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set the active link on page load
});



document.addEventListener('DOMContentLoaded', function () {
    const showSelect = document.getElementById('show');
    const sortSelect = document.getElementById('sort');
    const productList = document.querySelectorAll('.product-card');
    const pagination = document.querySelector('#pagination .pagination');
    let currentPage = 1;
    let itemsPerPage = parseInt(showSelect.value);

    // Function to render products based on pagination and items per page
    function renderProducts() {
        const totalItems = productList.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Hide all products
        productList.forEach(product => product.style.display = 'none');

        // Show products for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        productList.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.style.display = 'block';
            }
        });

        renderPagination(totalPages);
    }

    // Function to render pagination controls
    function renderPagination(totalPages) {
        pagination.innerHTML = ''; // Clear existing pagination items

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            if (i === currentPage) li.classList.add('active');

            const a = document.createElement('a');
            a.classList.add('page-link');
            a.href = '#';
            a.innerText = i;

            a.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage = i;
                renderProducts();
            });

            li.appendChild(a);
            pagination.appendChild(li);
        }
    }

    // Event listeners
    showSelect.addEventListener('change', function () {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        renderProducts();
    });

    sortSelect.addEventListener('change', function () {
        const sortValue = this.value;

        let sortedList = Array.from(productList).sort((a, b) => {
            const aTime = parseInt(a.getAttribute('data-timestamp'));
            const bTime = parseInt(b.getAttribute('data-timestamp'));
            return sortValue === 'newest' ? bTime - aTime : aTime - bTime;
        });

        const parent = document.getElementById('product-list');
        parent.innerHTML = ''; // Clear existing products

        sortedList.forEach(product => {
            parent.appendChild(product); // Append sorted products
        });

        currentPage = 1;
        renderProducts();
    });

    // Initial render
    renderProducts();
});
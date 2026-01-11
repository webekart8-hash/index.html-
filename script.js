$(document).ready(function() {
  loadProducts();

  $('#searchForm').submit(function(e) {
    e.preventDefault();
    const query = $('#searchInput').val();
    loadProducts(query);
  });

  $('.category-link').click(function() {
    const category = $(this).data('category');
    loadProducts('', category);
  });

  $('#loginBtn').click(function() {
    const username = prompt('Username:');
    const password = prompt('Password:');
    $.post('/api/login', { username, password }, function(data) {
      if (data.success) location.reload();
      else alert(data.error);
    });
  });

  $('#cartBtn').click(function() {
    window.location.href = 'cart.html';
  });

  $('#ordersBtn').click(function() {
    window.location.href = 'orders.html';
  });
});

function loadProducts(search = '', category = '') {
  $.get('/api/products', { search, category }, function(products) {
    $('#products').empty();
    products.forEach(p => {
      $('#products').append(`
        <div class="col-md-3">
          <div class="card product-card">
            <img src="${p.image}" class="card-img-top" alt="${p.name}">
            <div class="card-body">
              <h6>${p.name}</h6>
              <p class="text-success">₹${p.price}</p>
              <a href="product.html?id=${p.id}" class="btn btn-primary btn-sm">View Product</a>
            </div>
          </div>
        </div>
      `);
    });
  });
}

// js/app.js — Shop page logic

let activeFilter = 'all';

function formatPrice(p) {
  return '₹' + p.toLocaleString('en-IN');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) stars += '<span class="star full">★</span>';
    else if (i === full && half) stars += '<span class="star half">★</span>';
    else stars += '<span class="star empty">★</span>';
  }
  return stars;
}

function buildCard(product) {
  const wishlisted = WishlistManager.has(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="card-image" style="background-color: ${product.color}20; border-color: ${product.color}40">
        <span class="product-emoji">${product.emoji}</span>
        ${product.badge ? `<span class="product-badge badge-${product.badge.toLowerCase().replace(' ', '-')}">${product.badge}</span>` : ''}
        <button
          class="heart-btn ${wishlisted ? 'active' : ''}"
          aria-label="${wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
          data-id="${product.id}"
          onclick="handleWishlistToggle(event, ${product.id})"
        >
          <svg class="heart-icon" viewBox="0 0 24 24" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="card-body">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="review-count">(${product.reviews})</span>
        </div>
        <div class="product-pricing">
          <span class="price-current">${formatPrice(product.price)}</span>
          <span class="price-original">${formatPrice(product.originalPrice)}</span>
          <span class="price-discount">−${discount}%</span>
        </div>
      </div>
    </article>
  `;
}

function handleWishlistToggle(event, productId) {
  event.stopPropagation();
  const result = WishlistManager.toggle(productId);
  const product = PRODUCTS.find(p => p.id === productId);

  // Update button state
  const btn = document.querySelector(`.heart-btn[data-id="${productId}"]`);
  if (btn) {
    btn.classList.toggle('active', result === 'added');
    btn.querySelector('svg').setAttribute('fill', result === 'added' ? 'currentColor' : 'none');
    btn.setAttribute('aria-label', result === 'added' ? 'Remove from wishlist' : 'Add to wishlist');

    // Burst animation
    btn.classList.add('burst');
    setTimeout(() => btn.classList.remove('burst'), 400);
  }

  updateBadges();

  if (result === 'added') {
    showToast(`♥ ${product.name} saved to wishlist`, 'added');
  } else {
    showToast(`Removed from wishlist`, 'removed');
  }
}

function filterProducts(category) {
  activeFilter = category;
  document.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.filter === category));
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter);
  grid.innerHTML = filtered.map(buildCard).join('');

  // Staggered entrance animation
  grid.querySelectorAll('.product-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 60}ms`;
    card.classList.add('card-enter');
  });
}

// Filter pill listeners
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => filterProducts(pill.dataset.filter));
});

// Initial render
document.addEventListener('DOMContentLoaded', renderProducts);

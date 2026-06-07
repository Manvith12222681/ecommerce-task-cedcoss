// js/wishlist-page.js — Wishlist page logic

function formatPrice(p) {
  return '₹' + p.toLocaleString('en-IN');
}

function buildWishlistCard(product) {
  return `
    <article class="product-card wishlist-card" data-id="${product.id}">
      <div class="card-image" style="background-color: ${product.color}20; border-color: ${product.color}40">
        <span class="product-emoji">${product.emoji}</span>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button
          class="heart-btn active"
          aria-label="Remove from wishlist"
          onclick="removeFromWishlist(${product.id})"
        >
          <svg class="heart-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="card-body">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-pricing">
          <span class="price-current">${formatPrice(product.price)}</span>
          <span class="price-original">${formatPrice(product.originalPrice)}</span>
        </div>
        <button class="btn-remove" onclick="removeFromWishlist(${product.id})">
          Remove
        </button>
      </div>
    </article>
  `;
}

function removeFromWishlist(productId) {
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    card.classList.add('card-exit');
    setTimeout(() => {
      WishlistManager.remove(productId);
      renderWishlist();
      updateBadges();
      showToast('Removed from wishlist', 'removed');
    }, 300);
  }
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const emptyState = document.getElementById('emptyState');
  const countEl = document.getElementById('wishlistCount');
  const ids = WishlistManager.getAll();
  const products = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  countEl.textContent = products.length > 0 ? `(${products.length})` : '';

  if (products.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = products.map(buildWishlistCard).join('');

  grid.querySelectorAll('.product-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 60}ms`;
    card.classList.add('card-enter');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderWishlist();
  updateBadges();
});

// js/wishlist.js — Wishlist state management via localStorage

const WishlistManager = {
  KEY: 'stylemart_wishlist',

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
    }
  },

  has(productId) {
    return this.getAll().includes(productId);
  },

  toggle(productId) {
    const items = this.getAll();
    const idx = items.indexOf(productId);
    if (idx === -1) {
      items.push(productId);
      localStorage.setItem(this.KEY, JSON.stringify(items));
      return 'added';
    } else {
      items.splice(idx, 1);
      localStorage.setItem(this.KEY, JSON.stringify(items));
      return 'removed';
    }
  },

  remove(productId) {
    const items = this.getAll().filter(id => id !== productId);
    localStorage.setItem(this.KEY, JSON.stringify(items));
  },

  count() {
    return this.getAll().length;
  },

  clear() {
    localStorage.removeItem(this.KEY);
  }
};

// Update all wishlist badges on the page
function updateBadges() {
  const count = WishlistManager.count();
  document.querySelectorAll('.wishlist-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  });
}

// Show toast notification
function showToast(message, type = 'default') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.className = 'toast';
  }, 2500);
}

// On load — initialise badges
document.addEventListener('DOMContentLoaded', updateBadges);

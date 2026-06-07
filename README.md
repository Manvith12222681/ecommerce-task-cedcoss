# StyleMart — Wishlist Feature

A clean, elegant e-commerce wishlist built as part of **Round 2 — Cedcoss Technologies** hiring assignment.

---

## 🛍️ What it does

StyleMart lets users browse a curated product catalogue and save items they love.

| Feature | Description |
|---|---|
| 🛒 Browse products | 12 styled product cards across 4 categories |
| 🔖 Filter by category | Women · Men · Accessories · Footwear |
| ♥ Wishlist toggle | Click the heart on any card to save / unsave |
| 🔢 Live badge count | Header shows count of saved items (bonus feature) |
| 📋 Wishlist page | Dedicated page showing all saved products |
| 🗑️ Remove items | Remove individual items from the wishlist page |
| 💾 Persistent state | Wishlist saved to `localStorage` — survives refresh |
| 📱 Responsive | Works on desktop, tablet, and mobile |

---

## 🚀 How to run

No build step, no npm install, no server required.

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-task-cedcoss.git
cd ecommerce-task-cedcoss

# Just open index.html in your browser:
open index.html       # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

Or drag `index.html` into any modern browser.

---

## 🗂️ Project structure

```
stylemart/
├── index.html          # Shop / product listing page
├── wishlist.html       # Saved items page
├── css/
│   └── style.css       # All styles (single stylesheet)
└── js/
    ├── data.js         # Product catalogue (12 products)
    ├── wishlist.js     # localStorage manager + toast + badge utilities
    ├── app.js          # Shop page — render cards, filter, toggle wishlist
    └── wishlist-page.js# Wishlist page — render saved items, remove
```

---

## 🧰 Tools & technologies

| Tool | Why |
|---|---|
| **Vanilla HTML/CSS/JS** | No framework needed for this scope; keeps it fast and dependency-free |
| **localStorage** | Persists wishlist across page reloads without a backend |
| **CSS custom properties** | Consistent design tokens across the whole UI |
| **Google Fonts** | Cormorant Garamond + DM Sans for a refined editorial feel |
| **Claude AI** | Used to scaffold components and accelerate styling decisions |

---

## ✨ Bonus feature

The wishlist heart icon in the navigation header shows a **live item count badge** that:
- Appears with a smooth scale animation when items are added
- Updates instantly on every add / remove action
- Stays in sync across both pages

---

## 📸 Pages

### Shop page (`index.html`)
- Hero banner with scroll hint
- Category filter pills
- 12 product cards with emoji thumbnails, ratings, pricing & discount badges
- Heart button on each card (fills red when wishlisted)
- Toast notification on add / remove

### Wishlist page (`wishlist.html`)
- Shows all saved products
- Remove button + heart button both work
- Empty state with CTA when list is empty

---

*Built with ♥ for Cedcoss Technologies — Round 2, June 2026*

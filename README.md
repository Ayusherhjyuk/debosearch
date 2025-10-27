# 🪄 Reposcout – GitHub Repository Search & Bookmark App

A modern, lightweight React micro-app that lets users **search** and **bookmark** GitHub repositories with a beautiful **glassmorphic dark UI** ✨  
Built with **Vite + TypeScript + Tailwind CSS**, featuring smooth animations, fast performance, and full **mobile responsiveness** 📱.

---

## 🚀 Demo

🔗 **Live Demo:** [https://reposcout-dun.vercel.app](https://reposcout-dun.vercel.app)  
_(Deployed via Vercel)_

---

## 🖼️ Preview

### 🌌 Home Page
![Home Page](https://drive.google.com/uc?export=view&id=11jUDJyY_dW2PCyIiGtbtFrlCRqoP85wN)

### ⭐ Bookmark View
![Bookmark Page](https://drive.google.com/uc?export=view&id=1_HWabUimXg4cJaJc6CLMtWXviElFm7RS)

---

## 🧰 Tech Stack

- ⚛️ **React 18** + **TypeScript**
- ⚡ **Vite** for ultra-fast builds
- 🎨 **Tailwind CSS** (glassmorphism theme)
- 💾 **LocalStorage** for persistent bookmarks
- 🧠 **React Context API** for global state
- 🌀 **Framer Motion** for subtle animations
- ✅ **ESLint + Prettier** for code consistency
- 🧩**Click to Open Repository** – Clicking a repo card instantly opens its GitHub page.
- ⭐**Fully Mobile Responsive** – Works seamlessly on phones, tablets, and desktops. 

---

## 🧑‍💻 Features

### 🔍 Search
- Debounced input (400 ms) to limit API calls
- Fetches from [GitHub REST API](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-repositories)
- Displays first 30 repositories with:
  - Name & owner
  - Description
  - Language, stars
  - Avatar + quick link to repo

### ⭐ Bookmarks
- Toggle bookmark directly on any card  
- Bookmarks are **persisted** in localStorage  
- Dedicated “Bookmarked” tab or section

### 💫 UI/UX
- Glassmorphic, glowing design  
- Smooth hover transitions and card animations  
- Responsive grid layout  
- Clean empty, loading, and error states  

---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/debosearch.git
cd debosearch

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run development server
npm run dev
# → App runs at http://localhost:5173/

# 4️⃣ Build for production
npm run build

# 5️⃣ Preview production build
npm run preview

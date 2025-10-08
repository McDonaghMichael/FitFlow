# FitFlow

**FitFlow** is a mobile application that allows users to track calories, carbs from food and drinks, and leave reviews on products to provide real-world insights. Other features include **goal tracking**, **dark/light mode synced across platforms**, and **profile editing**.  

> ⚡ Note: The app is primarily a **prototype**, developed to demonstrate core functionality.

---

## Project Timeline

| Phase | Duration | Description |
|-------|---------|-------------|
| UI/UX Design | 2 weeks | Designed the entire application in **Figma**, including screens, workflows, and dark/light mode layouts. |
| Development | 2 weeks | Built the functional prototype including backend API, frontend integration, barcode scanning, and database setup. |

---

## Project Background

| Feature | Description |
|---------|-------------|
| Calorie & Macro Tracking | Track calories, carbs, and other nutritional data for food and drinks. |
| Reviews & Feedback | Leave reviews on products to share experiences and insights. |
| Goal Tracking | Set and monitor personal fitness and nutrition goals. |
| Dark/Light Mode | Switch seamlessly between dark and light modes across devices. |
| Profile Management | Edit and customize your personal profile. |

---

## Problem Statement

Existing fitness and calorie-tracking apps focus primarily on **numbers and labels**, rarely providing insight into actual user experiences. Questions like:

- *How did someone feel after using this product?*  
- *Did it help with energy, recovery, or performance?*  
- *Was the taste tolerable? Did it cause side effects?*  

…are often overlooked. **FitFlow bridges this gap**, providing a platform for honest user feedback, enabling better-informed, personalized decisions.

---

## System Architecture

### Backend

- **Language:** GoLang – chosen for speed, low memory usage, and excellent concurrency.  
- **HTTP Handler:** `gorilla/mux` for lightweight and efficient route management (GET, POST, PUT, DELETE).  
- **Custom API:** Handles authentication, product data, reviews, and real-time syncing.  

### Database

- **MongoDB** (NoSQL, JSON-style) – simplifies account creation, product logging, and real-time syncing across devices.  

| Component | Purpose |
|-----------|---------|
| User Accounts | Store login and profile data securely. |
| Product Data | Log nutritional info, barcode details, and user reviews. |
| Review Storage | Persist feedback and ratings for products. |

---

## Technologies Used

| Category | Tools / Frameworks | Notes |
|----------|-----------------|-------|
| Frontend Framework | Ionic / Angular | Pre-built components, observables, responsive UI, dark/light mode. |
| Backend | GoLang | Custom API for maximum flexibility, performance, and scalability. |
| Database | MongoDB | NoSQL, JSON-style, easy account/product management. |
| Encryption | `crypto/bcrypt` | Password hashing to keep user data secure. |
| Deployment | Nginx, Certbot | Domain hosting and HTTPS setup for secure hardware access. |
| Mobile Features | `@zxing/ngx-scanner` | Barcode & QR code scanning for product info. |

---

## Challenges

| Challenge | Solution |
|-----------|---------|
| Accessing device camera over HTTP | Purchased domain (**[mcdonagh.xyz](http://mcdonagh.xyz)**) and hosted backend/frontend on Linux server. Configured Nginx for routing. |
| Secure connection | Used **Certbot** to generate SSL certificates for subdomains. |
| Ngrok limitations | Domain persistence solved the issue of dynamic URLs on server restart. |

---

## Solutions Implemented

With **FitFlow**, users can:

- Scan product barcodes and access detailed info instantly.  
- View **real-world, user-generated reviews** alongside standard nutritional data.  
- Make informed decisions based on actual outcomes rather than marketing claims.  

This approach creates a **transparent, user-driven experience**, bridging the gap left by traditional calorie-tracking apps.

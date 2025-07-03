
# 🌍 REST Countries (Angular 18 + NgRx)

Live: [stately-platypus-42cd38.netlify.app](https://stately-platypus-42cd38.netlify.app)  
Repo: [github.com/rougemeister/rest-countries](https://github.com/rougemeister/rest-countries)

A clean and responsive web app built with **Angular 18**, **NgRx Store**, and the **REST Countries API**, allowing users to browse, search, and filter country data in real time.

---

## 📦 Tech Stack

| Tech              | Version     |
|------------------|-------------|
| Angular          | ^18.2.0     |
| NgRx Store       | ^18.1.1     |
| RxJS             | ~7.8.0      |
| Standalone APIs  | ✅ Angular 18 feature |
| REST Countries API | v3.1       |
| Deployment       | Netlify     |

---

## 🚀 Features

- 🌍 Browse all countries
- 🔍 Real-time search
- 🌐 Filter by region
- 📄 View detailed info per country (flag, native name, population, etc.)
- 🔁 Navigate through border countries
- 🔁 NgRx store with caching and selectors
- 💡 Custom pipes for formatting currencies, languages, and numbers
- 📱 Fully responsive design

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── components/         → UI components (Header, Search, CountryCard, etc.)
│   ├── pages/              → Routed views (HomePage, CountryDetails)
│   ├── services/           → API services (with memory + localStorage caching)
│   ├── store/              → NgRx (actions, reducer, effects, selectors)
│   ├── pipes/              → Custom pipes (currencies, native name, etc.)
│   ├── constants/          → API URLs and cache keys
│   ├── models/             → TypeScript interfaces
│   └── app.config.ts       → Angular 18 config (routing + store)
```

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/rougemeister/rest-countries.git
cd rest-countries
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

The app will be available at:  
➡️ `http://localhost:4200`

---

## 🌐 API Used

**REST Countries API v3.1**  
Base URL: `https://restcountries.com/v3.1/independent?status=true`

Query fields (max 10):

```
?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders
```

---

## 🔁 NgRx State Overview

- `loadCountries` — loads country data and caches it
- `setFilterRegion` — filters countries by selected region
- `setSearchQuery` — filters countries by search string
- `selectFilteredCountries` — returns filtered list from state

The store is configured in `app.config.ts` using `provideStore()` and `provideEffects()`.

---

## 🧰 Custom Pipes

| Pipe Name     | Purpose                             |
|---------------|--------------------------------------|
| `commify`     | Adds commas to large numbers (e.g., 1,000,000) 

---

## 📦 Production Build

```bash
npm run build
```

Build output is saved in `dist/rest-countries/`

---

## 📤 Deployment

This app is deployed using **Netlify**.  
To deploy yourself:

1. Build the app with `ng build`
2. Drag `dist/rest-countries` into Netlify
3. Or connect to GitHub for automatic deploys

---

## 👤 Author

- [@rougemeister](https://github.com/rougemeister)

---

## 📄 License

This project is licensed under the **MIT License**.

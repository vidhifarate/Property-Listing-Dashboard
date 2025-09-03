#  Mini Property Listing Dashboard

A React-based mini dashboard that allows users to:

- View property listings (with images, price, and description)  
- Search and filter properties by type or location  
- Add new properties dynamically  
- View full property details in a modal (with optional Google Maps integration)

---

##  Project Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd property-listings
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start JSON Server (Backend)
Run this in **Git Bash Window 1**:
```bash
npx json-server --watch db.json --port 5000
```

### 4. Start React App (Frontend)
Run this in **Git Bash Window 2**:
```bash
npm run dev
```

---

##  Dependencies Used
- **React** (Frontend UI framework)  
- **Axios** (for API calls to JSON Server)  
- **JSON Server** (mock backend for property data)  

---

##  File Structure
```
property-listings/
 ├── public/
 ├── src/
 │   ├── App.jsx       # Main application
 │   ├── App.css       # Styling
 │   ├── main.jsx      # React entry point
 │   └── index.css     # Global styles
 ├── db.json           # Fake backend data
 ├── package.json      # Project dependencies
 ├── README.md         # Project documentation
```

---

##  How It Works
1. The app fetches property data from **db.json** using JSON Server.  
2. Users can:
   - **View Listings** → Cards with property details and images  
   - **Filter/Search** → By name, location, or type  
   - **Add Property** → New entries saved to db.json  
   - **View Details** → Modal popup with full info (+ Google Maps if coordinates exist)  

---

##  Screenshots
![Dashboard Screenshot] !(<Screenshot 2.png>) 
![View modal Screenshot] !(<Screenshot 1.png>)

---

##  Optional Feature
- Google Maps integration → requires a Google Maps API key. Add `lat` and `lng` fields in `db.json`.

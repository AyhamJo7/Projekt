# 📁 Projekt: Pile of Shame

## 🚀 **Project Overview**
The **Pile of Shame** is a web application designed to help users manage and organize their backlog of items (e.g., books, games, movies) that they intend to consume or complete but haven't yet. The project consists of a **client-side frontend** built with HTML, CSS, and JavaScript, and a **server-side backend** built with Node.js, Express, and JSON Server.

### Key Features:
- **Add Items**: Users can add new items to their backlog, including details like name, description, price, date, categories, and an image.
- **Filter Items**: Users can filter items by categories (e.g., books, games, movies).
- **View Items**: Users can view all items in a card-based layout.
- **Image Upload**: Users can upload images for each item, which are encoded as Base64 and stored in the database.
- **Responsive Design**: The frontend is designed to work seamlessly on both desktop and mobile devices.

---

## 🛠️ **Technologies Used**
### Frontend:
- **HTML**: Structure of the web pages.
- **CSS (Tailwind)**: Styling and responsive design.
- **JavaScript**: Client-side interactivity.
- **TypeScript**: Optional type safety for JavaScript.

### Backend:
- **Node.js**: Runtime environment for the server.
- **Express**: Web framework for handling HTTP requests.
- **JSON Server**: Simulates a REST API using a JSON file as the database.
- **TypeScript**: Adds type safety to the backend code.

---

## 🚀 **Getting Started**
### Prerequisites:
- Node.js (v18 or higher)
- pnpm (package manager)

### Installation:
1. Clone the repository:
   ```bash
   git clone 
   cd projekt
2. Install dependencies for both client and server:
   ```bash

   cd client && pnpm install
   cd ../server && pnpm install

3. Start the backend server:
   ```bash
   cd ../server
   pnpm run dev

4. Start the frontend development server:
   ```bash
   cd ../client
   pnpm run dev

5. Open the application in your browser:
   ```bash
   http://localhost:3000


📂 Directory Details
Frontend (client/)
src/scripts/:

event-listener.js: Handles form submission, validation, and interaction with the backend.

imagePreview.js: Manages image preview functionality.

imgEncoder.js: Encodes uploaded images as Base64 strings.

public/: Contains static assets like images and fonts.

Styles/: Contains Tailwind CSS styles.

Backend (server/)
src/controller/:

item.controller.ts: Handles API requests for items (e.g., fetching, creating).

src/models/:

item.ts: Defines the Item data model.

src/services/:

item.service.ts: Contains logic for filtering items by category.

jsonServer.service.ts: Handles communication with the JSON Server.

public/data/:

db.json: Simulates a database using a JSON file.

📝 API Endpoints
Items:
GET /api/items: Fetch all items.

POST /api/items: Create a new item.

Filtering: Use query parameters like ?search=Game to filter items by category.

🎨 Design and Styling
The frontend uses Tailwind CSS for styling, ensuring a clean and responsive design. The layout is card-based, making it easy to view and organize items.

🐛 Debugging
Debugging logs are controlled by a global DEBUG flag. Set DEBUG = true to enable logs or DEBUG = false to suppress them.

🙏 Acknowledgments
Tailwind CSS: For providing an excellent utility-first CSS framework.

Express: For simplifying backend development.

JSON Server: For simulating a REST API with ease.

Enjoy managing your Pile of Shame! 🎉

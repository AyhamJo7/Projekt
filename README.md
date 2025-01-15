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

## 🌟 **Project Structure**
Here’s the directory structure of the project:
Projekt/
├── .vscode/ # VSCode settings
├── client/ # Frontend code
│ ├── node_modules/ # Frontend dependencies
│ ├── public/ # Static assets (images, fonts, etc.)
│ ├── src/ # Source code for the frontend
│ │ ├── scripts/ # JavaScript/TypeScript files
│ │ │ ├── event-listener.js # Handles form submission and events
│ │ │ ├── imagePreview.js # Handles image preview functionality
│ │ │ └── imgEncoder.js # Encodes images as Base64
│ │ └── Styles/ # CSS files
│ ├── index.html # Main HTML file
│ ├── package.json # Frontend dependencies and scripts
│ └── tailwind.config.js # Tailwind CSS configuration
├── server/ # Backend code
│ ├── node_modules/ # Backend dependencies
│ ├── public/ # Static assets (e.g., JSON database)
│ ├── src/ # Source code for the backend
│ │ ├── controller/ # Handles HTTP requests and responses
│ │ ├── models/ # Defines data models (e.g., Item)
│ │ ├── routers/ # Defines API routes
│ │ ├── services/ # Contains business logic
│ │ └── main.ts # Entry point for the backend
│ ├── .env # Environment variables
│ ├── package.json # Backend dependencies and scripts
│ └── tsconfig.json # TypeScript configuration
├── .gitignore # Specifies files to ignore in Git
├── .prettierrc # Prettier configuration
├── eslint.config.mjs # ESLint configuration
└── README.md # Project documentation (this file)

Copy

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
   git clone https://github.com/your-username/projekt.git
   cd projekt
Install dependencies for both client and server:

bash
Copy
cd client && pnpm install
cd ../server && pnpm install
Start the backend server:

bash
Copy
cd ../server
pnpm run dev
Start the frontend development server:

bash
Copy
cd ../client
pnpm run dev
Open the application in your browser:

Copy
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

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature).

Open a pull request.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

🙏 Acknowledgments
Tailwind CSS: For providing an excellent utility-first CSS framework.

Express: For simplifying backend development.

JSON Server: For simulating a REST API with ease.

Enjoy managing your Pile of Shame! 🎉

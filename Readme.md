# 💬 TalkHUB

A **real-time chat application** built with **React (client)**, **Node.js + Express (server)**, and **Socket.IO**.  
Users can send and receive messages instantly, see online/offline status, and enjoy a modern responsive UI.

---

## 📌 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features
- 🔥 **Real-time messaging** with Socket.IO  
- 🟢 **Online user indicator**  
- 📜 **Message history** stored in MongoDB  
- 🛡️ Authentication with JWT (if added)  
- 🎨 Clean UI built with TailwindCSS  
- 📱 Responsive design (mobile + desktop)  

---

## 🛠️ Tech Stack
**Frontend (client):**
- React + Vite
- Redux Toolkit
- TailwindCSS

**Backend (server):**
- Node.js
- Express.js
- Socket.IO
- MongoDB (Mongoose)

**Other tools:**
- dotenv for environment variables  
- nodemon for development  

---

## 📂 Project Structure

my-chat-app/
├── client/   # React frontend
│   ├── src/
│   └── package.json
│
├── server/   # Node.js backend
│   ├── src/
│   └── package.json
│
├── .gitignore
├── README.md

---

## 🚀 Getting Started

### 1. Clone the repo

git clone "url"
cd TalkHUB

2. Install dependencies

For client:
cd client
npm install

For server:
cd ../server
npm install

3. Setup environment variables

Create .env files inside both client and server folders.

server/.env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3001

client/.env

VITE_DB_URL = "http://localhost:3001/api/v1"
VITE_SOCKET_URL = "http://localhost:3001"

4. Run the app

Run backend:

cd server
npm run dev


Run frontend:

cd client
npm run dev

App will run at:
👉 Frontend: http://localhost:5173 (default Vite port)
👉 Backend: http://localhost:3001


🤝 Contributing
	1.	Fork the repo
	2.	Create your feature branch (git checkout -b feature/my-feature)
	3.	Commit your changes (git commit -m 'Add some feature')
	4.	Push to the branch (git push origin feature/my-feature)
	5.	Open a Pull Request


📜 License

This project is licensed under the MIT License.
Feel free to use and modify for your own projects.

Built with ❤️ by SJ
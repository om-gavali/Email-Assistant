# 📧 AI Email Assistant – Gmail Chrome Extension

AI Email Assistant is a **Chrome Extension for Gmail** that generates **instant, professional email replies using AI**.

Instead of switching between tools or writing replies manually, this extension adds an **AI Reply button directly inside Gmail** so you can respond to emails in seconds.

This project also includes a **Spring Boot backend** and a **React testing UI** used during development.

---

## ✨ Why This Project is Special

This is **not just another web app**.

The extension integrates **directly inside Gmail’s interface** and works in a real email workflow:

**Open Gmail → Click Reply → Click AI Reply → Send**

No copy-paste. No extra tabs. Just one click.

---

## 🧠 Project Architecture

This project is built using **three main parts** that work together:

| Part                       | Purpose                                                        |
| -------------------------- | -------------------------------------------------------------- |
| **Chrome Extension**       | Injects the AI Reply button into Gmail and reads email content |
| **Spring Boot Backend**    | Calls Gemini AI and generates the email reply                  |
| **React App (Testing UI)** | Simple interface to test the API during development            |

---

## ⚡ How the System Works

### Real Gmail Workflow

1. Open Gmail
2. Click **Reply** on any email
3. Click the **AI Reply** button added by the extension
4. Extension extracts the email content from Gmail
5. Content is sent to the **Spring Boot API**
6. Backend calls **Gemini AI**
7. AI generates a professional reply
8. Reply is **automatically inserted into the Gmail editor** ✨

The user only needs to review and click **Send**.

---

## 🖥️ Tech Stack

### 🔘 Chrome Extension

* Manifest V3
* Content Scripts
* Gmail DOM Manipulation
* Message Passing

### 🔘 Backend

* Spring Boot
* REST API
* WebClient
* Gemini AI API

### 🔘 Frontend (Testing Only)

* React + Vite
* Material UI (for quick UI testing)

---

## 🧪 React Testing UI

A lightweight React app was created to:

* Test the AI reply API locally
* Debug backend responses
* Experiment with prompt tuning

This UI is **only for development/testing**, not part of the final product.

---

## 📸 Screenshots

**Gmail with AI Reply Button**  <img width="1917" height="967" alt="image" src="https://github.com/user-attachments/assets/0807ac22-88dc-42b1-ac02-d884fff16cf2" />



**Generated Reply Inside Gmail** <img width="1919" height="1016" alt="image" src="https://github.com/user-attachments/assets/5c83350c-6477-4ef7-a493-097cf4e95ec7" />


---

## 🚀 Key Features

* One-click AI email replies inside Gmail
* Automatic email content extraction
* Professional tone generation
* Full real-world workflow integration
* Clean modular architecture (Extension + Backend + UI)

---

## 👨‍💻 Author

**Om Gavali**

If you like this project, consider giving it a ⭐ on GitHub!

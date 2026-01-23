# Smart Link

**Smart Link** is a modern, full-stack URL shortener application built with a focus on performance, scalability, and user experience. It features a robust Express.js backend and a responsive Next.js frontend, managed within a monorepo structure.

## 🚀 Features

- **URL Shortening**: Create short, shareable links instantly.
- **Custom Aliases**: Generate unique, random aliases for your links.
- **Analytics Dashboard**: Track click counts and engagement for your links.
- **Authentication**: Secure user accounts with JWT-based authentication (HTTP-only cookies).
- **Responsive Design**: Built with HeroUI and Tailwind CSS 4 for a seamless mobile and desktop experience.
- **Link Management**: Toggle link availability and manage your link history.
- **Guest Access**: Create links without an account (limited features).

## 🛠️ Tech Stack

### Client (Frontend)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [HeroUI](https://www.heroui.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Server (Backend)

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Authentication**: Better-Auth
- **Security**: Helmet, bcrypt, CORS configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20+ recommended)
- **pnpm** (Package manager)
- **MongoDB** (Local instance or Atlas connection string)

## 📦 Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Yisusocanto/smart-link.git
    cd smart-link
    ```

2.  **Install dependencies**:
    Since this is a monorepo, you need to install dependencies for both the client and server.

    **Server:**

    ```bash
    cd server
    pnpm install
    ```

    **Client:**

    ```bash
    cd ../client
    pnpm install
    ```

## ⚙️ Configuration

You need to configure environment variables for both applications.

### Server

Create a `.env` file in the `server` directory:

```env
PORT=3001
DB_URL=mongodb://localhost:27017/smart-link
FRONTEND_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3001/api/auth

# Google credentials
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
```

### Client

Create a `.env` file in the `client` directory:

```env
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## 🏃‍♂️ Running the Application

To run the full application, you will need two terminal windows.

**Terminal 1 (Server):**

```bash
cd server
pnpm dev
# Server running on http://localhost:3001
```

**Terminal 2 (Client):**

```bash
cd client
pnpm dev
# Client running on http://localhost:3000
```

Once both are running, open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Contributing

We welcome contributions from the community! Whether it's fixing bugs, improving documentation, or proposing new features, your help is appreciated.

### How to Contribute

1.  **Fork the Project**: Click the "Fork" button at the top right of this page.
2.  **Clone your Fork**: `git clone https://github.com/Yisusocanto/smart-link.git`
3.  **Create a Branch**: `git checkout -b feature/AmazingFeature`
4.  **Commit your Changes**: `git commit -m 'Add some AmazingFeature'`
5.  **Push to the Branch**: `git push origin feature/AmazingFeature`
6.  **Open a Pull Request**: Go to the original repository and open a Pull Request.

### Development Guidelines

- **Code Style**: Please follow the existing code style (Prettier/ESLint are configured).
- **Commits**: Write clear and concise commit messages.

## 📄 License

This project is licensed under the **MIT License**.

# T&H Music - A Soulful AI-Powered Music Player

**T&H Music** is a web-based music streaming application built for the **[AI vs H.I. — A Global Hackathon by CS Girlies](https://cs-girlies.devpost.com/)**. It's a space where human-curated playlists meet AI-generated music, creating a listening experience that’s both personal and endlessly creative.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🧠 Hackathon Track Submission

This project is proudly submitted to the **✨ Make Anything, But Make it YOU (Beginner-Friendly Track)**.

The core idea was to build a "playlist generator that feels your mood." Instead of relying on opaque algorithms, T&H Music puts the user in control, blending their personal taste with the creative possibilities of AI. It’s a direct response to the hackathon's theme of "Artificial Intelligence vs Human Intelligence," demonstrating how AI can be a *tool* for human expression, not a replacement for it. The music, generated with Suno, and the visuals, edited with Pixlr, are pieces of a human-curated experience. This project is unmistakably *us*.

---

### ✨ Features

*   **🎧 Modern Audio Player**: A fully functional player with play, pause, next, previous, and a dynamic progress bar.
*   **🔐 User Authentication**: Secure sign-up and sign-in functionality handled by Clerk.
*   **☁️ Cloud-Native Assets**: All music and image assets are stored on and served from **Cloudflare R2**, ensuring fast and scalable delivery.
*   **📀 Albums & Songs**: Browse a collection of albums and songs fetched from a Supabase backend.
*   **🎶 Custom Playlists**: Authenticated users can create, view, and manage their own personal playlists.
*   **➕ Add to Playlist**: Easily add any song to a custom playlist from the homepage or the song page.
*   **🔍 Search**: Instantly find songs and albums with a dynamic search bar.
*   **🌐 Dynamic Titles**: The browser tab title updates dynamically based on the currently playing song, album, or playlist.
*   **👤 Personalized Avatars**: The user's avatar in the sidebar dynamically displays their initials.

---

### 🛠️ Tech Stack & Tools

*   **Frontend**:
    *   [**React**](https://reactjs.org/) - A JavaScript library for building user interfaces.
    *   [**Vite**](https://vitejs.dev/) - A blazingly fast build tool and development server.
    *   [**Tailwind CSS**](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
    *   [**React Router**](https://reactrouter.com/) - For declarative routing in the application.
*   **Backend & Data**:
    *   [**Supabase**](https://supabase.io/) - The open-source Firebase alternative for the database, and real-time capabilities.
    *   [**Clerk**](https://clerk.com/) - For seamless and secure user authentication and management.
*   **Infrastructure**:
    *   [**Supabase Storage**](https://www.cloudflare.com/products/r2/) - Storage for all music and image files.
*   **AI & Content Generation**:
    *   [**Suno AI**](https://suno.com/) - Used to generate the original music tracks for the platform.
    *   [**Pixlr**](https://pixlr.com/) - Used for creating and editing album and song cover art.

---

### 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Supabase and Clerk credentials.

    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    VITE_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

### 📦 Submission Requirements

*   **Demo Video**: [Link to your 1-5 minute demo video here]
*   **Project Description**: See above.
*   **Public Code Repository**: This repository serves as the public code base.
*   **Team Info**: All team members are added to the Devpost submission.

---

### 📧 Contact

If you have any questions, feel free to reach out at `tomasottosson1@gmail.com`. Let's build something unmistakably human. 🩷

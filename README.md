# Twitter Clone

A simple, responsive Twitter clone built with TypeScript, HTML, and CSS.  
This project demonstrates how to consume public REST APIs to display users, posts, and comments in a Twitter-like interface.

## Features

- **User Selection:** Select a user from a dropdown to view their profile and posts.
- **Posts Feed:** View all posts by the selected user.
- **Comments:** Click a post to view its comments.
- **Responsive Design:** Works well on both desktop and mobile devices.
- **Modern UI:** Clean, Twitter-inspired interface.
- **Light and Dark Mode:** Toggle between light and dark themes with saved preferences.

## Technologies Used

- TypeScript
- HTML5
- CSS3 (Flexbox, CSS variables, media queries)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/twitter-clone.git
   cd twitter-clone
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Build the TypeScript:**

   ```sh
   npx tsc
   ```

4. **Run a local server (recommended):**
   - You can use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code, or:
   ```sh
   npx serve .
   ```
   - Then open `twitter-clone.html` in your browser.

### Usage

- Select a user from the dropdown in the header.
- The user's profile and posts will be displayed.
- Click on a post to view its comments in the sidebar.

## Project Structure

```
twitter-clone/
├── src/
│   └── index.ts        # Main TypeScript logic
├── dist/
│   └── index.js        # Compiled JavaScript
├── twitter-clone.html  # Main HTML file
├── style.css           # Stylesheet
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints Used

- **Users:** https://jsonplaceholder.typicode.com/users
- **Posts:** https://jsonplaceholder.typicode.com/posts?userId={userId}
- **Comments:** https://jsonplaceholder.typicode.com/comments?postId={postId}

## Customization

- You can modify the CSS in `style.css` for different color schemes or layouts.
- The TypeScript code in `src/index.ts` is modular and easy to extend.

## Author

- MAXMILLIN MUIRURI

---

**Demo:**  
You can see live demo at [here]]()

// interfaces.ts
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  company: {
    catchPhrase: string;
  };
  address: {
    city: string;
    street: string;
  };
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// twitter-clone.ts
class TwitterClone {
  // DOM Elements
  private userSelect: HTMLSelectElement = document.getElementById(
    "user-select"
  ) as HTMLSelectElement;
  private profileImage: HTMLImageElement = document.querySelector(
    ".profile-image"
  ) as HTMLImageElement;
  private profileName: HTMLElement = document.querySelector(
    ".profile-info h2"
  ) as HTMLElement;
  private profileUsername: HTMLElement = document.querySelector(
    ".username"
  ) as HTMLElement;
  private profileWebsite: HTMLElement = document.querySelector(
    ".website"
  ) as HTMLElement;
  private profileBio: HTMLElement = document.querySelector(
    ".profile-info p:nth-of-type(2)"
  ) as HTMLElement;
  private profileLocation: HTMLElement = document.querySelector(
    ".location"
  ) as HTMLElement;
  private postsFeed: HTMLElement = document.querySelector(
    ".posts-feed"
  ) as HTMLElement;
  private commentsSection: HTMLElement = document.querySelector(
    ".comments-section"
  ) as HTMLElement;

  /**
   * Class representing a Twitter clone application.
   *
   */
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private selectedUserId: number = 1;
  private selectedPostId: number | null = null;

  constructor() {
    this.setupEventListeners();
    this.loadInitialData();
  }

  /**
   * Sets up event listeners for user interactions.
   */

  private setupEventListeners(): void {
    this.userSelect.addEventListener("change", (e) => this.handleUserSelect(e));
  }

  private async loadInitialData(): Promise<void> {
    try {
      await this.fetchUsers();
      if (this.users.length > 0) {
        this.selectedUserId = this.users[0].id;
        this.updateProfile(this.users[0]);
        await this.fetchPosts(this.selectedUserId);
      }
    } catch (error) {
      console.error("Initialization failed:", error);
    }
  }

  private async fetchUsers(): Promise<void> {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.users = await response.json();
      this.populateUserDropdown();
    } catch (error) {
      console.error("Failed to fetch users:", error);
      this.userSelect.innerHTML = "<option>Error loading users</option>";
    }
  }

  private populateUserDropdown(): void {
    this.userSelect.innerHTML = this.users
      .map((user) => `<option value="${user.id}">${user.username}</option>`)
      .join("");
  }
  /**
   *
   * @param user - The user object containing profile information.
   * Updates the profile section with the user's information.
   */
  private updateProfile(user: User): void {
    this.profileImage.src = `https://i.pravatar.cc/300?u=${user.id}`;
    this.profileName.textContent = user.name;
    this.profileUsername.textContent = `@${user.username}`;
    this.profileWebsite.textContent = user.website;
    this.profileBio.textContent = user.company.catchPhrase;
    this.profileLocation.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
        />
      </svg>
      ${user.address.city}
    `;
  }
  /**
   *
   * @param userId - The ID of the user whose posts are to be fetched.
   * Fetches posts for the selected user and updates the posts feed.
   * If posts are available, it also fetches comments for the first post.
   */
  private async fetchPosts(userId: number): Promise<void> {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      this.posts = await response.json();
      this.displayPosts();

      if (this.posts.length > 0) {
        this.selectedPostId = this.posts[0].id;
        this.fetchComments(this.selectedPostId);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      this.postsFeed.innerHTML =
        '<div class="error">Failed to load posts</div>';
    }
  }

  /**
   * Displays the posts in the posts feed.
   * Each post includes the user's profile image, name, and content.
   * Clicking on a post fetches and displays its comments.
   */
  private displayPosts(): void {
    this.postsFeed.innerHTML = this.posts
      .map((post) => {
        const user = this.users.find((u) => u.id === post.userId);
        return `
          <div class="profile-content" data-post-id="${post.id}">
            <img
              class="profile-image"
              src="https://i.pravatar.cc/150?u=${post.userId}"
              alt="${user?.name || "User"} profile"
            />
            <div class="profile-info">
              <h2>
                ${user?.name || "Unknown User"}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png"
                  alt="verified badge"
                  class="verified-icon"
                  height="16"
                  width="16"
                />
                <svg
                  aria-label="Twitter"
                  class="twitter-icon"
                  viewBox="0 0 24 24"
                  role="img"
                  fill="#1DA1F2"
                  height="16"
                  width="16"
                >
                  <g>
                    <path
                      d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.949.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.083-.205-7.702-2.158-10.126-5.134-.422.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.179 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633.962-.689 1.8-1.56 2.46-2.548l-.047-.02z"
                    />
                  </g>
                </svg>
              </h2>
              <p>${post.body}</p>
              <div class="footer-icons">
                <span>💬 ${Math.floor(Math.random() * 100)}</span>
                <span>🔁 ${Math.floor(Math.random() * 100)}</span>
                <span>❤️ ${Math.floor(Math.random() * 100)}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    /**
     * Adds click event listeners to each post in the feed.
     */
    document.querySelectorAll(".profile-content").forEach((post) => {
      post.addEventListener("click", () => {
        const postId = parseInt(post.getAttribute("data-post-id") || "0");
        this.selectedPostId = postId;
        this.fetchComments(postId);
      });
    });
  }

  /**
   *
   * @param postId - The ID of the post whose comments are to be fetched.
   * Fetches comments for the selected post and updates the comments section.
   */

  private async fetchComments(postId: number): Promise<void> {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      this.comments = await response.json();
      this.displayComments();
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      this.commentsSection.innerHTML =
        '<div class="error">Failed to load comments</div>';
    }
  }

  private displayComments(): void {
    this.commentsSection.innerHTML = `
      <h3>Post ${this.selectedPostId} Comments</h3>
      ${this.comments
        .map(
          (comment) => `
          <div class="comment">
            <img
              class="comment-image"
              src="https://i.pravatar.cc/150?u=${comment.email}"
              alt="${comment.name} profile"
            />
            <div class="comment-info">
              <h4>
                ${comment.name}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png"
                  alt="verified badge"
                  class="verified-icon"
                  height="16"
                  width="16"
                />
                <svg
                  aria-label="Twitter"
                  class="twitter-icon"
                  viewBox="0 0 24 24"
                  role="img"
                  fill="#1DA1F2"
                  height="14"
                  width="14"
                >
                  <g>
                    <path
                      d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.949.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.083-.205-7.702-2.158-10.126-5.134-.422.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.179 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633.962-.689 1.8-1.56 2.46-2.548l-.047-.02z"
                    />
                  </g>
                </svg>
              </h4>
              <p>${comment.body}</p>
              <div class="footer-icons">
                <span>💬 0</span>
                <span>🔁 0</span>
                <span>❤️ 0</span>
              </div>
            </div>
          </div>
        `
        )
        .join("")}
    `;
  }

  private handleUserSelect(event: Event): void {
    const userId = parseInt((event.target as HTMLSelectElement).value);
    const selectedUser = this.users.find((user) => user.id === userId);

    if (selectedUser) {
      this.selectedUserId = userId;
      this.updateProfile(selectedUser);
      this.fetchPosts(userId);
      this.commentsSection.innerHTML =
        "<h3>Select a post to view comments</h3>";
    }
  }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  new TwitterClone();
});

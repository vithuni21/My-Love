## Happy Birthday My Love – Web Surprise

This is a small, single-page-style **romantic birthday surprise website** made with plain HTML, CSS, and JavaScript. It has soft animations, background music, floating hearts, and a short multi-step flow that ends in a heartfelt message.

### What’s in this project

- **`index.html`** – Welcome / landing page with your photo and entry button.
- **`love.html`** – “You are my favorite feeling” page, with quotes and a link to the memories.
- **`memory.html`** – Grid of special moments.
- **`message.html`** – Final birthday message with confetti and fireworks.
- **`styles.css`** – All styling, gradients, animations, and layout.
- **`app.js`** – Shared logic:
  - Page fade-in / fade-out transitions.
  - Floating hearts and extra animations on the memories page.
  - Background music toggle that remembers state (on/off, time, volume) using `localStorage`.

> Note: The HTML expects an `assets` folder with `music.mp3` and `us.jpeg`. See below.

### Running the site locally

You don’t need any build tools or frameworks.

- **Quickest way**: double-click `index.html` to open it in your browser.
  - This works in most browsers; if music doesn’t autoplay, click the **Music** button once.
- **Optional local server** (recommended for best behavior):
  - With Python installed:
    ```bash
    cd "c:/Users/rvith/Desktop/my love"
    python -m http.server 5500
    ```
    Then open `http://localhost:5500/index.html` in your browser.

### Adding your own music & photo

Create this structure in the project folder:

```text
my love/
  assets/
    music.mp3   # your background song
    us.jpeg     # your photo together
```

- **`music.mp3`**: any MP3 file (rename it to `music.mp3`).
- **`us.jpeg`**: your favorite picture; you can also use `.jpg` or `.png`, but update the `<img src>` in `index.html` if you change the name.

### Customizing the words

You can freely edit the text directly in the HTML files:

- **Main title & chips**: `index.html`.
- **Cute quotes**: `love.html` inside the `.quotes` section.
- **Memories grid**: `memory.html` inside `.moment-grid`.
- **Final birthday paragraph**: `message.html` inside the long text block (marked “Editable message”).

No extra tooling is required—just open the files in Cursor or any text editor, change the words, save, and refresh the browser.

### Sharing the site

Once you’re happy with it, you can:

- **Zip the folder** and send it so they can open `index.html`.
- Or **deploy** to any static host (GitHub Pages, Netlify, Vercel, etc.) by uploading this folder as a static site.

That’s all you need to have this birthday surprise site fully working and ready to share. 🎂❤️


# PrepDeck — Web Dev Interview Practice

A React + Vite front-end for topic-wise web development interview practice, built around the topics from the **GR Web Dev Team** roadmap (HTML, CSS, JavaScript, React, Tailwind, Git, Node/Express, Next.js, Databases, Advanced & Deployment).

## Features

- **10 topic decks · 105 questions** with detailed answers
- **Difficulty filters** — All / Easy / Moderate / Hard, with live counts per topic
- **Dropdown answers** — click a question to expand the answer inline (smooth accordion)
- **Search** across every question, answer and topic (`⌘K` / `Ctrl+K` / `/`)
- **Reviewed tracking** saved in `localStorage`, per-topic and overall progress
- **Hide reviewed** toggle, expand/collapse all, and a random question picker
- **Light & dark themes** (remembers your choice, respects system preference by default)
- **Responsive** — collapsible sidebar and mobile layout

## Run it

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Project structure

```
index.html
src/
  main.jsx                 # React entry
  App.jsx                  # state: topic, filters, search, progress, theme
  styles.css               # design system + layout + responsive styles
  components/
    Sidebar.jsx            # topic navigation + overall progress
    QuestionCard.jsx       # accordion card with difficulty + reviewed state
    Answer.jsx             # small markdown-ish renderer for answers
    Icons.jsx              # inline SVG icon set
  data/
    questions.js           # all topics and questions
```

## Adding questions

Edit `src/data/questions.js`. Each topic has a `questions` array:

```js
{
  id: 'js-15',              // unique
  difficulty: 'Moderate',   // 'Easy' | 'Moderate' | 'Hard'
  question: 'Your question?',
  answer: `Answer text.

- supports **bold**, [[inline code]] and bullet lists
- use ~~~ fences for code blocks, e.g.

~~~js
const hello = () => console.log('hi')
~~~
`,
}
```

Everything is front-end only — no backend or API calls. Progress and theme live in the browser.

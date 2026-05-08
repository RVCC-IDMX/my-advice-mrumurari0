# Week 4 reflection

Answer each question thoughtfully. There are no wrong answers — the goal is to reflect on what you learned and how your understanding changed.

---

## 1. The enforcement ladder

What did the new linter (ESLint 9 + unicorn plugin) catch that your AGENTS.md rules alone didn't prevent? On the flip side, what kinds of things can AGENTS.md catch that a linter can't check for?

The new linter helped me enforce consistent modern JavaScript patterns automatically. Safer DOM methods and cleaner syntax. AGENTS.md helps more with the expectations and learning preferences, like explaining concepts step-by-step. Linter cannot fully understand these.
---

## 2. Hooks across contexts

You've now seen hooks in five places: browser events, Git pre-commit, npm lifecycle scripts, GitHub Actions, and serverless functions. What is the common pattern across all of them?

The common pattern is that hooks automatically run code when an event happens. If it is a button click or a commit, each hook responds to a trigger and performs a task. 

---

## 3. Which enforcement layer changed your habits

Advisory (AGENTS.md), linting (ESLint + unicorn), or blocking (pre-commit hook) — which one changed how you write code the most this week? Why?

The linting layer made me change my habits, as it checked my code and made me pay attention to modern patterns in JavaScript.

---

## 4. The data swap

What surprised you about working with a real API compared to your static `data.js`? Think about things like response shape, timing, missing fields, or error cases.

The API data was not always structured like my old data. CoPilot asked me questions that made me think more about missing fields or asynchronous loading. 
---

## 5. The transform challenge

What was the hardest part of mapping the API response to the shape your views expect? How did you solve it?

The hardest part was understanding that the API field names were different from the field names that my app had expected. I solved this by changing the API response inside the serverless function so tha tthe frontend could still use the same structure. 
---

## 6. New API fields

What new field(s) did you add from the API? How did they improve your app compared to the static version?

I added fields like `description`, `firstAirDate`, and `posterPath`. These made the app feel more realistic and informative because the detail view now gives users more information about each show.

---

## 7. Error handling philosophy

You used try/catch in four different contexts this week: the serverless function, fetch in app.js, the localStorage wrapper, and the npm lint guard. What is the common pattern across all of them? What changes between contexts?

Preventing the app or tool from crashing when something happens that is wrong. In every case, try/catch helps in finding these errors and handles them safely. The context is what changes, like what the error affects. 
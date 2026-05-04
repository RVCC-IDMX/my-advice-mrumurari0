# Week 3 reflection

Take a few minutes to think about what happened this week — not just what you built, but how the process went.

---

## Your code

What changed about how you think about your project's structure after creating views.js and wiring events?

> After creating views.js, I realized that my does not have to all be in one file. Separating the rendering into view functions made app.js look a lot cleaner, and easier for me to keep track of. It helped me see that app.js should handle the logic and the events, where as views.js should handle what is displayed. 

---

## Your agent

Did preparing your AGENTS.md with modern JS rules before coding change the quality of what your agent produced? What did you notice?

> Actually, no it did not. My CoPilot ran out, and upgrading is not available at the moment. I used ChatGPT as an assistant in the meantime. It did follow my rules, specifically with things like querySelector, avoiding innerHTML, and using event listeners the right way. I also noticed that it started using cleaner patterns.

---

## The rules

Which modern JS rule from `docs/rules/` stuck with you most? What clicked about it?

> The rule in which using event delegation with '.closest()' stood out to me. At first it was confusing, but after using it, I was able to make more sense of it. I did not need to add event listeners on each card, but I could just listen on the parent and detect what was being clicked. It made the code a lot simpler. 

---

## Biggest win or biggest loss

What was the moment this week that affected you most — something that finally worked, or something that really frustrated you?

> The biggest win for me was getting the full flow to work. I was also able to have the cards not give any information before clicking on it. It was definitely confusing in the beginning, when I was moving the code, but when it all connected and worked, it felt rewarding. 

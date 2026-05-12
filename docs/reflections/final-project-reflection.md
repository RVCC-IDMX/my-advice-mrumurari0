# Final project — reflection

Write 2–3 sentences for each prompt. The reflection is where the learning gets named — give yourself room to think.

## 1. Pattern picked

Which pattern did you pick — A, B, or A+B? Why? If you considered one and rejected it, name what made it not the right fit for _your_ project.

I chose Pattern A because it fit my TV recommednation project better, and was the most realistic for me to be able to complete with the time I had. I liked that Groq could translate the natural language input into TMDb search params while it stell kept the Week 4 architecture mostly intact. I briefly considered A+B, but it felt a little complicated for my current project structure, and would needed a lot more work and testing. 


## 2. The hardest part

What was the hardest part of integrating Groq into your Week 4 architecture? Was it the prompt design, the schema shape, the front-end refusal handling, the latency, the cost, the unfamiliar SDK, or something else?

The hardest part for me was connected Groq's structured JSON output into the existing serverless function and the frontend flow. I also had a little struggle with the schema shape staying consistent, so that the views wouldn't break when the API response changed. 

## 3. The moderation floor

How did the four-layer moderation floor (system prompt, JSON mode, delimited input, length cap) shape your design? Did any layer surprise you — either by how cheap it was to add, or by how much it changed the user-facing behavior?

The moderation floor made me think about how AI input should be controlled before reaching the model. The input length cap was easier to add than I thought, but the JSON mode and strict schema changed the design a lot as it forced me to think more about predictable outputs. Wrapping the user input inside the delimiters also helped me in understanding prompt injection defenses and why structure matters with AI. 

## 4. UX polish

What UX rough edge did you smooth, and why that one? What did smoothing it teach you about the difference between "shipping a working app" and "shipping a finished one"?

A UX issue I focused on was fixing the loading and error states so that the app would not feel broken when it was waiting for live API data. I added loading messages with AI and safer error handling, so that users would understand what is happening and not just see a blank page. Ut taught me that a finished app is not just functioning, but also about making the experience understandable and reliable. 

## 5. Groq's strengths and weaknesses

What did Groq do well in your project? What did it not do well — wrong outputs, drift from the schema, latency, hallucinations, anything else? How would your design change if you had to use a slower or less capable model?

Groq worked really well for translating natural language requests into structured search params consistently and quickly. There were still moments where the outputs were not perfect. If i had to use a slower model, I would have probably made the prompt design simplified and rely heavily on filtering rules instead of depending on the AI interpretation. 

## 6. What you would do differently

If you had another week, what would you do differently? Not "what new feature would you add" — what would you change about your _approach_ if you could start over?

If I had another week, I would spend more time planning the frontend flow before adding Groq into the project. A lot of the time I had went into debugging interactions between the API, cache, and UI. I also had a busy week with graduation, so having another week would have slowed things down for me and helped me in a more smooth process. 

## 7. The optional ceiling (if attempted)

If you implemented either ceiling item (deterministic block-list, zeroth Groq call), what did you learn from it? If you did not, what would have to be true for it to be worth your time?

I did not impelement the optional ceiling items as I wanted to make sure the core requirements were done first. 
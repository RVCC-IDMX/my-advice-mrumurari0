# Week 2 reflection — DOM Fundamentals

## Reading the agent's code

- What was the hardest part of your code to understand? What made it click?
    The hardest part of my code to understand at first was the different JavaScript files and how they worked together. Once I found that data.js stores the data, app.js connects everything to the page and matching.js handles the filtering logic, it started to make a whoel lot of more sense to me. 
- Did you find anything in the agent's code that surprised you — something you would not have written yourself?
    I was surprised by how the agent's code was so organized, in comparison to how I would have written it. I probably would have started with everything on one file.

## Modernizing

- How many `getElementById` calls did you replace? Was the switch to `querySelector` straightforward?
    I did not need to replace any 'getElementById', my code was already using 'querySelector'.
- Did you find any `innerHTML` that was risky? How did you decide what to replace?
    No, I did not find any risky innerHTML being used. The only innerHTML in my project is being used to clear the results, which I saw was safe as it is not inserting any content based on user input. 

## DOM experiments

- Which experiment was your favorite? Why?
    My favorite experiment was changing text on the page because it gave immediate results that I could see.
- Which experiment was the hardest? What tripped you up?
    The hardest experiment was creating and appending new elements because it was more than just simple steps to change text. I had to understand createElement, textContent, and appendChild. 
- Did any experiment give you an idea for a feature you want to add to your site later?
    One of the experiments gave me the idea to add dynamic messages or recommendations based on what the user searches for.

## AGENTS.md

- What new rules or instructions did you add to AGENTS.md this week?
    I added instructions to choose querySelector over getElementById, and to use safe DOM methods instead of innerHTML when possible.
- Compare your "About this student" section from the start of the week to the end. What changed?
    At the beginning of this week, the section mostly reflected my earlier knowledge in JavaScript. By the end, it includes DOM manipulation skills, like selecting elements, changing text, or creating elements.

## Reflection

- What is one thing you understand about the DOM now that you did not understand before this week?
    One thing I understand now that I did not before is that the DOM is how JavaScript interacts with the structure of teh webpage. It lets me find elements and create new ones dynamically. It also allows me to change content.
- What would you do differently if you were starting this week's work over?
    I would start earlier and follwo the checklist so I do not miss  files that are required.

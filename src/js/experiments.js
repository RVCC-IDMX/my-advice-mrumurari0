// Experiment 1: I changed the heading text to practice selecting one element
// with querySelector and updating textContent.
const heading = document.querySelector('h1');
heading.textContent = 'My Advice — Personalized TV Show Recommendations';

// Experiment 2: I changed the button text to practice selecting a button
// and making a visible change in the interface.
const button = document.querySelector('button');
button.textContent = 'Search Shows';

// Experiment 3: I created a new paragraph element to practice createElement,
// textContent, and appendChild.
const experimentParagraph = document.createElement('p');
experimentParagraph.textContent =
  'Use the search bar to discover your next favorite show. Try searching for a genre, title, or rating!';
document.querySelector('main').appendChild(experimentParagraph);

// Experiment 4: I added a class to the results container to practice using
// classList and targeting an existing element in the DOM.
const results = document.querySelector('#results');
results.classList.add('experiment-results');

// Experiment 5: I changed the placeholder text in the input to practice
// updating an attribute-like property on a form element.
const input = document.querySelector('input');
input.placeholder = 'Type a show name here...';

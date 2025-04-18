# "Who Wants to be a Dharshillionaire?" - Design Document

## Overview
An interactive web presentation styled after "Who Wants to be a Millionaire" to romantically ask Dharshana to be my girlfriend. The presentation will feature memories and inside jokes as questions, leading up to the big question.

## Theme
- **Primary Color**: Maroon red #5B0A04
- **Accent Elements**: White carnations incorporated throughout the design
- **Font**: Clean, elegant, and easily readable

## Structure

### 1. Intro Slide
- Game show style introduction with the title "Who Wants to be a Dharshillionaire?"
- Subtle animations introducing the concept
- Background music: Start with Ed Sheeran's "Thinking Out Loud"
- Button to proceed to the first question

### 2. Question Slides (4-5 total)
- Each question will feature a memory or inside joke
- Four multiple-choice options, styled like the TV show
- All answers lead to progress (no way to lose)
- If wrong answer selected, show an "Are you sure?" prompt with a hint
- Questions to fill in:
  - Question 1: [Memory or inside joke 1]
  - Question 2: [Memory or inside joke 2]
  - Question 3: [Memory or inside joke 3]
  - Question 4: [Memory or inside joke 4]
  - Question 5: [Optional memory or inside joke 5]

### 3. Final "Winning" Slide
- Transition to "You're All I Want" by Cigarettes After Sex
- Glitter animation falling from the top of the screen
- White carnation graphics prominently featured
- The big question: "Will you be my girlfriend?"
- Simple Yes/No buttons (Yes button much larger than No)
- If "No" is hovered, it moves playfully away from the cursor
- When "Yes" is clicked, show a celebration animation

## Technical Implementation
- Framework: RevealJS for the slide presentation
- Animation libraries: GSAP for smooth animations
- Hosting: GitHub Pages
- Responsive design that works well on both desktop and mobile

## Assets Needed
- Background images featuring white carnations
- Photos of us together (to be placed in `/assets/images/`)
- Sound files for music (to be placed in `/assets/audio/`)
- Confetti/glitter animation for the winning slide

## Project Structure
```
/
├── index.html         # Main HTML file
├── assets/
│   ├── images/        # Photos and graphic elements
│   ├── audio/         # Music files
│   └── css/           # Stylesheets
├── js/
│   ├── main.js        # Main JavaScript file
│   └── animations.js  # Animations
└── README.md          # Project information
```

## Timeline
- Complete development today
- Deploy to GitHub Pages this evening
- Present to Dharshana tonight 
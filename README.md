# TRIVIA QUIZ

[![N|Solid](https://raw.githubusercontent.com/arjun1237/masai-sprint-3/master/resources/trivia%20logo.PNG)](https://nodesource.com/products/nsolid)

##### Trivia is a quiz app for all ages. There are wide variety of categories to chose from. The Trivia Quiz has been powered by OPEN Trivia DB API.

# Features!

### Main Page:

[![Main Page](https://raw.githubusercontent.com/arjun1237/masai-sprint-3/master/resources/get%20started.PNG)](https://nodesource.com/products/nsolid)

Main Page Contents:
  - The main page has GET started button. On clicking the button, it takes you to selection page (which by the way is the same page that appears on clicking the button)


### Main Page(selection):

[![Main Page(selection)](https://raw.githubusercontent.com/arjun1237/masai-sprint-3/master/resources/select%20cat.PNG)](https://nodesource.com/products/nsolid)

Main Page(selection) Contents:
  - The options for Type, Difficulty and no of questions are hard coded as the information was not available in API calls. But the Categories information are scrapped from Trivia API.
  - On selection of each item, and then clicking on the Start Quiz button, the page contacts the API for question based on the selection.
  - If the no of questions are below the selection amount, the page is redirected to error page.
  - The questions are then stored in the local storage to minimize the API calls. Then it is redirected to the quiz page.

### Quiz Page:

[![Quiz Page](https://raw.githubusercontent.com/arjun1237/masai-sprint-3/master/resources/question%20page.PNG)](https://nodesource.com/products/nsolid)

Quiz Page Contents:
  - The Quiz page contains one question. On clicking next and back buttons, respective questions are loaded. It takes care that the moment you are in 1st question, back button would not be of use.
  - On clicking the answer, the answers are stored in the local storage
  - Each question's levels are also displayed for the benefit of the user
  - Once all questions are attempted, the user can click on SUBMIT ALL button, which takes user to finish page for assessment fo the quiz

### Error Page:

[![Error Page](https://raw.githubusercontent.com/arjun1237/masai-sprint-3/master/resources/error.PNG)](https://nodesource.com/products/nsolid)

Error Page Contents:
  - Error page is displayed in case the number of questions are enough. This also happens if all the questions are exhausted based on session details.
  - On clicking start button, it triggers refresh button (its actions are described below)

### Finish Page:

[![Score on Finish Page](https://raw.githubusercontent.com/arjun1237/masai-sprint-3/master/resources/score.PNG)](https://nodesource.com/products/nsolid)

[![Score on Finish Page](https://raw.githubusercontent.com/arjun1237/masai-sprint-3/master/resources/answers.PNG)](https://nodesource.com/products/nsolid)

Finish Page Contents:
  - The finish page shows the final result of the quiz by user. The scores are displayed by percentage, total, as well as category wise score, with comprehensice analysis of the quiz
  - The same page also has a tabular data of the attempted questions - what were the right answers and what were the wrong ones.

### Refresh Button:

[![Refresh Button](https://raw.githubusercontent.com/arjun1237/masai-sprint-3/master/resources/refresh.PNG)](https://nodesource.com/products/nsolid)

Error Page Contents:
  - On clicking the refrsh button, which is common feature in all the pages, it delets all the local storage and takes you back to start of the page.

window.addEventListener('load', addEvents)

function Question(category, type, difficulty, question, choice, answer, attempt){
    this.category = category
    this.type = type
    this.difficulty = difficulty
    this.question = question
    this.choice = choice
    this.answer = answer
    this.attempt = attempt
}

function addEvents(){
    if(!JSON.parse(localStorage.getItem('question-avail')))
        loadQuestions()
    else
        displayQuestion()
}

function loadQuestions(){
    var sessionDetails = JSON.parse(localStorage.getItem('session_details'))
    var token = sessionDetails.token
    var type = sessionDetails.type
    var difficulty = sessionDetails.difficulty
    var questions = sessionDetails.questions
    var category = sessionDetails.category
    extractQuestions(token, type, difficulty, questions, category)
}

function extractQuestions(token, type, difficulty, questions, category){
    var xhr = new XMLHttpRequest()
    var url = "https://opentdb.com/api.php"
    var href = "?amount=" + questions
    if(difficulty !== "any"){
        href += "&difficulty=" + difficulty
    }
    if(type !== 'any'){
        href += "&type=" + type
    }
    if(category !== 'any'){
        href += "&category=" + category
    }
    href += "&token=" + token

    xhr.open("GET", url + href)
    xhr.send()
    xhr.onload = function(){
        var resp = JSON.parse(xhr.response)
        if(xhr.status === 200){
            var code = resp.response_code
            if(code === 0){
                storeQInLocal(resp.results)
            }
            else{
                console.log("Response Code: " + resp.response_code)
                console.log("Response Message: " + resp.response_message)
            }
        }
        else{
            console.log("Status: " + xhr.status)
        }
    }
    xhr.onerror = function(){
        console.log("Error")
    }
}

function storeQInLocal(resp){
    localStorage.setItem('question-avail', JSON.stringify(true))    
    localStorage.setItem('questions', JSON.stringify(prettigyQuestions(resp)))
}

function prettigyQuestions(data){
    var allQs = []
    for(var key in data){
        var q = data[key]
        var qObj = new Question()
        qObj.category = q.category
        qObj.type = q.type
        qObj.difficulty = q.difficulty
        qObj.question = q.question
        qObj.choice = [q.correct_answer, ...q.incorrect_answers]
        qObj.answer = q.correct_answer
        qObj.attempt = false
        allQs.push(qObj)
    }
    return allQs
}
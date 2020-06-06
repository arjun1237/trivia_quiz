window.addEventListener('load', addEvents)

function Question(category, type, difficulty, question, choice, answer, attempt){
    this.category = category
    this.type = type
    this.difficulty = difficulty
    this.question = question
    this.choice = choice
    this.answer = answer
    if(attempt === undefined)
        this.attempt = null
}

function addEvents(){
    if(!JSON.parse(localStorage.getItem('question-avail')))
        loadQuestions()
    else
        displayQuestion()
    
    
    document.getElementById('back-icon').addEventListener('click', function(){
        changeQuestion(false)
    })

    document.getElementById('next-icon').addEventListener('click', function(){
        changeQuestion(true)
    })

    document.getElementsByClassName('submit-all')[0].addEventListener('click', function(){
        localStorage.setItem('quiz-submit', JSON.stringify(true))
        location.href = 'finish.html'
    })
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
    href += "&encode=url3986"
    href += "&token=" + token

    xhr.open("GET", url + href)
    xhr.send()
    xhr.onload = function(){
        var resp = JSON.parse(xhr.response)
        if(xhr.status === 200){
            var code = resp.response_code
            if(code === 0){
                storeQInLocal(resp.results)
                displayQuestion()
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
    localStorage.setItem('questions', JSON.stringify(prettifyQuestions(resp)))
}

function prettifyQuestions(data){
    var allQs = []
    for(var key in data){
        var q = data[key]
        var qObj = new Question()
        qObj.category = unescape(q.category)
        qObj.type = unescape(q.type)
        qObj.difficulty = unescape(q.difficulty)
        qObj.question = unescape(q.question)
        qObj.choice = [q.correct_answer]

        var in_ans = q.incorrect_answers
        for(var i=0; i<in_ans.length; i++){
            qObj.choice.push(unescape(in_ans[i]))
        }
        qObj.answer = unescape(q.correct_answer)
        allQs.push(qObj)
    }
    return allQs
}

function displayQuestion(num){
    var qAvail = JSON.parse(localStorage.getItem('question-avail'))
    if(qAvail){
        var questions = JSON.parse(localStorage.getItem('questions'))
        if(num === undefined){
            for(var q in questions){
                if(questions[q].attempt === null){
                    parseQuestion(questions[q], Number(q)+1, questions.length)
                    return
                }
            }
            parseQuestion(questions[0], 1, questions.length)
        }
        else{
            if(questions[num-1] !== undefined && questions[num] !== null){
                parseQuestion(questions[num-1], Number(num), questions.length)
                return
            }
        }
        // localStorage.removeItem('question-avail')
        // location.href = 'finish.html'
    }
}

function parseQuestion(question, num, len){
    setQNumber(num, len)
    setLevel(question.difficulty)
    setQuestion(question, num)
}

function setQNumber(num, len){
    document.getElementById('q-num').textContent = num
    document.getElementById('q-total').textContent = len
}

function setLevel(level){
    var levelObj = document.getElementsByClassName('level-range')[0]
    levelObj.setAttribute('class', 'level-range ' + level)
}

function setQuestion(question, num){
    var qDiv = document.getElementsByClassName('q-main')[0]
    qDiv.textContent = ''
    qDiv.setAttribute('data-qNum', num)
    var p = document.createElement('p')
    p.innerHTML = unescape(question.question)
    qDiv.append(p)

    var choices = question.choice
    for(var i=0; i<choices.length; i++){
        var input = document.createElement('input')
        var label = document.createElement('label')
        var choice = unescape(choices[i])

        input.type = 'radio'
        input.name = 'q' + num
        input.value = choice
        label.textContent = choice

        if(choice === unescape(question.attempt)){
            input.checked = true
        }
        addChoices.call(choice, input, num)

        qDiv.append(input, label)
        if(choices.length-1 !== i){
            qDiv.append(document.createElement('br'))
        }
    }
}

function addChoices(input, num){
    var that = this
    that = Object.values(that).join('')
    input.addEventListener('click', function(){
        setAttempt(num, that)
    })
}

function changeQuestion(isNext){
    var qDiv = document.getElementsByClassName('q-main')[0]
    var qNum = Number(qDiv.getAttribute('data-qNum'))
    if(qNum === null || isNaN(qNum)){
        qNum = 0
    }
    if(isNext)
        qNum++
    else{
        if(qNum <= 1){
            return
        }
        qNum--
    }
    var qs = JSON.parse(localStorage.getItem('questions'))
    var len = qs.length
    if(qNum > len){
        qNum = 1
    }
    var q = qs[qNum-1]
    if(qNum !== undefined){
        parseQuestion(q, qNum, len)
    }
}

function setAttempt(num, answer){
    num = Number(num)
    if(num === null || isNaN(num)){
        return
    }
    var qs = JSON.parse(localStorage.getItem('questions'))
    qs[num-1].attempt = answer
    localStorage.setItem('questions', JSON.stringify(qs))
}
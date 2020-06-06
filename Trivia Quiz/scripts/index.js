window.addEventListener('load', addEvents)

function Session(token, questions, difficulty, type, category){
    this.token = token
    this.questions = questions
    this.difficulty = difficulty
    this.type = type
    this.category = category
}

function addEvents(){
    var startBtn = document.querySelector('.start h3')
    startBtn.addEventListener('click', selectPage)

    var quizBtn = document.getElementById('startQuiz')
    quizBtn.addEventListener('click', goToQuiz)
}

function goToQuiz(){
    event.preventDefault()
    var questions = document.getElementById('questions').value
    var type = document.getElementById('type').value
    var category = document.getElementById('category').value
    var difficulty = document.getElementById('difficulty').value

    storeSessionDetails(new Session(null, questions, difficulty, type, category))
}

function storeSessionDetails(sessionObj){
    var xhr = new XMLHttpRequest()
    var url = "https://opentdb.com/api_token.php?command=request"
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        var resp = JSON.parse(xhr.response)
        if(xhr.status === 200){
            if(resp.response_code === 0){
                sessionObj.token = resp.token
                localStorage.setItem('session_details', JSON.stringify(sessionObj))
                location.href = 'quiz.html'
                return
            }
            console.log("Response Code: " + resp.response_code)
        }
        else{
            console.log("Status: " + xhr.status)
        }
    }
    xhr.onerror = function(){
        console.log("error")
    }
}

function selectPage(){
    document.getElementsByClassName('start')[0].classList.add('display-none')
    document.getElementsByClassName('selection')[0].classList.remove('display-none')

    var selectionObj = selection()
    selectionObj.displayAll()
}

function selection(){
    var category = {
        'any' : 'ANY',
    }
    var difficulty = {
        'any' : 'ANY',
        'easy' : 'easy',
        'medium': 'medium',
        'hard' : 'hard'
    }
    var type = {
        'any' : 'ANY',
        'multiple' : "MULTIPLE CHOICE",
        'boolean' : "TRUE / FALSE"
    }
    var questions = {
        '50' : '50 (MAX)',
        '35' : '35',
        '25' : '25',
        '20' : '20',
    }

    function extractDisplayCategory(){
        extractCategory()
    }

    function extractCategory(){
        var xhr = new XMLHttpRequest()
        var url = "https://opentdb.com/api_category.php"
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = function(){
            var resp = JSON.parse(xhr.response)
            if(xhr.status === 200){
                if(resp.response_code === undefined){
                    displayCategory(resp)
                    return
                }
                console.log("Response Code: " + resp.response_code)
            }
            else{
                console.log("Status: " + xhr.status)
            }
        }
        xhr.onerror = function(){
            console.log("error")
        }
    }

    function displayCategory(resp){
        var cat = document.getElementById('category')
        var respCats = resp.trivia_categories
        for(var i=0; i<respCats.length; i++){
            var id = respCats[i].id
            var name = respCats[i].name
            category[id] = name
        }
        append(cat, category, 'any')
    }

    function displayType(){
        var parent = document.getElementById('type')
        append(parent, type, 'any')
    }

    function displayQuestions(){
        var parent = document.getElementById('questions')
        append(parent, questions, '20')
    }

    function displayDifficulty(){
        var parent = document.getElementById('difficulty')
        append(parent, difficulty, 'any')
    }

    function displayAll(){
        extractDisplayCategory()
        displayType()
        displayQuestions()
        displayDifficulty()
    }

    function append(parent, childElemenst, selected){
        for(var key in childElemenst){
            var option = document.createElement('option')
            option.value = key
            option.textContent = childElemenst[key]
            if(key === selected){
                option.selected = true
            }
            parent.append(option)
        }
    }

    return {extractDisplayCategory, displayDifficulty, displayType, displayQuestions, displayAll}
}


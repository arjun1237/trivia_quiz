window.addEventListener('load', addEvents)

function addEvents(){
    checkSession()

    var refresh = document.getElementById('refresh')
    refresh.addEventListener('click', function(){
        deleteSession()
        goToHome()
    })
}

function checkSession(){
    var session = JSON.parse(localStorage.getItem('session_details'))
    var submit = JSON.parse(localStorage.getItem('quiz-submit'))
    var href = location.href
    if(session === null){
        if(!href.endsWith('index.html')){
            deleteSession()
            location.href = 'index.html'
        }
    }
    else{
        if(session.token === undefined){
            deleteSession()
            if(!href.endsWith('index.html')){
                location.href = 'index.html'
            }
        }
        else if(submit){
            if(!href.endsWith('finish.html')){
                location.href = 'finish.html'
            }
        }
        else{
            if(!href.endsWith('quiz.html')){
                location.href = 'quiz.html'
            }
        }
    }
}

function deleteSession(){
    localStorage.removeItem('session_details')
    localStorage.removeItem('question-avail')
    localStorage.removeItem('questions')
    localStorage.removeItem('quiz-submit')
}

function goToHome(){
    location.href = 'index.html'
}
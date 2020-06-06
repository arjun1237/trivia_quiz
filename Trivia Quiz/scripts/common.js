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
    var href = location.href
    if(session === null){
        if(!href.endsWith('index.html')){
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
        else{
            if(!href.endsWith('quiz.html')){
                location.href = 'quiz.html'
            }
        }
    }
}

function deleteSession(){
    localStorage.removeItem('session_details')
}

function goToHome(){
    location.href = 'index.html'
}
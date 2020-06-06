window.addEventListener('load', addEvents)

function addEvents(){
    loadQuestions()
}

function loadQuestions(){
    var sessionDetails = JSON.parse(localStorage.getItem('session_details'))
    // sessionDetails.token    
}
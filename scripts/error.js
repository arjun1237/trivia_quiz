window.addEventListener('load', addEvents)

function addEvents(){
    document.getElementsByClassName('button')[0].addEventListener('click', function(){
        document.getElementById('refresh').click()
    })
}
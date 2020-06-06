window.addEventListener('load', addEvents)

function addEvents(){
    var startBtn = document.querySelector('.start h3')
    startBtn.addEventListener('click', selectPage)
}

function selectPage(){
    document.getElementsByClassName('start')[0].classList.add('display-none')
    document.getElementsByClassName('selection')[0].classList.remove('display-none')

    
}


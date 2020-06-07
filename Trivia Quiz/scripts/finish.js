window.addEventListener('load', addEvents)

function addEvents(){
    var score = analyzeScore()
    var percent = Math.round(score.score / score.len * 100)
    displayPercent(percent)
    displayCategoryWise(score.catScore)
    displayResult(score.score, score.len)
    displayQuestions()
}

function displayResult(score, total){
    document.getElementById('total-score').textContent = score + "/" + total
}

function displayPercent(percent){
    document.getElementById('g-percent').textContent = percent + "%"
    var gMiddle = document.getElementById('g-mid-height')
    gMiddle.style.height = (300 - percent/100*300) + 'px'
}

function displayCategoryWise(catScore){
    var catWiseObj = document.getElementById('cat-wise-score')
    for(var key in catScore){
        var li = document.createElement('li')
        var scoreObj = catScore[key]
        li.textContent = key + ": " + scoreObj.score + "/" + scoreObj.total
        catWiseObj.append(li)
    }
}

function displayQuestions(){
    var qs = JSON.parse(localStorage.getItem('questions'))
    var tbody = document.getElementById('q-table-tbody')
    for(var key in qs){
        var q = qs[key]
        var tr = document.createElement('tr')

        var numObj = document.createElement('td')
        var catObj = document.createElement('td')
        var qObj = document.createElement('td')
        var difObj = document.createElement('td')
        var rightObj = document.createElement('td')
        var ansObj = document.createElement('td')

        numObj.textContent = Number(key) + 1
        catObj.textContent = unescape(q.category)
        qObj.textContent = unescape(q.question)
        difObj.textContent = unescape(q.difficulty)
        rightObj.textContent = unescape(q.answer)
        if(q.attempt !== null){
            ansObj.textContent = unescape(q.attempt)
            if(unescape(q.attempt) === unescape(q.answer)){
                ansObj.classList.add('right-ans-color')
            }
            else{
                ansObj.classList.add('wrong-ans-color')
            }
        }
        else{
            ansObj.textContent = "-- NOT ATTEMPTED --"
            ansObj.classList.add('no-attempt-color')
        }
        tr.append(numObj, catObj, qObj, difObj, rightObj, ansObj)
        tbody.append(tr)
    }
}

function analyzeScore(){
    var qs = JSON.parse(localStorage.getItem('questions'))
    var catScore = {}
    var len = qs.length
    var score = 0
    for(var key in qs){
        var qObj = qs[key]
        var cat = unescape(qObj.category)
        var attempt = qObj.attempt
        var answer = qObj.answer

        if(unescape(attempt) === unescape(answer)){
            score++
            if(catScore.hasOwnProperty(cat)){
                catScore[cat].score++
                catScore[cat].total++
            }
            else{
                catScore[cat] = {
                    'score' : 1,
                    'total' : 1
                }
            }
        }
        else{
            if(catScore.hasOwnProperty(cat)){
                catScore[cat].total++
            }
            else{
                catScore[cat] = {
                    'score' : 0,
                    'total' : 1
                }
            }
        }
    }
    return {score, catScore, len}
}
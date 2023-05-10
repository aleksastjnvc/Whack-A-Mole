const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const timeEl = document.querySelector('.timer span')
const startBtn = document.getElementById('start-button')

let score = 0
let timeLeft = 60;

const sound = new Audio("assets/smash.mp3")

function run(){
    const i = Math.floor(Math.random() * holes.length)

    //current
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'assets/mole.png'

    img.addEventListener('click', () => {
        score += 10
        sound.play()
        scoreEl.textContent = score
        img.src = 'assets/mole-whacked.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
    })

    //current is given the img
    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1500)
}

startBtn.addEventListener('click', () => {
run()
startBtn.style.display = 'none'
const countdown = setInterval(() => {
    timeLeft--
    timeEl.textContent = timeLeft
    
    if (timeLeft === 0 || score === 200) {
        clearInterval(countdown)
        alert('Game over! Your score is' + ' ' + score)
        timeLeft = 60
        timeEl.textContent = timeLeft
        startBtn.style.display = 'block'
        score = 0
        scoreEl.textContent = score
        location.reload()
    }
    
}, 1000)

})

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})
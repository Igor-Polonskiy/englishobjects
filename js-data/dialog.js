(() => {
    let cocoWords = [{
            id: 1,
            say: 'Hello!'
        },
        {
            id: 1,
            say: 'How are you?'
        },
        {
            id: 1,
            say: 'See you soon!'
        },
    ]

    let studentAnswers = [
        ['Hi!', 'Good morning!', 'Good evening'],
        ['Great! And you?', 'I’m fine!'],
        ['Nice to meet you!']
    ]

    let task = document.querySelector('.dialog')
    let dialog = task.querySelector('.dialog_text')
    let answers = task.querySelector('.dialog_answers')
    let dialog_blure = task.querySelector('.dialog_blure1')
    let finish_blure = task.querySelector('.dialog_blure2')
    let startbtn = task.querySelector('.dialog_start')

    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');


    let stage = 0

    function start() {
        dialog_blure.style.display = 'none'
        let phrase = document.createElement('div')
        phrase.classList.add('dialog_Parrot');
        phrase.innerHTML = `<p>${cocoWords[stage].say}</p>`
        dialog.append(phrase)
        setTimeout(() => {
            phrase.style.left = 0
            studentAnswers[stage].forEach(item => {
                let answer = document.createElement('p');
                answer.classList.add('dialog_answer')
                answer.innerText = item
                answers.append(answer)
            })
        }, 100)
    }

    startbtn.addEventListener('click', start)
    task.addEventListener('click', (e) => {
        if (e.target.classList.contains('dialog_answer')) {
            let phrase = document.createElement('div')
            phrase.classList.add('dialog_User');
            phrase.innerHTML = `<p>${e.target.innerText}</p>`
            dialog.append(phrase)
            setTimeout(() => phrase.style.right = 0, 10)
            stage++
            answers.innerHTML = ''
            if (stage <= 2) {
                let phrase1 = document.createElement('div')
                phrase1.classList.add('dialog_Parrot');
                phrase1.innerHTML = `<p>${cocoWords[stage].say}</p>`
                setTimeout(() => dialog.append(phrase1), 1000)

                setTimeout(() => {
                    phrase1.style.left = 0
                    studentAnswers[stage].forEach(item => {
                        let answer = document.createElement('p');
                        answer.classList.add('dialog_answer')
                        answer.innerText = item
                        answers.append(answer)
                    })
                }, 1100)
            }
            if (stage === 3) {
                setTimeout(() => finish_blure.style.display = 'flex', 1500)

            }
        }
    })

    drop.addEventListener('click', resetPuzzle);

    function resetPuzzle() {
        dialog.innerHTML = ''
        answers.innerHTML = ''
        stage = 0
        dialog_blure.style.display = 'flex'
        finish_blure.style.display = 'none'
    }

})()
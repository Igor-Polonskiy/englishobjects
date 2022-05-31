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
    let parrot = task.querySelector('.dialog_parrot_image')

    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');


    let stage = 0
    parrot.addEventListener('click', scaleImage)

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

    drop.addEventListener('click', resetTask);

    function resetTask() {
        dialog.innerHTML = ''
        answers.innerHTML = ''
        stage = 0
        dialog_blure.style.display = 'flex'
        finish_blure.style.display = 'none'
    }

    function scaleImage(e) {
        item = e.target
        let modal = document.createElement('div')
        modal.style.position = 'fixed'
        modal.style.left = 0
        modal.style.top = 0
        modal.style.bottom = 0
        modal.style.right = 0
        modal.style.background = "rgba(0,0,0,0.5)"
        modal.style.zIndex = 100
        modal.style.display = 'flex'
        modal.style.justifyContent = 'center'
        modal.style.flexDirection = 'column'
        modal.style.alignItems = 'center'
        let div = document.createElement('div')
        let img = document.createElement('img')
        div.style.width = '50%';
        div.style.height = '80%';
        div.style.textAlign = 'center';
        img.src = item.src;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.src = item.src
            //img.src = item.style.backgroundImage.slice(5, -2)
        div.append(img)
        modal.append(div)
        let close = document.createElement('div')
        close.style.width = '25px'
        close.style.height = '25px'
        close.style.marginLeft = 'calc(100% - 25px)'
        close.style.cursor = 'pointer'
        close.style.backgroundImage = `url(Images_18/common/close.png)`
        div.append(close)
        document.body.style.overflow = 'hidden'
        modal.addEventListener('click', () => {
            modal.remove()
            document.body.style.overflow = 'visible'
        })
        document.body.append(modal)
    }

})()
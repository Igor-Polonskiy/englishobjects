(() => {

    let pictures = [{
            id: 1,
            src: 'Images_18/singleChoice/Eng-2021_2_1_3_21.png'
        },
        {
            id: 2,
            src: 'Images_18/singleChoice/Eng-2021_2_1_3_22.png'
        },
        {
            id: 3,
            src: 'Images_18/singleChoice/Eng-2021_2_1_3_23.png'
        }
    ]

    let task = document.querySelector('.singleChoice')
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;
    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');

    const winVar = '3'

    let pictureItems = null
    let finishAnswer = null
    let startAction = false

    insertAnswers(pictures)
    task.addEventListener('click', (e) => {
        if (e.target.classList.contains('singleChoice_pic')) {
            pictureItems.forEach(item => {
                if (finishAnswer) {
                    finishAnswer.classList.remove('singleChoice_pic_active')
                    finishAnswer.classList.remove('singleChoice_green')
                    finishAnswer.classList.remove('singleChoice_red')
                }
                item.classList.remove('singleChoice_pic_active')
            })
            e.target.classList.add('singleChoice_pic_active')
            finishAnswer = e.target
            startAction = true;
            checkButton_classList_changer();
        }
    })


    function shuffleArr(arr) {
        return arr.sort(() => Math.random() - 0.5)
    }

    function insertAnswers(arr) {
        shuffleArr(pictures).forEach(item => {
            let picture = document.createElement('div')
            picture.classList.add('singleChoice_pic')
            picture.style.backgroundImage = `url(${item.src})`
            picture.style.position = 'relative'
            picture.setAttribute('data-id', item.id)
            let expand = document.createElement('div')
            expand.style.width = '25px'
            expand.style.height = '25px'
            expand.style.backgroundImage = `url(Images_18//singleChoice/expand.svg)`
            expand.style.backgroundSize = 'contain'
            expand.style.position = 'absolute'
            expand.style.top = '5px'
            expand.style.right = '5px'
            expand.title = 'развернуть'
            expand.addEventListener('click', () => scaleImage(item.src))
            picture.append(expand)
            task.append(picture)
        })
        pictureItems = task.querySelectorAll('.singleChoice_pic')
    }

    drop.addEventListener('click', resetTask);

    function checkButton_classList_changer() {
        if (check_your.classList.contains('check_your_active') && !startAction) {
            check_your.classList.remove('check_your_active');
            check_your.removeEventListener('click', checkTask);
        } else if (!check_your.classList.contains('check_your_active') && startAction) {
            check_your.removeEventListener('click', checkTask);
            check_your.classList.add('check_your_active');
            check_your.addEventListener('click', checkTask);
        }
    }

    function checkTask() {
        if (finishAnswer) {
            finishAnswer.classList.remove('singleChoice_pic_active')

            if (finishAnswer.getAttribute('data-id') === winVar) {
                finishAnswer.classList.add('singleChoice_green')
                feedBackChanger('win');

            } else {
                finishAnswer.classList.add('singleChoice_red')
                feedBackChanger('lose');

            }
        }


    }

    function resetTask() {
        startAction = false;
        checkButton_classList_changer();
        feedBackChanger('reset')
        if (finishAnswer) {
            finishAnswer.classList.remove('singleChoice_pic_active')
            finishAnswer.classList.remove('singleChoice_green')
            finishAnswer.classList.remove('singleChoice_red')
        }
        finishAnswer = null
    }

    function feedBackChanger(state) {
        if (startAction && state === 'win' || state === 'lose') {
            result.classList.add(`result_${state}`);
        } else {
            result.classList.remove(`result_win`);
            result.classList.remove(`result_lose`);
        }
    }

    function scaleImage(e) {
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
        img.src = e
            // img.src = item.style.backgroundImage.slice(5, -2)
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
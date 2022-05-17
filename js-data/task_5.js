(() => {
    let items = [{
            id: 1,
            src: 'Images_18/Eng-2021_2_9_1_17.png',
            caption: 'How many trees are there in the park?',
            answer: 'twelve'
        },
        {
            id: 2,
            src: 'Images_18/Eng-2021_2_9_1_18.png',
            caption: 'How many cars are there in the street?',
            answer: 'five'
        },
        {
            id: 3,
            src: 'Images_18/Eng-2021_2_9_1_19.png',
            caption: 'How many swings are there in the playground? ',
            answer: 'three'
        },
        {
            id: 4,
            src: 'Images_18/Eng-2021_2_9_1_20.png',
            caption: 'How many children are there in the swimming pool? ',
            answer: 'ten'
        },
        {
            id: 5,
            src: 'Images_18/Eng-2021_2_9_1_21.png',
            caption: 'How many shops are there in the street? ',
            answer: 'four'
        },
        {
            id: 6,
            src: 'Images_18/1.png',
            caption: 'Well done!',

        }
    ]

    let task = document.querySelector('.task_5')
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;
    const drop = headCheck.querySelector('.drop');

    let slide = 0

    drop.addEventListener('click', () => (renderItem(items[0])))

    function renderItem(item) {
        task.innerHTML = ''
        let img = document.createElement('div')
        img.style.backgroundImage = `url(${item.src})`
        img.classList.add('task5_img')
        let caption = document.createElement('p')
        caption.innerText = item.caption
        task.append(img, caption)
        if (+item.id < items.length) {
            let form = document.createElement('form')
            let input = document.createElement('input')
            input.type = 'text'
            input.setAttribute('data-answer', `${item.answer}`)
            input.addEventListener('input', changeColor)
            let btn = document.createElement('button')
            btn.innerText = '✔'
            form.append(input, btn)
            form.addEventListener('submit', inputCheck)
            task.append(form)
            if (item.id !== 1) {
                task.querySelector('input').focus()
            }
        }

    }

    function changeColor(e) {
        e.target.style.border = '2px solid rgb(36, 179, 230)'
    }

    function inputCheck(e) {
        e.preventDefault()
        let input = e.target.querySelector('input')
        if (input.value === input.getAttribute('data-answer')) {
            // task.innerHTML = ''
            slide++
            if (slide < items.length) {
                renderItem(items[slide])
            } else task.innerText = 'Well done! '
        } else input.style.border = '2px solid red';
    }

    renderItem(items[0])


})()
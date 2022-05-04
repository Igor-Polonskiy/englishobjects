(() => {
    let items = [{
            id: 1,
            src: 'Images_1/Eng-2021_2_9_1_17.png',
            caption: 'How many trees are there in the park?',
            answer: 'twelve'
        },
        {
            id: 2,
            src: 'Images_1/Eng-2021_2_9_1_18.png',
            caption: 'How many cars are there in the street?',
            answer: 'five'
        },
        {
            id: 3,
            src: 'Images_1/Eng-2021_2_9_1_19.png',
            caption: 'How many swings are there in the playground? ',
            answer: 'three'
        },
        {
            id: 4,
            src: 'Images_1/Eng-2021_2_9_1_20.png',
            caption: 'How many children are there in the swimming pool? ',
            answer: 'ten'
        },
        {
            id: 5,
            src: 'Images_1/Eng-2021_2_9_1_21.png',
            caption: 'How many shops are there in the street? ',
            answer: 'four'
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
        let input = document.createElement('input')
        input.type = 'text'
        input.setAttribute('data-answer', `${item.answer}`)
        input.addEventListener('change', inputCheck)
        task.append(img, caption, input)
        if (item.id !== 1) {
            task.querySelector('input').focus()
        }
    }

    function inputCheck(e) {
        if (e.target.value === e.target.getAttribute('data-answer')) {
            // task.innerHTML = ''
            slide++
            if (slide < items.length) {
                renderItem(items[slide])
            } else task.innerText = 'Well done! '
        }
    }

    renderItem(items[0])


})()
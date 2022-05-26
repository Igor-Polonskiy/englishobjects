(() => {
    let data = [{
            picture: 'Images_18/letters/cat.png',
            word: 'cat',
            answer: 'a',
            letters: ['c', '', 't']
        },
        {
            picture: 'Images_18/letters/black.png',
            word: 'black',
            answer: 'a',
            letters: ['b', 'l', '', 'c', 'k']
        },
        {
            picture: 'Images_18/letters/ten.png',
            word: 'ten',
            answer: 'e',
            letters: ['t', '', 'n']
        },
        {
            picture: 'Images_18/letters/red.png',
            word: 'red',
            answer: 'e',
            letters: ['r', '', 'd']
        },
        {
            picture: 'Images_18/letters/dad.png',
            word: 'dad',
            answer: 'a',
            letters: ['d', '', 'd']
        },
        {
            picture: 'Images_18/letters/hen.png',
            word: 'hen',
            answer: 'e',
            letters: ['h', '', 'n']
        }, {
            picture: 'Images_18/letters/hat.png',
            word: 'hat',
            answer: 'a',
            letters: ['h', '', 't']
        }, {
            picture: 'Images_18/letters/help.png',
            word: 'help',
            answer: 'e',
            letters: ['h', '', 'l', 'p']
        }
    ]

    let dragLetters = ['a', 'e']

    let task = document.querySelector('.leters_task')
    let picture = task.querySelector('.letters_task_img')
    let dropZone = task.querySelector('.letters_task_drop')
    let dragZone = task.querySelector('.letters_task_drag')
    let dropField
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');
    let dataOrder = 0

    function start(item) {
        picture.innerHTML = ''
        dropZone.innerHTML = ''
        let img = document.createElement('img')
        img.src = item.picture
        img.style.height = '350px'
        img.addEventListener('click', scaleImage)
        picture.append(img)
        item.letters.forEach(i => {
            let letter = document.createElement('div')
            letter.classList.add('letters_task_letter')
            if (i.length) {
                letter.innerText = i
            } else {
                letter.setAttribute('data-letter', item.answer)
                letter.classList.add('letters_task_dropItem')
                dropField = letter
            }
            dropZone.append(letter)
        })

    }
    start(data[dataOrder])

    function filldragZone() {
        dragLetters.forEach(item => {
            let letter = document.createElement('div')
            letter.classList.add('letters_task_dragitem')
            letter.innerText = item
            letter.setAttribute('data-letter', item)
            dragZone.append(letter)
        })
    }

    filldragZone()

    task.addEventListener('pointerdown', (e) => {
        if (e.target.classList.contains('letters_task_dragitem') || e.target.classList.contains('letters_task_dragitem_dropped')) {
            mouseDown(e)
        }
    });

    let draggingItem;
    let elemBelow;

    function mouseDown(event) {
        if (event.button === 2) return;
        if (event.target.classList.contains('letters_task_dragitem')) {
            draggingItem = document.createElement('div')
            draggingItem.classList.add('letters_task_dragitem_dropped')
            draggingItem.innerText = event.target.getAttribute('data-letter')


            //draggingItem = event.target;
            draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
            draggingItem.style.cursor = 'grabbing';
            draggingItem.style.position = 'absolute';
            draggingItem.style.zIndex = 100;

            document.body.append(draggingItem);
            shiftX = event.clientX - event.target.getBoundingClientRect().left;
            shiftY = event.clientY - event.target.getBoundingClientRect().top;
            moveAt(event.pageX, event.pageY);
        }
        if (event.target.classList.contains('letters_task_dragitem_dropped')) {
            draggingItem = event.target

            draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
            draggingItem.style.cursor = "grabbing";

            draggingItem.style.position = "absolute";
            draggingItem.style.zIndex = 100;

            shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
            shiftY = event.clientY - draggingItem.getBoundingClientRect().top;
            moveAt(event.pageX, event.pageY);
            document.body.append(draggingItem);
        }



        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
        let limits = {
            top: interakt_zadanie.offsetTop,
            right: interakt_zadanie.offsetWidth + interakt_zadanie.offsetLeft,
            bottom: interakt_zadanie.offsetHeight + interakt_zadanie.offsetTop,
            left: interakt_zadanie.offsetLeft
        };

        function moveAt(pageX, pageY) {
            draggingItem.style.left = pageX - shiftX + 'px';
            draggingItem.style.top = pageY - shiftY + 'px';
        }

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        let clickWithoutMove = true;

        function onMouseMove(event) {
            let newLocation = {
                x: limits.left,
                y: limits.top
            };
            if (event.pageX > limits.right) {
                newLocation.x = limits.right;
            } else if (event.pageX > limits.left) {
                newLocation.x = event.pageX;
            }
            if (event.pageY > limits.bottom) {
                newLocation.y = limits.bottom;
            } else if (event.pageY > limits.top) {
                newLocation.y = event.pageY;
            }

            clickWithoutMove = false
            moveAt(newLocation.x, newLocation.y);

            if (event.path[0] !== draggingItem) {
                window.addEventListener('pointerup', moveOut);
            }
            draggingItem.style.visibility = 'hidden'
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);

            draggingItem.style.visibility = 'visible';
            if (!elemBelow) return;

            // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)

            // let currentDroppable = null;

            // let droppableBelow = elemBelow.closest('.droppable'); // БЕРЁМ НУЖНЫЙ БЛОК 

            // if (currentDroppable != droppableBelow) {
            //     if (currentDroppable) { 
            // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
            //         leaveDroppable(currentDroppable);
            //     }
            //     currentDroppable = droppableBelow;
            // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
            //     if (currentDroppable) {
            //         enterDroppable(currentDroppable);
            //     }
            // }
        }

        // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
        function enterDroppable(currentDroppable) {
            // currentDroppable
        }
        // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
        function leaveDroppable(currentDroppable) {
            // currentDroppable
        }
        document.addEventListener('pointermove', onMouseMove);


        // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
        function moveOut(e) {
            const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
            if (elemUnderPount !== draggingItem) {
                draggingItem.remove();
            }
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }
        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.onpointerup = function() {
            draggingItem.style.cursor = 'grab';
            startAction = true;
            //checkButton_classList_changer();
            if (clickWithoutMove) {
                changeStylesAndAppend(dragZone, draggingItem);
            }
            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            //
            if (elemBelow.classList.contains('letters_task_dropItem') && elemBelow.children.length === 0) {
                elemBelow = elemBelow.closest(".letters_task_dropItem")
                changeStylesAndAppend(elemBelow, draggingItem);
                checkAnswer()
            } else {
                draggingItem.remove()
            }
        };

        function changeStylesAndAppend(dropPlace, draggingElem) {
            draggingElem.style.position = 'relative ';
            draggingElem.style.zIndex = null;
            draggingElem.style.top = null;
            draggingElem.style.left = null;
            dropPlace.appendChild(draggingElem);
        }
    };

    drop.addEventListener('click', resetTask);

    function resetTask() {
        dataOrder = 0
        start(data[dataOrder])
        dragZone.innerHTML = ''
        filldragZone()
    }

    function checkAnswer() {
        draggingItem.style.color = 'white'
        if (draggingItem.innerText === dropField.getAttribute('data-letter')) {
            draggingItem.style.background = 'green'
            dataOrder++
            setTimeout(() => {
                if (dataOrder < data.length) {
                    start(data[dataOrder])
                } else {
                    dragZone.innerHTML = ''
                    dropZone.innerHTML = ''
                    picture.innerHTML = ''
                    let img = document.createElement('img')
                    img.src = 'Images_18/1.png'
                    img.style.height = '420px'
                    picture.append(img)
                    dragZone.innerHTML = 'WELL DONE'
                }
            }, 1000)


        } else draggingItem.style.background = 'red'
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
        close.style.backgroundImage = `url(Images_18/close.png)`
        div.append(close)
        document.body.style.overflow = 'hidden'
        modal.addEventListener('click', () => {
            modal.remove()
            document.body.style.overflow = 'visible'
        })
        document.body.append(modal)
    }


    //drop.addEventListener('click', resetPuzzle);
})()
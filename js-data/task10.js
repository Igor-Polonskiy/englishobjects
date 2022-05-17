(() => {

    const task = document.querySelector('.task_10')
    const dropzone = task.querySelector('.task_10_dropzone')
    const dragzone = task.querySelector('.task_10_dragzone')
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;
    const audios = task.querySelectorAll('.task_10_audio')

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');

    let startAction = false;
    let dropitems


    const pictures = [{
            id: 1,
            data: 'Images_18/soundToPic/Eng-2021_2_1_1_19.png',

        },
        {
            id: 2,
            data: 'Images_18/soundToPic/Eng-2021_2_1_1_20.png',

        },
        {
            id: 3,
            data: 'Images_18/soundToPic/Eng-2021_2_1_1_21.png',

        },
        {
            id: 4,
            data: 'Images_18/soundToPic/Eng-2021_2_1_1_22.png',

        },
        {
            id: 5,
            data: 'Images_18/soundToPic/Eng-2021_2_1_1_23.png',

        },
        {
            id: 6,
            data: 'Images_18/soundToPic/Eng-2021_2_1_1_24.png',

        }
    ]


    insertPictures(pictures)
    insertAudio(pictures)

    function shuffleArr(arr) {
        return arr.sort(() => Math.random() - 0.5)
    }

    function insertPictures(arr) {
        shuffleArr(arr).forEach(item => {
            let picture = document.createElement('div')
            picture.classList.add('task_10_drop')
            picture.style.backgroundImage = `url(${item.data})`
            picture.setAttribute('data-id', item.id)
            dropzone.append(picture)
        })
        dropitems = task.querySelectorAll('.task_10_drop')

    }

    function insertAudio(arr) {
        shuffleArr(arr).forEach(item => {
            let audio = document.createElement('div')
            audio.classList.add('task_10_dragitem')
            audio.setAttribute('data-id', item.id)
            let btn = document.createElement('button')
            btn.style.backgroundImage = `url(Images_18/soundToPic/sound.png)`
            audio.append(btn)
            audio.addEventListener('click', (e) => {
                audios[item.id - 1].addEventListener('ended', (event) => {
                    e.target.classList.remove('task_10_active')
                })
                audios[item.id - 1].play()
                e.target.classList.add('task_10_active')
            })
            dragzone.append(audio)
        })
    }


    let draggingItem;
    let elemBelow;


    task.addEventListener('pointerdown', draggingListner);

    function draggingListner(e) {
        if (e.target.classList.contains('task_10_dragitem')) {
            mouseDown(e)
        }
    }



    function mouseDown(event) {
        if (event.button === 2) return;
        draggingItem = event.target;
        draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
        draggingItem.style.cursor = 'grabbing';
        let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
        let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
        let limits = {
            top: interakt_zadanie.offsetTop,
            right: interakt_zadanie.offsetWidth + interakt_zadanie.offsetLeft,
            bottom: interakt_zadanie.offsetHeight + interakt_zadanie.offsetTop,
            left: interakt_zadanie.offsetLeft
        };

        draggingItem.style.position = 'absolute';
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);

        moveAt(event.pageX, event.pageY);

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
        /*function moveOut(e) {
            changeStylesAndAppend(dragzone, draggingItem);
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }*/
        function moveOut(e) {
            const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
            if (elemUnderPount !== draggingItem) {
                changeStylesAndAppend(dragzone, draggingItem);
            }
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.onpointerup = function() {
            draggingItem.style.cursor = 'grab';
            startAction = true;
            checkButton_classList_changer();
            if (clickWithoutMove) {
                //changeStylesAndAppend(dragzone, draggingItem);
            }
            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (elemBelow.classList.contains('task_10_drop') && elemBelow.children.length === 0) {
                changeStylesAndAppend(elemBelow, draggingItem);
            } else {
                changeStylesAndAppend(dragzone, draggingItem);
            }
            draggingItem = null
        };


        function changeStylesAndAppend(dropPlace, draggingElem) {
            draggingElem.style.position = 'relative ';
            draggingElem.style.zIndex = null;
            draggingElem.style.top = null;
            draggingElem.style.left = null;
            dropPlace.appendChild(draggingElem);
        }
    };

    drop.addEventListener('click', resetPuzzle);

    function checkButton_classList_changer() {

        if (check_your.classList.contains('check_your_active') && !startAction) {
            check_your.classList.remove('check_your_active');
            check_your.removeEventListener('click', checkPuzzle);
        } else if (!check_your.classList.contains('check_your_active') && startAction) {
            check_your.removeEventListener('click', checkPuzzle);
            check_your.classList.add('check_your_active');
            check_your.addEventListener('click', checkPuzzle);
        }
    }


    function resetPuzzle() {
        startAction = false;
        checkButton_classList_changer();
        feedBackChanger('reset')

        dropitems.forEach(item => {
            if (item.children.length) {
                [...item.children][0].classList.remove('task_10_right');
                [...item.children][0].classList.remove('task_10_wrong');
                dragzone.append([...item.children][0])

            }
        })
        task.addEventListener('pointerdown', draggingListner);
    }

    function checkPuzzle() {
        let winVar = 0
        dropitems.forEach(item => {
            if (item.children.length) {
                if ([...item.children][0].getAttribute('data-id') === item.getAttribute('data-id')) {
                    winVar++;
                    [...item.children][0].classList.add('task_10_right')
                } else [...item.children][0].classList.add('task_10_wrong')
            }
        })

        if (winVar === pictures.length) {
            feedBackChanger('win');
        } else {
            feedBackChanger('lose');
        }
        draggingItem = null
        task.removeEventListener('pointerdown', draggingListner);
    }

    function feedBackChanger(state) {
        if (startAction && state === 'win' || state === 'lose') {
            result.classList.add(`result_${state}`);
        } else {
            result.classList.remove(`result_win`);
            result.classList.remove(`result_lose`);
        }
    }

})()
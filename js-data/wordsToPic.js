(() => {

    const task = document.querySelector('.wordsToPic')
    const dropzone = task.querySelector('.wordsToPic_dropzone')
    const dragzone = task.querySelector('.wordsToPic_dragzone')
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');

    let startAction = false;
    let dropitems


    const pictures = [{
            id: 1,
            data: 'Images_18/wordsToPic/Eng-2021_2_1_1_25.png',
            text: 'I am Alex'
        },
        {
            id: 2,
            data: 'Images_18/wordsToPic/Eng-2021_2_1_1_26.png',
            text: 'You are Kate'
        },
        {
            id: 3,
            data: 'Images_18/wordsToPic/Eng-2021_2_1_1_27.png',
            text: 'He is Nick'
        },
        {
            id: 4,
            data: 'Images_18/wordsToPic/Eng-2021_2_1_1_28.png',
            text: 'She is Lara'
        },
        {
            id: 5,
            data: 'Images_18/wordsToPic/Eng-2021_2_1_1_29.png',
            text: 'It is Coco'
        },
        {
            id: 6,
            data: 'Images_18/wordsToPic/Eng-2021_2_1_1_30.png',
            text: 'They are Kiwi and Coco'
        },
        {
            id: 7,
            data: 'Images_18/wordsToPic/Eng-2021_2_1_1_31.png',
            text: 'We are Alex and Nick'
        }
    ]


    insertPictures(pictures)
    insertWords(pictures)

    function shuffleArr(arr) {
        return arr.sort(() => Math.random() - 0.5)
    }

    function insertPictures(arr) {
        shuffleArr(arr).forEach(item => {
            let picture = document.createElement('div')
            picture.classList.add('wordsToPic_drop')
            picture.style.backgroundImage = `url(${item.data})`
            picture.setAttribute('data-id', item.id)
            picture.addEventListener('click', scaleImage)
            dropzone.append(picture)
        })
        dropitems = task.querySelectorAll('.wordsToPic_drop')

    }

    function insertWords(arr) {
        shuffleArr(arr).forEach(item => {
            let word = document.createElement('div')
            word.classList.add('wordsToPic_dragitem')
            word.innerText = item.text
            word.setAttribute('data-id', item.id)
            dragzone.append(word)
        })
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
        //img.src = item.src
        img.src = item.style.backgroundImage.slice(5, -2)
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

    function stopClick(e) {
        if (e.target.classList.contains('wordsToPic_dragitem')) {
            e.stopPropagation();
            e.preventDefault();
        }

    }


    let draggingItem;
    let elemBelow;


    task.addEventListener('pointerdown', draggingListner);

    function draggingListner(e) {
        if (e.target.classList.contains('wordsToPic_dragitem')) {
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

            if (!event.path.includes(draggingItem)) {
                window.addEventListener('pointerup', moveOut);
            }
            if (event.path.includes(draggingItem)) {
                window.removeEventListener('pointerup', moveOut);
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
        /* function moveOut(e) {
             changeStylesAndAppend(dragzone, draggingItem);
             window.removeEventListener('pointerup', moveOut);
             document.removeEventListener('pointermove', onMouseMove);
         }*/
        function moveOut(e) {
            smoothTransition(draggingItem)
            setTimeout(() => changeStylesAndAppend(dragzone, draggingItem), 1000)
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.onpointerup = function() {

            draggingItem.style.cursor = 'grab';
            startAction = true;
            checkButton_classList_changer();
            if (clickWithoutMove) {
                // changeStylesAndAppend(dropzone, draggingItem);

            }
            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (elemBelow.classList.contains('wordsToPic_drop') && elemBelow.children.length === 0) {
                changeStylesAndAppend(elemBelow, draggingItem);
            } else {
                task.removeEventListener('pointerdown', draggingListner);
                smoothTransition(draggingItem)
                setTimeout(() => {
                    changeStylesAndAppend(dragzone, draggingItem)
                    task.addEventListener('pointerdown', draggingListner);
                }, 1000)

            }
        };

        function smoothTransition(draggingElem) {
            document.body.style.pointerEvents = 'none'
            let coordX,
                coordY

            draggingElem.classList.add('dragTransition')
            coordX = dragzone.getBoundingClientRect().left + dragzone.getBoundingClientRect().width / 2
            coordY = dragzone.getBoundingClientRect().top + dragzone.getBoundingClientRect().height / 2 + window.pageYOffset
            draggingElem.style.left = `${coordX}px`
            draggingElem.style.top = `${coordY}px`
            setTimeout(() => {
                draggingElem.classList.remove('dragTransition')
                document.body.style.pointerEvents = 'auto'

            }, 1000)
        }

        function changeStylesAndAppend(dropPlace, draggingElem) {
            draggingElem.style.position = 'relative ';
            draggingElem.style.zIndex = null;
            draggingElem.style.top = null;
            draggingElem.style.left = null;
            dropPlace.appendChild(draggingElem);
        }
    };

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


    function resetTask() {
        startAction = false;
        checkButton_classList_changer();
        feedBackChanger('reset')

        dropitems.forEach(item => {
            if (item.children.length) {
                [...item.children][0].classList.remove('wordsToPic_right');
                [...item.children][0].classList.remove('wordsToPic_wrong');
                dragzone.append([...item.children][0])

            }
        })
        task.addEventListener('pointerdown', draggingListner);
    }

    function checkTask() {
        let winVar = 0
        dropitems.forEach(item => {
            if (item.children.length) {
                if ([...item.children][0].getAttribute('data-id') === item.getAttribute('data-id')) {
                    winVar++;
                    [...item.children][0].classList.add('wordsToPic_right')
                } else [...item.children][0].classList.add('wordsToPic_wrong')
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
(() => {

    let drops

    const task = document.querySelector('.task4_wrapper')
    const answersWrapper = task.querySelector('.task4_answers')
    const dropsWrapper = task.querySelector('.task4_dropsWrapper')
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');
    const wordPazzle_letters = document.querySelector('.task4_answers');
    let startAction = false;


    const answers = [{
            id: 1,
            data: 'Images_18/task_1.png'
        },
        {
            id: 2,
            data: 'Images_18/task_2.png'
        },
        {
            id: 3,
            data: 'Images_18/task_3.png'
        },
        {
            id: 4,
            data: 'Images_18/task_4.png'
        }
    ]

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
            //img.src = item.src
        img.src = item.style.backgroundImage.slice(5, -2)
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

    function setAnswers() {
        answers.sort(() => Math.random() - 0.5).forEach(item => {
            let answer = document.createElement('div')
            answer.classList.add('task4_answer')
            answer.style.backgroundImage = `url(${item.data})`
            answer.setAttribute('data-number', item.id)
            answersWrapper.append(answer)

        })
    }

    function setDropItems() {
        answers.forEach(item => {
            let dropItem = document.createElement('div')
            dropItem.classList.add('task4_drop_item')
            dropItem.setAttribute('data-number', item.id)
            let bg = document.createElement('div')
            bg.classList.add('task4_bg')
            bg.innerText = item.id
            dropItem.append(bg)
            dropsWrapper.append(dropItem)
        })
        drops = document.querySelectorAll('.task4_drop_item')
    }
    setDropItems()
    setAnswers()

    let draggingItem;
    let elemBelow;


    task.addEventListener('pointerdown', (e) => {
        if (e.target.classList.contains('task4_answer')) {
            mouseDown(e)
        }
    });



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
        /* if (!event.path.includes(draggingItem)) {
             window.addEventListener('pointerup', moveOut)
         }
         if (event.path.includes(draggingItem)) {
             window.removeEventListener('pointerup', moveOut)
         }*/

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
                changeStylesAndAppend(wordPazzle_letters, draggingItem);
            }
            //changeStylesAndAppend(wordPazzle_letters, draggingItem);
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.onpointerup = function() {
            draggingItem.style.cursor = 'grab';
            startAction = true;
            checkButton_classList_changer();
            if (clickWithoutMove) {
                changeStylesAndAppend(wordPazzle_letters, draggingItem);
                setTimeout(() => scaleImage(event), 0)
            }
            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (elemBelow.classList.contains('task4_drop_item')) {
                changeStylesAndAppend(elemBelow, draggingItem);
            } else {
                changeStylesAndAppend(wordPazzle_letters, draggingItem);
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
        drops.forEach(item => {
            if (item.children.length > 1) {
                [...item.children][1].remove()
            }
        })

        for (let i = (answersWrapper.childNodes.length - 1); i > 0; i--) {
            answersWrapper.childNodes[i].remove()
        }
        setAnswers()
    }

    function checkPuzzle() {
        let winVar = 0
        drops.forEach(item => {
            if (item.children.length > 1) {
                if ([...item.children][1].getAttribute('data-number') === item.getAttribute('data-number')) {
                    winVar++
                }
            }
        })

        if (winVar === 4) {
            feedBackChanger('win');
        } else {
            feedBackChanger('lose');
        }
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
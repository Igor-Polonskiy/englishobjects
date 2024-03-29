(() => {
    let pictures = [{
            id: 1,
            src: 'Images_18/sandwich2/sandwich2.png',

        },
        {
            id: 2,
            src: 'Images_18/sandwich2/sandwich3.png'
        },
        {
            id: 3,
            src: 'Images_18/sandwich2/sandwich4.png'
        },
        {
            id: 4,
            src: 'Images_18/sandwich2/sandwich5.png'
        },
        {
            id: 5,
            src: 'Images_18/sandwich2/sandwich6.png'
        },
        {
            id: 6,
            src: 'Images_18/sandwich2/sandwich7.png'
        },
        {
            id: 7,
            src: 'Images_18/sandwich2/sandwich8.png'

        },
        {
            id: 8,
            src: 'Images_18/sandwich2/sandwich9.png'

        },
        {
            id: 9,
            src: 'Images_18/sandwich2/sandwich10.png'

        }
    ]
    let task = document.querySelector('.sandwich2')
    let dragField = task.querySelector('.sandwich2_drag')
    let dropField = task.querySelector('.sandwich2_drop')
    dropField.style.backgroundImage = `url('Images_18/sandwich2/sandwich1.png')`
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;
    let prev = task.querySelector('.sandwich2_btn_prev')
    let next = task.querySelector('.sandwich2_btn_next')
    let audio = task.querySelector('.sandwich2_audio')

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');
    let shiftX
    let shiftY
    let offset = 0
    let startAction = false;

    pictures.forEach(item => {
        let pic = document.createElement('div')
        pic.classList.add('sandwich2_pic')
        pic.style.backgroundImage = `url(${item.src})`
        pic.setAttribute('data-id', item.id)
        dragField.append(pic)
    })

    let draggingItem;
    let elemBelow;

    let scrollWidth = dragField.scrollWidth
    let sliderWhidth = task.querySelector('.sandwich2_slider').clientWidth

    task.addEventListener('pointerdown', (e) => {
        if (e.target.classList.contains('sandwich2_pic') || e.target.classList.contains('sandwich2_pic_dropped')) {
            mouseDown(e)
        }
    });

    next.addEventListener('click', () => {

        if (offset < scrollWidth - sliderWhidth) {
            offset += 150
            dragField.style.left = `-${offset}px`
        }

    })
    prev.addEventListener('click', () => {

        if (offset > 0) {
            offset -= 150
            dragField.style.left = `-${offset}px`
        }

    })

    function mouseDown(event) {
        if (event.button === 2) return;
        if (event.target.classList.contains('sandwich2_pic')) {
            draggingItem = document.createElement('div')
            draggingItem.classList.add('sandwich2_pic_dropped')
            draggingItem.style.backgroundImage = `url(${pictures[+event.target.getAttribute('data-id')-1].src})`


            //draggingItem = event.target;
            draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
            draggingItem.style.cursor = 'grabbing';
            draggingItem.style.position = 'absolute';
            draggingItem.style.zIndex = 100;

            dropField.append(draggingItem);
            shiftX = event.clientX - event.target.getBoundingClientRect().left;
            shiftY = event.clientY - event.target.getBoundingClientRect().top;
            moveAt(event.pageX, event.pageY);
        }
        if (event.target.classList.contains('sandwich2_pic_dropped')) {
            draggingItem = event.target

            draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
            draggingItem.style.cursor = "grabbing";

            draggingItem.style.position = "absolute";
            draggingItem.style.zIndex = 100;

            shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
            shiftY = event.clientY - draggingItem.getBoundingClientRect().top;
            moveAt(event.pageX, event.pageY);
            dropField.append(draggingItem);
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
        task.addEventListener('pointerup', onpointerup)

        // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
        /* function moveOut(e) {
             draggingItem.remove()
             window.removeEventListener('pointerup', moveOut);
             document.removeEventListener('pointermove', onMouseMove);
         }*/
        function moveOut(e) {
            const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
            if (elemUnderPount !== draggingItem) {
                draggingItem.remove();
            }
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        function onpointerup() {
            draggingItem.style.cursor = 'grab';
            startAction = true;
            checkButton_classList_changer();
            if (clickWithoutMove) {
                //changeStylesAndAppend(dragField, draggingItem);
                // draggingItem.remove()
            }

            document.removeEventListener('pointermove', onMouseMove);
            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            //
            if (elemBelow) {
                if (elemBelow.closest(".sandwich2_drop") || elemBelow.classList.contains('sandwich2_drop')) {
                    elemBelow = elemBelow.closest(".sandwich2_drop")

                    changeStylesAndAppend(elemBelow, draggingItem);

                } else {
                    draggingItem.remove()
                }
            } else {
                draggingItem.remove()
            }
            task.removeEventListener('pointerup', onpointerup)
        }
        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        /*draggingItem.onpointerup = function() {
            console.log('onpointerup')
            draggingItem.style.cursor = 'grab';
            startAction = true;
            checkButton_classList_changer();
            if (clickWithoutMove) {
                changeStylesAndAppend(dragField, draggingItem);
            }
            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            //
            if (elemBelow.closest(".sandwich2_drop") || elemBelow.classList.contains('sandwich2_drop')) {
                elemBelow = elemBelow.closest(".sandwich2_drop")
                changeStylesAndAppend(elemBelow, draggingItem);
            } else {
                draggingItem.remove()
            }
        };*/

        function changeStylesAndAppend(dropPlace, draggingElem) {
            if (dropPlace === dropField) {
                dropPlace.appendChild(draggingElem);
            } else if (dropPlace === dragField) {
                draggingElem.style.position = 'relative ';
                draggingElem.style.zIndex = null;
                draggingElem.style.top = null;
                draggingElem.style.left = null;
                dropPlace.appendChild(draggingElem);
            }

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

    function checkTask() {

        let win = document.createElement('div')
        win.innerText = `A vegetable Bunny Sandwich is ready! 
        Enjoy your healthy meal!`
        win.style.textAlign = 'center'
        win.style.color = 'white'
        win.style.position = 'absolute'
        win.style.fontSize = '30px'
        win.style.padding = '200px 0'
        win.style.boxSizing = 'border-box'
        win.style.width = `${interakt_zadanie.clientWidth}px`
        win.style.height = `${interakt_zadanie.clientHeight}px`
        win.style.background = 'rgba(0,0,0,0.5)'
        win.style.zIndex = 1000
        audio.play()

        dropField.append(win)
        startAction = false
        checkButton_classList_changer();
    }

    function resetTask() {
        startAction = false;
        checkButton_classList_changer();

        dropField.innerHTML = ''

    }


})()
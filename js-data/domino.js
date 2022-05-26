(() => {
    let dominos = [
        [1, 1],
        [1, 2],
        [1, 3]
    ]

    let task = document.querySelector('.domino_game')
    let domino_field = task.querySelector('.domino_drop')
    let dragzone = task.querySelector('.domino_drag')

    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');



    for (let i = 0; i < 100; i++) {
        let cell = document.createElement('div')
        cell.classList.add('domino_cell')
        cell.setAttribute('data-number', i + 1)
        domino_field.append(cell)
    }

    /*  domino_field.addEventListener('mouseover', (e) => {
          if (e.target.classList.contains('domino_cell')) {
              let sibling = e.target.nextSibling
              e.target.style.border = '1px solid yellow'
              sibling.style.border = '1px solid yellow'
              e.target.addEventListener('mouseleave', (e) => {
                  if (e.target.classList.contains('domino_cell')) {
                      e.target.style.border = '1px solid lightblue'
                      sibling.style.border = '1px solid lightblue'
                  }
              })
          }
      })*/


    let draggingItem;
    let elemBelow;


    task.addEventListener('pointerdown', draggingListner);

    function draggingListner(e) {
        if (e.target.classList.contains('domino_half')) {
            mouseDown(e)
        }
    }



    function mouseDown(event) {
        if (event.button === 2) return;
        draggingItem = event.target.parentElement;
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
        function moveOut(e) {
            if (draggingItem) {
                changeStylesAndAppend(dragzone, draggingItem);
            }
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }
        /*  function moveOut(e) {
             const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
             if (elemUnderPount !== draggingItem) {
                 changeStylesAndAppend(dragzone, draggingItem);
             }
             window.removeEventListener('pointerup', moveOut);
             document.removeEventListener('pointermove', onMouseMove);
         }*/

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.onpointerup = function() {
            if (draggingItem) {
                draggingItem.style.cursor = 'grab';
                startAction = true;
                // checkButton_classList_changer();
                if (clickWithoutMove) {
                    //changeStylesAndAppend(dragzone, draggingItem);

                }
                document.removeEventListener('pointermove', onMouseMove);

                // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
                if (elemBelow.classList.contains('domino_cell') && elemBelow.children.length === 0) {

                    changeStylesAndAppend(elemBelow, draggingItem);
                } else {
                    changeStylesAndAppend(dragzone, draggingItem);
                }
            }

            draggingItem = null
        };


        function changeStylesAndAppend(dropPlace, draggingElem) {
            if (dropPlace !== dragzone) {
                draggingElem.style.top = ` ${dropPlace.getBoundingClientRect().top  - domino_field.getBoundingClientRect().top}px`;
                draggingElem.style.left = `${dropPlace.getBoundingClientRect().left - domino_field.getBoundingClientRect().left}px`;
                dropPlace.parentElement.appendChild(draggingElem);
            } else {
                draggingElem.style.position = 'relative ';
                draggingElem.style.zIndex = null;
                draggingElem.style.top = null;
                draggingElem.style.left = null;
                dropPlace.appendChild(draggingElem);
            }
        }
    };



})()
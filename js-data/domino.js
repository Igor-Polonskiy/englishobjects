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
    let dominoTop
    let dominoCount = 0


    task.addEventListener('pointerdown', draggingListner);

    function draggingListner(e) {
        if (e.target.classList.contains('domino_half')) {
            if (e.target.parentElement.children[0] === e.target) {
                dominoTop = true
            } else dominoTop = false
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
        draggingItem.style.visibility = 'hidden'
        elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        draggingItem.style.visibility = 'visible';

        let clickWithoutMove = true;

        deleteBuzy(elemBelow)

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
                if (elemBelow.classList.contains('domino_cell')) {

                    changeStylesAndAppend(elemBelow, draggingItem);
                } else {
                    changeStylesAndAppend(dragzone, draggingItem);
                }
            }

            draggingItem = null
        };


        function changeStylesAndAppend(dropPlace, draggingElem) {
            function returnDragingelement() {
                draggingElem.style.position = 'relative ';
                draggingElem.style.zIndex = null;
                draggingElem.style.top = null;
                draggingElem.style.left = null;
                dragzone.append(draggingElem);
            }

            if (dropPlace !== dragzone) {
                if (dominoTop) {
                    if (draggingElem.classList.contains('domino_horizon') && dropPlace.nextElementSibling.classList.contains('cell_buzy')) {
                        returnDragingelement()
                        return
                    } else if (!draggingElem.classList.contains('domino_horizon') && domino_field.children[9 + +dropPlace.getAttribute('data-number')].classList.contains('cell_buzy')) {
                        returnDragingelement()
                        return
                    } else {
                        draggingElem.style.top = ` ${dropPlace.getBoundingClientRect().top  - domino_field.getBoundingClientRect().top}px`;
                        draggingElem.style.left = `${dropPlace.getBoundingClientRect().left - domino_field.getBoundingClientRect().left}px`;
                        if (draggingElem.classList.contains('domino_horizon')) {
                            if (dominoCount == 0) {
                                dropPlace.classList.add('cell_buzy')
                                dropPlace.nextElementSibling.classList.add('cell_buzy')

                                let data1 = draggingElem.children[0].getAttribute('data-answer')
                                dropPlace.previousElementSibling.setAttribute('data-answer', data1)
                                dropPlace.previousElementSibling.innerText = data1
                                domino_field.children[-11 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data1)
                                domino_field.children[-11 + +dropPlace.getAttribute('data-number')].innerText = data1
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data1)
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].innerText = data1
                                let data2 = draggingElem.children[1].getAttribute('data-answer')
                                dropPlace.nextElementSibling.nextElementSibling.setAttribute('data-answer', data2)
                                dropPlace.nextElementSibling.nextElementSibling.innerText = data2
                                domino_field.children[-11 + +dropPlace.nextElementSibling.getAttribute('data-number')].setAttribute('data-answer', data2)
                                domino_field.children[-11 + +dropPlace.nextElementSibling.getAttribute('data-number')].innerText = data2
                                domino_field.children[9 + +dropPlace.nextElementSibling.getAttribute('data-number')].setAttribute('data-answer', data2)
                                domino_field.children[9 + +dropPlace.nextElementSibling.getAttribute('data-number')].innerText = data2
                            } else if (((dropPlace.getAttribute('data-answer') === draggingElem.children[0].getAttribute('data-answer')) ||
                                    dropPlace.nextElementSibling.getAttribute('data-answer') === draggingElem.children[1].getAttribute('data-answer')) &&
                                dominoCount > 0) {
                                dropPlace.classList.add('cell_buzy')
                                dropPlace.nextElementSibling.classList.add('cell_buzy')

                                let data1 = draggingElem.children[0].getAttribute('data-answer')
                                dropPlace.previousElementSibling.setAttribute('data-answer', data1)
                                dropPlace.previousElementSibling.innerText = data1
                                domino_field.children[-11 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data1)
                                domino_field.children[-11 + +dropPlace.getAttribute('data-number')].innerText = data1
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data1)
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].innerText = data1
                                let data2 = draggingElem.children[1].getAttribute('data-answer')
                                dropPlace.nextElementSibling.nextElementSibling.setAttribute('data-answer', data2)
                                dropPlace.nextElementSibling.nextElementSibling.innerText = data2
                                domino_field.children[-11 + +dropPlace.nextElementSibling.getAttribute('data-number')].setAttribute('data-answer', data2)
                                domino_field.children[-11 + +dropPlace.nextElementSibling.getAttribute('data-number')].innerText = data2
                                domino_field.children[9 + +dropPlace.nextElementSibling.getAttribute('data-number')].setAttribute('data-answer', data2)
                                domino_field.children[9 + +dropPlace.nextElementSibling.getAttribute('data-number')].innerText = data2
                            } else {
                                returnDragingelement()
                                return
                            }


                        } else {
                            if ((dropPlace.getAttribute('data-answer') === draggingElem.children[0].getAttribute('data-answer')) ||
                                domino_field.children[9 + +dropPlace.nextElementSibling.getAttribute('data-number')].getAttribute('data-answer') === draggingElem.children[1].getAttribute('data-answer')) {
                                dropPlace.classList.add('cell_buzy')
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].classList.add('cell_buzy')

                                let data1 = draggingElem.children[0].getAttribute('data-answer')
                                dropPlace.previousElementSibling.setAttribute('data-answer', data1)
                                dropPlace.previousElementSibling.innerText = data1
                                domino_field.children[-11 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data1)
                                domino_field.children[-11 + +dropPlace.getAttribute('data-number')].innerText = data1
                                dropPlace.nextElementSibling.setAttribute('data-answer', data1)
                                dropPlace.nextElementSibling.innerText = data1
                                let data2 = draggingElem.children[1].getAttribute('data-answer')
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].nextElementSibling.setAttribute('data-answer', data2)
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].nextElementSibling.innerText = data2
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].previousElementSibling.setAttribute('data-answer', data2)
                                domino_field.children[9 + +dropPlace.getAttribute('data-number')].previousElementSibling.innerText = data2
                                domino_field.children[19 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data2)
                                domino_field.children[19 + +dropPlace.getAttribute('data-number')].innerText = data2
                            }

                        }
                    }

                } else if (!dominoTop) {
                    if (draggingElem.classList.contains('domino_horizon') && dropPlace.previousElementSibling.classList.contains('cell_buzy')) {
                        returnDragingelement()
                        return
                    } else if (!draggingElem.classList.contains('domino_horizon') && domino_field.children[-11 + +dropPlace.getAttribute('data-number')].classList.contains('cell_buzy')) {
                        returnDragingelement()
                        return
                    }

                    if (draggingElem.classList.contains('domino_horizon')) {
                        draggingElem.style.top = ` ${dropPlace.getBoundingClientRect().top  - domino_field.getBoundingClientRect().top}px`;
                        draggingElem.style.left = `${dropPlace.getBoundingClientRect().left-50 - domino_field.getBoundingClientRect().left}px`;
                        dropPlace.classList.add('cell_buzy')
                        dropPlace.previousElementSibling.classList.add('cell_buzy')

                        let data1 = draggingElem.children[1].getAttribute('data-answer')
                        dropPlace.nextElementSibling.setAttribute('data-answer', data1)
                        dropPlace.nextElementSibling.innerText = data1
                        domino_field.children[-11 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data1)
                        domino_field.children[-11 + +dropPlace.getAttribute('data-number')].innerText = data1
                        domino_field.children[9 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data1)
                        domino_field.children[9 + +dropPlace.getAttribute('data-number')].innerText = data1
                        let data2 = draggingElem.children[0].getAttribute('data-answer')
                        dropPlace.previousElementSibling.previousElementSibling.setAttribute('data-answer', data2)
                        dropPlace.previousElementSibling.previousElementSibling.innerText = data2
                        domino_field.children[-11 + +dropPlace.previousElementSibling.getAttribute('data-number')].setAttribute('data-answer', data2)
                        domino_field.children[-11 + +dropPlace.previousElementSibling.getAttribute('data-number')].innerText = data2
                        domino_field.children[9 + +dropPlace.previousElementSibling.getAttribute('data-number')].setAttribute('data-answer', data2)
                        domino_field.children[9 + +dropPlace.previousElementSibling.getAttribute('data-number')].innerText = data2



                    } else {
                        draggingElem.style.top = ` ${dropPlace.getBoundingClientRect().top-50  - domino_field.getBoundingClientRect().top}px`;
                        draggingElem.style.left = `${dropPlace.getBoundingClientRect().left - domino_field.getBoundingClientRect().left}px`;
                        dropPlace.classList.add('cell_buzy')
                        domino_field.children[-11 + +dropPlace.getAttribute('data-number')].classList.add('cell_buzy')

                        let data1 = draggingElem.children[1].getAttribute('data-answer')
                        dropPlace.previousElementSibling.setAttribute('data-answer', data1)
                        dropPlace.previousElementSibling.innerText = data1
                        domino_field.children[9 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data1)
                        domino_field.children[9 + +dropPlace.getAttribute('data-number')].innerText = data1
                        dropPlace.nextElementSibling.setAttribute('data-answer', data1)
                        dropPlace.nextElementSibling.innerText = data1
                        let data2 = draggingElem.children[0].getAttribute('data-answer')
                        domino_field.children[-11 + +dropPlace.getAttribute('data-number')].nextElementSibling.setAttribute('data-answer', data2)
                        domino_field.children[-11 + +dropPlace.getAttribute('data-number')].nextElementSibling.innerText = data2
                        domino_field.children[-11 + +dropPlace.getAttribute('data-number')].previousElementSibling.setAttribute('data-answer', data2)
                        domino_field.children[-11 + +dropPlace.getAttribute('data-number')].previousElementSibling.innerText = data2
                        domino_field.children[-21 + +dropPlace.getAttribute('data-number')].setAttribute('data-answer', data2)
                        domino_field.children[-21 + +dropPlace.getAttribute('data-number')].innerText = data2

                    }

                }
                dropPlace.parentElement.appendChild(draggingElem);
                dominoCount++
            } else {
                returnDragingelement()
            }
        }
    };

    function deleteBuzy(elemBelow) {
        if (elemBelow.classList.contains('domino_cell')) {
            elemBelow.classList.remove('cell_buzy')
            if (dominoTop) {
                if (draggingItem.classList.contains('domino_horizon')) {
                    elemBelow.nextElementSibling.classList.remove('cell_buzy')
                } else {
                    domino_field.children[9 + +elemBelow.getAttribute('data-number')].classList.remove('cell_buzy')
                }
            } else {
                if (draggingItem.classList.contains('domino_horizon')) {
                    elemBelow.previousElementSibling.classList.remove('cell_buzy')
                } else {
                    domino_field.children[-11 + +elemBelow.getAttribute('data-number')].classList.remove('cell_buzy')
                }
            }
        }

    }



})()
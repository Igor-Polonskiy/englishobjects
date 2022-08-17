(() => {

    /*все вхождения figure_A... заменить A на нужную букву*/
    let task = document.querySelector('.figure_wrapper')
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;
    const drop = headCheck.querySelector('.drop');
    const figurePicture = task.querySelector('.figure_picture')

    let c = task.querySelector('.figure_A_canvas');
    let cx = c.getContext('2d');
    let mousedown = false;

    let pixels = null;
    let figurepixels = null;
    /*заменить Aa на нужные буквы*/
    //let figure = '◻'// △ ◯ ▭ ◻ ◇
    /**/
    /*при необходимости подобрать нужный шрифт*/
    //let font = 'Titillium Web'
    //cx.font = `bold 310px ${font}`;
    /**/
    let isfigureComplete = false
    /*заменть цвет закраски буквы на нужный в формате rgb*/
    /*использовать любой кроме 
    (255,255,255)-цвет буквы и
    (240, 100, 0)-цвет обводки
    (значение 255 нельзя применять ни к одому из трех каналов цвета)*/
    let r = 220
    let g = 0
    let b = 0
    /**/
    let drowColor = `rgb(${r}, ${g}, ${b})`

    function setupCanvas() {
        c.height = 400;
        c.width = 500;
        cx.lineCap = 'round';
        // cx.font = `bold 500px ${font}`;
        //cx.fillStyle = 'rgb(255, 255, 255)';
        //cx.textBaseline = 'middle';

        drawfigure();
        pixels = cx.getImageData(0, 0, c.width, c.height);
        figurepixels = getpixelamount(255, 255, 255);
        console.log(figurepixels)
    }

    function drawfigure() {
        let centerX = c.width / 2;
        let centerY = c.height / 2;
        /* cx.fillStyle = color;
         
         cx.fillText(figure, centerx, centery);
         drawfigureBorder(figure)*/
        cx.beginPath();
        cx.arc(centerX, centerY, 110, 0, 2 * Math.PI, false);
        cx.fillStyle = `rgb(${r}, ${g}, ${b + 1})`;
        cx.fill();
        cx.closePath();

        cx.beginPath();
        cx.arc(centerX, centerY, 100, 0, 2 * Math.PI, false);
        cx.fillStyle = 'white';
        cx.fill();
        cx.lineWidth = 5;
        cx.closePath();


        cx.beginPath();
        cx.arc(centerX, centerY, 80, 0, 2 * Math.PI, false);
        cx.fillStyle = `rgb(${r}, ${g}, ${b + 1})`;
        cx.fill();
        cx.closePath();


        cx.beginPath();
        cx.arc(centerX, centerY, 70, 0, 2 * Math.PI, false);
        cx.fillStyle = 'rgb(255, 255, 254)';
        cx.fill();
        cx.closePath();


    };

    function drawfigureBorder(figure) {
        let centerx = (c.width - cx.measureText(figure).width) / 2;
        let centery = c.height / 2;
        cx.lineWidth = 5;
        cx.lineCap = 'round'
        cx.strokeStyle = 'rgb(240, 100, 0)';
        cx.strokeText(figure, centerx, centery);
    };

    function showerror(error) {
        mousedown = false;
        alert(error);
    };

    function paint(x, y) {
        let colour = getpixelcolour(x, y);

        if (colour.r !== 255 || colour.g !== 255 || colour.b !== 255) {

            mousedown = false;
        } else {
            cx.strokeStyle = drowColor;

            cx.lineWidth = 24;
            cx.beginPath();
            cx.lineTo(x, y);
            cx.stroke();
            cx.beginPath();
            cx.stroke();

            cx.beginPath();
            cx.moveTo(x, y)

            //drawfigureBorder(figure)
        }
    };

    function getpixelcolour(x, y) {
        let index = ((y * (pixels.width * 4)) + (x * 4));
        return {
            r: pixels.data[index],
            g: pixels.data[index + 1],
            b: pixels.data[index + 2],
            a: pixels.data[index + 3]
        };
    }

    function getpixelamount(r, g, b) {
        let pixels = cx.getImageData(0, 0, c.width, c.height);
        let all = pixels.data.length;
        let amount = 0;
        for (i = 0; i < all; i += 4) {
            if (pixels.data[i] === r &&
                pixels.data[i + 1] === g &&
                pixels.data[i + 2] === b) {
                amount++;
            }
        }
        return amount;
    };

    function pixelthreshold() {

        if (getpixelamount(r, g, b) / figurepixels > 1.2) {
            if (!isfigureComplete) {
                /*pulse()*/
                alert('molodec')
                isfigureComplete = true
            }
        }
    };

    function pulse() {
        let size = 310



        let timerId1 = setInterval(() => {
            size += 2
            cx.clearRect(0, 0, c.width, c.height)
            cx.font = `bold ${size}px ${font}`;
            drawfigure(figure, drowColor)
        }, 40);

        setTimeout(() => {
            clearInterval(timerId1);
            let timerId2 = setInterval(() => {
                size -= 2
                cx.clearRect(0, 0, c.width, c.height)
                cx.font = `bold ${size}px ${font}`;
                drawfigure(figure, drowColor)

            }, 40);
            setTimeout(() => {
                clearInterval(timerId2);
            }, 1000);
        }, 1000);

        isfigureComplete = true
    }

    function onmousedown(ev) {
        mousedown = true;
        ev.preventDefault();

    };

    function onmouseup(ev) {
        mousedown = false;
        pixelthreshold();
        ev.preventDefault();
        cx.beginPath();
    };

    function onmousemove(ev) {
        if (mousedown) {
            //var area = ev.width * ev.height;
            let x = Math.round(ev.clientX - c.getBoundingClientRect().x);
            let y = Math.round(ev.clientY - c.getBoundingClientRect().y);
            paint(x, y);
        }
    };

    function reloadTask() {
        isfigureComplete = false
        setupCanvas();
    }

    drop.addEventListener('click', reloadTask)

    c.addEventListener('pointerdown', onmousedown, false);
    c.addEventListener('pointerup', onmouseup, false);
    c.addEventListener('pointermove', onmousemove, false);


    setupCanvas();



})()
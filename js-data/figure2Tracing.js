(() => {

    /*все вхождения figure2_A... заменить A на нужную букву*/
    let task = document.querySelector('.figure2_wrapper')
    const interakt_zadanie = task.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;
    const drop = headCheck.querySelector('.drop');
    const figure2Picture = task.querySelector('.figure2_picture')

    let c = task.querySelector('.figure2_A_canvas');
    let cx = c.getContext('2d');
    let mousedown = false;

    let pixels = null;
    let figure2pixels = null;
    /*заменить Aa на нужные буквы*/
    //let figure2 = '◻'// △ ◯ ▭ ◻ ◇
    /**/
    /*при необходимости подобрать нужный шрифт*/
    //let font = 'Titillium Web'
    //cx.font = `bold 310px ${font}`;
    /**/
    let isfigure2Complete = false
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

        drawfigure2(70, 'rgb(230,230,230)');
        
        pixels = cx.getImageData(0, 0, c.width, c.height);
        figure2pixels = getpixelamount(230, 230, 230);
    }

    function drawfigure2(size, color) {
        strokeStar( size+15, 5, 2,`rgb(${r}, ${g}, ${b+1})` )
        strokeStar( size, 5, 2,color )
        strokeStar( size-20, 5, 2,`rgb(${r}, ${g}, ${b+1})` )
        strokeStar( size-35, 5, 2,`white` )
    };

    function strokeStar( r, n, inset, color) {
        let centerX = c.width / 2;
        let centerY = c.height / 2;
        cx.save();
        cx.beginPath();
        cx.translate(centerX, centerY);
        cx.moveTo(0,0-r);
        for (var i = 0; i < n; i++) {
            cx.rotate(Math.PI / n);
            cx.lineTo(0, 0 - (r*inset));
            cx.rotate(Math.PI / n);
            cx.lineTo(0, 0 - r);
        }
        cx.closePath();
        cx.fillStyle = color;
        cx.fill();
        cx.restore();
    }

    function drawfigure2Border(figure2) {
        let centerx = (c.width - cx.measureText(figure2).width) / 2;
        let centery = c.height / 2;
        cx.lineWidth = 5;
        cx.lineCap = 'round'
        cx.strokeStyle = 'rgb(240, 100, 0)';
        cx.strokeText(figure2, centerx, centery);
    };

    function showerror(error) {
        mousedown = false;
        alert(error);
    };

    function paint(x, y) {
        let colour = getpixelcolour(x, y);

        if (colour.r !== 230 || colour.g !== 230 || colour.b !== 230) {

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

            //drawfigure2Border(figure2)
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

        if (getpixelamount(r, g, b) / figure2pixels > 1.45) {
            if (!isfigure2Complete) {
                pulse()
                
            }
        }
    };

    function pulse() {
       let size = 70
        let timerId1 = setInterval(() => {
            size += 1
            cx.clearRect(0, 0, c.width, c.height)
            drawfigure2(size,`rgb(${r}, ${g}, ${b + 1})`)
        }, 40);

        setTimeout(() => {
            clearInterval(timerId1);
            let timerId2 = setInterval(() => {
                size -= 1
                cx.clearRect(0, 0, c.width, c.height)
                
                drawfigure2(size, `rgb(${r}, ${g}, ${b + 1})`)

            }, 40);
            setTimeout(() => {
                clearInterval(timerId2);
            }, 800);
        }, 800);

        isfigure2Complete = true
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
        isfigure2Complete = false
        setupCanvas();
    }

    drop.addEventListener('click', reloadTask)

    c.addEventListener('pointerdown', onmousedown, false);
    c.addEventListener('pointerup', onmouseup, false);
    c.addEventListener('pointermove', onmousemove, false);


    setupCanvas();



})()
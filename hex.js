//=========================SetInterval for bacgroundColor of containerFirst 
/*setInterval(
    function() {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        containerFirst.style.backgroundColor = "#" + randomColor;

    }, 1000);*/


const numbers = [1, 2, 3, 4, 5, 6]
const containerFirst = document.querySelector('.container_first')

function generateHexaColor() {
    let string = '0123456789abcdef'
    let hexaColor = '#'
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * string.length)
        hexaColor += string[index]
    }
    return hexaColor
}
generateHexaColor()
    //console.log(generateHexaColor())
    //console.log(containerFirst)

function generateDivs(n = 5) {

    containerFirst.innerHTML = ''

    for (let i = 0; i < n; i++) {

        let bgColor = generateHexaColor()
        const div = document.createElement('div')
        div.style.background = bgColor
        const p = document.createElement('p')
        const btn = document.createElement('button')
        btn.textContent = 'Copy'
        p.textContent = bgColor
        div.setAttribute('class', 'container_first_item')
        div.setAttribute('id', 'container_first_content--' + i)
        btn.setAttribute('class', 'btn_copy')
        div.appendChild(p)
        div.appendChild(btn)

        //================================================================================
        /*creating text area to copy the Hexcolor*/
        const textarea = document.createElement('textarea')
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        textarea.setAttribute('name', 'hexColor')
        div.appendChild(textarea)

        //set interval
        let interval = setInterval(function() {
            let bgColor = generateHexaColor()
            p.textContent = bgColor

            /*copy bgColor*/
            textarea.textContent = bgColor
            btn.addEventListener('click', function() {
                    textarea.select();
                    document.execCommand('Copy');
                })
                /*copy code ends here*/
            div.style.background = bgColor

        }, 1500)

        //============================================================================
        /* stop interval with mouseenter*/
        div.addEventListener('mouseenter', function() {
            clearInterval(interval);
        })

        //=============================================================================
        /* start interval with mouseleave*/
        div.addEventListener('mouseleave', function() {

                interval = setInterval(function() {
                    let bgColor = generateHexaColor()
                    p.textContent = bgColor
                        /*copy bgColor*/
                    textarea.textContent = bgColor
                    btn.addEventListener('click', function() {
                            textarea.select();
                            document.execCommand('Copy');
                        })
                        /*copy code ends here*/
                    div.style.background = bgColor
                }, 1500)
            })
            //==============================================================================
            /* stop interval with mouse click */
        const btnStop = document.querySelector('.btn_btn--stop')
        btnStop.addEventListener('click', function() {
            clearInterval(interval);
        })
        containerFirst.appendChild(div)
    }
}
//===================calling the default function
generateDivs()

//==============================================================================
/* Generate with Button Click */

function callToGenerate() {
    let btnGenerate = document.querySelector('.btn_btn--generate')
    btnGenerate.addEventListener('click', function() {
        let m = document.querySelector('.search').value

        //===========================================================================
        /*alerting for number and number > 5 in the search field.*/
        if (String(m).search(/^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/) != -1 &&
            (m < 5)) {
            const error = document.querySelector('.popup ')
            error.textContent = 'Enter number greater than 5!';
            return false;
        } else if (isNaN(m)) {
            const error = document.querySelector('.popup')
            error.textContent = 'Enter number greater than 5!';
        } else {
            console.log(`${m}`)
        }
        generateDivs(m)
    })
}
callToGenerate() //===================calling the callToGenerate() function*/

//=========================================================================
/* Generate with  onkeydown */

document.querySelector('.search').onkeydown = function(e) {
    if (e.keyCode == 13) {
        document.querySelector('.btn_btn--generate').click()
    }
};
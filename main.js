//Global vars
var activeButton= null;
var con_r = 0;
var con_g = 0;
var con_b = 0;

 
//default values from ESP
var defaultColor;
var defaultSpeed = null;
var defaultBrightness = null;
var defaultMode = null;
var defaultSsid = null;
var defaultPass = null;
var defaultOffsetX = 235;
var defaultOffsetY = 138;

//Global coordinates of canvas and HSL circle
var CX = 0;
var CY = 0;
var sx = 0;
var sy = 0;
var colorCanvas = 0;
var colorctx = 0;
var old_offsetX = null;
var old_offsetY = null;

window.addEventListener('DOMContentLoaded', (event) => {
    // init the colorCanvas color picker
    //circle canvas
    colorCanvas = document.getElementById('color-canvas');
    colorctx = colorCanvas.getContext('2d');

    CX = colorCanvas.width / 2,
    CY = colorCanvas.height/ 2,
    sx = CX-40,
    sy = CY-40;
            
    colorctx.strokeStyle = 'white';
    colorctx.fillStyle = 'white';
    colorctx.beginPath();
    colorctx.arc(CX, CY, 180, 0, Math.PI*2, true);
    colorctx.closePath();
    colorctx.stroke();
    colorctx.fill();

    //first HSL circle drawing
    for(var i = 0; i < 360; i+=0.1){
        var rad = i * (2*Math.PI) / 360;
        colorctx.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";   
        colorctx.beginPath();
        colorctx.moveTo(CX, CY);
        colorctx.lineTo(CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
        colorctx.stroke();
    }   
    old_offsetX = defaultOffsetX;
    old_offsetY = defaultOffsetY;

    // setup the colorCanvas click listener
    
    colorCanvas.addEventListener('mousedown', event => hslCircleDrawing(event));  

    // get list of modes from ESP
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const response = xhttp.responseText.split(',');
            let favorite_modes = '',
            other_modes = '';
            response.forEach((item, index) => {
                let tmp;
                if(index <= 9){
                tmp = "<li class='big-col__mode'><a data-href='" + index + "' href='#'>" + item + "</a></li>"
                favorite_modes += tmp; 
                }
                else{
                    tmp = "<li class='big-col__mode'><a data-href='" + index + "' href='#'>" + item + "</a></li>"
                    if(item == ''){
                        return;
                    }
                    other_modes += tmp;
                }        
            });

            document.getElementById('favorite-modes').innerHTML = favorite_modes;
            document.getElementById('other-modes').innerHTML = other_modes;
            document.querySelectorAll('.big-col__mode a').forEach(item => {
                item.addEventListener('click', (event) => onMode(event))
            });
        }
    };

    xhttp.open('GET', 'modes', true);
    xhttp.send();

    //palitra
    document.querySelectorAll('.color-picer__item').forEach( item => {
        item.addEventListener('click', (e) => {
        e.preventDefault();
        let tmp = 0; 
        let whiteFlag = 0;

        tmp = decToRgb(parseInt(e.target.dataset.color, 16));
        tmp = rgbToHsl(tmp[0], tmp[1], tmp[2]);      

        colorctx.strokeStyle = 'white';
        colorctx.fillStyle = 'white';
        colorctx.beginPath();
        colorctx.arc(CX, CY, 180, 0, Math.PI*2, true);
        colorctx.closePath();
        colorctx.stroke();
        colorctx.fill();

        // redrawing HSL circle drawing
        for(var i = 0; i < 360; i+=0.1){
            var rad = i * (2*Math.PI) / 360;
            colorctx.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";   
            colorctx.beginPath();
            colorctx.moveTo(CX, CY);
            colorctx.lineTo(CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
            colorctx.stroke();
        } 

        colorCanvas = document.getElementById('color-canvas');
        colorctx = colorCanvas.getContext('2d');
        CX = colorCanvas.width / 2,
        CY = colorCanvas.height/ 2,  
        //default color marker location drawing
        colorctx.strokeStyle = '#202020';
        colorctx.fillStyle = 'transparent';
        colorctx.beginPath();
        radius = tmp[0] * (2*Math.PI) / 360;
        CX_point = CX + 80 * Math.cos(radius);
        CY_point = CY + 80 * Math.sin(radius);
        if(e.target.dataset.color != "ffffff") {
            colorctx.arc(CX_point, CY_point, 5, 0, Math.PI*2, true);
        }
        else{
            colorctx.arc(370, 200, 5, 0, Math.PI*2, true);
        }
        colorctx.closePath();
        colorctx.stroke();
        colorctx.fill();
        
        submitVal('c', parseInt(e.target.dataset.color, 16));
        
        })
    });

    // btn up
    document.querySelector('.btn-up').addEventListener('click', () => {
				scrollToIos(0);
        
        if ( document.querySelector('.accordion__btn--active') != null ){
            document.querySelector('.accordion__btn--active').classList.remove('accordion__btn--active')
        }
        if ( document.querySelector('.accordion__body--active') != null ){
            document.querySelector('.accordion__body--active').classList.remove('accordion__body--active')
        }
    });

    // set new ssid and pas from login modal
    document.querySelector('.login-modal__form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newSsid = document.querySelector('.login-modal__input--ssid').value;
        const newPas = document.querySelector('.login-modal__input--pas').value;

        submitVal('n', newSsid);
        submitVal('p', newPas);
    })
    

    getDefaults();
    accordionInit();

});


//Function to draw HSL circle
function hslCircleDrawing(event){
    var imageData = colorCanvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1);

    colorCanvas = document.getElementById('color-canvas');
    colorctx = colorCanvas.getContext('2d');

    //outline white board of HSL circle 
    colorctx.strokeStyle = 'white';
    colorctx.fillStyle = 'white';
    colorctx.beginPath();
    colorctx.arc(CX, CY, 180, 0, Math.PI*2, true);
    colorctx.closePath();
    colorctx.stroke();
    colorctx.fill();

    // redrawing HSL circle drawing 
    for(var i = 0; i < 360; i+=0.1){
        var rad = i * (2*Math.PI) / 360;
        colorctx.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";   
        colorctx.beginPath();
        colorctx.moveTo(CX, CY);
        colorctx.lineTo(CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
        colorctx.stroke();
    } 
    
    //color marker location drawing
    if(Math.pow((event.offsetX - CX),2)  + Math.pow((event.offsetY - CY),2) < Math.pow(180,2)){
        colorctx.strokeStyle = '#202020';
        colorctx.fillStyle = 'transparent';
        colorctx.beginPath();
        colorctx.arc(event.offsetX, event.offsetY, 5, 0, Math.PI*2, true);
        colorctx.closePath();
        colorctx.stroke();
        colorctx.fill();
        
        old_offsetX = event.offsetX;
        old_offsetY = event.offsetY;

        var selectedColor = imageData.data[0] * 65536 + imageData.data[1] * 256 + imageData.data[2];
        rgbToHsl(imageData.data[0], imageData.data[1], imageData.data[2]);
        //console.log("color:" + selectedColor + "; x:" + old_offsetX + ",y:" + old_offsetY);
        
        if(selectedColor != 0){
        submitVal('c', selectedColor);
        }
    }

    else{
        colorctx.strokeStyle = '#202020';
        colorctx.fillStyle = 'transparent';
        colorctx.beginPath();
        colorctx.arc(old_offsetX, old_offsetY, 5, 0, Math.PI*2, true);
        colorctx.closePath();
        colorctx.stroke();
        colorctx.fill();
    }
}

//Function for adding click events for all modes
function initMode(mode, index) {
    mode.addEventListener('click', (event) => onMode(event, index));
}

//Function to get default/current values from ESP if server starts first time or was updated by user
function getDefaults() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            xhttp.responseText;
            let tmp = xhttp.responseText.split(';');

            defaultColorString = tmp[0];
            let rgb = decToRgb(parseInt(defaultColorString, 10));
            defaultColorHsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);       

            colorCanvas = document.getElementById('color-canvas');
            colorctx = colorCanvas.getContext('2d');
            CX = colorCanvas.width / 2,
            CY = colorCanvas.height/ 2,

            //default color marker location drawing
            colorctx.strokeStyle = '#202020';
            colorctx.fillStyle = 'transparent';
            colorctx.beginPath();
            radius = defaultColorHsl[0] * (2*Math.PI) / 360;

            CX_point = CX + 80 * Math.cos(radius);
            CY_point = CY + 80 * Math.sin(radius);

            colorctx.arc(CX_point, CY_point, 5, 0, Math.PI*2, true);
            colorctx.closePath();
            colorctx.stroke();
            colorctx.fill();
            
            defaultSpeed = tmp[1];
            document.querySelector('#speed').value = tmp[1];
            console.log(tmp[1]);

            defaultBrightness = tmp[2];
            document.querySelector('#brightness').value = tmp[2];

            defaultMode = tmp[3];
            document.querySelector("[data-href='"+defaultMode+"']").closest("li").classList.add("big-colmode--active");
            
            document.querySelector('#brightness').style.background = `linear-gradient(to right,#0b83fe,#0b83fe ${tmp[2] / 2.55 }%,#eee ${tmp[2] / 2.55}%)`;
            document.querySelector('#speed').style.background = `linear-gradient(to right,#0b83fe,#0b83fe ${tmp[1] / 655.35 }%,#eee ${tmp[1] / 655.35}%)`;
            
            defaultSsid = tmp[4];
            defaultPass = tmp[5];
            
            if( defaultSsid === 'New SSID' || defaultPass === 'New Password'){
                showLoginModal();
            }

            document.querySelector('#password').value = defaultPass;
            document.querySelector('#ssid').value = defaultSsid;

            
        }    
    };
    xhttp.open('GET', 'defaults', true);
    xhttp.send();
}

//Mode change function
function onMode(event) {
    event.preventDefault();
    const mode = event.target.dataset.href;
    if(event.target.closest("li").classList.contains("big-colmode--active")){
        return;
    }
    else{
        if(document.querySelector(".big-colmode--active") != null)
        {
            document.querySelector(".big-colmode--active").classList.remove("big-colmode--active");
        }
    }
    event.target.closest("li").classList.add("big-colmode--active");
    submitVal('m', mode);
}

//Brigtness change function
function onBrightness() {
    size = document.getElementById("brightness").value;
	document.getElementById("brightness").style.background = `linear-gradient(to right,#0b83fe,#0b83fe ${size / 2.55 }%,#eee ${size / 2.55}%)`;
    submitVal('b', size);
}

//Speed change function
function onSpeed() {
    speed = document.getElementById("speed").value;
    document.getElementById("speed").style.background = `linear-gradient(to right,#0b83fe,#0b83fe ${speed / 655.35 }%,#eee ${speed / 655.35}%)`;
    submitVal('s', speed);
}

//Auto cycle enble function
function onAuto(event, dir) {
    event.preventDefault();
    submitVal('a', dir);
}

//Transmit function to ESP
function submitVal(name, val) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'set?' + name + '=' + val, true);
    xhttp.send();
}

//Function for translate R, G, B dec values to HSL format string (angle, s%, l%)
function rgbToHsl(con_r, con_g, con_b){
    con_r /= 255;
    con_g /= 255;
    con_b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(con_r,con_g,con_b),
    cmax = Math.max(con_r,con_g,con_b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == con_r)
        h = ((con_g - con_b) / delta) % 6;
    // Green is max
    else if (cmax == con_g)
        h = (con_b - con_r) / delta + 2;
    // Blue is max
    else
        h = (con_r - con_g) / delta + 4;
      
    h = Math.round(h * 60);
  
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
      
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    
    return [h, s, l];
    
}

//Function for translate RGB value in dec max"16777215" to array[3] = R, G, B dec values
function decToRgb(value){
    con_r = Math.floor(value / (256*256));
    con_g = Math.floor(value / 256) % 256;
    con_b = value % 256;
    return [con_r, con_g, con_b];
}
  
// accordion
function accordionInit(){
    //const acc = document.getElementsByClassName("accordion");
    const acc = document.querySelectorAll('.accordion__btn');
    acc.forEach( item => {
        item.addEventListener('click', (e) =>{
        const panel = item.nextElementSibling;

        if(e.target.classList.contains('accordion__btn--active')){
            document.querySelector('.accordion__btn--active').classList.remove('accordion__btn--active');
            document.querySelector('.accordion__body--active').classList.remove('accordion__body--active');
            return ;
        }

        if( document.querySelector('.accordion__btn--active') !=null ){
            document.querySelector('.accordion__btn--active').classList.remove('accordion__btn--active');
        }
        
        if( document.querySelector('.accordion__body--active') != null ){
            document.querySelector('.accordion__body--active').classList.remove('accordion__body--active');
        }

        e.target.classList.add('accordion__btn--active');
        panel.classList.toggle('accordion__body--active');

      });
    });
}

// wifi setup
function wifiSetup() {

    const newSsid = document.querySelector('#ssid').value;
    const newPas = document.querySelector('#password').value;

    submitVal('n', newSsid);
    submitVal('p', newPas);

}

// check input wifi setup
function checkInputWifiSetup(){

    const ssidInput = document.querySelector('#ssid');
    const pasInput = document.querySelector('#password');

    if( ssidInput.value === '' || pasInput.value === ''){
        document.querySelector('#wifi-setup').disabled = true;
    }else{
        document.querySelector('#wifi-setup').disabled = false;        
    }
}

// set default setup
function setDefaults() {
    submitVal('e', '');
}

// show login modal
function showLoginModal() {
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.login-modal').style.display = 'flex';
    document.querySelector('.panel__wrap').classList.add('panel__wrap--blur');
}

// check login mobal inputs
function checkInputLoginInputs(){

    const ssidInput = document.querySelector('.login-modal__input--ssid');
    const pasInput = document.querySelector('.login-modal__input--pas');

    if( ssidInput.value === '' || pasInput.value === ''){
        document.querySelector('.login-modal__btn').disabled = true;
    }else{
        document.querySelector('.login-modal__btn').disabled = false;        
    }
}

function scrollToIos (to,id){
	var smoothScrollFeature = 'scrollBehavior' in document.documentElement.style;
	var articles = document.querySelectorAll("ul#content > li"), i;
	if (to == 'elem') to = articles[id].offsetTop;
	var i = parseInt(window.pageYOffset);
	if ( i != to ) {
		if (!smoothScrollFeature) {
			to = parseInt(to);
			if (i < to) {
				var int = setInterval(function() {
					if (i > (to-20)) i += 1;
					else if (i > (to-40)) i += 3;
					else if (i > (to-80)) i += 8;
					else if (i > (to-160)) i += 18;
					else if (i > (to-200)) i += 24;
					else if (i > (to-300)) i += 40;
					else i += 60;
					window.scroll(0, i);
					if (i >= to) clearInterval(int);
				}, 15);
			}
			else {
				var int = setInterval(function() {
				if (i < (to+20)) i -= 1;
				else if (i < (to+40)) i -= 3;
				else if (i < (to+80)) i -= 8;
				else if (i < (to+160)) i -= 18;
				else if (i < (to+200)) i -= 24;
				else if (i < (to+300)) i -= 40;
				else i -= 60;
				window.scroll(0, i);
				if (i <= to) clearInterval(int);
				}, 15);
			}
		}
		else {
			window.scroll({
				top: to,
				left: 0,
				behavior: 'smooth'
			});
		}
	}
};
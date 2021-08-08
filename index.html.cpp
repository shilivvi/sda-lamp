#include <pgmspace.h>
char index_html[] PROGMEM = R"=====(
<!doctype html>
<html lang='ru'>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>RGB LightTower</title>

  <link rel="apple-touch-icon" sizes="180x180" href="https://raw.githubusercontent.com/shilivvi/sda-lamp/master/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="https://raw.githubusercontent.com/shilivvi/sda-lamp/master/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="https://raw.githubusercontent.com/shilivvi/sda-lamp/master/favicon/favicon-16x16.png">
  <link rel="manifest" href="https://raw.githubusercontent.com/shilivvi/sda-lamp/master/favicon/site.webmanifest">
  <link rel="mask-icon" href="https://raw.githubusercontent.com/shilivvi/sda-lamp/master/favicon/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#00aba9">
  <meta name="theme-color" content="#ffffff">
  

  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">

  <style>
    *,
    *::after,
    *::before{
      box-sizing: border-box;
      font-family: 'Open Sans', sans-serif;
    }
    ul{
      margin: 0;
      padding: 0;
      list-style: none;
    }
    body {
      background-color:#202020;
      color:#909090;
      margin: 0;
      padding: 0;
    }
    input[type=range] {
      -webkit-appearance: none
    }
    main{
      overflow: hidden;
      padding-bottom: 10px;
    }

    /* range input */
    .range-slider{
      appearance: none;
      outline: none;
      width: 150px;
      height: 3px;
      border-radius: 5px;
      background-color: #0b83fe;
    }
    .range-slide::-webkit-slider-runnable-track{
      background-color: white;	
    }
    .range-slider::-webkit-slider-thumb {
      background: #fafafa;
      appearance: none;
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
    /* ./ range input */

    /* accordion */
    .accordion{
      width: 100%;
      margin-top: -2px;
    }
    .accordion__btn {
      background-color: transparent;
      color: #909090;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      border:2px solid #404040;
      text-align: left;
      outline: none;
      font-size: 22px;
      font-weight: 700;
      transition: .3s ease-in-out;
      border-radius: 10px;
    }
    .accordion__body {
      padding: 20px;
      display: none;
      border: 2px solid #404040;
      overflow: hidden;
      margin-top: -2px;
      border-radius: 10px;
    }
    .accordion__btn--active{
      background-color: #909090;
      color: #202020;
    }
    .accordion__body--active{
      display: block;
    }
    /* ./ accordion */

    .panel__wrap{
      display: flex;
      flex-wrap: wrap;
      padding:15px;
    }

    .panel__wrap--blur{
      filter: blur(10px);
    }

    .panel__col--small{
      flex: 0 1 30%;

      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .panel__col--big{
      flex: 0 1 70%;
      padding-top: 130px;
    }

    .panel__row{
      width: 70%;
      display: flex;
      flex-direction: column;
      margin-top: 40px;
    }

    .panel__label{
      text-align: left;
      font-weight: 600;
      font-size: 18px;
    }

    .panel__input{
      width: 100%;
      margin-top: 10px;
    }
    
    .big-col__modes{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-auto-rows: 1fr;
      gap: 15px;
    }

    .big-col__mode{
      border: 2px solid #404040;
      border-radius: 10px;
      color: #909090;
      font-weight: 600;
      font-size: 18px;
      cursor: pointer;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .big-col__mode a{
      text-decoration: none;
      color: #909090;
      width: 100%;
      height: 100%;
      padding: 15px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .big-colmode--active{
      background-color: #909090;
    }
    .big-colmode--active a{
      color: #202020;
    }
    
    .color-picer{
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-auto-rows: 1fr 1fr 1fr;
      gap: 50px;
    }
    .color-picer > div{
      width: 100%;
      height: 60px;
      cursor: pointer;
    }

    /* setings */
    .setings{
      width: 100%;
    }
    
    .setings p{
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      text-align: left;
    }

    .setings-section{
      border: 2px solid #404040;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      padding: 20px;
    }

    .setings__row{
      display: flex;
      width: 100%;
    }
    .setings__col-label{
      flex: 0 1 8%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .setings__col-input{
      flex: 0 1 92%;
      display: flex;
      justify-content: flex-start;
    }
    .setings__label{
      font-weight: 600;
      font-size: 18px;
    }
    .setings__input{
      font-weight: 600;
      font-size: 18px;

      background: transparent;
      border: 2px solid #404040;
      border-radius: 10px;
      color: #909090;
      outline: none;
      padding: 10px;

      width: 300px;
    }
    .setings__btn{
      display: flex;
      justify-content: center;
      
    }

    .setings__btn button{
      font-size: 22px;
      font-weight: 700;
      color: #909090;

      outline: none;
      border: 2px solid #404040;
      border-radius: 10px;
      background: none;

      padding: 15px 30px;

      cursor: pointer;
    }

    .setings__btn button:disabled, .login-modal__btn:disabled{
      opacity: 0.3;
      cursor: not-allowed;
    }

    .btn-up{
      width: 50px;
      height: 50px;
      background: #909090;
      padding: 5px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      position: fixed;
      bottom: 15px;
      right: 15px;

      display: none;
      
    }
    .btn-up__wrap{
      position: relative;
      width: 100%;
      height: 100%;
    }
    .btn-up__arrow{
      width: 25px;
      height: 25px;
      border-color: #000;
      color: #404040;
      position: absolute;
      top: 50%;
      border-bottom: 3px solid;
      border-left: 3px solid;
      transform: rotate(135deg);
      left: 10px;
      margin-top: -5px;
      margin-left: -2px;
    }

    /* login modal */
    .login-modal{
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: rgba(0, 0, 0, .6);
      padding: 0 15px;
  
      display: none;
      justify-content: center;
      align-items: center;
    }
    .login-modal__wrap{
      max-width: 400px;
      width: 100%;
      background-color:#202020;
      border: 2px solid #404040;
      border-radius: 10px;

      padding: 20px 10px;
    }
    .login-modal__wrap .login-modal__row:not(:first-child){
      margin-top: 30px;
    }
    .login-modal__row{
      display: flex;
      flex-direction: column;
    }
    .login-modal__label{
      font-weight: 600;
      font-size: 18px;
      color:#909090;
    }
    .login-modal__input{
      margin-top: 10px;
      background: transparent;
      outline: none;
      border: 2px solid #404040;
      border-radius: 10px;
      padding: 10px;

      font-weight: 600;
      font-size: 18px;
      color:#909090;
    }
    .login-modal__btn
    {
      margin-top: 20px;
      font-size: 22px;
      font-weight: 700;
      color: #909090;
      border: 2px solid #404040;
      border-radius: 10px;
      width: 100%;

      background: transparent;
      padding: 15px 0;
      cursor: pointer;
    }

    @media (max-width: 1400px){
      .panel__wrap{
        flex-wrap: nowrap;
      }
      .big-col__modes {
        grid-template-columns: 1fr 1fr 1fr;
      }
      .color-picer{
        gap: 30px;
      }
      .setings__col-label {
        flex: 0 1 15%;
      }
    }

    @media (max-width: 1200px){
      .panel__wrap{
        flex-wrap: wrap;
      }
      .panel__col{
        flex-basis: 100%;
      }
    }

    @media (max-width: 992px){
      .big-col__modes {
        grid-template-columns: 1fr 1fr;
      }
      .setings__col-label {
        flex: 0 1 20%;
      }
      .color-picer{
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @media (max-width: 576px) {
      body{
        margin-bottom: 50px;
      }
      .panel__wrap{
        padding: 0;
      }
      .panel__col--big{
        padding: 0 15px;
        margin-top: 100px;
      }
      .panel__row{
        width: 85%;
      }

      .big-col__modes{
        grid-template-columns: 1fr 1fr;
      }
      .big-col__mode a{
        text-align: center;
      }
      .accordion__body{
        padding-right: 10px;
        padding-left: 10px;
      }      
      .color-picer{
        grid-template-columns: 1fr 1fr;
        gap: 30px;
      }

      .setings__row{
        flex-direction: column;
      }
      .setings__input{
        margin-top: 10px;
      }
      .btn-up{
        display: flex;
      }
      .setings__input{
        width: 100%;
      }

    }

  </style>
</head>
<body>
  
  <main>
    <div class="btn-up">
      <div class="btn-up__wrap">
        <div class="btn-up__arrow"></div>
      </div>
    </div>
  
    <div class="panel__wrap">
      <div class="panel__col panel__col--small">
        <h1>RGB LightTower</h1>
        <div class="panel__canvas">
          <canvas id='color-canvas' width='400' height='400'></canvas>
        </div>
        <div class="panel__row">
          <label class="panel__label" for="brightness">Яркость</label>
          <input class="range-slider panel__input" type="range" name="brightness" min="0" max="255" step="1" oninput="onBrightness()" id="brightness">
        </div>
        <div class="panel__row">
          <label class="panel__label" for="brightness">Скорость</label>
          <input class="range-slider panel__input" type="range" name="speed" min="0" max="65535" step="1" oninput="onSpeed()" id="speed">
        </div>
      </div>
      <div class="panel__col panel__col--big big-col">
        <div class="accordion">
          <button class="accordion__btn">Избранные режимы</button>
          <div class="accordion__body">
            <ul class="big-col__modes" id="favorite-modes"><li class="big-col__mode"><a data-href="0" href="#">Статичный</a></li><li class="big-col__mode big-colmode--active"><a data-href="1" href="#">Моргание</a></li><li class="big-col__mode"><a data-href="2" href="#">Дыхание</a></li><li class="big-col__mode"><a data-href="3" href="#">Сдвиг</a></li><li class="big-col__mode"><a data-href="4" href="#">Сдвиг инвресия</a></li><li class="big-col__mode"><a data-href="5" href="#">Сдвиг реверс</a></li><li class="big-col__mode"><a data-href="6" href="#">Сдвиг реверс-инверс.</a></li><li class="big-col__mode"><a data-href="7" href="#">Сдвиг случайный</a></li><li class="big-col__mode"><a data-href="8" href="#">Случайный цвет</a></li><li class="big-col__mode"><a data-href="9" href="#">Одиночный динамика</a></li></ul>
          </div>
        </div>
        <div class="accordion">
          <button class="accordion__btn">Другие режимы</button>
          <div class="accordion__body">
            <ul class="big-col__modes" id="other-modes">
              <li class="big-col__mode"><a data-href="0" href="#">Статичный</a></li><li class="big-col__mode big-colmode--active"><a data-href="1" href="#">Моргание</a></li><li class="big-col__mode"><a data-href="2" href="#">Дыхание</a></li><li class="big-col__mode"><a data-href="3" href="#">Сдвиг</a></li><li class="big-col__mode"><a data-href="4" href="#">Сдвиг инвресия</a></li><li class="big-col__mode"><a data-href="5" href="#">Сдвиг реверс</a></li><li class="big-col__mode"><a data-href="6" href="#">Сдвиг реверс-инверс.</a></li><li class="big-col__mode"><a data-href="7" href="#">Сдвиг случайный</a></li><li class="big-col__mode"><a data-href="8" href="#">Случайный цвет</a></li><li class="big-col__mode"><a data-href="9" href="#">Одиночный динамика</a></li>
            </ul>
          </div>
        </div>
        <div class="accordion">
          <button class="accordion__btn">Палитра</button>
          <div class="accordion__body">
            <div class="color-picer">
              <div data-color="ffffff" style="background: #ffffff;" class="color-picer__item"></div>
              <div data-color="ff0000" style="background: #ff0000;" class="color-picer__item"></div>
              <div data-color="00ff00" style="background: #00ff00;" class="color-picer__item"></div>
              <div data-color="0000ff" style="background: #0000ff;" class="color-picer__item"></div>
              <div data-color="ffff00" style="background: #ffff00;" class="color-picer__item"></div>
              <div data-color="00ffff" style="background: #00ffff;" class="color-picer__item"></div>
              <div data-color="ff00ff" style="background: #ff00ff;" class="color-picer__item"></div>               
            </div>
          </div>
        </div>
        <div class="accordion">
          <button class="accordion__btn">Настройки</button>
          <div class="accordion__body">
            <div class="setings">
              
              <div class="">
                <p style="margin-bottom: 30px;">Стандартные настройки</p>
                <div class="setings__btn">
                  <button class="setings__btn" id="saveToEeprom" onclick="setDefaults()" >Сохранить в память</button>
                </div>
              </div>
              
  
              <div class="" style="margin-top: 50px;">
                <p style="margin-bottom: 10px;">Сеть</p>
                <div class="setings-section">
                  <div class="setings__row">
                    <div class="setings__col-label"><label for="ssid" class="setings__label">Сеть:</label></div>
                    <div class="setings__col-input"><input id="ssid" name="ssid" type="text" maxlength="32" class="setings__input" onkeypress="return (event.charCode >= 32 && event.charCode <= 126)" onkeyup="checkInputWifiSetup()" ></div>
                  </div>
                  <div class="setings__row" style="margin-top: 20px;">
                    <div class="setings__col-label"><label for="password" class="setings__label">Пароль:</label></div>
                    <div class="setings__col-input"><input id="password" name="password" type="text" maxlength="32" class="setings__input" onkeypress="return (event.charCode >= 32 && event.charCode <= 126)" onkeyup="checkInputWifiSetup()"></div>
                  </div>
                  <div class="setings__btn" style="margin-top: 30px;">
                    <button class="setings__btn" id="wifi-setup" disabled onclick="wifiSetup()">Сменить</button>
                  </div>
                </div> 
              </div> 
  
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="login-modal">
      <div class="login-modal__wrap">
        <div class="login-modal__form">
          <form class="login-modal__form" action="/">
            <div class="login-modal__row">
              <label class="login-modal__label">Сеть</label>
              <input type="text" class="login-modal__input login-modal__input--ssid" onkeypress="return (event.charCode >= 32 && event.charCode <= 126)" onkeyup="checkInputLoginInputs()">
            </div>
            <div class="login-modal__row">
              <label class="login-modal__label">Пароль</label>
              <input type="text" class="login-modal__input login-modal__input--pas" onkeypress="return (event.charCode >= 32 && event.charCode <= 126)" onkeyup="checkInputLoginInputs()">
            </div>
            <div class="login-modal__row">
              <button class="login-modal__btn" disabled>Подключить</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <style>
      

    </style>

  </main>

</body>

<script type='text/javascript' src='main.js'></script>

</html>
)=====";

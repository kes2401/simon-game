$(document).ready(function(){

    var greenPad = $('.green');
    var redPad = $('.red');
    var yellowPad = $('.yellow');
    var bluePad = $('.blue');
    
    var strictBtn = $('.strict-btn');
    var display = $('.levelDisplay');

    var sequence = ''; // random sequence output by the game
    var playedSequence = ''; // the user's selected sequence

    var sound0 = new Audio('sounds/simonSound1rev.mp3');
    var sound1 = new Audio('sounds/simonSound2rev.mp3');
    var sound2 = new Audio('sounds/simonSound3rev.mp3');
    var sound3 = new Audio('sounds/simonSound4rev.mp3');
    var errorSound = new Audio('sounds/wrong.mp3');
    var winSound = new Audio('sounds/win-jingle.mp3');

    var gameOn = false;
    var inPlay = false;
    var strict = false;
    var start;
    var level;
    var shot;  

    $('.switch-btn').on('click', function() {
        if(gameOn){
            display.text('');
            $('.strict-light').removeClass('light-on');
            $(this).addClass('button-off'); 
            reset();
            gameOn = false;
        } else {
            display.text('--');
            $(this).removeClass('button-off');
            reset();
            gameOn = true;
        }
    });

    $('.start-btn').on('click', function() {
        if(gameOn){
            reset();
            display.text('00');
            window.setTimeout(function(){
                display.text('01');
                level = 1;
                go();
            }, 2000);
        }
    });

    greenPad.on('click', function(){
        if(inPlay && gameOn){
            playGreen();
            playedSequence += greenPad.attr('id');
            checkState();
        }   
    });

    redPad.on('click', function(){
        if(inPlay && gameOn){
            playRed();
            playedSequence += redPad.attr('id');
            checkState();
        }
    });

    yellowPad.on('click', function(){
        if(inPlay && gameOn){
            playYellow();
            playedSequence += yellowPad.attr('id');
            checkState();
        }
    });

    bluePad.on('click', function(){
        if(inPlay && gameOn){
            playBlue();
            playedSequence += bluePad.attr('id');
            checkState();
        }
    }); 

    strictBtn.on('click', function(){
        if(gameOn && !strict){
            strict = true;
            $('.strict-light').addClass('light-on');
        } else if (gameOn && strict) {
            strict = false;
            $('.strict-light').removeClass('light-on');
        }
    });

    function reset() {
        start = false;
        level = 0;
        sequence = '';
    }

    function go() {
        shot = random();
        sequence += shot;
        runSequence(sequence);    
    }

    function runSequence(sequence) {
        var x = 0;
        var intervalID = window.setInterval(function(){
            shot = sequence[x];
            play(Number(shot));
            x++;
            if(x >= sequence.length){
                window.clearInterval(intervalID);
                playedSequence = '';
                playerTurn();
            }
        }, 1000);
    }

    function playerTurn() {
        inPlay = true;    
    }

    function checkState() {
        if(playedSequence.length === level) {
            inPlay = false;
            if(sequence === playedSequence){
                level++;
                window.setTimeout(function(){             
                    if(level === 21) {
                        winSound.play();
                        sequence = '';
                        displayLevel(level); 
                        window.setTimeout(function(){
                            display.text('01');
                            level = 1;
                            go();
                        }, 4000);
                    }
                    display.text(displayLevel(level));
                }, 1000);
                if(level < 21){
                    go();
                }
            } else {
                window.setTimeout(function(){
                    errorSound.play();
                    display.text('!!');               
                    window.setTimeout(function() {
                        if(strict){
                            display.text('01');
                            level = 1;
                            sequence = '';
                            go();
                        } else {
                            display.text(displayLevel(level));
                            runSequence(sequence);
                        }
                    }, 1000);     
                }, 500);       
            } 
        }
    }

    function displayLevel(level) {
        var displayLevel;
        if(level < 10){
            displayLevel = '0' + level;
        } else if(level >= 10 && level < 21) {
            displayLevel = '' + level;
        } else if(level === 21){
            displayLevel = 'win';
        }
        return displayLevel;
    }

    function random() {
        return Math.floor(Math.random() * 4);
    }    

    function play(padId) {
        if(padId === 0) {
            playGreen();
        } else if(padId === 1) {
            playRed();
        } else if(padId === 2) {
            playYellow();
        } else if (padId === 3) {
            playBlue();
        }
    }

    function playGreen() {
        sound0.play();
        greenPad.addClass('green-active');
        window.setTimeout(function(){
            greenPad.removeClass('green-active');
        },250);
    }

    function playRed() {
        sound1.play();
        redPad.addClass('red-active');
        window.setTimeout(function(){
            redPad.removeClass('red-active');
        },250);
    }

    function playYellow() {
        sound2.play();
        yellowPad.addClass('yellow-active');
        window.setTimeout(function(){
            yellowPad.removeClass('yellow-active');
        },250);
    }

    function playBlue() {
        sound3.play();
        bluePad.addClass('blue-active');
        window.setTimeout(function(){
            bluePad.removeClass('blue-active');
        },250);
    }
});
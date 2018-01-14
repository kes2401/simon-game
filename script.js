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

    var gameOn = false;
    var inPlay = false;


    $('.switch-btn').on('click', function() {
        if(gameOn){
            display.text('');
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
                go(level);
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

    function reset() {
        var start = false;
        var strict = false;
        var count = 0;
        var level = 0;
    }

    function go(level) {
        var shot;
        sequence = '';
        playedSequence = ''
        runSequence(level);    
    }

    function runSequence(repititions) {
        var x = 0;
        var intervalID = window.setInterval(function(){
            shot = random();
            sequence += shot;
            play(shot);
            x++;
            if(x === repititions){
                window.clearInterval(intervalID);
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
                    
                    var displayLevel;
                    if(level < 10){
                        displayLevel = '0' + level;
                    } else if(level >= 10 < 20) {
                        displayLevel = '' + level;
                    } else if(level === 20){
                        displayLevel = 'win';
                    }
                    display.text(displayLevel);
                }, 1000);
                if(level < 20){
                    go(level);
                }
            } else {
                repeatSequence(sequence);
            } 
        }
    }

    function repeatSequence(sequence) {
        console.log('repeating sequence');
        var x = 0;
        var intervalID = window.setInterval(function(){
            shot = sequence[x];
            play(shot);
            x++;
            if(x === sequence.length - 1){
                window.clearInterval(intervalID);
                checkState();
            }
        }, 1000);
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
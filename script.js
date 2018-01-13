$(document).ready(function(){

    var greenPad = $('.green');
    var redPad = $('.red');
    var yellowPad = $('.yellow');
    var bluePad = $('.blue');
    
    var strictBtn = $('.strict-btn');
    var display = $('.levelDisplay');

    var sequence = ''; // random sequence output by the game
    var playedSequence = ''; // the user's selected sequence
    
    var sound0 = new Howl({ src: ['sounds/simonSound1rev.mp3'] });
    var sound1 = new Howl({ src: ['sounds/simonSound2rev.mp3'] });
    var sound2 = new Howl({ src: ['sounds/simonSound3rev.mp3'] });
    var sound3 = new Howl({ src: ['sounds/simonSound4rev.mp3'] });

    var gameOn = false;


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
            }, 2000);
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

        for(var i = 0; i < level; i++){
            window.setTimeout(function(){
                shot = random();

            },1000);

        }


    }

    function random() {
        return Math.floor(Math.random() * 4);
    }    

    function light(padId) {
        $('#' + padId).addClass('light-up'); // ***** need to define 'light-up' class in CSS !!!
        window.setTimeout(function(){
            $('#' + padId).removeClass('light-up');
        }, 500);
        if(padId === 0) {
            sound0.play();
        } else if(padId === 1) {
            sound1.play();
        } else if(padId === 2) {
            sound2.play();
        } else if (padId === 3) {
            sound3.play();
        }
    }




});
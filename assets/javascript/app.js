$(document).ready(function () {

    var questions = [{
            question: "Filburt once said: \"Turn the page...\"",
            choices: ["Wash your hands.", "Read the page", "Close the book", "Turn the page."],
            answer: 0,
        },
        {
            question: "Name Rocko's closest friend",
            choices: ["Beefy", "Harold", "Heffer", "Dopey"],
            answer: 2,
        },
        {
            question: "What is Rocko's favorite Restaurant",
            choices: ["Slippery Pete's", "Chokey's Chicken", "Jumpin' John's", "Big Bill's"],
            answer: 1,

        },
        {
            question: "Rocko's neighbor, Ed Bighead says this very often",
            choices: ["YOU WHAT!?", "Excuse me!", "I have no son!", "This is preposterous"],
            answer: 2,
        },
        {
            question: "What is the name of Rocko's dog?",
            choices: ["Spongey", "Sparky", "Sponchy", "Spunky"],
            answer: 3,
        },
        {
            question: "fill",
            choices: "fill",
            answer: 'fill',
        }
    ];

    clock = 9;
    clockRunning = false;
    rightAnswer = 0;
    wrongAnswer = 0;
    noAnswer = 0;
    totalAnswers = 5;
    var notAnsweredArr = [];

    generateQuestion = function () {
        questionIndex = notAnsweredArr[0];
        // randomPick = questions[questionIndex];
        answersPick = notAnsweredArr[0].choices;
        correctAnswer = notAnsweredArr[0].answer;

        $("#question").html("<h1>" + questionIndex.question + "</h1>");
        $("#answer1").html(`<h4>${answersPick[0]}</h4>`);
        $("#answer2").html(`<h4>${answersPick[1]}</h4>`);
        $("#answer3").html(`<h4>${answersPick[2]}</h4>`);
        $("#answer4").html(`<h4>${answersPick[3]}</h4>`);

    }

    $(".buttons").on("click", function (event) {

        event = parseInt($(this).attr("data-value"));

        if (event === correctAnswer) {
            rightAnswer++;
            console.log(rightAnswer);
            notAnsweredArr.shift();
            generateQuestion();
            clock = 10;

        } else if (event != correctAnswer) {
            wrongAnswer++;
            console.log(wrongAnswer);
            notAnsweredArr.shift();
            generateQuestion();
            clock = 10;
        }

        if (wrongAnswer + rightAnswer + noAnswer === totalAnswers) {

            stopClock();
            $("#questionAnswer").empty();
            $("#questionAnswer").html("<h1>All questions have been answered!  Here's how you did: </h1>");
            $("#questionAnswer").append("<h2> Correct: " + rightAnswer + "</h2>");
            $("#questionAnswer").append("<h2> Incorrect: " + wrongAnswer + "</h2>");
            $("#questionAnswer").append("<h2> Unanswered: " + noAnswer + "</h2>");
            $("#reset").show();

        }

    });

    $('#startBtn').on("click", function () {
        $("#startBtn").hide();
        $("#reset").hide();

        for (i = 0; i < questions.length; i++) {
            notAnsweredArr.push(questions[i]);
        }
        generateQuestion();
        timerStart();

    });

    $('#reset').on("click", function () {
       alert("hello");
    })

    function timerStart() {
        if (!clockRunning) {
            intervalId = setInterval(runClock, 1050);
            clockRunning = true;
        }
    }

    function runClock() {
        $("#timer").html(`<h1>Time Left: ${clock}</h1>`);
        clock--;

        if (clock === 0) {
            noAnswer++;
            setTimeout(function () {
                alert("Sorry. Time is up!");
                notAnsweredArr.shift();
                noAnswer++;
                generateQuestion();
                clock = 10;
                timerStart();
            }, 2000);
        }
    }

    function stopClock() {
        running = false;
        $("#timer").empty();
        $("#timer").html(`<button id="reset">Reset</button>`);
        clearInterval(intervalId);
    }

})
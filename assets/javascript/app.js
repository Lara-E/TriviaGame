var answeredCorrect = 0;
var answeredIncorrect = 0;
var unanswered = 0;
var currentQuestion = 0;
var intervalId;
var count = 10;
var isRunning
var nextQuestion

var questionSet = [{

    question: "Which bird has eyes that are larger than its brain?",
    possibleAnswers: ["Emporer Penguin", "Ostrich", "Great Horned Owl", "Raven"],
    correctAnswer: 1,
    image: "assets/images/ostrich.jpg",
    displayAnswer: "Ostrich"
},
{
    question: "What is the only mammal born with horns?",
    possibleAnswers: ["Rhinoceros", "Hippopotamus", "Giraffe", "Antelope"],
    correctAnswer: 2,
    image: "assets/images/giraffe.jpg",
    displayAnswer: "Giraffe"
},
{
    question: "Cynophobia is the fear of what kind of animal?",
    possibleAnswers: ["Dogs", "Cats", "Rabbits", "Chickens"],
    correctAnswer: 0,
    image: "assets/images/dogs.jpg",
    displayAnswer: "Dogs"
},
{
    question: "Which breed of horse is best known for its use in racing?",
    possibleAnswers: ["Appaloosa", "Clydesdale", "Mustang", "Thoroughbred"],
    correctAnswer: 3,
    image: "assets/images/thoroughbred.jpg",
    displayAnswer: "Thoroughbred"
},
{
    question: "What is the only bird known to fly backwards?",
    possibleAnswers: ["Hummingbird", "Eagle", "Turkey", "Duck"],
    correctAnswer: 0,
    image: "assets/images/hummingbird.jpg",
    displayAnswer: "Hummingbird"
},
{
    question: "A panda's daily diet consists almost entirely of what?",
    possibleAnswers: ["Grass", "Bamboo", "Fruit", "Meat"],
    correctAnswer: 1,
    image: "assets/images/panda.jpg",
    displayAnswer: "Bamboo"
},
{
    question: "The cheetah is the fastest land animal; what is the second fastest?",
    possibleAnswers: ["Lion", "Greyhound", "Pronghorn", "Gazelle"],
    correctAnswer: 2,
    image: "assets/images/antelope.jpg",
    displayAnswer: "Pronghorn"
},
{
    question: "Other than humans, what is the only primate capable of having blue eyes?",
    possibleAnswers: ["Orangutan", "Howler Monkey", "Capuchin Monkey", "Black Lemur"],
    correctAnswer: 3,
    image: "assets/images/lemur.jpg",
    displayAnswer: "Black Lemur"
},
{
    question: "What is the national animal of Scotland?",
    possibleAnswers: ["Red Deer", "Scottish Terrier", "Shetland Pony", "Unicorn"],
    correctAnswer: 3,
    image: "assets/images/unicorn.jpg",
    displayAnswer: "Unicorn"
},
{
    question: "Vulpine refers to which species of animal?",
    possibleAnswers: ["Bear", "Fox", "Wolf", "Tiger"],
    correctAnswer: 2,
    image: "assets/images/fox.jpg",
    displayAnswer: "Fox"
}];

function resetGame() {
    $(".clear").hide();
    $("#restart").show();
    question.html("Correct Answers: " + answeredCorrect);
    $question.append("Incorrect Answers: " + answeredIncorrect);
    $("#message").append("Unanswered: " + unanswered);
}


function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    isRunning = true;
}

function decrement() {
    count--;
    $("#timer").html("<h2>Time Remaining: " + count + "</h2>");
    if (count === 0) {
        stop();
        unanswered++;
        noAnswer()
    }
}
function stop() {
    clearInterval(intervalId);
    isRunning = false;
}
$("#next").on("click", function () {
    $("#message").empty();
    $("#image").empty();
    nextQuestion()
});
var images = $("<img>")
var question = $("<h3>")
var message = $("<div>")
var buttonDiv = $("<div>")

function correct() {
    var imageTimer = setTimeout(function () {
        displayOne()
    }, 3000);
    $("buttons").remove();
    var messageContent = $("<p>");
    var images = $("<img>")
    messageContent.html("Correct!")
    messageContent.addClass("clear");
    $(".game").append(messageContent);
    $(messageContent).append(images);
    images.addClass("clear")
    images.attr("src", questionSet[currentQuestion].image);
    currentQuestion++;
    if (currentQuestion > questionSet.length) {
        clearTimeout(imageTimer);
        resetGame();
    }
}

function incorrect() {
    var imageTimer = setTimeout(function () {
        displayOne()
    }, 3000);
    var messageContent = $("<p>");
    var images = $("<img>")
    messageContent.html("Sorry, the correct answer is " + questionSet[currentQuestion].displayAnswer + ".")
    messageContent.addClass("clear");
    $(".game").append(messageContent);
    $(messageContent).append(images);
    images.addClass("clear")
    images.attr("src", questionSet[currentQuestion].image);
    currentQuestion++;
    if (currentQuestion > questionSet.length) {
        clearTimeout(imageTimer);
        resetGame();
    }
}

function noAnswer() {
    var imageTimer = setTimeout(function () {
        displayOne()
    }, 3000);
    var messageContent = $("<p>");
    var images = $("<img>")
    messageContent.addClass("clear");
    messageContent.html("You ran out of time, the correct answer is " + questionSet[currentQuestion].displayAnswer + ".")
    $(".game").append(messageContent);
    $(messageContent).append(images);
    images.addClass("clear")
    images.attr("src", questionSet[currentQuestion].image);
    currentQuestion++;
    if (currentQuestion > questionSet.length) {
        clearTimeout(imageTimer);
        resetGame();
    }
}

function displayOne() {
    $(".clear").remove()
    var ask = questionSet[currentQuestion]
    question.html(ask.question);
    $(".game").append(question);
    startTimer();
    for (var i = 0; i < ask.possibleAnswers.length; i++) {
        var choicesBtn = $("<button>");
        choicesBtn.addClass("button");
        choicesBtn.attr("data-number", i);
        choicesBtn.html(ask.possibleAnswers[i]);
        question.append(buttonDiv)
        $(buttonDiv).append(choicesBtn);

        $(".button").on("click", function () {
            console.log(choicesBtn)
            $(".button").remove();
            var guessed = parseInt($(this).attr("data-number"));
            if (guessed === ask.correctAnswer) {
                answeredCorrect++;
                stop();
                $("#timer").hide();
                correct()

            }
            else if (guessed !== ask.correctAnswer) {
                answeredIncorrect++;
                stop();
                $("#timer").hide();
                incorrect();
            };
        });
    };
}

$("document").ready(function () {
    $("#restart").hide()

    $("#start").on("click", function () {
        $("#start").hide();
        displayOne();
    });

    $("#restart").on("click", function () {
        answeredCorrect = 0;
        answeredIncorrect = 0;
        unanswered = 0;
        count = 10;
        currentQuestion = 0;
        $("#start").show();
    });
});

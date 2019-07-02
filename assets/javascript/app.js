

$("document").ready(function () {
    $("#restart").hide();
    $("#timer").hide();

    var answeredCorrect = 0;
    var answeredIncorrect = 0;
    var unanswered = 0;
    var currentQuestion = -1;
    var intervalId;
    var count = 16;
    var isRunning = false;

    var questionSet = [{

        question: "Which bird has eyes that are larger than its brain?",
        possibleAnswers: ["Emporer Penguin", "Ostrich", "Great Horned Owl", "Raven"],
        correctAnswer: 1,
        image: "assets/images/ostrich.jpg",
        displayAnswer: "Ostrich",
        fact: "Ostrich's have the largest eyes of any land animal, roughly the size of a billiards ball."
    },
    {
        question: "What is the only mammal born with horns?",
        possibleAnswers: ["Rhinoceros", "Hippopotamus", "Giraffe", "Antelope"],
        correctAnswer: 2,
        image: "assets/images/giraffe.jpg",
        displayAnswer: "Giraffe",
        fact: "The horns of a newborn giraffe are made of cartilage and not yet attached to the skull. As it grows older, the cartilage is replaced with bone and fused to the skull through a process known as ossification."
    },
    {
        question: "Cynophobia is the fear of what kind of animal?",
        possibleAnswers: ["Dogs", "Cats", "Rabbits", "Chickens"],
        correctAnswer: 0,
        image: "assets/images/dogs.jpg",
        displayAnswer: "Dogs",
        fact: "Cynophobia comes from Greek words that mean “dog” (cyno) and “fear” (phobia)."
    },
    {
        question: "Which breed of horse is best known for its use in racing?",
        possibleAnswers: ["Appaloosa", "Clydesdale", "Mustang", "Thoroughbred"],
        correctAnswer: 3,
        image: "assets/images/thoroughbred.jpg",
        displayAnswer: "Thoroughbred",
        fact: "A Thoroughbred named Winning Brew holds the record for fastest speed achieved by a horse. At two years old she was clocked going 43.97 mph."
    },
    {
        question: "What is the only bird known to fly backwards?",
        possibleAnswers: ["Hummingbird", "Eagle", "Turkey", "Duck"],
        correctAnswer: 0,
        image: "assets/images/hummingbird.jpg",
        displayAnswer: "Hummingbird",
        fact: "The hummingbird has a unique muscle and wing structure that allows them to hover, fly right to left, left to right, diagonal, forwards, and backwards."
    },
    {
        question: "A panda's daily diet consists almost entirely of what?",
        possibleAnswers: ["Grass", "Bamboo", "Fruit", "Meat"],
        correctAnswer: 1,
        image: "assets/images/panda.jpg",
        displayAnswer: "Bamboo",
        fact: "Bamboo makes up 99% of a panda's diet, an adult Panda consumes 20-40 pounds of bamboo a day."
    },
    {
        question: "Clocking in at up to 75 mph, the cheetah is the fastest land animal; what is the second fastest?",
        possibleAnswers: ["Lion", "Greyhound", "Pronghorn", "Gazelle"],
        correctAnswer: 2,
        image: "assets/images/antelope.jpg",
        displayAnswer: "Pronghorn",
        fact: "Pronghorns can run up to 61 mph and are the fastest animal over long distances. Gazelles and lions can run up to 50 mph, while greyhounds reach up to 45 mph."
    },
    {
        question: "Other than humans, what is the only primate capable of having blue eyes?",
        possibleAnswers: ["Orangutan", "Howler Monkey", "Capuchin Monkey", "Black Lemur"],
        correctAnswer: 3,
        image: "assets/images/lemur.jpg",
        displayAnswer: "Black Lemur",
        fact: "Black lemurs are only found in Madagascar. Although males are completely black, females are reddish brown or blonde. Both sexes have blue or blue-grey eyes."
    },
    {
        question: "What is the national animal of Scotland?",
        possibleAnswers: ["Red Deer", "Scottish Terrier", "Shetland Pony", "Unicorn"],
        correctAnswer: 3,
        image: "assets/images/unicorn.jpg",
        displayAnswer: "Unicorn",
        fact: "The unicorn was first used on the Scottish royal coat of arms by William I in the 12th century. Many of Scotland’s most important historic buildings and statues feature the unicorn, including Edinburgh Castle."
    },
    {
        question: "Vulpine refers to which species of animal?",
        possibleAnswers: ["Bear", "Fox", "Wolf", "Tiger"],
        correctAnswer: 1,
        image: "assets/images/fox.jpg",
        displayAnswer: "Fox",
        fact: "A male fox is refered to as a dog fox, a female is a vixen and young foxes are kits. A group of foxes is called a skulk or a leash."
    }];

    function resetGame() {
        var totalsOne = $("<p>");
        var totalsTwo = $("<p>")
        stop();
        $(".clear").remove();
        $("#restart").show();
        question.html("Correct Answers:  " + answeredCorrect);
        question.append(totalsOne);
        totalsOne.html("<p>Incorrect Answers:  " + answeredIncorrect + "<p>");
        totalsTwo.append(totalsOne);
        totalsTwo.html("<p>Unanswered:  " + unanswered + "<p>");
    }

    function startTimer() {
        if (isRunning) return;
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        isRunning = true;
    }

    function decrement() {
        count--;
        $("#timer").html("<h2>Time Remaining: " + count + "</h2>");
        if (count === 0) {
            stop();
            noAnswer();
        }
    }
    function stop() {
        if (!isRunning) return;
        clearInterval(intervalId);
        isRunning = false;
        count = 16;
        $(".button").remove();

    }
    var images = $("<img>");
    var question = $("<h3>");
    var buttonDiv = $("<div>");

    function correct() {
        stop()
        answeredCorrect++;
        var imageTimer = setTimeout(function () {
            displayOne()
        }, 5000);
        $("buttons").remove();
        var messageContent = $("<p>");
        var facts = $("<p>");
        messageContent.html("Correct!")
        messageContent.addClass("clear");
        $(".game").append(messageContent);
        messageContent.append(images);
        images.addClass("clear");
        images.attr("src", questionSet[currentQuestion].image);
        facts.html(questionSet[currentQuestion].fact);
        facts.addClass("clear");
        messageContent.append(facts);
        if (currentQuestion === questionSet.length - 1) {
            clearTimeout(imageTimer);
            setTimeout(resetGame, 5000);
        }
    }

    function incorrect() {
        stop()
        var imageTimer = setTimeout(function () {
            displayOne()
        }, 5000);
        answeredIncorrect++;
        var messageContent = $("<p>");
        var facts = $("<p>");
        messageContent.addClass("clear");
        messageContent.html("Sorry, the correct answer is " + questionSet[currentQuestion].displayAnswer + ".")
        $(".game").append(messageContent);
        $(messageContent).append(images);
        images.addClass("clear");
        images.attr("src", questionSet[currentQuestion].image);
        facts.html(questionSet[currentQuestion].fact);
        facts.addClass("clear");
        messageContent.append(facts);
        if (currentQuestion === questionSet.length - 1) {
            clearTimeout(imageTimer);
            setTimeout(resetGame, 5000);
        }
    }

    function noAnswer() {
        var imageTimer = setTimeout(function () {
            displayOne()
        }, 5000);
        unanswered++;
        var messageContent = $("<p>");
        var facts = $("<p>");
        messageContent.addClass("clear");
        messageContent.html("You ran out of time, the correct answer is " + questionSet[currentQuestion].displayAnswer + ".")
        $(".game").append(messageContent);
        $(messageContent).append(images);
        images.addClass("clear");
        images.attr("src", questionSet[currentQuestion].image);
        facts.html(questionSet[currentQuestion].fact);
        facts.addClass("clear");
        messageContent.append(facts);
        if (currentQuestion === questionSet.length - 1) {
            clearTimeout(imageTimer);
            setTimeout(resetGame, 5000);
        }
    }

    function increment() {
        currentQuestion++;
        return currentQuestion;
    }

    function displayOne() {
        increment();
        console.log(currentQuestion);
        $(".clear").remove()
        $("img").remove()
        $("p").remove()
        $(".button").remove()
        if (currentQuestion === questionSet.length) {
            resetGame();
        }
        else {
            var ask = questionSet[currentQuestion]
            question.html(ask.question);
            $(".game").append(question);
            startTimer();
            for (var i = 0; i < ask.possibleAnswers.length; i++) {
                var choicesBtn = $("<button>");
                choicesBtn.addClass("button");
                choicesBtn.attr("data-number", i);
                choicesBtn.html(ask.possibleAnswers[i]);
                question.append(buttonDiv);
                $(buttonDiv).append(choicesBtn);

                $(".button").on("click", function () {
                    $(".button").remove();
                    $(".clear").remove();
                    var guessed = parseInt($(this).attr("data-number"));
                    if (guessed === ask.correctAnswer) {
                        stop();
                        correct();

                    }
                    else if (guessed !== ask.correctAnswer) {
                        stop();
                        incorrect();
                    };
                });
            }
        };
    }

    $("#start").on("click", function () {
        $("#timer").show();
        $("#start").hide();
        displayOne();
    });

    $("#restart").on("click", function () {
        $("#timer").show();
        question.remove();
        $("#restart").hide();
        answeredCorrect = 0;
        answeredIncorrect = 0;
        unanswered = 0;
        count = 16;
        currentQuestion = -1;
        displayOne();
        $("#timer").html("<h2>Time Remaining: " + count + "</h2>");
    });
});

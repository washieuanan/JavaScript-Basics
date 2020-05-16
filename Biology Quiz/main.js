$(document).ready(function(){

  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);

})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  // questions options and answers data
  questions: {
    q1: 'What are the parts of a nucleotide?',
    q2: 'What does the backdone of DNA consist of?',
    q3: 'What does Adenine match with?',
    q4: 'What does Thymine match with?',
    q5: 'What does Guanine match with?',
    q6: 'What does Cytosine match with?',
    q7: 'What did Watson and Crick discover?',
    q8: 'What did Franklin photo show?'',
    q9: 'What is the purpose of Helicase?',
    q10: 'What is the purpose of Primase?',
    q11: 'What is the purpose of Polymerase?',
    q12: 'What is the purpose of Ligase?',
    q13: 'What is the name of particular section of DNA that is unzipped?',
    q14: 'What is done to that particular section (gene)?',
    q15: 'Where does mRNA go from the nucleus?',
    q16: 'How does the ribosome translate the mRNA into amino acids?',
    q17: 'What are the three steps of mutation?'
  },
  options: {
    q1: ['Sugar, Phosphate, Nitrogenous Base', 'Chromosome, Sugar, Nitrogenous Base', 'Phosphate, Protein, Sugar', 'Nothing'],
    q2: ['Sugar-Phosphate', 'Phosphate-Nitrogenous Base', 'Chromosomes', 'Proteins'],
    q3: ['Thymine', 'Cytosine', 'Guanine', 'Adenine'],
    q4: ['Adenine', 'Cytosine', 'Guanine', 'Cytosine'],
    q5: ['Adenine','Cytosine','Guanine','Thymine'],
    q6: ['Thymine','Guanine','Cytosine','Adenine'],
    q7: ['Double-Helix', 'Single-Helix', 'Triple-Helix','No Helix'],
    q8: ['An X', 'A double-helix', 'Nothing', 'Joe Mama'],
    q9: ['Unzip DNA', 'Sets Primer', 'Adds Complemenatry Bases', 'Glues new strand'],
    q10: ['Unzip DNA', 'Sets Primer', 'Adds Complemenatry Bases', 'Glues new strand'],
    q11: ['Unzip DNA', 'Sets Primer', 'Adds Complemenatry Bases', 'Glues new strand'],
    q12: ['Unzip DNA', 'Sets Primer', 'Adds Complemenatry Bases', 'Glues new strand'],
    q13: ['Gene', 'Chromosome', 'DNA', 'Protein'],
    q14: ['Transcribed into mRNA', 'Transcribed into RNA', 'Translated into Protein', 'Transcribed to a cookie'],
    q15: ['Ribosome', 'Endoplasmic Reticulum', 'Cytoplasm', 'Vacuole'],
    q16: ['Pairs mRNA codon with tRNA', 'It takes it back to the nucleus', 'It makes it RNA again', 'I do not know'],
    q17: ['Insertion, Deletion, Substitution', 'Multiplying, Dividing, Distributing', 'Square Root, Cube, Quadruple', 'I do not know']


  },
  answers: {
    q1: 'Sugar, Phosphate, Nitrogenous Base',
    q2: 'Sugar-Phosphate',
    q3: 'Thymine',
    q4: 'Adenine',
    q5: 'Cytosine',
    q6: 'Guanine',
    q7: 'Double-Helix',
    q8: 'An X',
    q9: 'Unzip DNA',
    q10: 'Sets Primer',
    q11: 'Adds Complemenatry Bases',
    q12: 'Glues new strand',
    q13: 'Gene',
    q14: 'Transcribed into mRNA',
    q15: 'Ribosome',
    q16: 'Pairs mRNA codon with tRNA',
    q17: 'Insertion, Deletion, Substitution',
  },
  // trivia methods
  // method to initialize game
  startGame: function(){
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // show game section
    $('#game').show();

    //  empty last results
    $('#results').html('');

    // show timer
    $('#timer').text(trivia.timer);

    // remove start button
    $('#start').hide();

    $('#remaining-time').show();

    // ask first question
    trivia.nextQuestion();

  },
  // method to loop through and display questions and options
  nextQuestion : function(){

    // set timer to 20 seconds each question
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    // to prevent timer speed up
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    // an array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // creates all the trivia guess options in the html
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })

  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // the time has run out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){

      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');

      // hide game sction
      $('#game').hide();

      // show start button to begin a new game
      $('#start').show();
    }

  },
  // method to evaluate the option clicked
  guessChecker : function() {

    // timer ID for gameResult setTimeout
    var resultId;

    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else{
      // turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }

  },
  // method to remove previous question results and options
  guessResult : function(){

    // increment to next question set
    trivia.currentSet++;

    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();

    // begin next question
    trivia.nextQuestion();

  }

}

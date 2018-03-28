var questions = {
  'groupOne': [
    {
      'Question': '¿Sabes si debes pagar a Laboratoria por la formación que recibirías en caso de s' +
          'er aceptada?',
      'Time': 45
    }, {
      'Question': '¿Sabes cuales son los pasos que siguen en el proceso de selección, posteriores a' +
          ' esta entrevista?',
      'Time': 30
    }, {
      'Question': '¿Cuál es tu mayor grado de Educación?',
      'Time': 60
    }
  ],
  'groupTwo': [
    {
      'Question': 'Si estás estudiando o estudiaste alguna carreara en el pasado, cuéntanos qué y p' +
          'or qué lo elegiste. Si no estudias o estuiaste, cuéntanos por qué no.',
      'Time': 60
    }, {
      'Question': '¿Qué papel jugaría Laboratoria en tu vida académica? ¿La ves más como un complem' +
          'ento a tus estudios o un cambio de tu carrera profesional?',
      'Time': 45
    }, {
      'Question': '¿Cuáles son tus aspiraciones de carrera profesional y porqué? ¿Cómo llegarás a e' +
          'so?',
      'Time': 60
    }, {
      'Question': 'Cuéntanos de una situación difícil o retadora que hayas tenido con un equipo de ' +
          'trabajo (en el estudio o trabajo), cómo reaccionaste tú frente a la situación y ' +
          'si tomaste alguna acción para ayudar a resolver el problema',
      'Time': 60
    }, {
      'Question': 'Basada en tu experiencia laboral o de estudios actual o pasada ¿Disfrutas más de' +
          ' las tareas que tienes que desempeñar en equipo o sola? ¿Por qué?',
      'Time': 45
    }
  ],
  'groupThree': [
    {
      'Question': '¿Cómo describirías a tu hogar, brevemente',
      'Time': 45
    }, {
      'Question': 'Describe una decisión difícil que te haya tocado enfrentar y cómo lo resolviste.' +
          ' ¿Qué aprendiste de esto? ¿Qué aprendiste de ti misma?',
      'Time': 60
    }, {
      'Question': '¿Qué cosas te gustan y cuales no de tu vida actual? Ya sea trabajo, amistades, e' +
          'tc. ',
      'Time': 45
    }, {
      'Question': '¿Qué otra cosa te gustaría que sepamos de ti para considerar en tu postulación a' +
          ' Laboratoria?',
      'Time': 30
    }, {
      'Question': '¿Qué habilidades esperas aprender estudiando en Laboratoria y cómo contribuirían' +
          ' a tu carrera profesional?',
      'Time': 45
    }, {
      'Question': '¿En dónde y en qué rol te ves trabajando apenas te gradues? ',
      'Time': 30
    }, {
      'Question': 'Si tuvieras una hora extra cada día qué harías con ella',
      'Time': 30
    }, {
      'Question': '¿De qué logro estás realmente orgullosa?',
      'Time': 45
    }, {
      'Question': '¿Qué superpoder querrías y por qué?',
      'Time': 60
    }
  ]
}

const numQuestionsRequired = [3, 2, 3]; // Preguntas requeridas por grupo
let arrAllQuestions = []; // todas las preguntas seleccionadas por grupo
let chosenQuestions = []; // Todas las preguntas por alumno

// desordena todas las preguntas
const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Selecciona las preguntas del usuario
const questionsSelectedUser = (questionsSelectedGroup) => {
  questionsSelectedGroup.forEach((question) => {
    chosenQuestions.push({question: question.Question, time: question.Time});
  });
}

// Itera sobre las preguntas
Object
  .keys(questions)
  .forEach((key, index) => {
    const group = questions[key];
    let orderRandomQuestions = shuffle(group);
    let questionsSelectedGroup = orderRandomQuestions.slice(0, numQuestionsRequired[index]); // seleccionar el numero de preguntas requeridas
    questionsSelectedUser(questionsSelectedGroup)
  });

var title = document.querySelector('.title-js');
var counter = document.querySelector('.counter-js');
var displayQuestion = document.querySelector('.question-js');
// var nextQuestion = document.querySelector('.next-question-js');

var centinel = 0;
displayQuestion.textContent = chosenQuestions[centinel].question;

// cronometro
let number = 20;

const timer = () => {
  let eventTimer = window.setInterval(function () {
    $('#timer').html(number);
    number--;
    if (number <= 0) {
      stopTimer()
    }
  }, 1000);
  const stopTimer = () => {
    clearInterval(eventTimer);
  }
};

timer();

function nextQuestion() {
  number = 20;
  timer();
  centinel += 1;
  title.textContent = 'Pregunta ' + (centinel + 1);
  counter.textContent = 'tiempo estimado ' + chosenQuestions[centinel].time;
  displayQuestion.textContent = chosenQuestions[centinel].question;
  if (centinel === 7) {
    nextQuestion
      .addEventListener('click', function () {
        title.textContent = 'Pregunta ' + (centinel);
        window.location.href = 'finish.html';
      })
  }
}

var mins = 00,
  segs,
  s,
  m;

$(document).on('click', '.uploadcare--widget__button_type_open', function (event) {
  
  $('.uploadcare--tab__title').prepend(`<p>${centinel+1}. ${chosenQuestions[centinel].question}</p>`)
  return $('.uploadcare--tab__content').append(`<div>Tiempo restante: <span id="minutos">00:</span><span id ="segundos">00</span></div>`);
});

// Para "Record a video"
$(document).on('click', '.uploadcare--camera__button_type_start-record', function (e) {
  e.preventDefault();
  $('#segundos').empty();
  var time = chosenQuestions[centinel].time;
  $('#segundos').text(time);
  segs = time - 1;
  m = setInterval('segundos()', 1000);
});

function segundos() {
  $('#segundos').html(segs);
  if (segs == 0) {
    var dm = clearInterval(m);
    s = setInterval('minutos()', 1000);
  }
  segs--;
}

function minutos() {
  $('#minutos').html(mins);
  if (mins == 0) {
    location.reload();
    var ds = clearInterval(s);
  }
  mins--;
}
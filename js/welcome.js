// redireccionando
var initButton = document.querySelector('.init-js');

let ready = document.querySelector('#ready');
console.log(ready);

ready.addEventListener('click', function () {
  window.location.href = '../views/question.html'
})
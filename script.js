let yourVote = document.querySelector('.first--division-first-text span');
let role = document.querySelector('.first--division-second-text span');
let description = document.querySelector('.first--division-show');
let warning = document.querySelector('.second--division');
let photosRight = document.querySelector('.first--division-right');
let numbers = document.querySelector('.first--division-input');

let votes = [];
let actualStage = 0;
let number = '';
let voteWhite = false;

function beginningStage() {
  let stage = stages[actualStage];

  let numberHtml = '';
  number = '';
  oteWhite = false;

  for (let i = 0; i < stage.numbers; i++) {
    if (i === 0) {
      numberHtml += '<div class="numbers flash"></div>';
    } else {
      numberHtml += '<div class="numbers"></div>';
    }
  }

  yourVote.style.display = 'none';
  role.innerHTML = stage.title;
  description.innerHTML = '';
  warning.style.display = 'none';
  photosRight.innerHTML = '';
  numbers.innerHTML = numberHtml
}

function updateInterface() {
  let stage = stages[actualStage];
  let candidate = stage.candidates.filter((item) => {
    if (item.number === number) {
      return true;
    } else {
      return false;
    }
  });
  if (candidate.length > 0) {
    candidate = candidate[0];
    yourVote.style.display = 'block';
    role.innerHTML = stage.title;
    description.innerHTML = `Nome: ${candidate.name}<br /> Partido: ${candidate.partie}`;
    warning.style.display = 'block';

    let photosHtml = '';
    for (let i in candidate.photos) {
      if(candidate.photos[i].small)
        photosHtml += `<div class="first--division-images small"><img src="images/${candidate.photos[i].url}" alt="">${candidate.photos[i].legend}</div>`;
        else 
        photosHtml += `<div class="first--division-images"><img src="images/${candidate.photos[i].url}" alt="">${candidate.photos[i].legend}</div>`;
    }

    photosRight.innerHTML = photosHtml;
  } else {
    yourVote.style.display = 'block';
    warning.style.display = 'block';
    description.innerHTML = `<div class="big-warning flash">VOTO NULO</div>`;
  }
}

function clickIn(num) {
  let numberFlash = document.querySelector('.numbers.flash');
  if (numberFlash !== null) {
    numberFlash.innerHTML = num;
    number = `${number}${num}`;

    numberFlash.classList.remove('flash');
    if (numberFlash.nextElementSibling !== null) {
      numberFlash.nextElementSibling.classList.add('flash');
    } else {
      updateInterface();
    }
  }
}

function clickWhite() {
  if (number === '') {
    voteWhite = true;
    yourVote.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = `<div class="big-warning flash">VOTO BRANCO</div>`;
  }
}

function clickCorrect() {
  beginningStage();
}

function clickConfirm() {
  let stage = stages[actualStage];
  let voteConfirmed = false;

  if (voteWhite === true) {
    voteConfirmed = true;
    alert('Voto em Branco');
    votes.push({
      stage: stages[actualStage].title,
      vote: 'Branco'
    });
  } else if (number.length === stage.numbers) {
    voteConfirmed = true;
    votes.push({
      stage: stages[actualStage].title,
      vote: number
    });
  }

  if (voteConfirmed) {
    actualStage++;
    if (stages[actualStage] !== undefined) {
      beginningStage();
    } else {
      document.querySelector('.screen').innerHTML = `<div class="bigest-warning">FIM</div>`;
      console.log(votes);
    }
  }
}
beginningStage();
jQuery(document).ready( function ($) {


	//Максимальное количество выводимых за раз вопросов. Если нужно убрать ограничение, то задается false.
	var questionsCount = 20;


	var questions = [];






	/******************************************************
	*

	 	ФОРМА ДОБАВЛЕНИЯ НОВОГО ВОПРОСА: 

		questions.push({

			'question' : 'Текст вопроса ?',

			'options' : [

				'вариант ответа 1',                             // индекс 0
				'вариант 2 (правильный в данном случае)',		// индекс 1
				'вариант 3',									// индекс 2
				'вариант N'										// индекс 3

			],
			
			//НОМЕР ПРАВИЛЬНОГО ОТВЕТА (ОТСЧЕТ НАЧИНАЕТСЯ С НУЛЯ (это индекс элемента массива) ):
			'right' : 1,

			//НАЗВАНИЕ КАРТИНКИ В ПАПКЕ images. ЕСЛИ КАРТИНКА НЕ НУЖНА, ТО ПРОСТО НЕ ПИСАТЬ НИЧЕГО,
			//ЛИБО НАПИСАТЬ 'image':''
			'image' : 'Ремарк.jpg'

		});




	НОРМАЛЬНЫЙ ПРИМЕР С КАРТИНКОЙ: 

		questions.push({

			'question' : 'Произведение Э.М.Ремарка?',

			'options' : [

				'Мертвые души',
				'Три товарища',
				'Человек-невидимка',
				'Кто такой Ремарк?'

			],

			'right' : 1,

			'image' : 'Ремарк.jpg'

		});




	ТО ЖЕ САМОЕ БЕЗ КАРТИНКИ: 

		questions.push({

			'question' : 'Произведение Э.М.Ремарка?',

			'options' : [

				'Мертвые души',
				'Три товарища',
				'Человек-невидимка',
				'Кто такой Ремарк?'

			],

			'right' : 1

		});



	UPD: ЕСЛИ ПРАВИЛЬНЫХ ВАРИАНТОВ ОТВЕТА НЕСКОЛЬКО, ТО ИНДЕКСЫ ЗАПИСЫваЮТСЯ В МАССИВ
	ПРИМЕР

		'right' : [1, 3]


	*
	******************************************************/








	////////ВОПРОСЫ////////


	questions.push({

		'question' : ' Для монополии НЕверно, что',

		'options' : [

			'точка пересечения средних переменных издержек и предельных издержекявляется точкой минимума средних переменных издержек, еслиу функции средних переменных издержек есть точка минимума',
			'с помощью потоварной субсидии государство НЕ всегда может добиться выпуска на уровне ситуации совершенной конкуренции',
			'сумма безвозвратных потерь общества от монопольной власти больше нуля, если функция спроса не является абсолютно эластичной',
			'введение налога на прибыль не влияет на благосостояние потребителей'

		],

		'right' : [2,3]
		
	});
		
	questions.push({

		'question' : ' Для монополии НЕверно, что',

		'options' : [

			'точка пересечения средних переменных издержек и предельных издержекявляется точкой минимума средних переменных издержек, еслиу функции средних переменных издержек есть точка минимума',
			'с помощью потоварной субсидии государство НЕ всегда может добиться выпуска на уровне ситуации совершенной конкуренции',
			'сумма безвозвратных потерь общества от монопольной власти больше нуля, если функция спроса не является абсолютно эластичной',
			'введение налога на прибыль не влияет на благосостояние потребителей'

		],

		'right' : [2,3]

		

	});

	questions.push({

		'question' : 'Предполагая, что количественная теория денег верна, чему равен темп инфляции, если темпы прироста совокупного выпуска совпадают с темпами прироста денежной массы?',

		'options' : [

			'Темп инфляции равен нулю, т.к. согласно количественной теории денег изменение денежной массы не влияет на номинальные показатели.',
			'Темп инфляции равен нулю, т.к. согласно количественной теории денег изменение денежной массы не влияет на реальные показатели.',
			'Темп инфляции равен темпу прироста скорости обращения денег. ',
			'Темп инфляции равен темпу прироста денежной массы.'

		],

		'right' : 2

	});

	questions.push({

		'question' : 'Выберите верное утверждение',

		'options' : [

			'Сальдо торгового баланса равно разнице между экспортом и импортом товаров и услуг.',
			'Устранение импортных пошлин способствует защите экономикиот внешней конкуренции.',
			'Запрет ввоза какого-либо товара в страну носит название меркантилизм',
			'Наименее развитые страны не имеют ни абсолютных, ни сравнительных преимуществ при торговле в рамках сравнения их производственных возможностей.'

		],

		'right' : 0

		

	});

	

	///////////////////////




	// ДАЛЬШЕ МОЖНО НЕ ЧИТАТЬ НИЧЕГО


	function compareRandom(a, b) {
  		return Math.random() - 0.5;
	}

	questions.sort(compareRandom);

	if (questionsCount){

		if (questionsCount < questions.length) {

			questions = questions.slice(0, questionsCount );

		}
		else{

			questionsCount = questions.length;
		
		}

	}

	var container = $('.questions-window .window-content');

	questions.forEach( function (questionItem, index, arr){

		var questionContainer = $('<div>', {class: 'question'});

		var question = questionItem['question'];
		var questionH2 = $('<h2>', { text: question, class: 'question-title' });

		if(questionItem['image']){
			var image = $('<img>', { src: 'images/' + questionItem['image'] });
		}
		
		var optionsContainer = $('<div>', {class: 'options'});

		questionItem['options'].forEach( function (item, i, arr) {

			var paragraph = $('<p>');
			var label = $('<label>', {text: item});

			if( Array.isArray( questionItem['right'] ) ){ //if 1 option right

				if( questionItem['right'].indexOf( i ) != -1 ){
					var input = $('<input>', { type: 'radio', name: index, id: 'right' });
				}
				else{
					var input = $('<input>', { type: 'radio', name: index });
				}
	
			}
			else{

				if( i == questionItem['right'] ){
					var input = $('<input>', { type: 'radio', name: index, id: 'right' });
				}
				else{
					var input = $('<input>', { type: 'radio', name: index });
				}

			}


			label.prepend(input);
			paragraph.append(label);
			optionsContainer.append(paragraph);

		});

		questionContainer.append(questionH2);
		questionContainer.append(image);
		questionContainer.append(optionsContainer);
		container.append(questionContainer);

		var hr = $('<hr>');
		container.append(hr);

	});



	var rightAnswers = {}; //Right - selected, wrong - false
	var wrongAnswers = {}; //Right - false, wrong - [selected, [right_answers]]

	$('.questions-window').fadeIn(200);

	var rightAnswersArray = [];

	$('input').click( function(e) {

		if( $(this).attr('id') ){

			rightAnswers[ $(this).attr('name') ] = $(this).parent().text();

			wrongAnswers[ $(this).attr('name') ] = false;

		}
		else{

			rightAnswersArray = [];

			var number = $(this).attr('name');

			rightAnswers[ number ] = false;

			var localAnswersInputs = $(this).parent().parent().parent().find('p label input');

			var selectedAnswer = $(this).parent().text();

			localAnswersInputs.each( function(i) {

				if( $(this).attr('id') ){

					var right =  $(this).parent().text();

					rightAnswersArray.push( right );
				
				}

			});

			wrongAnswers[ number ] = [  selectedAnswer, rightAnswersArray ];  //[selected, right_answers]


		}

	});


	$('.question').click( function () {

		if( event.target.tagName == 'INPUT' ){
			$(this).next().css('border-color', '#F8F801');
		}

	});


	$('.end').click( function () { //results output


		$('.answer-result').remove();
		$('.answers-window hr').remove();

		var rightAnswersArray = [];

		$('.question').each( function(i) {

			var inputs = $(this).find('.options p label input');

			var checkedCounter = 0;

			rightAnswersArray = [];

			var rightAnswer = '';

			inputs.each( function (i) {

				if( $(this).prop('checked') ){
				
					checkedCounter++;
				
				}

				if( $(this).attr('id') ){
				
					rightAnswer = $(this).parent().text();
					rightAnswersArray.push( rightAnswer );
				
				}

			});


			if( !checkedCounter ){

				rightAnswers[ i ] = false;

				wrongAnswers[ i ] = [  'не выбрано', rightAnswersArray ];

			}

		});

		console.log(rightAnswers);
		console.log(wrongAnswers);


		$('.answers-window').slideDown(200);

		var answersContainer = $('.answers-window .window-content');

		var rightAnswersCount = 0;
		for (answerNumber in rightAnswers) {


			var resultContainer = $('<div>', {class: 'answer-result'});
			var questionH4 = $('<h4>', { text: $('.question:eq(' + answerNumber + ') h2').text() });


  			if( rightAnswers[answerNumber] ){

  				rightAnswersCount++;

  				var paragraph = $('<p>', { text: 'Ваш ответ правильный: ' });
  				var span = $('<span>', { class: 'right-answer' , text: rightAnswers[answerNumber] })

  				paragraph.append(span);
  				resultContainer.append(paragraph);

  			}
  			else{

  				var wrongParagraph = $('<p>', { text: 'Ваш неправильный ответ: ' });
  				var wrongSpan = $('<span>', { class: 'wrong-answer', text: wrongAnswers[answerNumber][0] });

  				wrongParagraph.append(wrongSpan);
  				resultContainer.append(wrongParagraph);


  				wrongAnswers[answerNumber][1].forEach( function (elem, i, arr) {

  					var rightParagraph = $('<p>', { text: 'Правильный ответ ' + ( Number(i) + 1 ) + ': ' });
  					var rightSpan = $('<span>', { class: 'right-answer', text: wrongAnswers[answerNumber][1][i] });

  					rightParagraph.append(rightSpan);
  					resultContainer.append(rightParagraph);

  				});

  			}


  			resultContainer.prepend(questionH4);

  			answersContainer.append(resultContainer);

  			var hr = $('<hr>');
  			answersContainer.append(hr);

		}


		$('.result').text( rightAnswersCount + ' из ' + questionsCount);

		var destination = $('.result').offset().top;
		$('html, body').animate({ scrollTop: destination }, 600);


	});




});

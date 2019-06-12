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
			
			//ИНДЕКС ПРАВИЛЬНОГО ОТВЕТА (ОТСЧЕТ НАЧИНАЕТСЯ С НУЛЯ):
			'right' : 1,

			//НАЗВАНИЕ КАРТИНКИ В ПАПКЕ images С ЕЕ РАСШИРЕНИЕМ. ЕСЛИ КАРТИНКА НЕ НУЖНА, ТО ПРОСТО НЕ ПИСАТЬ НИЧЕГО,
			//ЛИБО НАПИСАТЬ 'image':''
			'image' : 'Картинка.jpg'

		});




	НОРМАЛЬНЫЙ ПРИМЕР С КАРТИНКОЙ:

		questions.push({

			'question' : 'Произведение Э.М.Ремарка?',

			'options' : [

				'Теремок',
				'Три товарища',
				'Колобок',
				'Репка'

			],

			'right' : 1,

			'image' : 'Ремарк.jpg'

		});




	ТО ЖЕ САМОЕ БЕЗ КАРТИНКИ: 

		questions.push({

			'question' : 'Произведение Э.М.Ремарка?',

			'options' : [

				'Теремок',
				'Три товарища',
				'Колобок',
				'Репка'

			],

			'right' : 1

		});


	*
	******************************************************/








	////////ВОПРОСЫ////////


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

	questions.push({

		'question' : 'Сколько углов у квадрата?',

		'options' : [

			'0',
			'2',
			'4'

		],

		'right' : 2,

	});

	questions.push({

		'question' : 'Еще один вопрос?',

		'options' : [

			'Правильный ответ',
			'Неправильный ответ',
			'Еще один неправильный ответ',
			'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты.'

		],

		'right' : 0,

		'image' : 'Река.jpg'

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


			if( i == questionItem['right'] ){
				var input = $('<input>', { type: 'radio', name: index, id: 'right' });
			}
			else{
				var input = $('<input>', { type: 'radio', name: index });
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
	var wrongAnswers = {}; //Right - false, wrong - [selected, right]

	$('.questions-window').fadeIn(200);

	$('input').click( function(e) {

		if( $(this).attr('id') ){

			rightAnswers[ $(this).attr('name') ] = $(this).parent().text();

			wrongAnswers[ $(this).attr('name') ] = false;

		}
		else{

			var number = $(this).attr('name');

			rightAnswers[ number ] = false;

			var localAnswersInputs = $(this).parent().parent().parent().find('p label input');

			var selectedAnswer = $(this).parent().text();

			localAnswersInputs.each( function(i) {

				if( $(this).attr('id') ){
				
					wrongAnswers[ number ] = [  selectedAnswer, $(this).parent().text() ];  //[selected, right]
				
				}

			});


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

		$('.question').each( function(i) {

			var inputs = $(this).find('.options p label input');

			var checkedCounter = 0;

			var rightAnswer = '';

			inputs.each( function (i) {

				if( $(this).prop('checked') ){
				
					checkedCounter++;
				
				}

				if( $(this).attr('id') ){
				
					rightAnswer = $(this).parent().text();
				
				}

			});


			if( !checkedCounter ){

				rightAnswers[ i ] = false;

				wrongAnswers[ i ] = [  'не выбрано', rightAnswer ];

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

  				var rightParagraph = $('<p>', { text: 'Правильный ответ: ' });
  				var rightSpan = $('<span>', { class: 'right-answer', text: wrongAnswers[answerNumber][1] });

  				wrongParagraph.append(wrongSpan);
  				rightParagraph.append(rightSpan);

  				resultContainer.append(wrongParagraph);
  				resultContainer.append(rightParagraph);


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
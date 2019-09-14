'use strict';
(function () {
	var setup =  document.querySelector('.setup');
	var userNameInput = setup.querySelector('.setup-user-name');
	var focusUserNameInput = false;
	var setupSimilarList = document.querySelector('.setup-similar-list');
	var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
	var setupPlayer = setup.querySelector('.setup-player');
	var wizardCoat = setupPlayer.querySelector('.wizard-coat');
	var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
	var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
	
	window.getRandomItem = function (arr) {
        return arr[(Math.floor(Math.random() * arr.length))];
    };
	
	var partsWizard = {
		name: 'NAME',
		surname: 'SURNAME',
		coat: 'COAT',
		eyes: 'EYES',
		fireball: 'FIREBALL'
	}
	
	var wizards = [];
	
	var renderWizards =  function () {
		let arrObj = {
			name: window.identify(partsWizard.name) + ' ' + window.identify(partsWizard.surname),
			coatColor: window.colorize.defaults(partsWizard.coat),
			eyesColor: window.colorize.defaults(partsWizard.eyes)
		}
		return arrObj;
	}
	
	for (var i = 0; i < 4; i++) {
		wizards[i] = renderWizards();
	}
	
	var renderWizard = function (wizard) {
		var wizardElement = similarWizardTemplate.cloneNode(true);
	
		wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
		wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
		wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
	
		return wizardElement;
	};
	
	var fragment = document.createDocumentFragment();
	
	for (var i = 0; i < wizards.length; i++) {
		fragment.appendChild(renderWizard(wizards[i]));
	};
	
	setupSimilarList.appendChild(fragment);
	setup.querySelector('.setup-similar').classList.remove('hidden');
	
	window.colorize.changes(wizardCoat, partsWizard.coat);
	window.colorize.changes(wizardEyes, partsWizard.eyes);
	window.colorize.changes(fireball, partsWizard.fireball);
	
	// когда курсор в поле userName при нажитии на esc форма не закрывается, надо додлеать, тк постоянных не в этом файле
	userNameInput.addEventListener('keydown', function (evt) {
		focusUserNameInput = (evt.keyCode === ESC_KEYCODE)? true : false;
	});

	var form = document.querySelector('.setup-wizard-form');
	form.addEventListener('submit', function (evt) {
		window.upload(new FormData(form), function (response) {
			setup.classList.add('hidden')
		})
		evt.preventDefault();
	})
})();

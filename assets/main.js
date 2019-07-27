import "./main.css";
import './fonts/alegreya/Alegreya-Regular.woff';
import './fonts/alegreya/Alegreya-Italic.woff';
import './fonts/alegreya/Alegreya-Bold.woff';
import './fonts/alegreya/Alegreya-BoldItalic.woff';
import './fonts/alegreya/Alegreya-Black.woff';
import './fonts/alegreya/Alegreya-Regular.woff2';
import './fonts/alegreya/Alegreya-Italic.woff2';
import './fonts/alegreya/Alegreya-Bold.woff2';
import './fonts/alegreya/Alegreya-BoldItalic.woff2';
import './fonts/alegreya/Alegreya-Black.woff2';
import './zoom.min.js';

(function() {
	var menuButton = document.getElementById('menu-button');
	var menu = document.getElementById('menu');
  menuButton.addEventListener('click', function() {
		var expanded = this.getAttribute('aria-expanded') === 'true' || false;
  	this.setAttribute('aria-expanded', !expanded);
		menu.hidden = !menu.hidden;
	});
})();
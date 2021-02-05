let inputFields, 
	payment = document.getElementById("payment");

function cardElems() {
	return ([
		document.querySelectorAll("#platinum-card, #gold-card, #silver-card"),
		document.querySelectorAll("#platinum-score, #gold-score, #silver-score"),
		document.querySelectorAll("#platinum-descr, #gold-descr, #silver-descr")
	]);
}

function payDim() {
	if (window.innerHeight < 993) {
		payment.style.height = (window.innerHeight - 100) + "px";
		payment.style.overflow = "auto";
	}
}

window.addEventListener("DOMContentLoaded", () => {
	let bodyDoc = document.getElementById("bodyDoc"),
		btnRecord = document.querySelectorAll("#btn-header, #btn-menu, #btn-know, #btn-whom"),
		cross = document.getElementById("cross"),
		curtain = document.getElementById("curtain"),
		popup = document.getElementById("popup");
	
	// Functions
	function showModal(windowUnit) {
		curtain.style.display = "block";
		curtain.style.animation = "opacity 1s forwards";
		windowUnit.style.display = "flex";
		windowUnit.style.animation = "opacity 2s";
	}
	
	function hideModal(windowUnit) {
		if (windowUnit.style.display = "block") {
			windowUnit.style.display = "none";
			curtain.style.display = "none";
		}
	}
	
	function pattern(label, input, btn, wrapper, mod = "", e) {
		e.preventDefault();
		
		let errors = wrapper.querySelectorAll(".record__error");
		
		for (let i = 0; i < errors.length; i++) {
			errors[i].remove();
		}
		
		for (let i = 0; i < input.length; i++) {
			if (!input[i].value) {
				let error = document.createElement("div");
				
				error.classList.add("record__error");
				
				if (mod == null) {
					mod = "";
				}
				
				error.classList.add("record__error" + (i + 1) + mod);
				
				if (i == 0) {
					error.innerHTML = "Введите имя";
				} else if (i == 1) {
					error.innerHTML = "Введите номер телефона";
				} else {
					error.innerHTML = "Введите почту";
				}
				
				wrapper.appendChild(error);
				
				if (i <= 1) {
					wrapper.insertBefore(error, label[i + 1]);
				} else {
					wrapper.insertBefore(error, btn);
				}
			}
		}
		
		if (/[^a-zа-яё]/i.test(input[0].value)) {
			let error = document.createElement("div");
				
			error.classList.add("record__error");
			error.innerHTML = "Неверное имя";
			wrapper.appendChild(error);
			wrapper.insertBefore(error, label[1]);
		}
	}
	
	// Hover
	let anyElem = document.querySelectorAll("*:not(html, body, .container, .container > *, #burger)"),
		bonum = document.getElementById("bonum"),
		reviewsSlider = document.querySelectorAll("#prev, #next");
		
	anyElem.forEach(item => {
		item.addEventListener("mouseover", e => {
			switch (e.target) {
				case bonum.childNodes[0]:
				case reviewsSlider[0]:
				case reviewsSlider[1]:
					item.style.transition = "0s";
					break;
				default: 
					item.style.transition = ".5s";
			}
		});
		
		item.addEventListener("mouseout", e => {
			item.style.transition = "0s";
		});
	});	
		
	// Video
	let playWrapper = document.getElementById("video"),
		iframe = document.getElementById("frame"),
		play = document.getElementById("play");
		
	play.addEventListener("click", e => {
		e.preventDefault();
		
		play.style.display = "none";
		iframe.style.opacity = 1;
	});
	
	// Timer
	let id = setInterval(() => {
		let daysSet = document.getElementById("days"),
			progressDay = document.getElementById("progress-day"),
			progressHour = document.getElementById("progress-hour"),
			progressMinute = document.getElementById("progress-minute"),
			progressSecond = document.getElementById("progress-second"),
			dayStart = 3,
			dayDiff,
			dayTotal = 8,
			d = new Date(),
			dateEnd = new Date();
		
		dateEnd.setSeconds = 0;
		dateEnd.setMinutes = 0;
		dateEnd.setHours = 24;
		dateEnd.setDate = 10;
		
		/* Seconds */
		let seconds = d.getSeconds(),
			secondsEnd;
		
		secondsEnd = (seconds == 0) ? 00 : 60 - seconds; 
		
		/* Minutes */
		let minutes = d.getMinutes(),
			minutesEnd;
			
		if ((seconds == 0) && (minutes == 0)) {
			minutesEnd = minutes;
		} else if (seconds == 0) {
			minutesEnd = 60 - minutes;
		} else {
			minutesEnd = 60 - (minutes + 1);
		}
		
		/* Hours */
		let hours = d.getHours(),
			hoursEnd;
		
		hoursEnd = ((minutes == 0) && (seconds == 0)) ? (24 - hours) : (24 - (hours + 1));
		
		/* Days */
		let days = d.getDate(),
			daysEnd;
		
		if ((hours == 0) && (minutes == 0) && (seconds == 0)) {
			daysEnd = dateEnd.setDate - (days - 1);
		} else {
			daysEnd = dateEnd.setDate - days;
		};
		
		if (daysEnd == 0) {
			daysSet.style.display = "none";
		};
		
		if (secondsEnd < 10) {
			second.innerHTML = "0" + secondsEnd;
		} else {
			second.innerHTML = secondsEnd;
		}
		
		if (minutesEnd < 10) {
			minute.innerHTML = "0" + minutesEnd;
		} else {
			minute.innerHTML = minutesEnd;
		}
		
		if (hoursEnd < 10) {
			hour.innerHTML = "0" + hoursEnd;
		} else {
			hour.innerHTML = hoursEnd;
		}
		
		if (daysEnd < 10) {
			day.innerHTML = "0" + daysEnd;
		} else {
			day.innerHTML = daysEnd;
		}
		
		progressSecond.style.width = (secondsEnd / 60 * 100) + "%";
		
		if (secondsEnd !== 0) {
			minutesEnd = minutesEnd + (secondsEnd / 60);
		}
		
		progressMinute.style.width = (minutesEnd / 60 * 100) + "%";
		
		if (((secondsEnd !== 0) && (minutesEnd !== 0)) || ((secondsEnd == 0) && (minutesEnd !== 0)) || ((secondsEnd == 0) && (minutesEnd !== 0))) {
			hoursEnd = hoursEnd + (minutesEnd / 60);
		}
		progressHour.style.width = (hoursEnd / 24 * 100) + "%";
		
		dayDiffPass = d.getDate() - dayStart;
		dayLeft = dayTotal - dayDiffPass;
		
		if ((hoursEnd !== 0) && (minutesEnd == 0)) {
			dayLeft = dayLeft + (hoursEnd / 24);
		} else if ((hoursEnd !== 0) && (minutesEnd !== 0)) {
			dayLeft = dayLeft + ((hoursEnd - 1) / 24) + (minutesEnd / 60 / 24);
		} else if ((hoursEnd == 0) && (minutesEnd !== 0)) {
			dayLeft = dayLeft + (minutesEnd / 60 / 24);
		}
		
		progressDay.style.width = (dayLeft / dayTotal * 100) + "%";
		
	}, 1000);
	
	// Menu
	let burger = document.getElementById("burger"),
		menu = document.getElementById("menu");
		
	burger.addEventListener("click", () => {
		burger.classList.toggle("cross");
		menu.classList.toggle("down");
		if ((bodyDoc.classList.contains("webinar")) || (bodyDoc.classList.contains("thanks"))) {
			btnRecord[0].classList.add("menu__btn_active");
		}
	});
	
	btnRecord.forEach(item => {
		item.addEventListener("click", e => {
			if ((bodyDoc.classList.contains("webinar")) || (bodyDoc.classList.contains("thanks"))) {
				e.preventDefault();
				showModal(popup);
			}
		});
	});
	
	cross.addEventListener("click", () => {
		hideModal(popup);
	});
	
	// Validate
	let formUnit = document.querySelectorAll("#record-master, #record-want, #record-popup"),
		fields0 = document.querySelectorAll("#record-master .record__field"),
		fields1 = document.querySelectorAll("#record-want .record__field"),
		fields2 = document.querySelectorAll("#record-popup .record__field"),
		labels = document.querySelectorAll("#record-master .record__title, #record-want .record__title, #record-popup .record__title"),
		labels0 = document.querySelectorAll("#record-master .record__title"),
		labels1 = document.querySelectorAll("#record-want .record__title"),
		labels2 = document.querySelectorAll("#record-popup .record__title"),
		submitBtns = document.querySelectorAll("#btn-master, #btn-want, #btn-popup"),
		submitBtn0 = document.querySelector("#btn-master"),
		submitBtn1 = document.querySelector("#btn-want"),
		submitBtn2 = document.querySelector("#btn-popup");
	
	formUnit.forEach(function(item, i) {
		if (i == 0) {
			item.addEventListener("submit", pattern.bind(null, labels0, fields0, submitBtn0, item, "_master"));
		} else if (i == 1) {
			item.addEventListener("submit", pattern.bind(null, labels1, fields1, submitBtn1, item, "_want"));
		} else if (i == 2) {
			item.addEventListener("submit", pattern.bind(null, labels2, fields2, submitBtn2, item, "_popup"));
		}
	});
	
	// Chat
	let chat = document.getElementById("chat");
	
	chat.addEventListener("click", function(e) {
		e.preventDefault();
		
		if (!(bodyDoc.classList.contains("webinar"))) {
			window.open("webinar.html#messenger", "_blank");
		} else {
			window.open("webinar.html#messenger", "_self");
		}
	});
	
	// Lazy load
	let bLazy = new Blazy({
		selector: "img, iframe",
		success: function(element) {
			setTimeout(function() {
				let parent = element.parentNode;
				
				parent.className = parent.className.replace(/\bloading\b/,'');
			}, 200);
		}
	});
	
	// Mask
	let maskedInput = document.querySelectorAll("#phone-master, #phone-want, #phone-popup");
	
	for (let i = 0; i < maskedInput.length; i++) {
		new IMask(maskedInput[i], {
			mask: "+{38} (000) 000 00 00"
		});
	}
	
	// Form (data)
	let	statusMessage = document.createElement("div"),
		message = {
			loading: "Отправка заявки...",
			failure: "Ошибка отправки заявки"
		},
		getRequest = document.querySelector("#accepted");
		
	statusMessage.classList.add("record__status");
	
	formUnit.forEach((item, i) => {
		item.addEventListener("submit", e => {
			e.preventDefault();
			
			item.appendChild(statusMessage);
			
			let formData = new FormData(item);
			
			function postData(data) {
				return new Promise(function(resolve, reject) {
					let request = new XMLHttpRequest(); 
					
					request.open('POST', 'mailer/record.php');
					request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					
					request.addEventListener("readystatechange", function() { 
						if (request.readyState < 4) {
							resolve();
						} else if ((request.readyState == 4) && (request.status == 200)) {
							resolve();
						} else {
							reject();
						}
					});
					
					request.send(data);
				});
			};
			
			function clearInput() {
				inputFields = item.getElementsByTagName("input");
				
				for (let key in inputFields) {
					inputFields[key].value = "";
				}
			};
			
			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => {
					statusMessage.innerHTML = "";
					showModal(getRequest);
				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput)
		});
	});
	
	// Accepted
	let accepted = document.getElementById("accepted"),
		crossAccepted = document.getElementById("close");
		
	curtain.addEventListener("click", () => {
		hideModal(accepted);
	});	
	
	crossAccepted.addEventListener("click", () => {
		hideModal(accepted);
	});
			
	// Pages
	if (!(bodyDoc.classList.contains("webinar")) && !(bodyDoc.classList.contains("thanks"))) {
		
		// Play
		let watch = document.getElementById("watch");
		
		watch.addEventListener("click", function(e) {
			e.preventDefault();
			window.open("index.html#video", "_self");
		}); 
		
		// Know
		let btns = document.querySelectorAll("#btn-promo, #btn-reasons");
		
		btns.forEach(function(item) {
			item.addEventListener("click", function(e) {
				e.preventDefault();
				window.open("index.html#details", "_self");
			});
		});
		
		// Take part
		btnRecord.forEach(item => {
			item.addEventListener("click", e => {
				e.preventDefault();
				showModal(popup);
			});
		});
		
		curtain.addEventListener("click", () => {
			hideModal(popup);
		});	
		
		cross.addEventListener("click", () => {
			hideModal(popup);
		});
	}
	
	if (bodyDoc.classList.contains("webinar")) {
		
		// Messenger
		let messenger = document.getElementById("messenger"),
			container = document.createElement("form"),
			txtAElem = document.getElementById("txt"),
			statusMessage = document.createElement("div"),
			btnMessenger = document.getElementById("commentsBtn"),
			message = {
				loading: "Передача сообщения...",
				success: "Сообщение отправлено",
				failure: "Ошибка отправки сообщения"
			};
		
		txtAElem.parentNode.insertBefore(container, txtAElem);
		container.appendChild(txtAElem);
		container.appendChild(btnMessenger)
		
		messenger.appendChild(container);
		container.classList.add("comments__chat");
		
		container.addEventListener("submit", e => {
			e.preventDefault();
			
			statusMessage.style.font = "16px/20px 'Cera-Pro-Medium'";
			container.appendChild(statusMessage);
			
			let formData = new FormData(container);
			
			function postData(data) {
				return new Promise(function(resolve, reject) {
					let request = new XMLHttpRequest(); 
					
					request.open('POST', 'mailer/messenger.php');
					request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					
					request.addEventListener("readystatechange", function() { 
						if (request.readyState < 4) {
							resolve();
						} else if ((request.readyState == 4) && (request.status == 200)) {
							resolve();
						} else {
							reject();
						}
					});
					
					request.send(data);
				});
			};
			
			function clearInput() {
				inputFields = container.getElementsByTagName("input");
				inputFields.value = "";
			};
			
			postData(formData)
				.then(() => {
					statusMessage.innerHTML = message.loading;
					statusMessage.style.padding = "10px 0 10px 20px";
				})
				.then(() => {
					statusMessage.innerHTML = message.success;
					statusMessage.style.padding = "10px 0 10px 20px";
				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput)
		});
		
		// Card (reload)
		if (window.matchMedia("(min-width: 1367px)").matches) {
			cardElems()[0].forEach((item, i) => {
				if (!(item.classList.contains("products__card_active"))) {
					item.classList.add("products__card_active");
					cardElems()[1][i].classList.add("products__title_active");
					cardElems()[2][i].classList.add("products__descr_active");
				}
			});
		}
		
		// Card (click)
		cardElems()[1].forEach(function(item, i) {
			item.addEventListener("click", () => {
				if (window.matchMedia("(max-width: 1366px)").matches) {
					cardElems()[0][i].classList.toggle("products__card_active");
					item.classList.toggle("products__title_active");
					cardElems()[2][i].classList.toggle("products__descr_active");
				}
			});
		});
			
		// Buy
		let buy = document.querySelectorAll("#buy-platinum, #buy-gold, #buy-silver"),
			name = document.getElementById("product"),
			price = document.getElementById("price"),
			productsTitle = document.querySelectorAll("#platinum-title, #gold-title, #silver-title"),
			productsPrice = document.querySelectorAll("#platinum-price, #gold-price, #silver-price");
		
		buy.forEach(function(item, i) {
			item.addEventListener("click", e => {
				e.preventDefault();
				
				showModal(payment);
				document.body.style.overflow = "hidden";
				
				payDim();
							
				name.innerHTML = productsTitle[i].innerHTML;
				price.innerHTML = productsPrice[i].innerHTML;				
			});
			
			curtain.addEventListener("click", () => {
				hideModal(payment);
				document.body.style.overflow = "";
			});
		});
		
		// Disabled (pay24)
		let pay24 = document.querySelector("#pay-24[disabled]");
		
		if (pay24) {
			pay24.classList.add("payment__btn_disabled");
		
			pay24.addEventListener("mouseover", () => {
				pay24.style.background = "#b1bfe0";
				pay24.style.borderColor = "#b1bfe0";
				pay24.style.color = "#fff";
			});
			
			pay24.addEventListener("focus", () => {
				pay24.style.outline = "none";
				pay24.childNodes[1].style.borderColor = "#7ab72b";
			});
			
			pay24.addEventListener("click", e => {
				e.preventDefault();
				pay24.style.borderColor = "#b1bfe0";
				pay24.childNodes[1].style.borderColor = "#7ab72b";
			});
		}
		
		// Disabled (buttons)
		let fieldsPay = document.querySelectorAll("#number-card[disabled], #term[disabled], #cvv2[disabled]"),
			question = document.getElementById("question");
			
		fieldsPay.forEach(item => {
			if (item) {
				item.classList.add("payment__input_disabled");
				item.removeAttribute("placeholder");
				item.style.borderBottomColor = "transparent";
				question.style.display = "none";	
			}
		});
		
		// Payment
		let promptText = document.getElementById("prompt"),
			formPay = document.getElementById("form-pay");
			
		question.addEventListener("mouseover", () => {
			promptText.style.animation = "opacity 1s forwards";
		});
		
		question.addEventListener("mouseout", () => {
			promptText.style.animation = "none";
		});
		
		formPay.addEventListener("submit", e => {
			e.preventDefault();
			
			formPay.appendChild(statusMessage),
			message = {
				loading: "Передача платёжных данных...",
				success: "Платёжные данные отправлены",
				failure: "Ошибка отправки платёжных данных"
			};
			
			let formData = new FormData(formPay);
			
			function postData(data) {
				return new Promise(function(resolve, reject) {
					let request = new XMLHttpRequest(); 
					
					request.open('POST', 'mailer/payment.php');
					request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					
					request.addEventListener("readystatechange", function() { 
						if (request.readyState < 4) {
							resolve();
						} else if ((request.readyState == 4) && (request.status == 200)) {
							resolve();
						} else {
							reject();
						}
					});
					
					request.send(data);
				});
			};
			
			function clearInput() {
				inputFields = formPay.getElementsByTagName("input");
				
				for (let key in inputFields) {
					inputFields[key].value = "";
				}
			};
			
			postData(formData)
				.then(() => {
					statusMessage.innerHTML = message.loading;
					statusMessage.style.marginTop = "-10px";
				})
				.then(() => {
					statusMessage.innerHTML = message.success;
					statusMessage.style.marginTop = "-10px";
				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput)
		});
		
		// Slider (reviews)
		let	prev = document.querySelector('#prev'),
			next = document.querySelector('#next'),
			reviewsBoard = document.querySelectorAll(".reviews__board"),
			progressBar = document.querySelectorAll(".stripe_reviews .stripe__progress"),
			commentBoard = document.querySelectorAll(".reviews__comment"),
			board,
			stripeWrapper,
			stripeProgress,
			comment,			
			slider = tns({
				container: ".reviews__pack",
				items: 1,
				slideBy: "page",
				autoplay: false,
				autoplayButtonOutput: false,
				autoplayTimeout: 4000,
				controls: false,
				mouseDrag: true,
				navContainer: "ul.reviews__dots",
				navPosition: "bottom",
				preventScrollOnTouch: "auto",
				responsive: {
					768: {
						arrowKeys: true,
						autoplay: false,
						fixedWidth: 240,
						items: 3,
						nav: false
					},
					1025: {
						fixedWidth: 255
					},
					1367: {
						fixedWidth: 308
					}
				}
			});
		
		prev.addEventListener("click", function() {
			slider.goTo("prev");
		});

		next.addEventListener("click", function() {
			slider.goTo("next");
		});
		
		reviewsBoard.forEach((item, i) => {
			if (item.classList.contains("tns-slide-active")) {
				progressBar[i].style.animation = "progress 1.5s forwards";
				commentBoard[i].style.animation = "opacity 1.5s forwards";
			}
		});	
		
		let customizedFunctionBefore = function(info) {
			let objElems = info.container.children;
							
			for (let key in objElems) {
				if (key < 21) {
					board = objElems[key].children[0];
					stripeWrapper = board.children[2];
					stripeProgress = stripeWrapper.children[0];
					comment = board.children[3];
					
					board.style.transitionDuration = ".3s";
					
					for (let key in stripeProgress) {
						stripeProgress.style.animation = "none";
						comment.style.animation = "none";
					}	
				}
			}
		};
		
		let customizedFunction = function(info) {
			let objElems = info.container.children;
				
			for (let key in objElems) {
				if (key < 21) {
					board = objElems[key].children[0];
					stripeWrapper = board.children[2];
					stripeProgress = stripeWrapper.children[0];
					comment = board.children[3];
					
					board.style.transitionDuration = "0s";
					
					for (let key in stripeProgress) {
						stripeProgress.style.animation = "progress 1.5s forwards";
						comment.style.animation = "opacity 1.5s forwards";
					}	
				}
			}		
		};
		
		slider.events.on('transitionStart', customizedFunctionBefore);
		slider.events.on('transitionEnd', customizedFunction);

		// Slider (labels)
		let labels = document.getElementById("#labels"),
			sliderLabels = tns({
				container: "#labels",
				items: 3.5,
				slideBy: 1,
				autoplay: true,
				autoplayButtonOutput: false,
				autoplayHoverPause: true,
				autoplayTimeout: 1500,
				controls: false,
				nav: false,
				preventScrollOnTouch: "force",
				responsive: {
					768: {
						autoplay: false,
						items: 8
					},
					1025: {
						mouseDrag: true
					}
				}
			});
	}
	
	if (bodyDoc.classList.contains("thanks")) {
		
		// Present
		let btnPresent = document.getElementById("btn-present"),
			curtain = document.getElementById("curtain"),
			getPresent = document.getElementById("get-present");
		
		btnPresent.addEventListener("click", e => {
			e.preventDefault();
			showModal(getPresent);
		});
		
		curtain.addEventListener("click", () => {
			hideModal(getPresent);
		});
		
		// Bubbles
		let bubbles = document.querySelectorAll(".present__icon")
		
		bubbles.forEach((item, i) => {
			switch (i) {
				case 0:
				case 1:
				case 3:
				case 5:
					item.setAttribute("href", "https://www.viber.com/ru/");
					break;
				default: 
					item.setAttribute("href", "https://www.telegram.com/");
					break;
			};
		});
	}	
});

window.addEventListener("scroll", () => {
	// Load
	let	progresses = document.querySelectorAll("#progress-01, #progress-02, #progress-03"),
		textCard = document.querySelectorAll("#text-01, #text-02, #text-03"),
		card = document.querySelectorAll("#card-01, #card-02, #card-03");
		
	progresses.forEach(function(item, i) {
		if (isElementInViewport(item)) {
			item.style.animation = "progress 2s forwards";
			card[i].style.animation = "expand-card 1s forwards";
			let id = setTimeout(function() {
				textCard[i].style.display = "block";
				textCard[i].style.animation = "opacity-text 3s forwards";
			}, 1000);
		}
	});
		
	function isElementInViewport(elem) {
		let rect = elem.getBoundingClientRect();

		return (
			(rect.top >= 0) &&
			(rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) 
		);
	}
});

window.addEventListener("resize", () => {
	// Buy
	if (window.innerWidth >= 1367) {
		cardElems()[0].forEach((item, i) => {
			if (!(item.classList.contains("products__card_active"))) {
				item.classList.add("products__card_active");
				cardElems()[1][i].classList.add("products__title_active");
				cardElems()[2][i].classList.add("products__descr_active");
			}
		});
	}
	
	payDim();
});
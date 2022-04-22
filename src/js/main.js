"use strict";

	/**
		 active menu point
	**/
	function setActiveMenuItem() {
		let current = location.pathname.split('/').reverse()[0];
		if (current === "") current = 'index.html';
		else {
			current = current.split('-')[0];
		}
		// console.log(current);
		let menuItems = document.querySelectorAll('.menu__link');
		for (let i = 0, len = menuItems.length; i < len; i++) {
			if (menuItems[i].getAttribute("href").split('-')[0].indexOf(current) !== -1 && current.length > 3) {
				menuItems[i].className += " active";
				return
			}
		};
	};

	const menuTrigger = document.querySelector(".btn--menu");
	const subMenus = document.querySelectorAll(".sub-menu");
	const header = menuTrigger.closest(".header");

	document.addEventListener('DOMContentLoaded', function(){
		setActiveMenuItem();
		//user menu

		menuTrigger?.addEventListener("click", function() {
			header.classList.toggle("header--open");
			header.querySelector(".menu").classList.toggle("menu--open");
			[...subMenus].forEach(function(el){
				el.classList.remove("open");
			});
		});

		if (subMenus){
			[...subMenus].forEach(function(el){
				el.addEventListener("click",function(){
					this.classList.toggle("open");
				})
			})
		};

		//close dialogs
		window.addEventListener('click', function(e) {
			if (!e.target.closest(".header")) {
				header.classList.remove("header--open");
				header.querySelector(".menu").classList.remove("menu--open");
			}
		});

		// anhor
		const btnScrollDown = document.getElementById("btn-scroll-down");
		btnScrollDown?.addEventListener('click', function(e) {
			e.preventDefault();
			const parent = btnScrollDown.closest(".intro");
			const target = parent.nextElementSibling;
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		});



});
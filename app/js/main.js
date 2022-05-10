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
		let menuItems = document.querySelectorAll('.menu__item a');
		for (let i = 0, len = menuItems.length; i < len; i++) {
			if (menuItems[i].getAttribute("href").split('-')[0].indexOf(current) !== -1 && current.length > 3) {
				menuItems[i].closest(".menu__item").className += " active";
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

		//header - mobile
		window.addEventListener('click', function(e) {
			if (!e.target.closest(".header")) {
				header.classList.remove("header--open");
				header.querySelector(".menu").classList.remove("menu--open");
			}
		});

		subMenus?.forEach(item => {
			item.addEventListener('mouseenter', e => {
				if ( window.matchMedia("(min-width: 1025px)").matches) item.classList.add('open');
			});
			item.addEventListener('mouseleave', e => {
				if ( window.matchMedia("(min-width: 1025px)").matches) item.classList.remove('open');
			});
			item.addEventListener('click', e => {
				if(e.target.classList.contains("sub-menu__trigger")) {
					item.classList.add('open');
				}
			});
		});

		// anhor
		const btnScrollDown = document.getElementById("btn-scroll-down");
		btnScrollDown?.addEventListener('click', function(e) {
			e.preventDefault();
			const parent = btnScrollDown.closest(".s-intro");
			const target = parent.nextElementSibling;
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		});

		const stickySidebar = document.getElementById("sidebar");
		if (stickySidebar) {
			const sidebarAnchors = [...stickySidebar.querySelectorAll("a")];
			window.addEventListener('scroll', function() {
				let winTop = window.scrollY;
				sidebarAnchors?.forEach(link => {
					let sec = document.querySelector(link.hash);
						if (sec.offsetTop <= winTop - 20 && sec.offsetTop + sec.offsetHeight > winTop - 100) {
							link.classList.add("active");
						} else {
							link.classList.remove("active");
						}
					});

			});
		};

		/**
			accordions
		**/
		const accordionOpen = function () {
			[].forEach.call(
				document.querySelectorAll("[data-collapse]"),
				function (el) {
					el.addEventListener("click", function (e) {
						e.preventDefault();
						let currentItem = this.closest(".accordion__item");
						currentItem.classList.toggle("expanded");
					});
				}
			);
		};
		accordionOpen();


});
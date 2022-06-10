"use strict";
// Fit elements determined elements amount in visible part of screen
document.addEventListener("DOMContentLoaded", (e) => {
	setButtonMenuMargins();
	setSocialMargins();
});
window.addEventListener("resize", (e) => {
	setButtonMenuMargins();
	setSocialMargins();
});
const tab_wrapper = document.querySelector(".tabs__buttons");
const tab_btns = document.querySelectorAll(".tabItem");
let tabMargin;
const setButtonMenuMargins = (e) => {
	let s = 0;
	let visibleCount;
	if (tab_wrapper.clientWidth <= 475) {
		visibleCount = 4;
	} else if (tab_wrapper.clientWidth > 475 && tab_wrapper.clientWidth < 675) {
		visibleCount = 6;
	} else if (
		tab_wrapper.clientWidth >= 675 &&
		tab_wrapper.clientWidth < 875
	) {
		visibleCount = 8;
	} else if (
		tab_wrapper.clientWidth >= 875 &&
		tab_wrapper.clientWidth < 1075
	) {
		visibleCount = 10;
	} else if (
		tab_wrapper.clientWidth >= 1075 &&
		tab_wrapper.clientWidth < 1275
	) {
		visibleCount = 12;
	} else if (
		tab_wrapper.clientWidth >= 1275 &&
		tab_wrapper.clientWidth < 1475
	) {
		visibleCount = 14;
	} else if (
		tab_wrapper.clientWidth >= 1475 &&
		tab_wrapper.clientWidth < 1675
	) {
		visibleCount = 16;
	} else if (tab_wrapper.clientWidth >= 1675) {
		visibleCount = 17;
	}
	tab_btns.forEach((el, i) => {
		if (i < visibleCount) {
			s += el.clientWidth;
		}
	});
	tabMargin = (tab_wrapper.clientWidth - s) / (visibleCount * 2 - 2);
	tab_btns[0].style.margin = `0 ${tabMargin}px 0 0`;
	tab_btns[tab_btns.length - 1].style.margin = `0 0 0 ${tabMargin}px`;
	tab_btns.forEach((el, i) => {
		if ((i > 0) & (i < tab_btns.length - 1)) {
			el.style.margin = `0 ${tabMargin}px`;
		}
	});
};
const social_wrapper = document.querySelector(".social");
const social_btns = document.querySelectorAll(".social > a");
let socialMargin;
const setSocialMargins = (e) => {
	let s = 0;
	let visibleCount;
	if (document.body.clientWidth <= 475) {
		visibleCount = 5;
	} else if (
		document.body.clientWidth > 475 &&
		document.body.clientWidth < 675
	) {
		visibleCount = 6;
	} else if (
		document.body.clientWidth >= 675 &&
		document.body.clientWidth < 875
	) {
		visibleCount = 8;
	} else if (
		document.body.clientWidth >= 875 &&
		document.body.clientWidth < 1075
	) {
		visibleCount = 10;
	} else if (document.body.clientWidth >= 1075) {
		social_wrapper.style.justifyContent = "space-between";
	}

	social_btns.forEach((el, i) => {
		if (i < visibleCount) {
			s += el.clientWidth;
		}
	});
	socialMargin = (social_wrapper.clientWidth - s) / (visibleCount * 2 - 2);
	social_btns[0].style.margin = `0 ${socialMargin}px 0 0`;
	social_btns[
		social_btns.length - 1
	].style.socialMargin = `0 0 0 ${socialMargin}px`;
	social_btns.forEach((el, i) => {
		if ((i > 0) & (i < social_btns.length - 1)) {
			el.style.margin = `0 ${socialMargin}px`;
		}
	});
};

// smooth horizontal scroll without shift key
tab_wrapper.addEventListener("wheel", (event) => {
	smoothReduce(0.5, 0.01, tabMargin, 0, 2, (value) => {
		tab_wrapper.scrollLeft += (event.deltaY / 100) * value;
	});
	event.preventDefault();
});
social_wrapper.addEventListener("wheel", (event) => {
	smoothReduce(0.5, 0.01, socialMargin, 0, 3, (value) => {
		social_wrapper.scrollLeft += (event.deltaY / 100) * value;
	});
	event.preventDefault();
});
const smoothReduce = (duration, interval, from, to, minStep, callback) => {
	let value = from,
		forward = from < to,
		range = Math.abs(to - from),
		steps = duration / interval,
		step = range / steps,
		last = from,
		handle = setInterval(() => {
			value += step * (forward ? 1 : -1);
			if (forward ? value > to : value < to) {
				value = to;
				clearInterval(handle);
				handle = null;
			}

			if (!minStep || !handle || Math.abs(last - value) >= minStep) {
				last = value;
				callback(value, from, to);
			}
		}, interval);

	return handle;
};

// Change buttons style on click
const tagButtons = document.querySelectorAll(".tags-btn");
tagButtons.forEach((e) => {
	e.addEventListener("click", (event) => {
		event.preventDefault();
		e.classList.toggle("active");
	});
});
const followButton = document.querySelector(".followBtn");
followButton.addEventListener("click", (event) => {
	event.preventDefault();
	event.target.classList.toggle("active");
	if (event.target.classList.contains("active")) {
		event.target.textContent = "Following";
	} else {
		event.target.textContent = "Follow";
	}
});

// Tab switching
const tab_content = document.querySelectorAll(".content");
tab_btns.forEach((el) => {
	el.addEventListener("click", (event) => {
		tab_btns.forEach((el) => {
			el.classList.remove("active");
		});
		tab_content.forEach((el) => {
			el.classList.remove("active");
		});
		document
			.querySelector(`#${el.getAttribute("data-set")}`)
			?.classList.add("active");
		el.classList.add("active");
		el.ariaSelected = true;
	});
});

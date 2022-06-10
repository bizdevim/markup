class CustomSelect {
	constructor(domSelector, list) {
		this.root = document.querySelector(domSelector);
		this.search = document.querySelector(domSelector);
		this.search;
		this.isOpen;
		this.list = list;
		this.setChecked = (event) => {
			let opts = document.querySelectorAll(".option_item");
			opts.forEach((el) => {
				el.classList.remove("active");
			});
			event.target.classList.add("active");
			this.setValue(event.target.getAttribute("data-value"));
		};
		this.setValue = (value) => {
			this.root.firstChild.value = value;
			console.log(this.root.firstChild);
		};
		this.init = () => {
			this.optWrapper = document.createElement("div");
			this.optWrapper.classList.add("options_list");
			console.log(list);
			for (let item in list) {
				let option = document.createElement("button");
				option.innerText = list[item].value;
				option.setAttribute("data-value", list[item].value);
				option.classList.add("option_item");
				if (list[item].checked) option.classList.add("active");
				option.addEventListener("click", (e) => {
					this.setChecked(e);
				});
				this.optWrapper.appendChild(option);
			}

			this.root.appendChild(this.optWrapper);
		};
		this.init();
	}
}
let cs = new CustomSelect(".custom_select", [
	{ value: "Not selected", checked: true },
	{ value: "Aerospace", checked: false },
	{ value: "AgTech", checked: false },
	{ value: "Biotechnology", checked: false },
	{ value: "Blockchain/Crypto", checked: false },
]);

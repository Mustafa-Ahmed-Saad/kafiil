// -------------------------------------------------- constant --------------------------------------------------
const SERVICE_PRICE = 100;

// -------------------------------------------------- variables --------------------------------------------------
let oldScrollPosition = 0;

// -------------------------------------------------- start elements --------------------------------------------------
const navLinks = document.querySelectorAll(".nav-link");
const userIcons = document.querySelectorAll(".uniq-user");
const selectAllServicesEl = document.querySelector("#select-all-Services");
const serviceCheckboxes = document.querySelectorAll(
  '#Service-Add-Ons [data-select-key="service-checkbox"]'
);
const counterBtns = document.querySelectorAll(
  '[data-select-key="service-btn"]'
);
const hearts = document.querySelectorAll(".clickable-hart i");
const responsiveMenu = document.getElementById("responsive-menu");
const responsiveDropdown = document.getElementById("responsive-dropdown");
const checkbox = document.getElementById("checkbox-1");
const checkboxResponsive = document.getElementById("checkbox-1-responsive");
const navsContainer = document.querySelector(".navs-container");
// -------------------------------------------------- end elements --------------------------------------------------

// -------------------------------------------------- start events --------------------------------------------------
// add event listener on navLinks to handel active link and make it active handel Active Link
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    // get all a tag elements that has class nav-link
    const navLinks = document.querySelectorAll(".nav-link");
    // remove class active if exist
    navLinks.forEach((link) => {
      // check if link has class active
      link.classList.contains("active") && link.classList.remove("active");
    });
    // add class active to the target element
    const target = event.currentTarget;
    target.classList.add("active");
  });
});

// when click on responsive menu the responsive dropdown will appear, toggle Responsive Dropdown
responsiveMenu.addEventListener("click", () => {
  responsiveDropdown.classList.toggle("show");
});

// add event listener on userIcon to show dropdown
userIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // show dropdown
    const dropdowns = document.querySelectorAll(".user-dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.toggle("show");
    });
  });
});

// add event listener on selectAllServicesEl to select all services when click on select all, selectAllServices
selectAllServicesEl.addEventListener("click", () => {
  // selectAllServices
  serviceCheckboxes.forEach((checkbox) => {
    checkbox.checked === false && (checkbox.checked = true);
  });

  makeSelectAllServicesElActive();
  handelPriceBasedOnCheckbox();
});

// add event listener on serviceCheckboxes to change select all color, set price, selectAllServices
serviceCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // selectAllServices
    // check if all checkboxes are checked or not
    const allChecked = Array.from(serviceCheckboxes).every(
      (checkbox) => checkbox.checked
    );

    handelPriceBasedOnCheckbox();

    allChecked
      ? makeSelectAllServicesElActive()
      : makeSelectAllServicesElNotActive();
  });
});

// add event listener on counterBtns to handel counter and make max counterValue = 3 and min counterValue = 0, change check box checked state and select all color, set price
counterBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // handelCounter
    const btnValue = event.currentTarget.getAttribute("data-value");
    const count = document.querySelector("#count");
    const counterValue = parseInt(count.textContent) + parseInt(btnValue);

    // make max counterValue = 3 and min counterValue = 0
    if (counterValue >= 3) {
      count.textContent = 3;
      makeSelectAllServicesElActive();
    } else if (counterValue <= 0) {
      count.textContent = 0;
      makeSelectAllServicesElNotActive();
    } else {
      count.textContent = counterValue;
      makeSelectAllServicesElNotActive();
    }

    handelCheckboxesBasedOnCounter(counterValue);

    setPrice(count.textContent * SERVICE_PRICE);
  });
});

// add event listener to each heart to toggle fa-solid and fa-regular classes and add or remove class error-500
hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("fa-regular");
    heart.classList.toggle("fa-solid");

    // check if heat element has class fa-solid or not if yes add class error-500 else remove class error-500
    if (heart.classList.contains("fa-solid")) {
      heart.classList.add("error-500");
    } else {
      heart.classList.remove("error-500");
    }
  });
});

// add event listener to dark mode checkbox (add dark class to body)
checkbox.addEventListener("click", toggleDarkClassToBody);
checkboxResponsive.addEventListener("click", toggleDarkClassToBody);

// add event listener to handel checkbox mode if dark make it false else make it true
window.addEventListener("resize", () => {
  const isDark = document.body.classList.contains("dark");
  checkbox.checked = !isDark;
  checkboxResponsive.checked = !isDark;
});

// add event when scroll to make nav top -100px when scroll to bottom and make top 0 when scroll to top
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > oldScrollPosition) {
    navsContainer.style.top = "-350px";
  } else {
    navsContainer.style.top = "0";
  }

  oldScrollPosition = scrollY;
});

// -------------------------------------------------- end events --------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- note --------------------------------------------------
// ------- we can use plugins and ready-made slider or carousel but i prefer to make slider from scratch to prove my skills  ------------
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- start slider --------------------------------------------------
// get img in slider-contrainer
const sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);

// get numbers of slides
const slidesCount = sliderImages.length;

// first slide will show or main slide
let currentSlideIndex = parseInt(localStorage.getItem("slideNum")) || 1;

// previous and next buttons
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

// handle onclick on previous and next button
nextButton.onclick = nextSlider;
prevButton.onclick = prevSlider;

// create ul pagination list and set id
const paginationElement = document.createElement("ul");
paginationElement.setAttribute("id", "pagination-ul");
paginationElement.classList.add("no-style");
// create lis
for (let i = 1; i <= slidesCount; i++) {
  let li = document.createElement("li");

  li.appendChild(document.createTextNode(""));
  li.setAttribute("data-index", i);
  paginationElement.appendChild(li);
} // add the full ul to the span indicators
document.getElementById("indicators").appendChild(paginationElement);

// get the paginationElement ul
const paginationCreatedUl = document.getElementById("pagination-ul");

let paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

// loop through all bullets items
for (let i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    // we can use addEventListener
    currentSlideIndex = parseInt(this.getAttribute("data-index"));
    theChecker();
  };
}

theChecker();

// next slide function
function nextSlider() {
  // i know we can do it like this !nextButton.classList.contains("disabled") but i do it like that to be clear when reviewing the code
  if (nextButton.classList.contains("disabled")) {
    // do nothing
    return false;
  } else {
    currentSlideIndex++;
    theChecker();
  }
}

// previous slide function
function prevSlider() {
  // i know we can do it like this !nextButton.classList.contains("disabled") but i do it like that to be clear when reviewing the code
  if (prevButton.classList.contains("disabled")) {
    // do nothing
    return false;
  } else {
    currentSlideIndex--;
    theChecker();
  }
}

// create the checker function
function theChecker() {
  // remove active class from img and bullets
  removeAllActive();

  // set active class on current slide
  sliderImages[currentSlideIndex - 1].classList.add("active");
  // set active class on the current li or pagination item
  paginationCreatedUl.children[currentSlideIndex - 1].classList.add("active");

  // check if the current slide is the first or the last
  if (currentSlideIndex == 1) {
    // add sisable class on the previous button
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }

  if (currentSlideIndex == slidesCount) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }

  localStorage.setItem("slideNum", currentSlideIndex);
}

// remove active class from images and bullets
function removeAllActive() {
  sliderImages.forEach(function (img) {
    // we can use arrow function
    img.classList.remove("active");
  });

  let paginationBullets = Array.from(
    document.querySelectorAll("#pagination-ul li")
  );
  paginationBullets.forEach((bullet) => {
    bullet.classList.remove("active");
  }); // we can use arrow function
}
// -------------------------------------------------- end slider --------------------------------------------------

// -------------------------------------------------- start helper functions --------------------------------------------------
function makeSelectAllServicesElNotActive() {
  const iconElement = selectAllServicesEl.querySelector("i.gray-300");
  const spanElement = selectAllServicesEl.querySelector("span.gray-300");

  if (iconElement) {
    iconElement.classList.remove("main-color");
  }

  if (spanElement) {
    spanElement.classList.remove("main-color");
  }
}

function makeSelectAllServicesElActive() {
  // select element inside selectAllServicesEl that has class gray-300
  selectAllServicesEl.querySelector("i.gray-300").classList.add("main-color");
  selectAllServicesEl
    .querySelector("span.gray-300")
    .classList.add("main-color");
}

function handelCheckboxesBasedOnCounter(counterValue) {
  serviceCheckboxes.forEach((checkbox, index) => {
    checkbox.checked = index < counterValue;
  });
}

function handelPriceBasedOnCheckbox() {
  // other solution (1/2) to get selectedServices
  let selectedServices = 0;
  serviceCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedServices += 1;
    }
  });

  // other solution (2/2) to get selectedServices
  // const selectedServices = Array.from(serviceCheckboxes).reduce(
  //   (count, checkbox) => {
  //     return count + (checkbox.checked ? 1 : 0);
  //   },
  //   0
  // );

  document.querySelector("#count").innerText = selectedServices;
  setPrice(selectedServices * SERVICE_PRICE);
}

function setPrice(totalPrice) {
  const priceEl = document.querySelector("#price");
  // append total price to the price element
  priceEl.innerText = `$${totalPrice}`;
}

function toggleDarkClassToBody() {
  document.body.classList.toggle("dark");
}
// -------------------------------------------------- end helper functions --------------------------------------------------

$(document).ready(function () {
  const SERVICE_PRICE = 100;

  let oldScrollPosition = 0;
  const navLinks = $(".nav-link");
  const userIcons = $(".uniq-user");
  const selectAllServicesEl = $("#select-all-Services");
  const serviceCheckboxes = $('[data-select-key="service-checkbox"]');
  const counterBtns = $('[data-select-key="service-btn"]');
  const hearts = $(".clickable-hart i");
  // const responsiveMenu = $("#responsive-menu");
  // const responsiveDropdown = $("#responsive-dropdown");
  const checkbox = $("#checkbox-1");
  const checkboxResponsive = $("#checkbox-1-responsive");
  const navsContainer = $(".navs-container");

  // -------------------------------------------------- start events --------------------------------------------------

  // add event listener on navLinks to handle active link and make it active
  navLinks.on("click", function (event) {
    event.preventDefault();
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });

  // add event listener on userIcon to show dropdown
  userIcons.on("click", function () {
    $(".user-dropdown").toggleClass("show");
  });

  // add event listener on selectAllServicesEl to select all services when click on select all
  selectAllServicesEl.on("click", function () {
    serviceCheckboxes.prop("checked", true);
    makeSelectAllServicesElActive();
    handelPriceBasedOnCheckbox();
  });

  // add event listener on serviceCheckboxes to change select all color, set price
  serviceCheckboxes.on("change", handleCheckboxChange);

  function handleCheckboxChange() {
    const allChecked = serviceCheckboxes
      .toArray()
      .every((checkbox) => checkbox.checked);
    handelPriceBasedOnCheckbox();

    if (allChecked) {
      makeSelectAllServicesElActive();
    } else {
      makeSelectAllServicesElNotActive();
    }
  }

  // add event listener on counterBtns to handle counter and make max counterValue = 3 and min counterValue = 0, change check box checked state and select all color, set price
  counterBtns.on("click", handelCounter);

  function handelCounter() {
    const btnValue = $(this).data("value");
    const count = $("#count");
    const counterValue = parseInt(count.text()) + parseInt(btnValue);

    if (counterValue >= 3) {
      count.text(3);
      makeSelectAllServicesElActive();
    } else if (counterValue <= 0) {
      count.text(0);
      makeSelectAllServicesElNotActive();
    } else {
      count.text(counterValue);
      makeSelectAllServicesElNotActive();
    }

    handelCheckboxesBasedOnCounter(counterValue);
    setPrice(parseInt(count.text()) * SERVICE_PRICE);
  }

  // add event listener to each heart to toggle fa-solid and fa-regular classes and add or remove class error-500
  hearts.on("click", function () {
    handelHeart($(this));
  });

  function handelHeart(heart) {
    heart.toggleClass("fa-regular fa-solid");

    if (heart.hasClass("fa-solid")) {
      heart.addClass("error-500");
    } else {
      heart.removeClass("error-500");
    }
  }

  // add event listener to dark mode checkbox (add dark class to body)
  checkbox.on("click", toggleDarkClassToBody);
  checkboxResponsive.on("click", toggleDarkClassToBody);

  // add event listener to handel checkbox mode if dark make it false else make it true
  $(window).on("resize", function () {
    if ($("body").hasClass("dark")) {
      checkbox.prop("checked", false);
      checkboxResponsive.prop("checked", false);
    } else {
      checkbox.prop("checked", true);
      checkboxResponsive.prop("checked", true);
    }
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > oldScrollPosition) {
      navsContainer.css("top", "-350px");
    } else {
      navsContainer.css("top", "0");
    }

    oldScrollPosition = $(window).scrollTop();
  });

  // -------------------------------------------------- end events --------------------------------------------------

  // .................................
  // get img in slider-container
  let sliderImages = $(".slider-container img");

  // get numbers of slides
  let slidesCount = sliderImages.length;

  // first slide will show or main slide
  let currentSlideIndex = parseInt(localStorage.getItem("slideNum")) || 1;

  // previous and next buttons
  let nextButton = $("#next");
  let prevButton = $("#prev");

  // handle onclick on previous and next button
  nextButton.on("click", nextSlider);
  prevButton.on("click", prevSlider);

  // create ul pagination list and set id and add class no-style
  let paginationElement = $("<ul>")
    .attr("id", "pagination-ul")
    .addClass("no-style");

  // create lis
  for (let i = 1; i <= slidesCount; i++) {
    let li = $("<li>").text("").attr("data-index", i);
    paginationElement.append(li);
  }

  // add the full ul to the span indicators
  $("#indicators").append(paginationElement);

  // get the paginationElement ul
  let paginationCreatedUl = $("#pagination-ul");

  let paginationBullets = $("#pagination-ul li");

  // loop through all bullets items
  paginationBullets.on("click", function () {
    currentSlideIndex = parseInt($(this).attr("data-index"));
    theChecker();
  });

  theChecker();

  // next slide function
  function nextSlider() {
    if (nextButton.hasClass("disabled")) {
      // do nothing
      return false;
    } else {
      currentSlideIndex++;
      theChecker();
    }
  }

  // previous slide function
  function prevSlider() {
    if (prevButton.hasClass("disabled")) {
      // do nothing
      return false;
    } else {
      currentSlideIndex--;
      theChecker();
    }
  }

  // create the checker function
  function theChecker() {
    removeAllActive();

    sliderImages.eq(currentSlideIndex - 1).addClass("active");
    paginationCreatedUl
      .children()
      .eq(currentSlideIndex - 1)
      .addClass("active");

    if (currentSlideIndex == 1) {
      prevButton.addClass("disabled");
    } else {
      prevButton.removeClass("disabled");
    }

    if (currentSlideIndex == slidesCount) {
      nextButton.addClass("disabled");
    } else {
      nextButton.removeClass("disabled");
    }

    localStorage.setItem("slideNum", currentSlideIndex);
  }

  // remove active class from images and bullets
  function removeAllActive() {
    sliderImages.removeClass("active");
    paginationBullets.removeClass("active");
  }

  // .................................

  // .................................
  $("#responsive-menu").on("click", function () {
    $("#responsive-dropdown").toggleClass("show");
  });
  // -------------------------------------------------- end responsive menu --------------------------------------------------

  // -------------------------------------------------- start helper functions --------------------------------------------------
  function makeSelectAllServicesElNotActive() {
    // select element inside selectAllServicesEl that has class gray-300
    selectAllServicesEl
      .find("i.gray-300, span.gray-300")
      .removeClass("main-color");
  }

  function makeSelectAllServicesElActive() {
    // select element inside selectAllServicesEl that has class gray-300
    selectAllServicesEl
      .find("i.gray-300, span.gray-300")
      .addClass("main-color");
  }

  function handelCheckboxesBasedOnCounter(counterValue) {
    serviceCheckboxes.each(function (index, checkbox) {
      if (counterValue - 1 >= 0) {
        $(checkbox).prop("checked", true);
      } else {
        $(checkbox).prop("checked", false);
      }
      counterValue--;
    });
  }

  function handelPriceBasedOnCheckbox() {
    let selectedServices = 0;
    serviceCheckboxes.each(function (index, checkbox) {
      if ($(checkbox).prop("checked")) {
        selectedServices += 1;
      }
    });

    setCount(selectedServices);
    setPrice(selectedServices * SERVICE_PRICE);
  }

  function setCount(totalCount) {
    $("#count").text(totalCount);
  }

  function setPrice(totalPrice) {
    $("#price").text(`$${totalPrice}`);
  }

  function toggleDarkClassToBody() {
    $("body").toggleClass("dark");
  }
  // .................................
});

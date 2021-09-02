'use strict';
// Make navbar transparent when it is on the top.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (!link) {
    return;
  } else {
    scrollIntoViews(link);
  }
});

//Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', (event) => {
  scrollIntoViews('#contact');
});

//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', (event) => {
  const value = 1 - window.scrollY / homeHeight;
  home.style.opacity = value;
});

function scrollIntoViews(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

//Show "arrow up"  button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', (event) => {
  if (window.scrollY / homeHeight > 0.5) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

//Handle click on the "arrow up " button
arrowUp.addEventListener('click', () => {
  scrollIntoViews('#home');
});

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
    navbarMenu.classList.remove('open');
    scrollIntoViews(link);
    selectNavItem(target);
  }
});

//Navbar toggle button for small screen.
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', (event) => {
  navbarMenu.classList.toggle('open');
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

// projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (!filter) {
    return;
  }

  // Remove selection from previous and select the new one.
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target =
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('animi-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('animi-out');
  }, 300);
});

//1. 모든 섹션 요소들과 navbar 메뉴 아이템들을 가지고 온다.
//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
//3. 보여지는 섹션에 해당하는 메뉴 아이템들을 활성화 시킨다.
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];
const sections = sectionIds.map((sectionId) =>
  document.querySelector(sectionId)
);
const navItems = sectionIds.map((sectionId) =>
  document.querySelector(`[data-link="${sectionId}"]`)
);
let selectedNavIndex;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}
function scrollIntoViews(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
  }, 600);
}

const observerOption = {
  root: null,
  rootMargin: '0px',
  threshold: [0.2, 0.3],
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      const y = entry.boundingClientRect.y;
      //scroll down -> page up -> next section selected
      if (y < 0) {
        selectedNavIndex = index + 1;
      } else if (y >= 0) {
        console.log(entry.target.id);
        //scroll up -> page down -> previous section selected
        selectedNavIndex = index - 1;
      }

      selectNavItem(navItems[selectedNavIndex]);
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOption);

sections.forEach((section) => observer.observe(section));
window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

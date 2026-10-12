"use strict";
document.documentElement.classList.add("js");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const mobileHeader = document.querySelector(".mobile-header");
const links = [...navigation.querySelectorAll("a")];
function syncHeaderHeight() {
  if (mobileHeader) {
    const rect = mobileHeader.getBoundingClientRect ? mobileHeader.getBoundingClientRect() : null;
    const height = rect ? rect.height : mobileHeader.offsetHeight;
    if (height) {
      if (document.documentElement && document.documentElement.style && typeof document.documentElement.style.setProperty === "function") {
        document.documentElement.style.setProperty("--header-height", `${height}px`);
      }
      if (navigation && navigation.style) {
        navigation.style.top = `${height}px`;
      }
    }
  }
}
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  if (!expanded) syncHeaderHeight();
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navigation.classList.toggle("open", !expanded);
});
links.forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});
const sections = links.map(link => document.querySelector(link.getAttribute("href")));
let scheduled = false;
function updateActiveSection() {
  const threshold = window.innerWidth <= 760 ? 150 : 120;
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) active = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) active = sections[sections.length - 1];
  for (const link of links) {
    const selected = link.hash === `#${active.id}`;
    link.classList.toggle("active", selected);
    if (selected) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  scheduled = false;
}
window.addEventListener("scroll", () => {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
  else syncHeaderHeight();
  updateActiveSection();
});
document.querySelector("#year").textContent = String(new Date().getFullYear());
syncHeaderHeight();
updateActiveSection();

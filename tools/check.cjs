const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
for (const id of ['about','research','experience','projects','publication','education','achievements','contact']) assert(ids.includes(id), `Missing ${id}`);
for (const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (ref.startsWith('#')) assert(ids.includes(ref.slice(1)), `Broken anchor ${ref}`);
  else if (!/^(https?:|mailto:|tel:)/.test(ref)) assert(fs.existsSync(path.join(root, ref)), `Missing asset ${ref}`);
}
assert(html.includes('name="viewport"'), 'Mobile viewport required');
assert(html.includes('href="assets/Sanjoy-Kumar-Roy-CV.pdf" download'), 'CV download required');
assert.equal(fs.readFileSync(path.join(root,'assets/Sanjoy-Kumar-Roy-CV.pdf')).subarray(0,5).toString(), '%PDF-', 'Download must be a PDF');
assert(!/details pending|CV pending|will be added from|research assistant/i.test(html), 'Unsupported placeholders or roles must be absent');
assert(css.includes('prefers-reduced-motion'), 'Reduced motion required');
assert.equal((css.match(/{/g)||[]).length, (css.match(/}/g)||[]).length, 'Unbalanced CSS');
function element() {
  const attributes = new Map(); const classes = new Set(); const listeners = {};
  return { attributes, classes, listeners, classList: {
    add: x => classes.add(x), remove: x => classes.delete(x),
    toggle: (x, value) => value ? classes.add(x) : classes.delete(x)
  }, setAttribute: (k,v) => attributes.set(k,v), getAttribute: k => attributes.get(k),
  removeAttribute: k => attributes.delete(k), addEventListener: (type,fn) => { listeners[type] = fn; }, focus() { this.focused = true; } };
}
const button = element(), nav = element(), year = element();
button.setAttribute('aria-expanded', 'false');
const sectionIds = ['about','research','experience','projects','publication','education','achievements','contact'];
const sections = sectionIds.map((id,i) => ({ id, top: i * 600, getBoundingClientRect() { return {top: this.top}; } }));
const links = sectionIds.map(id => { const e = element(); e.hash = '#' + id; e.setAttribute('href', e.hash); return e; });
nav.querySelectorAll = () => links;
const documentListeners = {}, windowListeners = {};
const document = { documentElement: {classList: {add() {}}, scrollHeight: 4800},
  querySelector: selector => ({'.menu-toggle':button,'#navigation':nav,'#year':year}[selector] || sections.find(s => '#' + s.id === selector)),
  addEventListener: (type,fn) => { documentListeners[type] = fn; } };
const window = {innerWidth:390,innerHeight:844,scrollY:0,requestAnimationFrame:fn => fn(),addEventListener:(type,fn) => {windowListeners[type] = fn;}};
vm.runInNewContext(fs.readFileSync(path.join(root,'script.js'),'utf8'), {document,window,Date});
assert.equal(links[0].getAttribute('aria-current'),'location');
button.listeners.click();
assert.equal(button.getAttribute('aria-expanded'),'true'); assert(nav.classes.has('open'));
documentListeners.keydown({key:'Escape'});
assert.equal(button.getAttribute('aria-expanded'),'false'); assert(button.focused);
button.listeners.click(); links[3].listeners.click(); assert(!nav.classes.has('open'));
sections.forEach(s => {s.top -= 1800;}); windowListeners.scroll();
assert.equal(links[3].getAttribute('aria-current'),'location');
assert.equal(links.filter(l => l.getAttribute('aria-current')).length,1);
window.scrollY = 4000; windowListeners.scroll(); assert.equal(links[7].getAttribute('aria-current'),'location');
console.log('PASS: 8 sections, unique IDs, anchor targets, local assets, viewport, reduced motion, CSS braces, mobile menu, Escape focus, link dismissal, scroll navigation.');
console.log('PASS: original PDF download present; unsupported placeholders and research assistantship absent.');

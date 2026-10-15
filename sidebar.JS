const checkboxSwitch = document.getElementById('checkbox');
const blockSwitch = document.querySelector('.block-switch');
const text = document.getElementById('topic_text');
const icon = document.getElementById('icon-mode');
const root = document.documentElement;

// 1. Тема при загрузке
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add('theme-' + theme);
  checkboxSwitch.checked = isDark;
  blockSwitch.classList.toggle('is-on', isDark);
 text.textContent = isDark ? 'Light  Mode' : 'Dark Mode';
}

applyTheme(initialTheme);

function onThemeChange() {
  const theme = checkboxSwitch.checked ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}

// 1. Нативный change на чекбоксе
checkboxSwitch.addEventListener('change', onThemeChange);
icon.addEventListener('change', onThemeChange);

// 2. Клик по блоку → программно переключаем чекбокс → сработает change
[blockSwitch, icon].forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === checkboxSwitch) return;
    checkboxSwitch.click();
  });
});



fetch('articles.json')
  .then(response => response.json())
  .then(data => {
    renderSection('collaboration', data.collaboration, true);
    renderSection('qiita', data.qiita);
    renderSection('note', data.note);
  })
  .catch(error => console.error('JSON読み込み失敗:', error));

function renderSection(category, items, showMeta = false) {
  const ul = document.getElementById(`${category}-list`);
  if (!ul) return;

  items.forEach(item => {
    const li = document.createElement('li');

    li.innerHTML = `
      <a href="${item.href}" ${isExternal(item.href) ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        <img src="${item.imgSrc}" width="1280" class="rounded-lg" />
        <h3 class="mt-4 font-bold text-base">${item.title}</h3>
        ${showMeta && item.category && item.time
          ? `<p class="mt-2 text-xs text-gray-400">${item.category} | ${item.time}</p>`
          : ''}
      </a>
    `;

    ul.appendChild(li);
  });
}

function isExternal(url) {
  return url.startsWith('http');
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});
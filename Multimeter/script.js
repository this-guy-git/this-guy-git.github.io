let zIndexCounter = 3001;
const windows = [];
const sidebar = document.getElementById('sidebar');

function renderSidebarIcons() {
  const items = document.querySelectorAll('#sidebar li');
  items.forEach(li => {
    const iconSrc = li.dataset.icon;
    if (!li.querySelector('img')) {
      const img = document.createElement('img');
      img.src = iconSrc;
      li.prepend(img);
    }
  });
}

function openWindow(url, title) {
  const existingWin = windows.find(w => w.dataset.url === url);
  if (existingWin) {
    existingWin.style.zIndex = zIndexCounter++;
    existingWin.style.display = 'block';
    return;
  }

  const overlay = document.getElementById('desktop-overlay');

  const win = document.createElement('div');
  win.className = 'window';
  win.dataset.url = url;
  win.style.top = '50px';
  win.style.left = '50px';
  win.style.width = '700px';
  win.style.height = '600px';
  win.style.zIndex = zIndexCounter++;

  // Window header
  const header = document.createElement('div');
  header.className = 'window-header';
  header.innerHTML = `<span>${title}</span>
    <div class="window-controls">
      <span onclick="minimizeWindow(this)"><img class="windb" src="images/minimize.svg"></span>
      <span onclick="maximizeWindow(this)"><img class="windb" src="images/maximize.svg"></span>
      <span onclick="closeWindow(this)"><img class="windb" src="images/close.svg"></span>
    </div>`;
  win.appendChild(header);

  // Window content
  const content = document.createElement('div');
  content.className = 'window-content';
  win.appendChild(content);

  overlay.appendChild(win);
  windows.push(win);

  // Check file type
  const ext = url.split('.').pop().toLowerCase();
  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif') {
    // Display image and fit it inside the window content
    const img = document.createElement('img');
    img.src = 'pages/' + url;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.display = 'block';
    content.innerHTML = '';
    content.appendChild(img);
  } else if (ext === 'cpp' || ext === 'txt') {
    // Load text content
    content.innerHTML = '<p>Loading...</p>';
    fetch('pages/' + url)
      .then(res => res.text())
      .then(text => {
        // Escape HTML for safe display
        content.innerHTML = '<pre style="white-space:pre-wrap;word-break:break-all;">' +
          text.replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch])) + '</pre>';
      })
      .catch(() => content.innerHTML = '<p>Failed to load file.</p>');
  } else {
    // Load HTML content
    content.innerHTML = '<p>Loading...</p>';
    fetch('pages/' + url)
      .then(res => res.text())
      .then(html => content.innerHTML = html)
      .catch(() => content.innerHTML = '<p>Failed to load page.</p>');
  }

  makeDraggable(win, header);
  win.addEventListener('mousedown', () => win.style.zIndex = zIndexCounter++);
}

// Drag logic (all windows draggable)
function makeDraggable(win, header) {
  let offsetX = 0, offsetY = 0, isDown = false;
  header.addEventListener('mousedown', e => {
    e.preventDefault();
    isDown = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = zIndexCounter++;

    function onMouseMove(eMove) {
      if (!isDown) return;
      win.style.left = eMove.clientX - offsetX + 'px';
      win.style.top = eMove.clientY - offsetY + 'px';
    }
    function onMouseUp() { isDown = false; document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

function closeWindow(elem) {
  const win = elem.closest('.window');
  const index = windows.indexOf(win);
  if (index > -1) windows.splice(index, 1);
  win.remove();
}
function minimizeWindow(elem) { elem.closest('.window').style.display = 'none'; }
function maximizeWindow(elem) {
  const win = elem.closest('.window');
  if (!win.dataset.maximized) {
    win.dataset.prev = JSON.stringify({top: win.style.top, left: win.style.left, width: win.style.width, height: win.style.height});
    win.style.top = '30px';
    win.style.left = '0px';
    win.style.width = window.innerWidth + 'px';
    win.style.height = window.innerHeight - 30 + 'px';
    win.dataset.maximized = true;
  } else {
    const prev = JSON.parse(win.dataset.prev);
    win.style.top = prev.top;
    win.style.left = prev.left;
    win.style.width = prev.width;
    win.style.height = prev.height;
    delete win.dataset.maximized;
  }
}

// Build sidebar dynamically from JSON
fetch('pages/files.json')
  .then(res => res.json())
  .then(data => {
    const tree = buildExplorer(data);
    sidebar.appendChild(tree);
    renderSidebarIcons();
  });

function buildExplorer(obj) {
  const ul = document.createElement('ul');
  const entries = Object.entries(obj);

  entries.forEach(([name, value], index) => {
    const li = document.createElement('li');

    // Create label span (icon + text)
    const label = document.createElement('span');
    const icon = document.createElement('img');

    if (typeof value === 'string') {
      icon.src = 'images/file.svg';
      label.appendChild(icon);
      label.appendChild(document.createTextNode(name));
      label.addEventListener('click', e => { e.stopPropagation(); openWindow(value, name); });
    } else {
      // Folder
      icon.src = 'images/folder-solid.svg'; // default folder icon
      label.appendChild(icon);
      label.appendChild(document.createTextNode(name));

      const subUl = buildExplorer(value);
      subUl.style.display = 'none';
      li.appendChild(subUl);

      // Click toggles open/close
      label.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = subUl.style.display === 'block';
        subUl.style.display = isOpen ? 'none' : 'block';

        // Change folder icon based on open state
        icon.src = isOpen ? 'images/folder-solid.svg' : 'images/folder-solid-open.svg';
      });

      // Hover effect: temporarily change icon
      label.addEventListener('mouseenter', e => {
        if (subUl.style.display !== 'block') {
          icon.src = 'images/folder-solid-open.svg';
        }
      });
      label.addEventListener('mouseleave', e => {
        if (subUl.style.display !== 'block') {
          icon.src = 'images/folder-solid.svg';
        }
      });
    }

    li.prepend(label);
    if (index === entries.length - 1) li.classList.add('last-child-tree');
    ul.appendChild(li);
  });

  return ul;
}
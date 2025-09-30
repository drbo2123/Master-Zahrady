tasks.forEach((t,i)=>{
  const li = document.createElement('li');
  li.className = 'task' + (t.done ? ' done' : '');
  li.innerHTML = `
    <input type="checkbox" ${t.done ? 'checked' : ''} aria-label="Označiť hotové" />
    <div>
      <div><strong>${t.title}</strong></div>
      <div class="meta">${t.date ? `Termín: ${t.date} · ` : ''}Kategória: ${t.category || '-'}</div>
    </div>
    <button class="btn" data-act="edit">Upraviť</button>
    <button class="btn danger" data-act="del">Zmazať</button>
  `;

  const checkbox = li.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', ()=>{ 
    t.done = checkbox.checked; 
    save(); 
    render(); 
  });

  li.querySelector('[data-act="del"]').addEventListener('click', ()=>{ 
    tasks = tasks.filter(x=> x!==t); 
    save(); 
    render(); 
  });

  li.querySelector('[data-act="edit"]').addEventListener('click', ()=> {
    const title = prompt('Úprava úlohy', t.title);
    if(title!==null){ 
      t.title = title.trim(); 
      save(); 
      render(); 
    }
  });

  list.appendChild(li);
});

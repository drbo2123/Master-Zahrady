(function(){
<input type="checkbox" ${t.done?'checked':''} aria-label="Označiť hotové" />
<div>
<div><strong>${t.title}</strong></div>
<div class="meta">${t.date?`Termín: ${t.date} · `:''}Kategória: ${t.category||'-'}</div>
</div>
<button class="btn" data-act="edit">Upraviť</button>
<button class="btn danger" data-act="del">Zmazať</button>`;
const checkbox = li.querySelector('input[type="checkbox"]');
checkbox.addEventListener('change', ()=>{ t.done = checkbox.checked; save(); render(); });
li.querySelector('[data-act="del"]').addEventListener('click', ()=>{ tasks = tasks.filter(x=> x!==t); save(); render(); });
li.querySelector('[data-act="edit"]').addEventListener('click', ()=>{
const title = prompt('Úprava úlohy', t.title);
if(title!==null){ t.title = title.trim(); save(); render(); }
});
list.appendChild(li);
});
}


addBtn.addEventListener('click', ()=>{
const title = taskInput.value.trim();
if(!title){ taskInput.focus(); return; }
tasks.push({ title, date: dateInput.value || '', category: categoryInput.value||'Všetko', done:false });
taskInput.value=''; dateInput.value=''; categoryInput.value='Všetko';
save(); render();
});


exportBtn.addEventListener('click', ()=>{
const header = 'Názov;Termín;Kategória;Hotové\n';
const rows = tasks.map(t=> [t.title, t.date, t.category, t.done?'Áno':'Nie'].join(';')).join('\n');
const blob = new Blob([header+rows], {type:'text/csv;charset=utf-8;'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = 'planovac.csv'; a.click();
URL.revokeObjectURL(url);
});


filterCat.addEventListener('change', render);
clearDone.addEventListener('click', ()=>{ tasks = tasks.filter(t=> !t.done); save(); render(); });
resetAll.addEventListener('click', ()=>{ if(confirm('Naozaj vymazať všetky úlohy?')){ tasks=[]; save(); render(); } });


render();
}


// Kvíz
if(document.body.dataset.page === 'quiz'){
const container = $('#quizContainer');
const startBtn = $('#startQuiz');
const restartBtn = $('#restartQuiz');


function start(){
container.innerHTML='';
QUIZ.forEach((q,i)=>{
const div = document.createElement('div');
div.className='q';
div.innerHTML = `<div class="title"><strong>${i+1}. ${q.q}</strong></div>
<div class="options">${q.options.map((opt,idx)=>`<label class="option"><input type=\"radio\" name=\"q${i}\" value=\"${idx}\"> ${opt}</label>`).join('')}</div>`;
container.appendChild(div);
});
const submit = document.createElement('button');
submit.className='btn secondary';
submit.textContent='Vyhodnotiť';
submit.addEventListener('click', evaluate);
container.appendChild(submit);
restartBtn.hidden=false;
}


function evaluate(){
let score=0; let out=[];
QUIZ.forEach((q,i)=>{
const chosen = container.querySelector(`input[name="q${i}"]:checked`);
const got = chosen? parseInt(chosen.value,10) : -1;
const ok = got===q.answer; if(ok) score++;
out.push({i,ok,exp:q.explain});
});
const result = document.createElement('div');
result.className='q result';
result.innerHTML = `<div>Skóre: <strong>${score}/${QUIZ.length}</strong></div>` +
out.map(r=>`<div>${r.ok?'✅':'❌'} Otázka ${r.i+1}: ${r.ok?'správne':'nesprávne'} – ${r.exp}</div>`).join('');
container.appendChild(result);
}


startBtn.addEventListener('click', start);
restartBtn.addEventListener('click', start);
}
})();
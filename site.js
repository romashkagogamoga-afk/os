(function(){
  /* звёздное небо */
  var cv=document.getElementById('sky');
  if(cv){
    var cx=cv.getContext('2d'),stars=[],still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var size=function(){var d=window.devicePixelRatio||1;cv.width=innerWidth*d;cv.height=innerHeight*d;cx.setTransform(d,0,0,d,0,0);
      stars=[];var n=Math.round(innerWidth*innerHeight/5200);for(var i=0;i<n;i++)stars.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.1+.2,p:Math.random()*6.28,s:.4+Math.random()});draw(0)};
    var draw=function(t){cx.clearRect(0,0,innerWidth,innerHeight);
      var g=cx.createRadialGradient(innerWidth*.75,innerHeight*.1,0,innerWidth*.75,innerHeight*.1,innerWidth*.7);g.addColorStop(0,'rgba(232,190,140,.18)');g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.fillRect(0,0,innerWidth,innerHeight);
      for(var i=0;i<stars.length;i++){var s=stars[i],a=.35+.45*Math.abs(Math.sin(s.p+t*.0004*s.s));cx.fillStyle='rgba(190,150,90,'+(a*.45)+')';cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.28);cx.fill()}};
    addEventListener('resize',size);size();
    if(!still){(function loop(t){draw(t);requestAnimationFrame(loop)})(0)}
  }

  var ex=document.getElementById('explorer');
  if(!ex)return;
  var still2=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var C=['--c1','--c2','--c3','--c4','--c5','--c6','--c7'];
  var D=[
    {n:'Муладхара',e:'Земля',t:'Опора, тело, безопасность, право быть здесь.',lo:'Мало опоры. Трудно чувствовать тело и землю под ногами, в материальном мало устойчивости, а сильные энергетические периоды выбивают из равновесия.',ok:'Есть устойчивость и доверие жизни. Тело ощущается домом, на земле спокойно, сильные потоки проходят мягко.',hi:'Опора превращается в тяжесть. Много контроля и страха перемен, сильная привязанность к материальному, трудно двигаться дальше.'},
    {n:'Свадхистхана',e:'Вода',t:'Удовольствие, чувственность, творчество.',lo:'Жизнь проживается через ум. Мало радости и удовольствия, чувства сдержаны, творчеству некуда течь.',ok:'Есть вкус к жизни, живые чувства и творчество. Телу хорошо, удовольствие приходит естественно.',hi:'Чувства захлёстывают. Эмоциональные качели, зависимость от удовольствий и от близких людей.'},
    {n:'Манипура',e:'Огонь',t:'Внутренняя сила, воля, границы.',lo:'Сила уходит к другим. Трудно отказать и выбрать себя, после общения остаётся чужое.',ok:'Есть внутренняя сила и ясные границы. Можно помогать другим, оставаясь собой.',hi:'Сила становится напором. Много контроля и желания всё держать самой, усталость от постоянного усилия.'},
    {n:'Анахата',e:'Воздух',t:'Сердце, любовь, принятие.',lo:'Сердце бережёт себя и закрывается. Трудно принимать любовь, высшее и земное живут отдельно.',ok:'Сердце открыто и защищено. В нём соединяются небо и земля.',hi:'Сердце отдаёт больше, чем может. Растворение в других, забота обо всех, кроме себя.'},
    {n:'Вишудха',e:'Звук',t:'Голос и самовыражение.',lo:'Внутри много понимания, но его трудно выразить. Голос звучит тише, чем хочется.',ok:'Голос свободен. То, что рождается внутри, находит слова.',hi:'Слов больше, чем смысла. Хочется объяснять и убеждать, трудно слушать и быть в тишине.'},
    {n:'Аджна',e:'Свет',t:'Внутреннее видение, интуиция.',lo:'Внутреннее видение затихает. Трудно довериться своим ощущениям, хочется опереться на чужое мнение.',ok:'Видение ясное и спокойное. Есть доверие себе.',hi:'Образов и знаков так много, что их трудно отличить от фантазии. Устаёт голова, слабеет связь с реальностью.'},
    {n:'Сахасрара',e:'Источник',t:'Связь с Источником, смысл, вера.',lo:'Связь с Источником ощущается слабой. Мало смысла и веры, внутренний канал будто закрыт.',ok:'Канал живой и ясный, и при этом ты остаёшься в теле и в своей жизни.',hi:'Внимание уходит слишком высоко. Земная жизнь отходит на второй план, после практик трудно вернуться в тело.'}
  ];
  var cur=0,st=0,pk=document.getElementById('picker'),SB=['stLo','stOk','stHi'];
  D.forEach(function(d,i){var b=document.createElement('button');b.className='pk';b.style.setProperty('--c','var('+C[i]+')');b.setAttribute('aria-label',d.n);b.setAttribute('aria-pressed',i===0);b.onclick=function(){set(i)};pk.appendChild(b)});
  function show(){var d=D[cur];ex.style.setProperty('--cur','var('+C[cur]+')');
    document.getElementById('exEl').textContent=d.e;document.getElementById('exMod').textContent='Модуль '+(cur+1);
    document.getElementById('exName').textContent=d.n;document.getElementById('exTheme').textContent=d.t;
    document.getElementById('exText').textContent=[d.lo,d.ok,d.hi][st];
    SB.forEach(function(id,i){document.getElementById(id).setAttribute('aria-pressed',i===st)});
    [].forEach.call(pk.children,function(b,i){b.setAttribute('aria-pressed',i===cur)})}
  function set(i){cur=i;show()}
  SB.forEach(function(id,i){document.getElementById(id).onclick=function(){st=i;show()}});
  [].forEach.call(document.querySelectorAll('.node'),function(n){n.onclick=function(){set(+n.dataset.k);document.getElementById('map').scrollIntoView({behavior:still2?'auto':'smooth'})}});
  show();

  var M=[['Муладхара','Заземление, опора, тело, безопасность','--c1'],['Свадхистхана','Радость и живые чувства','--c2'],['Манипура','Сила и границы','--c3'],
    ['Анахата','Сердце, где встречаются небо и земля','--c4'],['Вишудха','Голос и самовыражение','--c5'],['Аджна','Ясное видение','--c6'],
    ['Сахасрара','Связь с Источником, смысл, вера','--c7']];
  var ml=document.getElementById('mods');
  M.forEach(function(m,i){var li=document.createElement('li');li.style.setProperty('--c','var('+m[2]+')');
    li.innerHTML='<span class="n">'+String(i+1).padStart(2,'0')+'</span><div><b>'+m[0]+'</b><span>'+m[1]+'</span></div><i></i>';ml.appendChild(li)});
})();

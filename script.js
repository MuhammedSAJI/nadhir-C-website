function buildEnquiry(d){
 const J=window.jspdf;
 if(!J){msg.textContent='The PDF tool could not load. Check your internet connection and try again.';return}
 if(Object.values(d).some(v=>/[^\u0000-\u00ff]/.test(String(v)))){msg.textContent='Please type your details in English letters so they show correctly in the PDF.';return}
 const doc=new J.jsPDF({unit:'mm',format:'a4'}),W=210,M=18;
 const img=document.querySelector('.logo img'),lw=24,lh=lw*img.naturalHeight/img.naturalWidth;
 const now=new Date(),pad=n=>String(n).padStart(2,'0');
 const ref='NC-'+now.getFullYear()+pad(now.getMonth()+1)+pad(now.getDate())+'-'+pad(now.getHours())+pad(now.getMinutes());
 const date=now.toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});
 doc.addImage(LOGO_DATA,'JPEG',M,12,lw,lh);
 doc.setFont('helvetica','bold');doc.setFontSize(18);doc.setTextColor(8,9,11);doc.text('NADHIR CONSTRUCTION',W-M,22,{align:'right'});
 doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(90);
 doc.text('524/A, Bazar Street, Tamil Division-01, Sammanthurai',W-M,28,{align:'right'});
 doc.text('+94 76 610 4917  |  info.nadhirconstruction@gmail.com',W-M,33,{align:'right'});
 let y=12+lh+6;
 doc.setDrawColor(216,173,77);doc.setLineWidth(1);doc.line(M,y,W-M,y);
 y+=6;doc.setFillColor(8,9,11);doc.rect(M,y,W-2*M,14,'F');
 doc.setTextColor(216,173,77);doc.setFont('helvetica','bold');doc.setFontSize(15);doc.text('PROJECT ENQUIRY',M+5,y+9.3);
 doc.setFontSize(9);doc.setTextColor(255);doc.text('Ref: '+ref+'   |   '+date,W-M-5,y+9,{align:'right'});
 y+=24;
 [['Full Name',d.name],['Phone Number',d.phone],['Email Address',d.email],['Service Required',d.service],['Project Location',d.loc]].forEach(r=>{
  const lines=doc.splitTextToSize(r[1].trim(),W-2*M-52),h=Math.max(10,lines.length*5+5);
  doc.setFillColor(246,246,244);doc.rect(M,y,W-2*M,h,'F');doc.setFillColor(216,173,77);doc.rect(M,y,1.5,h,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(167,123,45);doc.text(r[0].toUpperCase(),M+6,y+6.5);
  doc.setFont('helvetica','normal');doc.setFontSize(11);doc.setTextColor(20);doc.text(lines,M+50,y+6.5);
  y+=h+3});
 y+=4;doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(167,123,45);doc.text('PROJECT DETAILS',M,y);y+=3;
 doc.setDrawColor(216,173,77);doc.setLineWidth(.4);doc.line(M,y,W-M,y);y+=7;
 doc.setFont('helvetica','normal');doc.setFontSize(11);doc.setTextColor(20);
 doc.splitTextToSize(d.details.trim(),W-2*M).forEach(l=>{if(y>270){doc.addPage();y=20}doc.text(l,M,y);y+=5.6});
 const n=doc.getNumberOfPages();
 for(let i=1;i<=n;i++){doc.setPage(i);doc.setFillColor(8,9,11);doc.rect(0,284,W,13,'F');doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(216,173,77);doc.text('Building with Purpose. Creating Lasting Value.',M,292);doc.setTextColor(255);doc.text('Page '+i+' of '+n,W-M,292,{align:'right'})}
 const file=new File([doc.output('blob')],'Nadhir-Enquiry-'+ref+'.pdf',{type:'application/pdf'}),url=URL.createObjectURL(file);
 const text='Hello NADHIR CONSTRUCTION, I would like to discuss a project.\nName: '+d.name+'\nService: '+d.service+'\nLocation: '+d.loc+'\nRef: '+ref+'\n(Full details in the attached PDF)';
 const can=!!(navigator.canShare&&navigator.canShare({files:[file]}));
 msg.innerHTML='<b>Your enquiry PDF is ready (Ref '+ref+').</b><br>Nothing has been sent yet. Send it to us on WhatsApp:<div class="acts"></div>';
 const acts=msg.querySelector('.acts');
 const mk=(t,c,fn)=>{const b=document.createElement('button');b.type='button';b.className='btn '+c;b.textContent=t;b.onclick=fn;acts.append(b)};
 if(can)mk('Share PDF on WhatsApp','gold',()=>navigator.share({files:[file],text}).catch(()=>{}));
 mk('Download PDF',can?'ink':'gold',()=>{const a=document.createElement('a');a.href=url;a.download=file.name;a.click()});
 mk('Open WhatsApp Chat','ink',()=>window.open('https://wa.me/94766104917?text='+encodeURIComponent(text),'_blank','noopener'));
 const p=document.createElement('p');p.style.cssText='margin:12px 0 0;font-size:.9rem';
 p.textContent=can?'Tap Share, choose WhatsApp, then pick NADHIR CONSTRUCTION (+94 76 610 4917).':'Download the PDF, open the WhatsApp chat, then attach the PDF with the paperclip.';
 msg.append(p);msg.scrollIntoView({behavior:'smooth',block:'nearest'});
}

const S=[["bld","Building Construction","Residential, commercial, and other building construction solutions tailored to project requirements."],
["road","Road and Infrastructure Development","Construction and development solutions for roads and supporting infrastructure."],
["wrench","Renovation and Building Maintenance","Renovation, improvement, repair, and building maintenance services."],
["beam","Civil Engineering Works","Civil construction solutions delivered with a focus on structural quality and project requirements."],
["land","Land Development and Earthworks","Site preparation, earthmoving, and land development solutions."],
["calc","Quantity Surveying and BOQ Preparation","Quantity take-offs, Bills of Quantities, and construction documentation."],
["coin","Construction Cost Estimation","Practical construction cost estimates and budget planning support."],
["clip","Project Management and Site Supervision","Project coordination, progress monitoring, and site supervision."],
["drop","Water Supply and Drainage Works","Water supply and drainage infrastructure solutions."],
["truck","Construction Equipment Rental","Construction equipment rental based on availability and project needs."]];
const g=document.getElementById('sgrid'),sel=document.querySelector('select'),fs=document.getElementById('fsvc');
S.forEach((s,i)=>{g.insertAdjacentHTML('beforeend',`<article class="svc rv" style="transition-delay:${(i%4)*80}ms"><svg><use href="#i-${s[0]}"/></svg><h3>${s[1]}</h3><p>${s[2]}</p></article>`);
sel.add(new Option(s[1],s[1]));fs.insertAdjacentHTML('beforeend',`<li><a href="#services">${s[1]}</a></li>`)});
document.getElementById('yr').textContent=new Date().getFullYear();
const h=document.getElementById('hdr'),nav=document.getElementById('nav'),b=document.getElementById('burger');
const sc=()=>h.classList.toggle('solid',scrollY>40);sc();addEventListener('scroll',sc,{passive:true});
function tog(o){nav.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''}
b.onclick=()=>tog(!nav.classList.contains('open'));
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>tog(false));
addEventListener('keydown',e=>{if(e.key==='Escape')tog(false)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
const st=document.getElementById('steps');
function pr(){const r=st.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.75-r.top)/r.height));st.style.setProperty('--p',p)}
pr();addEventListener('scroll',pr,{passive:true});
const f=document.getElementById('f'),msg=document.getElementById('msg');
f.addEventListener('submit',e=>{e.preventDefault();
 const d=Object.fromEntries(new FormData(f)),errs={};
 if(d.website)return;
 ['name','phone','email','service','loc','details'].forEach(k=>{if(!String(d[k]||'').trim())errs[k]='This field is required.'});
 if(!errs.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email))errs.email='Enter a valid email address, like name@example.com.';
 if(!errs.phone&&!/^\+?[0-9\s-]{9,15}$/.test(d.phone))errs.phone='Enter a valid phone number, like +94 76 610 4917.';
 f.querySelectorAll('label').forEach(l=>{const i=l.querySelector('input,select,textarea');l.querySelector('.err').textContent=errs[i.name]||''});
 msg.style.display='block';
 if(Object.keys(errs).length){msg.textContent='Please fix the highlighted fields and try again.';return}
 const body=`Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nService: ${d.service}\nLocation: ${d.loc}\n\n${d.details}`;
 buildEnquiry(d);
 
});
/* motion v2 */
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
let wi=0;document.querySelectorAll('.hero h1 span').forEach(sp=>{sp.innerHTML=sp.textContent.split(' ').map(w=>`<span class="w" style="--i:${wi++}">${w}</span>`).join(' ')});
document.querySelectorAll('.label,section h2').forEach(el=>{if(!el.closest('.hero,.rv')){el.classList.add('rv');io.observe(el)}});
const row=S.map(s=>`<span>${s[1]}</span>`).join('');document.getElementById('tk').innerHTML=row+row;
const pg=document.getElementById('prog'),sky=document.querySelector('.sky'),hero=document.querySelector('.hero'),stl=[...document.querySelectorAll('.steps li')];
function onS(){const m=document.documentElement.scrollHeight-innerHeight;pg.style.transform=`scaleX(${m>0?scrollY/m:0})`;
 if(!rm&&scrollY<innerHeight*1.2)sky.style.setProperty('--py',(scrollY*.12)+'px');
 const p=parseFloat(st.style.getPropertyValue('--p'))||0;stl.forEach((l,i)=>l.classList.toggle('act',p>=i/stl.length+.02))}
onS();addEventListener('scroll',onS,{passive:true});
if(fine&&!rm){
 hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--hx',(e.clientX-r.left)+'px');hero.style.setProperty('--hy',(e.clientY-r.top)+'px')});
 document.querySelectorAll('.svc').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}));
 document.querySelectorAll('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
}

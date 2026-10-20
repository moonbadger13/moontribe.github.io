'use strict';
const translations = [...document.querySelectorAll('[data-fr]')].map(el => ({el,en:el.innerHTML,fr:el.dataset.fr}));
const photos = [
  ['living','Living & dining · Renovation visualisation','Salon & salle à manger · Visualisation'],
  ['rear-garden','Rear garden with proposed spa & bar · Visualisation','Jardin arrière, spa et bar envisagés · Visualisation'],
  ['front-patio','Communal front patio · Proposed layout','Patio convivial à l’avant · Aménagement envisagé'],
  ['twin','Twin bedroom · Renovation visualisation','Chambre twin · Visualisation'],
  ['family','Family bedroom · Renovation visualisation','Chambre familiale · Visualisation'],
  ['shower','Shower room · Renovation visualisation','Salle d’eau · Visualisation'],
  ['hallway','A view through the apartment · Renovation visualisation','Perspective sur l’appartement · Visualisation'],
  ['passage','Warm timber passage · Renovation visualisation','Passage en bois chaleureux · Visualisation']
];
const seasons = {
  winter:{en:['First lift. Last run.','Head for the Grand Massif, then return to the village for an unhurried evening. Ski storage keeps your kit out of the living space.'],fr:['Première remontée. Dernière descente.','Partez explorer le Grand Massif, puis retrouvez le village pour une soirée tranquille. Le rangement à skis libère l’espace de vie.']},
  summer:{en:['Two wheels. A different view.','Mountain-bike trails, long walks and days in the fresh air. Come back to the garden and leave the bikes in their dedicated storage.'],fr:['Deux roues. Un autre horizon.','VTT, longues randonnées et journées au grand air. Retrouvez le jardin au retour et rangez les vélos dans leur espace dédié.']},
  autumn:{en:['Golden days. Quieter paths.','Woodland colours, crisp mornings and a slower village rhythm. Bring your walking shoes and leave a little space in the day for doing nothing.'],fr:['Les jours dorés. Les sentiers tranquilles.','Les couleurs des bois, les matins frais et le rythme plus doux du village. Emportez vos chaussures de marche et gardez du temps pour ne rien faire.']}
};
let language='en', season='winter', activePhoto=0;
const dialog=document.querySelector('#lightbox');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function updateSeason(){
  document.querySelector('#season-title').textContent=seasons[season][language][0];
  document.querySelector('#season-copy').textContent=seasons[season][language][1];
  document.querySelector('#season-panel').setAttribute('aria-labelledby','tab-'+season);
  document.querySelectorAll('[data-season]').forEach(btn=>{const on=btn.dataset.season===season;btn.setAttribute('aria-selected',String(on));btn.tabIndex=on?0:-1;});
}
function showPhoto(index){
  activePhoto=(index+photos.length)%photos.length;
  const photo=photos[activePhoto], caption=photo[language==='fr'?2:1];
  const image=document.querySelector('#lightbox-image');
  image.style.opacity='0';
  image.onload=()=>{image.style.opacity='1';};
  image.src='images/autumn/'+photo[0]+'.webp';image.alt=caption;
  if(image.complete && image.naturalWidth)image.style.opacity='1';
  document.querySelector('#lightbox-caption').textContent=caption;
  document.querySelector('#photo-count').textContent=String(activePhoto+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');
}
function setLanguage(next){
  language=next==='fr'?'fr':'en';document.documentElement.lang=language;
  translations.forEach(item=>{item.el.innerHTML=item[language];});
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.lang===language)));
  document.querySelectorAll('[data-alt-fr]').forEach(el=>{el.dataset.altEn??=el.alt;el.alt=language==='fr'?el.dataset.altFr:el.dataset.altEn;});
  document.querySelectorAll('.image-open[data-photo]').forEach(el=>{
    const caption=photos[Number(el.dataset.photo)][language==='fr'?2:1];
    el.setAttribute('aria-label',(language==='fr'?'Agrandir : ':'Enlarge: ')+caption);
    el.querySelector('img').alt=caption;
  });
  nav.setAttribute('aria-label',language==='fr'?'Navigation principale':'Main navigation');
  dialog.setAttribute('aria-label',language==='fr'?'Galerie du projet de rénovation':'Renovation image gallery');
  document.querySelector('.season-tabs').setAttribute('aria-label',language==='fr'?'Saisons':'Seasons');
  menu.setAttribute('aria-label',language==='fr'?'Ouvrir le menu':'Open menu');
  document.querySelector('#close-gallery').setAttribute('aria-label',language==='fr'?'Fermer la galerie':'Close gallery');
  document.querySelector('#previous-photo').setAttribute('aria-label',language==='fr'?'Image précédente':'Previous image');
  document.querySelector('#next-photo').setAttribute('aria-label',language==='fr'?'Image suivante':'Next image');
  document.title=language==='fr'?'Chalet Lune — Votre parenthèse alpine · Samoëns':'Chalet Lune — A slower kind of alpine stay · Samoëns';
  updateSeason();if(dialog.open)showPhoto(activePhoto);
  try{localStorage.setItem('chalet-lune-language',language);}catch{}
}
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
document.querySelectorAll('[data-season]').forEach(btn=>{
  btn.addEventListener('click',()=>{season=btn.dataset.season;updateSeason();});
  btn.addEventListener('keydown',e=>{const keys=['winter','summer','autumn'];let i=keys.indexOf(season);if(e.key==='ArrowRight')i=(i+1)%3;else if(e.key==='ArrowLeft')i=(i+2)%3;else if(e.key==='Home')i=0;else if(e.key==='End')i=2;else return;e.preventDefault();season=keys[i];updateSeason();document.querySelector('#tab-'+season).focus();});
});
document.querySelectorAll('[data-photo]').forEach(btn=>btn.addEventListener('click',()=>{showPhoto(Number(btn.dataset.photo));dialog.showModal();document.body.classList.add('modal-open');}));
document.querySelector('#close-gallery').addEventListener('click',()=>dialog.close());
document.querySelector('#previous-photo').addEventListener('click',()=>showPhoto(activePhoto-1));
document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(activePhoto+1));
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(activePhoto+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(activePhoto-1);}});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
document.querySelector('#year').textContent=new Date().getFullYear();
let saved;try{saved=localStorage.getItem('chalet-lune-language');}catch{}
setLanguage(saved==='fr'?'fr':'en');

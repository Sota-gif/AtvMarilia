const spotsLayer = document.getElementById("spotsLayer");
const totalSpots = 36;

function getState(){
  return JSON.parse(localStorage.getItem("smartpark_state") || '{"price":10,"occupied":[]}');
}
function saveState(state){ localStorage.setItem("smartpark_state", JSON.stringify(state)); }

function createSpots(clickable){
  const state=getState();
  for(let i=1;i<=totalSpots;i++){
    const spot=document.createElement("button");
    spot.className="spot"+(state.occupied.includes(i)?" occupied":"");
    spot.dataset.id=i;
    spot.title=`Vaga ${i}`;
    const row=(i-1)%9, col=Math.floor((i-1)/9);
    const positions=[
      [6,7],[6,18],[6,29],[6,40],[6,51],[6,62],[6,73],[6,84],[6,95],
      [35,7],[35,18],[35,29],[35,40],[35,51],[35,62],[35,73],[35,84],[35,95],
      [54,7],[54,18],[54,29],[54,40],[54,51],[54,62],[54,73],[54,84],[54,95],
      [85,7],[85,18],[85,29],[85,40],[85,51],[85,62],[85,73],[85,84],[85,95]
    ];
    spot.style.left=positions[i-1][0]+"%"; spot.style.top=positions[i-1][1]+"%";
    if(clickable){
      spot.onclick=()=>{
        const s=getState();
        if(s.occupied.includes(i)) s.occupied=s.occupied.filter(x=>x!==i);
        else s.occupied.push(i);
        saveState(s);
        render();
      };
    } else {
      spot.disabled=true;
    }
    spotsLayer.appendChild(spot);
  }
}
function render(){
  spotsLayer.innerHTML="";
  createSpots(false);
  const state=getState();
  const occupied=state.occupied.length;
  const free=totalSpots-occupied;
  document.getElementById("freeCount").textContent=free;
  document.getElementById("occupiedCount").textContent=occupied;
  document.getElementById("totalCount").textContent=totalSpots;
  document.getElementById("publicPrice").textContent=state.price.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}
render();
window.addEventListener("storage",render);

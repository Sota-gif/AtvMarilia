if(sessionStorage.getItem("smartpark_manager")!=="true") location.href="login.html";

const spotsLayer=document.getElementById("spotsLayer");
const totalSpots=36;

function getState(){return JSON.parse(localStorage.getItem("smartpark_state")||'{"price":10,"occupied":[]}');}
function saveState(s){localStorage.setItem("smartpark_state",JSON.stringify(s));}

function render(){
  const s=getState();
  spotsLayer.innerHTML="";
  const positions=[
    [6,7],[6,18],[6,29],[6,40],[6,51],[6,62],[6,73],[6,84],[6,95],
    [35,7],[35,18],[35,29],[35,40],[35,51],[35,62],[35,73],[35,84],[35,95],
    [54,7],[54,18],[54,29],[54,40],[54,51],[54,62],[54,73],[54,84],[54,95],
    [85,7],[85,18],[85,29],[85,40],[85,51],[85,62],[85,73],[85,84],[85,95]
  ];
  for(let i=1;i<=totalSpots;i++){
    const spot=document.createElement("button");
    spot.className="spot"+(s.occupied.includes(i)?" occupied":"");
    spot.title=`Vaga ${i} — clique para alterar`;
    spot.style.left=positions[i-1][0]+"%";spot.style.top=positions[i-1][1]+"%";
    spot.onclick=()=>{
      const state=getState();
      if(state.occupied.includes(i)) state.occupied=state.occupied.filter(x=>x!==i);
      else state.occupied.push(i);
      saveState(state); render();
    };
    spotsLayer.appendChild(spot);
  }
  document.getElementById("freeCount").textContent=totalSpots-s.occupied.length;
  document.getElementById("occupiedCount").textContent=s.occupied.length;
  document.getElementById("totalCount").textContent=totalSpots;
  const formatted=s.price.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  document.getElementById("currentPrice").textContent=formatted;
  document.getElementById("priceInput").value=s.price.toFixed(2);
}

document.getElementById("savePrice").onclick=()=>{
  const value=Math.max(0,Number(document.getElementById("priceInput").value||0));
  const s=getState(); s.price=value; saveState(s); render();
  alert("Preço atualizado. A área do cliente já pode consultar o novo valor.");
};

document.getElementById("releaseAll").onclick=()=>{
  const s=getState(); s.occupied=[]; saveState(s); render();
};

document.getElementById("logout").onclick=()=>{
  sessionStorage.removeItem("smartpark_manager");
  location.href="login.html";
};

render();
window.addEventListener("storage",render);

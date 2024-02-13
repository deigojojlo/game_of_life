var heigth = 50 ; 
var width = 50; 
var grid = new Array(heigth); 
var interval ;
initialize();
draw(); 

const stop = document.getElementById("stop");
const start = document.getElementById("start");
const reset = document.getElementById("reset")
stop.addEventListener("click" , () => {
    clearInterval(interval);
    stop.setAttribute("class","on");
    start.setAttribute("class","off");
})
start.addEventListener("click",() => {
    interval = setInterval(evolution,100);
    stop.setAttribute("class","off");
    start.setAttribute("class","on");
})
reset.addEventListener('click', () => {
    initialize() ;
    updateAffichage();
})



function initialize (){
    for (let i = 0 ; i < heigth ; i++){
        grid[i] = new Array(width) ; 
    }
}

function draw(){  // class qui gere le tableau de cellule 
    var gridContainer = document.getElementById("grid-container");

    if (!gridContainer) {
        // Throw error
        console.error("Problem: No div for the drid table!");
    }
    var table = document.createElement("tr") ; 

    for (let i = 0 ; i < heigth ; i++){
        var tr = document.createElement("tr")
        for (let j = 0 ; j < width; j++){
            var cell = document.createElement("td");
            cell.onclick = cellCLick;
            cell.setAttribute("id", i + "," + j );
            cell.setAttribute("class","mort");
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);

    function cellCLick(){
        let row = this.id.split(",")[0]; 
        let column = this.id.split(",")[1];
        console.log(grid[row][column]);
        let classe = this.getAttribute("class");
        if (classe.indexOf("vie") > -1 ){ //si on trouve la vie 
            this.setAttribute("class","mort")
            grid[row][column] = 0 ; 
        } else {
            this.setAttribute("class","vie"); 
            grid[row][column] = 1 ; 
        }
    }


    
    }

function updateAffichage(){
    for (let i = 0 ; i < heigth ; i++ ){
        for (let k = 0 ; k < width ; k++){
            let cell = document.getElementById(i + "," + k );
            if  (grid[i][k] == 1 ) {
                cell.setAttribute("class","vie");
            } else {
                cell.setAttribute("class","mort");
            }
    }
}
}


function voisin(row ,column){
    let a = new Array ;  
    for (let j = -1; j < 2; j++){
        for ( let k = -1 ; k < 2 ; k++){
            if (k === 0 && j == 0) continue ; 
            a.push(grid[(row + j + width)%width][(column+k+heigth)%heigth]); 
        }
    }
    return a ; 
}

function countAlive(a){
    let c = 0 ;  
    for (let j = 0 ; j < a.length ; j++){
        c += a[j] ;
    }
    return c ;
}

function evolution(){
    let ngrid = [...grid] ; 
    console.log("ok");
    console.log(width,heigth)
    for (let i = 0 ; i < heigth ; i++){
        for (let k = 0 ; k < width ; k++){
            let  v = countAlive(voisin(i,k)); 
            if (v === 3) ngrid[i][k] = 1 ;
            else if (v === 2) continue ; 
            else ngrid[i][k] = 0 ;
        }
    }
    grid = ngrid ; 
    console.log("ok")
    updateAffichage();
}

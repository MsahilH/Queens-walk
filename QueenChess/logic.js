let table = document.querySelector('.table');
//console.log(table);
for(let i=0;i<8;i++){
    let tr = document.createElement("tr");
   // console.log(tr," : ",i);
    let white = (i%2==0) ? true : false;
    for(let j=0;j<8;j++){
        let td = document.createElement("td");
            //console.log(td," : ",i," ",j);
            if(white){
                td.setAttribute("class","box white");
            }else{
                td.setAttribute("class","box black");
            }
            white = !white;
        td.setAttribute("data-index",`${i}-${j}`);
        console.log(td);

        tr.appendChild(td);
    }
    // console.log(tr);
    // console.log(table);
    table.appendChild(tr);
}

table.addEventListener("mouseover",function(e){
    console.log(e);
    let pos = e.target.dataset.index.split("-").map((val)=>parseInt(val));
    console.log(pos);
    let row = pos[0];
    let col=pos[1];

    let str = `${row}-${col}`;
    let hash = {};
    hash[str]=true;

    hash = findTopLeft(row,col,hash);
    hash = findTopRight(row,col,hash);
    hash = findBottomleft(row,col,hash);
    hash = findBottomRight(row,col,hash);
    hash = findColRow(row,col,hash);
    
    cells = document.querySelectorAll("td");
    console.log(cells);
    for(let i=0; i<cells.length;i++){
        cells[i].classList.remove("pink");
    }
    for(let i=0;i<cells.length;i++){
        let str = `${cells[i].closest("tr").rowIndex}-${cells[i].cellIndex}`;
        if(hash[str]){
            cells[i].classList.add("pink");
        }
    }
});

table.addEventListener("mouseleave",function(e) {
    const cells = document.querySelectorAll("td")
    for(let i=0;i<cells.length;i++){
        cells[i].classList.remove("pink");
    }
})

function findTopLeft(row,col,hash){
    row--;col--;
    while(row>=0 && col>=0){
        let key =`${row}-${col}`;
        hash[key]=true;
        row--;
        col--;
    }
    return hash;
}
function findTopRight(row,col,hash){
    row++;col--;
    while(row<=8 && col>=0){
        let key =`${row}-${col}`;
        hash[key] =true;
        row++;
        col--;
    }
    return hash;
}
function findBottomleft(row,col,hash){
    row--;col++;
    while(row>=0 && col<=8){
        let key =`${row}-${col}`;
        hash[key] =true;
        row--;
        col++;
    }
    return hash;
}
function findBottomRight(row,col,hash){
    row++;col++;
    while(row<=8 && col<=8){
        let key =`${row}-${col}`;
        hash[key] =true;
        row++;
        col++;
    }
    return hash;
}
function findColRow(row,col,hash){
    for(let i=0;i<8;i++){
        let key =`${i}-${col}`;
        hash[key] =true;
    }
    for(let i=0;i<8;i++){
        let key =`${row}-${i}`;
        hash[key] =true;
    }
    
    return hash;
}




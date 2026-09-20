
//10x6 grid of sediment and air.
let sedimentBoogey = 10;
let rockID = 0;
//track the whole of everything. Why not. This is the easiest solution.
//in fact, I can just draw the map in here instead of figuring out what I want with math. huh.
let rockMaster = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                  9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                  9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                  9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                  9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                  9, 9, 9, 9, 9, 9, 9, 9, 9, 9,];
for(let i = 0; i < 6; i ++){
    for(let j = 0; j < 10; j ++){
        if((rockID < 10 && rockID % 2 == 0) || rockID % 3 == 2 || rockID % 7 == 1 || rockID % 4 == 2){
            let sediment = document.createElement("img");
            sediment.src = "images/bubbles/sediment.png";
            sediment.className = "gridworks";
            sedimentBoogey = 10 + (j * 8);
            sediment.style.left = sedimentBoogey + "%";
            sedimentBoogey = 17 + (i * 12);
            sediment.style.top = sedimentBoogey + "%";
            document.body.appendChild(sediment);
            rockMaster[rockID] = 9;
        }
        else{
            let airhead = document.createElement("img");
            airhead.src = "images/twinkle0.png";
            airhead.id = "air" + rockID;
            airhead.className = "gridworks";
            sedimentBoogey = 10 + (j * 8);
            airhead.style.left = sedimentBoogey + "%";
            sedimentBoogey = 17 + (i * 12);
            airhead.style.top = sedimentBoogey + "%";
            document.body.appendChild(airhead);
            rockMaster[rockID] = 0;
        }
            
        //rockID tracks the row-col natively thanks to incrementing exactly here: the tens place is the column, the ones place is the row.
        //when checking for an adjacent bubble, you only need check +-10 and +-1 to the currently interested rockID.
        rockID ++;
    }
}

//cursor location spots and tagalongs for the chipmunk and the gauge
let hotly = 0;
let hotspots = ["10%", "18%", "26%", "34%", "42%", "50%", "58%", "66%", "74%", "82%"];
let player = document.getElementById("player");
let gauge = document.getElementById("gauge");
let meter = document.getElementById("meter");
let munkTracks = 10;
let munkMind = 15;

//node tracking: tens place is the column, ones place is the row, starting below the chipmunk.
let rockerand = hotly;  //as in rock operand, not rock random
document.addEventListener('keydown', (e) =>{
    if(e.key === ' ') {
        player.src = "images/chipBlow.png";
        if(rockMaster[rockerand] == 9)
            console.log("that is solid. mwah.");
        else if(rockMaster[rockerand] == 4){
            document.addEventListener('keydown', (f) =>{
                if(f.key === 'ArrowLeft'){

                }
                else if(f.key === 'ArrowRight'){

                }
                else if(f.key === 'ArrowUp'){

                }
                else if(f.key === 'ArrowDown'){

                }
            });
        }
    }   //left/right/up/down have different functionality whilst SpaceBar is held, hence the elseif here
    else if(e.key === 'ArrowLeft') {
        if(hotly > 0){
            hotly --;
            cursor.style.left = hotspots[hotly];
            leftBehind();
        }
    }
    else if(e.key === 'ArrowRight') {
        if(hotly < 9){
            hotly ++;
            cursor.style.left = hotspots[hotly];
            leftBehind();
        }
    }

    if(e.key === '0'){
        cursor.style.left = hotspots[0];
        hotly = 0;
        leftBehind();
    }
    else if(e.key === '1'){
        cursor.style.left = hotspots[1];
        hotly = 1;
        leftBehind();
    }
    else if(e.key === '2'){
        cursor.style.left = hotspots[2];
        hotly = 2;
        leftBehind();
    }
    else if(e.key === '3'){
        cursor.style.left = hotspots[3];
        hotly = 3;
        leftBehind();
    }
    else if(e.key === '4'){
        cursor.style.left = hotspots[4];
        hotly = 4;
        leftBehind();
    }
    else if(e.key === '5'){
        cursor.style.left = hotspots[5];
        hotly = 5;
        leftBehind();
    }
    else if(e.key === '6'){
        cursor.style.left = hotspots[6];
        hotly = 6;
        leftBehind();
    }
    else if(e.key === '7'){
        cursor.style.left = hotspots[7];
        hotly = 7;
        leftBehind();
    }
    else if(e.key === '8'){
        cursor.style.left = hotspots[8];
        hotly = 8;
        leftBehind();
    }
    else if(e.key === '9'){
        cursor.style.left = hotspots[9];
        hotly = 9;
        leftBehind();
    }
});
let inStep = false;
function leftBehind(){
    setTimeout(() => {
        if(player.style.left > cursor.style.left){
            munkTracks = munkTracks - 0.5;
            munkMind = munkMind - 0.5;
            player.style.left = munkTracks + "%";
            gauge.style.left = munkMind + "%";
            munkMind = munkMind + 0.2;
            meter.style.left = munkMind + "%";
            munkMind = munkMind - 0.2;
            if(inStep){
                player.src = "images/chipwalk2.png";
                inStep = false;
            }
            else{
                player.src = "images/chipwalk3.png";
                inStep = true;
            }
            leftBehind();
        }
        else if(player.style.left < cursor.style.left){
            munkTracks = munkTracks + 0.5;
            munkMind = munkMind + 0.5;
            player.style.left = munkTracks + "%";
            gauge.style.left = munkMind + "%";
            munkMind = munkMind + 0.2;
            meter.style.left = munkMind + "%";
            munkMind = munkMind - 0.2;
            if(inStep){
                player.src = "images/chipwalk0.png";
                inStep = false;
            }
            else{
                player.src = "images/chipwalk1.png";
                inStep = true;
            }
            leftBehind();
        }  
        else
            player.src = "images/chipWait.png";
    }, 100);
    
}

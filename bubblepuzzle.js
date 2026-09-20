
//10x6 grid of sediment and air.
let sedimentBoogey = 10;
for(let i = 0; i < 6; i ++){
    for(let j = 0; j < 10; j ++){
        //if(){
            let sediment = document.createElement("img");
            sediment.src = "images/bubbles/sediment.png";
            sediment.className = "gridworks";
            sedimentBoogey = 10 + (j * 8);
            sediment.style.left = sedimentBoogey + "%";
            sedimentBoogey = 17 + (i * 12);
            sediment.style.top = sedimentBoogey + "%";
            document.body.appendChild(sediment);
            /*
        }
        else{
            let airhead = document.createElement("img");
            airhead.src = "images/twinkle0.png";
            airhead.className = "gridworks";
            sedimentBoogey = 10 + (j * 8);
            airhead.style.left = sedimentBoogey + "%";
            sedimentBoogey = 17 + (i * 12);
            airhead.style.top = sedimentBoogey + "%";
            document.body.appendChild(airhead);
        }
            */
    }
}

hotly = 0;
hotspots = ["10%", "18%", "26%", "34%", "42%", "50%", "58%", "66%", "74%", "82%"];
player = document.getElementById("player");
gauge = document.getElementById("gauge");
meter = document.getElementById("meter");
munkTracks = 10;
munkMind = 15;
document.addEventListener('keydown', (e) =>{
    if(e.key === 'ArrowLeft') {
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
    if(e.key === 'Space') {
        player.src = "images/chipBlow.png";
        //perform every check known to man: four for each slot because there is no earthly way to know where the current position is from the perspective of a given slot.
        //do I need 240 checks every time?
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
function leftBehind(){
    console.log("leftBehind call!");
    setTimeout(() => {
        if(player.style.left > cursor.style.left){
            munkTracks = munkTracks - 0.5;
            munkMind = munkMind - 0.5;
            player.style.left = munkTracks + "%";
            gauge.style.left = munkMind + "%";
            munkMind = munkMind + 0.2;
            meter.style.left = munkMind + "%";
            munkMind = munkMind - 0.2;
            player.src = "images/chipwalk2.png";
            console.log("Cursor left is greater than chip left; chip x: " + player.style.left + " cursor x: " + cursor.style.left);
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
            player.src = "images/chipwalk0.png";
            console.log("Cursor left is less than chip left; chip x: " + player.style.left + " cursor x: " + cursor.style.left);
            leftBehind();
        }  
        else
            player.src = "images/chipWait.png";
    }, 100);
    
}

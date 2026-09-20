let okok = document.getElementById("begone");
okok.onclick = () =>{
    okok.style.display = "none";
    document.getElementById("greetings").style.display = "none";
    document.getElementById("inst1").style.display = "none";
    document.getElementById("inst2").style.display = "none";
    document.getElementById("inst3").style.display = "none";
    document.getElementById("inst4").style.display = "none";
    document.getElementById("inst5").style.display = "none";
    document.getElementById("inst6").style.display = "none";
    document.getElementById("inst1B").style.display = "none";
    document.getElementById("inst2B").style.display = "none";
    document.getElementById("inst3B").style.display = "none";
    document.getElementById("inst4B").style.display = "none";
    document.getElementById("inst5B").style.display = "none";
    document.getElementById("inst6B").style.display = "none";
}

//10x6 grid of sediment and air.
let sedimentBoogey = 10;
let rockID = 0;
//track the whole of everything. Why not. This is the easiest solution.
//in fact, I can just draw the map in here instead of figuring out what I want with math. huh.

let rockMaster = [9, 0, 9, 9, 0, 9, 9, 9, 9, 0,
                  9, 0, 9, 0, 0, 9, 9, 9, 9, 0,
                  0, 0, 9, 9, 9, 9, 9, 9, 0, 0,
                  0, 9, 9, 9, 0, 9, 9, 9, 0, 9,
                  0, 9, 9, 9, 0, 0, 0, 0, 0, 9,
                  0, 0, 9, 9, 9, 9, 9, 9, 9, 9,];

for(let i = 0; i < 6; i ++){
    for(let j = 0; j < 10; j ++){
        if(rockMaster[rockID] == 9){
            let sediment = document.createElement("img");
            sediment.src = "images/bubbles/sediment.png";
            sediment.className = "gridworks";
            sedimentBoogey = 10 + (j * 8);
            sediment.style.left = sedimentBoogey + "%";
            sedimentBoogey = 17 + (i * 12);
            sediment.style.top = sedimentBoogey + "%";
            document.body.appendChild(sediment);
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
        }
        console.log(rockID + ": " + rockMaster[rockID]);
        //rockID tracks the row-col natively thanks to incrementing exactly here: the tens place is the column, the ones place is the row.
        //when checking for an adjacent bubble, you only need check +-10 and +-1 to the currently interested rockID.
        rockID ++;
    }
}

/*
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
            if(rockID < 10){
                rockMaster[rockID] = 4;
                airhead.src = "images/bubbles/bubble4.png";
            }
        }
        console.log(rockID + ": " + rockMaster[rockID]);
        //rockID tracks the row-col natively thanks to incrementing exactly here: the tens place is the column, the ones place is the row.
        //when checking for an adjacent bubble, you only need check +-10 and +-1 to the currently interested rockID.
        rockID ++;
    }
}
*/

//cursor location spots and tagalongs for the chipmunk and the gauge
let hotly = 0;
let hotspots = ["10%", "18%", "26%", "34%", "42%", "50%", "58%", "66%", "74%", "82%"];
let player = document.getElementById("player");
let gauge = document.getElementById("gauge");
let meter = document.getElementById("meter");
let munkTracks = 10;
let munkMind = 15;
let meterBar = 110; //fullness of the green within the gauge. This depletes while blowing and refills when SpaceBar is lifted. 110 is full, 0 is empty.

//node tracking: tens place is the column, ones place is the row, starting below the chipmunk.
let rockerand = hotly;  //as in rock operand, not rock random
let breathing = true;
let hLeft = false;
let hUp = false;
let hRight = false;
let hDown = false;

document.addEventListener('keydown', (e) =>{
    if(e.key === ' ') {
        breathing = false;
        player.src = "images/chipBlow.png";
        if(rockMaster[rockerand] == 9)
            console.log("that is solid. mwah.");
        if(rockMaster[rockerand] == 4){
            //prime the node's surroundings for meeting and greeting
            if(rockMaster[rockerand + 1] == 0)
                rockMaster[rockerand + 1] = 1;
            if(rockMaster[rockerand - 1] == 0)
                rockMaster[rockerand - 1] = 1;
            if(rockMaster[rockerand + 10] == 0)
                rockMaster[rockerand + 10] = 1;
            if(rockerand >= 9){
                if(rockMaster[rockerand - 10] == 0)
                    rockMaster[rockerand - 10] = 1;
            }
        }
        document.addEventListener('keydown', (f) =>{
            if(rockerand <= 9 && rockMaster[rockerand] != 4){
                if(f.key === 'ArrowDown' && breathing == false){
                    if(hDown == false && meterBar > 0){
                        console.log("early breaths");
                        if(rockMaster[rockerand] == 0){
                            rockMaster[rockerand] = 8;
                            document.getElementById("air" + (rockerand - 1)).src = "images/bubbles/bubble7.png";
                        }
                        if(rockMaster[rockerand] > 4 && rockMaster[rockerand] != 9){
                            rockMaster[rockerand] --;
                            document.getElementById("air" + rockerand).src = "images/bubbles/bubble" + rockMaster[rockerand] + ".png";
                        }
                        meterBar -= 5;
                        meterUpdate();
                        hDown = true;
                    }
                }
            }
            if(f.key === 'ArrowLeft' && breathing == false){
                if(hLeft == false && meterBar > 0){
                    console.log("try breathing left.");
                    if(rockerand % 10 != 0){
                        if(rockMaster[rockerand - 1] != 9 && rockMaster[rockerand - 1] != 4){
                            rockMaster[rockerand - 1] ++;
                            if(rockMaster[rockerand - 1] == 4){
                                rockerand --;
                                document.getElementById("air" + rockerand).src = "images/bubbles/bubble4.png";
                                console.log("adjacent node Left is now stage 4. Moving on to the new node: " + rockerand);
                            }
                            else{
                                rockerand --;
                                document.getElementById("air" + rockerand).src = "images/bubbles/bubbleL" + rockMaster[rockerand] + ".png";
                                rockerand ++;
                                console.log("adjacent node Left has otherwise incremented.");
                            }
                            meterBar -= 5;
                            meterUpdate();
                        }
                    }
                    hLeft = true;
                }
            }
            else if(f.key === 'ArrowRight' && breathing == false){
                if(hRight == false && meterBar > 0){
                    console.log("try breathing right.");
                    if(rockerand % 10 != 9){
                        if(rockMaster[rockerand + 1] != 9 && rockMaster[rockerand + 1] != 4){
                            rockMaster[rockerand + 1] ++;
                            if(rockMaster[rockerand + 1] == 4){
                                rockerand ++;
                                document.getElementById("air" + rockerand).src = "images/bubbles/bubble4.png";
                                console.log("adjacent node Right is now stage 4. Moving on to the new node: " + rockerand);
                            }
                            else{
                                rockerand ++;
                                document.getElementById("air" + rockerand).src = "images/bubbles/bubbleR" + rockMaster[rockerand] + ".png";
                                rockerand --;
                                console.log("adjacent node Right has otherwise incremented.");
                            }
                            meterBar -= 5;
                            meterUpdate();
                        }
                    }
                    hRight = true;
                }
            }
            else if(f.key === 'ArrowUp' && breathing == false){
                if(hUp == false && meterBar > 0){
                    console.log("try breathing up.");
                    if(rockerand >= 10){
                        if(rockMaster[rockerand - 10] != 9 && rockMaster[rockerand - 10] != 4){
                            rockMaster[rockerand - 10] ++;
                            if(rockMaster[rockerand - 10] == 4){
                                rockerand = rockerand - 10;
                                document.getElementById("air" + rockerand).src = "images/bubbles/bubble4.png";
                                
                                console.log("adjacent node Up is now stage 4. Moving on to the new node: " + rockerand);
                            }
                            else{
                                rockerand = rockerand - 10;
                                document.getElementById("air" + rockerand).src = "images/bubbles/bubbleU" + rockMaster[rockerand] + ".png";
                                rockerand = rockerand + 10;
                                console.log("adjacent node Up has otherwise incremented.");
                            }
                            meterBar -= 5;
                            meterUpdate();
                        }
                    }
                    hUp = true;
                }
            }
            else if(f.key === 'ArrowDown' && breathing == false){
                if(hDown == false && meterBar > 0){
                    console.log("try breathing down.");
                    if(rockerand < 60){
                        if(rockMaster[rockerand + 10] != 9 && rockMaster[rockerand + 10] != 4){
                            rockMaster[rockerand + 10] ++;
                            if(rockMaster[rockerand + 10] == 4){
                                rockerand = rockerand + 10;
                                document.getElementById("air" + rockerand).src = "images/bubbles/bubble4.png";
                                
                                console.log("adjacent node Down is now stage 4. Moving on to the new node: " + rockerand);
                            }
                            else{
                                rockerand = rockerand + 10;
                                document.getElementById("air" + rockerand).src = "images/bubbles/bubbleD" + rockMaster[rockerand] + ".png";
                                rockerand = rockerand - 10;
                                console.log("adjacent node Down has otherwise incremented.");
                            }
                            meterBar -= 5;
                            meterUpdate();
                        }
                    }
                    hDown = true;
                }
            }
        });
    }   //left/right/up/down have different functionality whilst SpaceBar is held, hence the elseif here
    else if(e.key === 'ArrowLeft' && breathing == true) {
        if(hotly > 0){
            hotly --;
            cursor.style.left = hotspots[hotly];
            rockerand = hotly;
            leftBehind();
        }
    }
    else if(e.key === 'ArrowRight' && breathing == true) {
        if(hotly < 9){
            hotly ++;
            cursor.style.left = hotspots[hotly];
            rockerand = hotly;
            leftBehind();
        }
    }

    if(e.key === '0'){
        cursor.style.left = hotspots[0];
        hotly = 0;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '1'){
        cursor.style.left = hotspots[1];
        hotly = 1;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '2'){
        cursor.style.left = hotspots[2];
        hotly = 2;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '3'){
        cursor.style.left = hotspots[3];
        hotly = 3;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '4'){
        cursor.style.left = hotspots[4];
        hotly = 4;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '5'){
        cursor.style.left = hotspots[5];
        hotly = 5;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '6'){
        cursor.style.left = hotspots[6];
        hotly = 6;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '7'){
        cursor.style.left = hotspots[7];
        hotly = 7;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '8'){
        cursor.style.left = hotspots[8];
        hotly = 8;
        rockerand = hotly;
        leftBehind();
    }
    else if(e.key === '9'){
        cursor.style.left = hotspots[9];
        hotly = 9;
        rockerand = hotly;
        leftBehind();
    }
});


document.addEventListener('keyup', (e) =>{
    if(e.key === ' '){
        breathing = true;
        if(meterBar < 110)
            player.src = "images/chipGasp.png"
        oxygenGreed();
    }
    if(e.key === 'ArrowLeft'){
        hLeft = false;
    }
    if(e.key === 'ArrowRight'){
        hRight = false;
    }
    if(e.key === 'ArrowUp'){
        hUp = false;
    }
    if(e.key === 'ArrowDown'){
        hDown = false;
    }
});

function oxygenGreed(){
    console.log("gasp gasp");
    setTimeout(() =>{
        meterBar += 5;
        if(meterBar >= 110)
            meterBar = 110;
        console.log("meterBar: " + meterBar);
        meterUpdate();
        console.log("breathing: " + breathing);
        if(breathing == true && meterBar < 110)
            oxygenGreed();
        else
            player.src = "images/chipWait.png";
    }, 50);
}
function meterUpdate(){//top: 1%; height: 5.5%;
    //as the meterBar depletes, it goes visibly down, such that top increases and height decreases, until top is at 6.5% and height is at 0%.
    meterBar = meterBar / 20;
    meter.style.height = meterBar + "%";

    meterBar = Math.abs(5.5 - meterBar);
    meterBar ++;
    meter.style.top = meterBar + "%";
    meterBar --;
    meterBar = Math.abs(5.5 - meterBar);
    meterBar = meterBar * 20;
}

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

hotly = 0;
hotspots = ["10%", "18%", "26%", "34%", "42%", "50%", "58%", "66%", "74%", "82%"];
player = document.getElementById("player");
gauge = document.getElementById("gauge");
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
        gauge.style.left = (2 + parseInt(player.style.left)) + "%";
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
            player.style.left = (parseInt(player.style.left) - 0.5) + "%";
            gauge.style.left = (5 + parseInt(player.style.left)) + "%";
            player.src = "images/chipwalk2.png";
            console.log("Cursor left is greater than chip left; chip x: " + player.style.left + " cursor x: " + cursor.style.left);
            leftBehind();
        }
        else if(player.style.left < cursor.style.left){
            player.style.left = (parseInt(player.style.left) + 0.5) + "%";
            gauge.style.left = (5 + parseInt(player.style.left)) + "%";
            player.src = "images/chipwalk0.png";
            console.log("Cursor left is less than chip left; chip x: " + player.style.left + " cursor x: " + cursor.style.left);
            leftBehind();
        }  
        else
            player.src = "images/chipWait.png";
    }, 100);
    
}
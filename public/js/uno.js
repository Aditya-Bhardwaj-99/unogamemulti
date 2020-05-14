    const ws= new WebSocket("ws://unogame-5a61b.web.app/");
    var cards;
    var tablecard;
    var user
    function ready(){
        user=document.getElementById("header2").textContent;
        ws.send(JSON.stringify({action:'start',user:document.getElementById("header2").textContent}));
    }
    ws.onmessage=function(event){
        var data=JSON.parse(event.data);
        console.log(data);
        var user=document.getElementById("header2").textContent;
        if(data.action == "startreturn"){
            cards=data.cards;
            tablecard=data.tablecard;
            alert(data.turn+"'s turn");
            setcards(data.turn);
        }
        else if(data.action=="nextturn"){
            tablecard=data.tablecard;
            alert(data.turn+"'s turn");
            nextturn(data.turn,data.addcards);
        }
        else if(data.action=="win"){
            win(data.user);
        }
        else if(data.action=="retry"){
            ws.send(JSON.stringify({action:'start',user:document.getElementById("header2").textContent}));
        }
        else if(data.action=="drawrep"){
            if(data.user==user){
                drawCardres(data.addcard)
            }
        }
    }

    function drawCard(){
        ws.send(JSON.stringify({action:'draw',played:user}));
    }
    
    function setcards(turn){
        document.getElementById("counter").innerHTML = 0 ;
        var col0 = document.getElementById("card0") ;  
        var col1 = document.getElementById("card1") ;  
        var col2 = document.getElementById("card2") ;  
        var col3 = document.getElementById("card3") ;  
        var col4 = document.getElementById("card4") ;  
        var col5 = document.getElementById("card5") ;  
        var col6 = document.getElementById("card6") ;  
        var col7 = document.getElementById("card7") ;  
        var col8 = document.getElementById("card8") ;  
        var col9 = document.getElementById("card9") ;  
        var col10 = document.getElementById("card10") ;  
        var col11 = document.getElementById("card11") ;  
        var col12 = document.getElementById("card12") ;  
        var col13 = document.getElementById("card13") ;  
        var col14 = document.getElementById("card14") ;  
        var col15 = document.getElementById("card15") ;  
        var col16 = document.getElementById("card16") ;  
        var col17 = document.getElementById("card17") ;  
        var col18 = document.getElementById("card18") ;  
        var col19 = document.getElementById("card19") ;  
        var col20 = document.getElementById("card20") ;  
        var col21 = document.getElementById("card21") ;  
        var col22 = document.getElementById("card22") ;  
        var col23 = document.getElementById("card23") ;  
        var col24 = document.getElementById("card24") ;  
        var col25 = document.getElementById("card25") ;  
        var col26 = document.getElementById("card26") ;  
        var col27 = document.getElementById("card27") ; 
        var table = document.getElementById("tableCard") ;
        col0.innerHTML = "N" ;
        col1.innerHTML = "N" ;
        col2.innerHTML = "N" ;
        col3.innerHTML = "N" ;
        col4.innerHTML = "N" ;
        col5.innerHTML = "N" ;
        col6.innerHTML = "N" ;
        col7.innerHTML = "N";
        col8.innerHTML = "N";
        col9.innerHTML = "N";
        col10.innerHTML = "N";
        col11.innerHTML = "N";
        col12.innerHTML = "N";
        col13.innerHTML = "N";
        col14.innerHTML = cards[0].num ;
        col14.style.backgroundColor=cards[0].color;
        if(col14.style.backgroundColor=="black"){
            col14.style.color="white";
        }
        col15.innerHTML = cards[1].num ;
        col15.style.backgroundColor=cards[1].color;
        if(col15.style.backgroundColor=="black"){
            col15.style.color="white";
        }
        col16.innerHTML = cards[2].num ;
        col16.style.backgroundColor=cards[2].color;
        if(col16.style.backgroundColor=="black"){
            col16.style.color="white";
        }
        col17.innerHTML = cards[3].num ;
        col17.style.backgroundColor=cards[3].color;
        if(col17.style.backgroundColor=="black"){
            col17.style.color="white";
        }
        col18.innerHTML = cards[4].num ;
        col18.style.backgroundColor=cards[4].color;
        if(col18.style.backgroundColor=="black"){
            col18.style.color="white";
        }
        col19.innerHTML = cards[5].num ;
        col19.style.backgroundColor=cards[5].color;
        if(col19.style.backgroundColor=="black"){
            col19.style.color="white";
        }
        col20.innerHTML = cards[6].num ;
        col20.style.backgroundColor=cards[6].color;
        if(col20.style.backgroundColor=="black"){
            col20.style.color="white";
        }
        col21.innerHTML = "N" ;
        col22.innerHTML = "N" ;
        col23.innerHTML = "N" ;
        col24.innerHTML = "N" ;
        col25.innerHTML = "N" ;
        col26.innerHTML = "N" ;
        col27.innerHTML = "N" ;
        table.innerHTML = tablecard.num ;
        table.style.backgroundColor=tablecard.color;
        if(turn==user){
            document.getElementById("playerdeck").style.visibility="visible";
        }
        else{
            document.getElementById("playerdeck").style.visibility="hidden";
        }
    }
    
    function playCard(cardID) {
        document.getElementById("counter").innerHTML = 0 ;
        var col14 = document.getElementById("card14") ;  
        var col15 = document.getElementById("card15") ;  
        var col16 = document.getElementById("card16") ;  
        var col17 = document.getElementById("card17") ;  
        var col18 = document.getElementById("card18") ;  
        var col19 = document.getElementById("card19") ;  
        var col20 = document.getElementById("card20") ;  
        var col21 = document.getElementById("card21") ;  
        var col22 = document.getElementById("card22") ;  
        var col23 = document.getElementById("card23") ;  
        var col24 = document.getElementById("card24") ;  
        var col25 = document.getElementById("card25") ;  
        var col26 = document.getElementById("card26") ;  
        var col27 = document.getElementById("card27") ; 
        var table = document.getElementById("tableCard") ;
        switch (cardID) {
            case 14:
            if (col14.style.backgroundColor == "black") {
                putBlackCard(col14)
            } else if (col14.style.backgroundColor == table.style.backgroundColor || col14.innerHTML == table.innerHTML) {
                putableard(col14)
            } ;
            break ;
            case 15:
            if (col15.style.backgroundColor == "black") {
                putBlackCard(col15)
            } else if (col15.style.backgroundColor == table.style.backgroundColor || col15.innerHTML == table.innerHTML) {
                putableard(col15)
            } ;
            break ;
            case 16:
            if (col16.style.backgroundColor == "black") {
                putBlackCard(col16)
            } else if (col16.style.backgroundColor == table.style.backgroundColor || col16.innerHTML == table.innerHTML) {
                putableard(col16)
            } ;
            break ;
            case 17:
            if (col17.style.backgroundColor == "black") {
                putBlackCard(col17)
            } else if (col17.style.backgroundColor == table.style.backgroundColor || col17.innerHTML == table.innerHTML) {
                putableard(col17)
            } ;
            break ;
            case 18:
            if (col18.style.backgroundColor == "black") {
                putBlackCard(col18)
            } else if (col18.style.backgroundColor == table.style.backgroundColor || col18.innerHTML == table.innerHTML) {
                putableard(col18)
            } ; 
            break ;
            case 19:
            if (col19.style.backgroundColor == "black") {
                putBlackCard(col19)
            } else if (col19.style.backgroundColor == table.style.backgroundColor || col19.innerHTML == table.innerHTML) {
                putableard(col19)
            } ;
            break ;
            case 20:
            if (col20.style.backgroundColor == "black") {
                putBlackCard(col20)
            } else if (col20.style.backgroundColor == table.style.backgroundColor || col20.innerHTML == table.innerHTML) {
                putableard(col20)
            } ;
            break ;
            case 21:
            if (col21.style.backgroundColor == "black") {
                putBlackCard(col21)
            } else if (col21.style.backgroundColor == table.style.backgroundColor || col21.innerHTML == table.innerHTML) {
                putableard(col21)
            } ;
            break ;
            case 22:
            if (col22.style.backgroundColor == "black") {
                putBlackCard(col22)
            } else if (col22.style.backgroundColor == table.style.backgroundColor || col22.innerHTML == table.innerHTML) {
                putableard(col22)
            } ;
            break ;
            case 23:
            if (col23.style.backgroundColor == "black") {
                putBlackCard(col23)
            } else if (col23.style.backgroundColor == table.style.backgroundColor || col23.innerHTML == table.innerHTML) {
                putableard(col23)
            } ;
            break ;
            case 24:
            if (col24.style.backgroundColor == "black") {
                putBlackCard(col24)
            } else if (col24.style.backgroundColor == table.style.backgroundColor || col24.innerHTML == table.innerHTML) {
                putableard(col24)
            } ;
            break ;
            case 25:
            if (col25.style.backgroundColor == "black") {
                putBlackCard(col25)
            } else if (col25.style.backgroundColor == table.style.backgroundColor || col25.innerHTML == table.innerHTML) {
                putableard(col25)
            } ; 
            break ;
            case 26:
            if (col26.style.backgroundColor == "black") {
                putBlackCard(col26)
            } else if (col26.style.backgroundColor == table.style.backgroundColor || col26.innerHTML == table.innerHTML) {
                putableard(col26)
            } ;
            break ;
            case 27:
            if (col27.style.backgroundColor == "black") {
                putBlackCard(col27)
            } else if (col27.style.backgroundColor == table.style.backgroundColor || col27.innerHTML == table.innerHTML) {
                putableard(col27)
            } ;
            break ;
        } ;
    }
    
    function putableard(cardVar) {
        var table = document.getElementById("tableCard") ;
        var col14 = document.getElementById("card14") ;  
        var col15 = document.getElementById("card15") ;  
        var col16 = document.getElementById("card16") ;  
        var col17 = document.getElementById("card17") ;  
        var col18 = document.getElementById("card18") ;  
        var col19 = document.getElementById("card19") ;  
        var col20 = document.getElementById("card20") ;  
        var col21 = document.getElementById("card21") ;  
        var col22 = document.getElementById("card22") ;  
        var col23 = document.getElementById("card23") ;  
        var col24 = document.getElementById("card24") ;  
        var col25 = document.getElementById("card25") ;  
        var col26 = document.getElementById("card26") ;  
        var col27 = document.getElementById("card27") ; 
        if (cardVar.innerHTML == "R") {
            ws.send(JSON.stringify({action:'rplayed',tablecard:{num:cardVar.textContent,color:cardVar.style.backgroundColor},played:user}));
            cardVar.innerHTML = "N" ;
            cardVar.style.backgroundColor = "darkgreen";
        }else if (cardVar.innerHTML == "S") {
            ws.send(JSON.stringify({action:'splayed',tablecard:{num:cardVar.textContent,color:cardVar.style.backgroundColor},played:user}));
            cardVar.innerHTML = "N" ;
            cardVar.style.backgroundColor = "darkgreen";
        } else if (cardVar.innerHTML == "+2") {
            ws.send(JSON.stringify({action:'2played',tablecard:{num:cardVar.textContent,color:cardVar.style.backgroundColor},played:user}));
            cardVar.innerHTML = "N" ;
            cardVar.style.backgroundColor = "darkgreen";
        } else {
            ws.send(JSON.stringify({action:'played',tablecard:{num:cardVar.textContent,color:cardVar.style.backgroundColor},played:user}));
            cardVar.innerHTML = "N" ;
            cardVar.style.backgroundColor = "darkgreen";
        } ;
        if (col14.innerHTML == "N" && col15.innerHTML == "N" && col16.innerHTML == "N" && col17.innerHTML == "N" && col18.innerHTML == "N" && col19.innerHTML == "N" && col20.innerHTML == "N" && col21.innerHTML == "N" && col22.innerHTML == "N" && col23.innerHTML == "N" && col24.innerHTML == "N" && col25.innerHTML == "N" && col26.innerHTML == "N" && col27.innerHTML == "N") {
            ws.send(JSON.stringify({action:'win',user:user}));
        } ;
    }
    
    function putBlackCard(cardVar) {
        var col14 = document.getElementById("card14") ;  
        var col15 = document.getElementById("card15") ;  
        var col16 = document.getElementById("card16") ;  
        var col17 = document.getElementById("card17") ;  
        var col18 = document.getElementById("card18") ;  
        var col19 = document.getElementById("card19") ;  
        var col20 = document.getElementById("card20") ;  
        var col21 = document.getElementById("card21") ;  
        var col22 = document.getElementById("card22") ;  
        var col23 = document.getElementById("card23") ;  
        var col24 = document.getElementById("card24") ;  
        var col25 = document.getElementById("card25") ;  
        var col26 = document.getElementById("card26") ;  
        var col27 = document.getElementById("card27") ; 
        var table = document.getElementById("tableCard") ;
        if (cardVar.innerHTML == "W") {
            var userInput = prompt("What color do you want your Wild card to be?", "R, Y, G or B?") ;
            switch (userInput.toUpperCase()) {
                case "R":
                ws.send(JSON.stringify({action:'wplayed',tablecard:{num:"w",color:"red"},played:user}))
                cardVar.innerHTML = "N" ;
                cardVar.style.backgroundColor = "darkgreen";
                break ;
                case "Y":
                    ws.send(JSON.stringify({action:'wplayed',tablecard:{num:"w",color:"yellow"},played:user}))
                    cardVar.innerHTML = "N" ;
                    cardVar.style.backgroundColor = "darkgreen";
                break ;
                case "G":
                    ws.send(JSON.stringify({action:'wplayed',tablecard:{num:"w",color:"green"},played:user}))
                    cardVar.innerHTML = "N" ;
                    cardVar.style.backgroundColor = "darkgreen";
                break ;
                case "B":
                    ws.send(JSON.stringify({action:'wplayed',tablecard:{num:"w",color:"blue"},played:user}))
                    cardVar.innerHTML = "N" ;
                    cardVar.style.backgroundColor = "darkgreen";
                break ;
            } ;
        } else {
            if (col14.style.backgroundColor != table.style.backgroundColor && col15.style.backgroundColor != table.style.backgroundColor && col16.style.backgroundColor != table.style.backgroundColor && col17.style.backgroundColor != table.style.backgroundColor && col18.style.backgroundColor != table.style.backgroundColor && col19.style.backgroundColor != table.style.backgroundColor && col20.style.backgroundColor != table.style.backgroundColor && col21.style.backgroundColor != table.style.backgroundColor && col22.style.backgroundColor != table.style.backgroundColor && col23.style.backgroundColor != table.style.backgroundColor && col24.style.backgroundColor != table.style.backgroundColor && col25.style.backgroundColor != table.style.backgroundColor && col26.style.backgroundColor != table.style.backgroundColor && col27.style.backgroundColor != table.style.backgroundColor) {
                var userInput = prompt("What color do you want your Wild Draw Four card to be?", "R, Y, G or B?") ;
                switch (userInput.toUpperCase()) {
                    case "R":
                        ws.send(JSON.stringify({action:'4played',tablecard:{num:"+4",color:"red"},played:user}))
                        cardVar.innerHTML = "N" ;
                        cardVar.style.backgroundColor = "darkgreen";
                    break ;
                    case "Y":
                        ws.send(JSON.stringify({action:'4played',tablecard:{num:"+4",color:"yellow"},played:user}))
                        cardVar.innerHTML = "N" ;
                        cardVar.style.backgroundColor = "darkgreen";
                    break ;
                    case "G":
                        ws.send(JSON.stringify({action:'4played',tablecard:{num:"+4",color:"green"},played:user}))
                        cardVar.innerHTML = "N" ;
                        cardVar.style.backgroundColor = "darkgreen";
                    break ;
                    case "B":
                        ws.send(JSON.stringify({action:'4played',tablecard:{num:"+4",color:"blue"},played:user}))
                        cardVar.innerHTML = "N" ;
                        cardVar.style.backgroundColor = "darkgreen";
                    break ;
                } ;
            } ;
        } ;    
        if (col14.innerHTML == "N" && col15.innerHTML == "N" && col16.innerHTML == "N" && col17.innerHTML == "N" && col18.innerHTML == "N" && col19.innerHTML == "N" && col20.innerHTML == "N" && col21.innerHTML == "N" && col22.innerHTML == "N" && col23.innerHTML == "N" && col24.innerHTML == "N" && col25.innerHTML == "N" && col26.innerHTML == "N" && col27.innerHTML == "N") {
            ws.send(JSON.stringify({action:'win',user:user}));
        } ;
    } 
    
    
    function nextturn(turn,addcards){
        var table=document.getElementById("tableCard");
        table.innerHTML=tablecard.num;
        table.style.backgroundColor=tablecard.color;
        if(turn==user){
            if(tablecard.num=="+2" && addcards.length!=0){
                drawTwoCards(addcards);
                ws.send(JSON.stringify({action:'d2', user:user}));
            }else if(tablecard.num=="+2" && addcards.length==0){
            }
            if(tablecard.num=="+4" && addcards.length!=0){
                drawFourCards(addcards);
                ws.send(JSON.stringify({action:'d2',user:user}));
            }else if(tablecard.num=="+4" && addcards.length==0){
            }
            document.getElementById("playerdeck").style.visibility="visible";
            
        }
        else{
            document.getElementById("playerdeck").style.visibility="hidden";
        }
        
    }
    
    function drawTwoCards(addcards) {
        var col14 = document.getElementById("card14") ;  
        var col15 = document.getElementById("card15") ;  
        var col16 = document.getElementById("card16") ;  
        var col17 = document.getElementById("card17") ;  
        var col18 = document.getElementById("card18") ;  
        var col19 = document.getElementById("card19") ;  
        var col20 = document.getElementById("card20") ;  
        var col21 = document.getElementById("card21") ;  
        var col22 = document.getElementById("card22") ;  
        var col23 = document.getElementById("card23") ;  
        var col24 = document.getElementById("card24") ;  
        var col25 = document.getElementById("card25") ;  
        var col26 = document.getElementById("card26") ;  
        var col27 = document.getElementById("card27") ; 
        for(var i=0;i<2;i++){
            if (col14.innerHTML == "N") {
            col14.innerHTML = addcards[i].num
            col14.style.backgroundColor=addcards[i].color;
            if(col14.style.backgroundColor=="black"){
            col14.style.color="white";
        }
        } else if (col15.innerHTML == "N") {
            col15.innerHTML = addcards[i].num
            col15.style.backgroundColor=addcards[i].color;
            if(col15.style.backgroundColor=="black"){
            col15.style.color="white";
        }
        } else if (col16.innerHTML == "N") {
            col16.innerHTML = addcards[i].num
            col16.style.backgroundColor=addcards[i].color;
            if(col16.style.backgroundColor=="black"){
            col16.style.color="white";
        }
        } else if (col17.innerHTML == "N") {
            col17.innerHTML = addcards[i].num
            col17.style.backgroundColor=addcards[i].color;
            if(col17.style.backgroundColor=="black"){
            col17.style.color="white";
        }
        } else if (col18.innerHTML == "N") {
            col18.innerHTML = addcards[i].num
            col18.style.backgroundColor=addcards[i].color;
            if(col18.style.backgroundColor=="black"){
            col18.style.color="white";
        }
        } else if (col19.innerHTML == "N") {
            col19.innerHTML = addcards[i].num
            col19.style.backgroundColor=addcards[i].color;
            if(col19.style.backgroundColor=="black"){
            col19.style.color="white";
        }
        } else if (col20.innerHTML == "N") {
            col20.innerHTML = addcards[i].num
            col20.style.backgroundColor=addcards[i].color;
            if(col20.style.backgroundColor=="black"){
            col20.style.color="white";
        }
        } else if (col21.innerHTML == "N") {
            col21.innerHTML = addcards[i].num
            col21.style.backgroundColor=addcards[i].color;
            if(col21.style.backgroundColor=="black"){
            col21.style.color="white";
        }
        } else if (col22.innerHTML == "N") {
            col22.innerHTML = addcards[i].num
            col22.style.backgroundColor=addcards[i].color;
            if(col22.style.backgroundColor=="black"){
            col22.style.color="white";
        }
        } else if (col23.innerHTML == "N") {
            col23.innerHTML = addcards[i].num
            col23.style.backgroundColor=addcards[i].color;
            if(col23.style.backgroundColor=="black"){
            col23.style.color="white";
        }
        } else if (col24.innerHTML == "N") {
            col24.innerHTML = addcards[i].num
            col24.style.backgroundColor=addcards[i].color;
            if(col24.style.backgroundColor=="black"){
            col24.style.color="white";
        }
        } else if (col25.innerHTML == "N") {
            col25.innerHTML = addcards[i].num
            col25.style.backgroundColor=addcards[i].color;
            if(col25.style.backgroundColor=="black"){
            col25.style.color="white";
        }
        } else if (col26.innerHTML == "N") {
            col26.innerHTML = addcards[i].num
            col26.style.backgroundColor=addcards[i].color;
            if(col26.style.backgroundColor=="black"){
            col26.style.color="white";
        }
        } else if (col27.innerHTML == "N") {
            col27.innerHTML = addcards[i].num
            col27.style.backgroundColor=addcards[i].color;
            if(col27.style.backgroundColor=="black"){
            col27.style.color="white";
        }
        }
        }  
    }

    function drawCardres(addcards) {
        var col14 = document.getElementById("card14") ;  
        var col15 = document.getElementById("card15") ;  
        var col16 = document.getElementById("card16") ;  
        var col17 = document.getElementById("card17") ;  
        var col18 = document.getElementById("card18") ;  
        var col19 = document.getElementById("card19") ;  
        var col20 = document.getElementById("card20") ;  
        var col21 = document.getElementById("card21") ;  
        var col22 = document.getElementById("card22") ;  
        var col23 = document.getElementById("card23") ;  
        var col24 = document.getElementById("card24") ;  
        var col25 = document.getElementById("card25") ;  
        var col26 = document.getElementById("card26") ;  
        var col27 = document.getElementById("card27") ; 
        if (col14.innerHTML == "N") {
            col14.innerHTML = addcards.num
            col14.style.backgroundColor=addcards.color;
            if(col14.style.backgroundColor=="black"){
            col14.style.color="white";
        }
        } else if (col15.innerHTML == "N") {
            col15.innerHTML = addcards.num
            col15.style.backgroundColor=addcards.color;
            if(col15.style.backgroundColor=="black"){
            col15.style.color="white";
        }
        } else if (col16.innerHTML == "N") {
            col16.innerHTML = addcards.num
            col16.style.backgroundColor=addcards.color;
            if(col16.style.backgroundColor=="black"){
            col16.style.color="white";
        }
        } else if (col17.innerHTML == "N") {
            col17.innerHTML = addcards.num
            col17.style.backgroundColor=addcards.color;
            if(col17.style.backgroundColor=="black"){
            col17.style.color="white";
        }
        } else if (col18.innerHTML == "N") {
            col18.innerHTML = addcards.num
            col18.style.backgroundColor=addcards.color;
            if(col18.style.backgroundColor=="black"){
            col18.style.color="white";
        }
        } else if (col19.innerHTML == "N") {
            col19.innerHTML = addcards.num
            col19.style.backgroundColor=addcards.color;
            if(col19.style.backgroundColor=="black"){
            col19.style.color="white";
        }
        } else if (col20.innerHTML == "N") {
            col20.innerHTML = addcards.num
            col20.style.backgroundColor=addcards.color;
            if(col20.style.backgroundColor=="black"){
            col20.style.color="white";
        }
        } else if (col21.innerHTML == "N") {
            col21.innerHTML = addcards.num
            col21.style.backgroundColor=addcards.color;
            if(col21.style.backgroundColor=="black"){
            col21.style.color="white";
        }
        } else if (col22.innerHTML == "N") {
            col22.innerHTML = addcards.num
            col22.style.backgroundColor=addcards.color;
            if(col22.style.backgroundColor=="black"){
            col22.style.color="white";
        }
        } else if (col23.innerHTML == "N") {
            col23.innerHTML = addcards.num
            col23.style.backgroundColor=addcards.color;
            if(col23.style.backgroundColor=="black"){
            col23.style.color="white";
        }
        } else if (col24.innerHTML == "N") {
            col24.innerHTML = addcards.num
            col24.style.backgroundColor=addcards.color;
            if(col24.style.backgroundColor=="black"){
            col24.style.color="white";
        }
        } else if (col25.innerHTML == "N") {
            col25.innerHTML = addcards.num
            col25.style.backgroundColor=addcards.color;
            if(col25.style.backgroundColor=="black"){
            col25.style.color="white";
        }
        } else if (col26.innerHTML == "N") {
            col26.innerHTML = addcards.num
            col26.style.backgroundColor=addcards.color;
            if(col26.style.backgroundColor=="black"){
            col26.style.color="white";
        }
        } else if (col27.innerHTML == "N") {
            col27.innerHTML = addcards.num
            col27.style.backgroundColor=addcards.color;
            if(col27.style.backgroundColor=="black"){
            col27.style.color="white";
        }
        }
    }
    
    function drawFourCards(addcards) {
        var col14 = document.getElementById("card14") ;  
        var col15 = document.getElementById("card15") ;  
        var col16 = document.getElementById("card16") ;  
        var col17 = document.getElementById("card17") ;  
        var col18 = document.getElementById("card18") ;  
        var col19 = document.getElementById("card19") ;  
        var col20 = document.getElementById("card20") ;  
        var col21 = document.getElementById("card21") ;  
        var col22 = document.getElementById("card22") ;  
        var col23 = document.getElementById("card23") ;  
        var col24 = document.getElementById("card24") ;  
        var col25 = document.getElementById("card25") ;  
        var col26 = document.getElementById("card26") ;  
        var col27 = document.getElementById("card27") ; 
        for(var i=0;i<4;i++){
            if (col14.innerHTML == "N") {
            col14.innerHTML = addcards[i].num
            col14.style.backgroundColor=addcards[i].color;
            if(col14.style.backgroundColor=="black"){
            col14.style.color="white";
        }
        } else if (col15.innerHTML == "N") {
            col15.innerHTML = addcards[i].num
            col15.style.backgroundColor=addcards[i].color;
            if(col15.style.backgroundColor=="black"){
            col15.style.color="white";
        }
        } else if (col16.innerHTML == "N") {
            col16.innerHTML = addcards[i].num
            col16.style.backgroundColor=addcards[i].color;
            if(col16.style.backgroundColor=="black"){
            col16.style.color="white";
        }
        } else if (col17.innerHTML == "N") {
            col17.innerHTML = addcards[i].num
            col17.style.backgroundColor=addcards[i].color;
            if(col17.style.backgroundColor=="black"){
            col17.style.color="white";
        }
        } else if (col18.innerHTML == "N") {
            col18.innerHTML = addcards[i].num
            col18.style.backgroundColor=addcards[i].color;
            if(col18.style.backgroundColor=="black"){
            col18.style.color="white";
        }
        } else if (col19.innerHTML == "N") {
            col19.innerHTML = addcards[i].num
            col19.style.backgroundColor=addcards[i].color;
            if(col19.style.backgroundColor=="black"){
            col19.style.color="white";
        }
        } else if (col20.innerHTML == "N") {
            col20.innerHTML = addcards[i].num
            col20.style.backgroundColor=addcards[i].color;
            if(col20.style.backgroundColor=="black"){
            col20.style.color="white";
        }
        } else if (col21.innerHTML == "N") {
            col21.innerHTML = addcards[i].num
            col21.style.backgroundColor=addcards[i].color;
            if(col21.style.backgroundColor=="black"){
            col21.style.color="white";
        }
        } else if (col22.innerHTML == "N") {
            col22.innerHTML = addcards[i].num
            col22.style.backgroundColor=addcards[i].color;
            if(col22.style.backgroundColor=="black"){
            col22.style.color="white";
        }
        } else if (col23.innerHTML == "N") {
            col23.innerHTML = addcards[i].num
            col23.style.backgroundColor=addcards[i].color;
            if(col23.style.backgroundColor=="black"){
            col23.style.color="white";
        }
        } else if (col24.innerHTML == "N") {
            col24.innerHTML = addcards[i].num
            col24.style.backgroundColor=addcards[i].color;
            if(col24.style.backgroundColor=="black"){
            col24.style.color="white";
        }
        } else if (col25.innerHTML == "N") {
            col25.innerHTML = addcards[i].num
            col25.style.backgroundColor=addcards[i].color;
            if(col25.style.backgroundColor=="black"){
            col25.style.color="white";
        }
        } else if (col26.innerHTML == "N") {
            col26.innerHTML = addcards[i].num
            col26.style.backgroundColor=addcards[i].color;
            if(col26.style.backgroundColor=="black"){
            col26.style.color="white";
        }
        } else if (col27.innerHTML == "N") {
            col27.innerHTML = addcards[i].num
            col27.style.backgroundColor=addcards[i].color;
            if(col27.style.backgroundColor=="black"){
            col27.style.color="white";
        }
        }
        }  
    }
    
    function win(winuser){
        alert(winuser+" won the game");
        var xhr=new XMLHttpRequest();
        xhr.open('POST','http://localhost:3000/logout');
        xhr.send();
    }
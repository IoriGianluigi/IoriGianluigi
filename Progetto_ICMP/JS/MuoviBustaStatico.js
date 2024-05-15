var xBusta=0, yBusta=0;
var xContatto, yContatto;
var mittente="",destinatario;
var lBusta,hBusta,lBusta2,hBusta2,xBusta2,yBusta2;
var lPc, hPc;
var Busta;
var nextDispositivo="";
var b=true,b1=true, bp=false;
var regExpIp=/\b(?:\d{1,3}\.){3}\d{1,3}\b/;
var collegamentiPc=["#sw1","#sw2","#sw2","#sw3","#sw3"];

var collegamentiSwitch=[
    ["#sw2","#pc1","#sw3"],
    ["#sw1","#pc2","#pc3"],
    ["#sw1","#pc4","#pc5"],
]

var macTable=[
    ["#pc1","#sw2","#sw3"],
    ["#pc2","#pc3","#sw1"],
    ["#pc4","#pc5","#sw1"]
]


$(document).ready(function(){
    Busta=$("#busta");
    Busta1=$("#busta1");
    Busta2=$("#busta2");
    BustaOk=$("#bustaOk");
    BustaErrore=$("#bustaErrore");

    Busta1.hide();
    Busta2.hide();
    BustaOk.hide();
    BustaErrore.hide();
    $("#draggable").draggable();
    $("#draggable").hide();

    lBusta=parseInt(Busta.css("width"));
    hBusta=parseInt(Busta.css("height"));

    lBusta2=parseInt(Busta2.css("width"));
    hBusta2=parseInt(Busta2.css("height"));

    lPc=parseInt($("#pc1").css("width"));
    hPc=parseInt($("#pc1").css("height"));

    Busta.click(function(){
        b=true;
        $(document).mousemove(spostaBusta);
    });

    Busta2.click(function(){
        if(!bp){
            $("#draggable").show();
            $("#mittente").text("192.168.1."+mittente.replace("#pc","")+"0");
            $("#destinatario1").text("192.168.1."+destinatario.replace("#pc","")+"0");
            $("#type").text("TYPE:0x8");
            bp=true;
        }else{
            $("#draggable").hide();
            bp=false;
        }
    });

    $(".dispositivo").click(contatto);
    $(document).keydown(ipDestinatarioInserito);

    $("#chiusura").click(function(){
        $("#draggable").hide();
    })
    
});

function spostaBusta(e){
    if(b){
        Busta1.show();

        xBusta=e.pageX-50;
        yBusta=e.pageY-50;
        
        Busta1.css("left", xBusta+"px");
        Busta1.css("top", yBusta+"px");
    }
}

function contatto(){
    xContatto=parseInt(Busta1.css("left"));
    yContatto=parseInt(Busta1.css("top"));
    mittente=verificaContattoPc(xContatto,yContatto);
    $(mittente).css("opacity", "50%");
    Busta1.hide();
    b=false;
}

function verificaContattoPc(xContatto,yContatto){
    var xPc,yPc;
    for(var i=1;i<=5;i++){
        xPc=parseInt($("#pc"+i).css("left"));
        yPc=parseInt($("#pc"+i).css("top"));

        if(!((xContatto+lBusta<xPc) || (xPc+lPc<xContatto) || (yContatto+hBusta<yPc) || (yPc+hPc<yContatto))){
            return"#pc"+i;
        }
    }
}

function verificaContattoPcSwitch(){
    var xSw,ySw;
    for(var i=1;i<=3;i++){
        xSw=parseInt($("#sw"+i).css("left"));
        ySw=parseInt($("#sw"+i).css("top"));

        if(!((xBusta2+lBusta2<xSw) || (xSw+lPc<xBusta) || (yBusta2+hBusta2<ySw) || (ySw+hPc<yBusta2))){
            return "#sw"+i;
        }
    }
}

function ipDestinatarioInserito(event){
    var x=$("#destinatario").val()
    if(event.which==13){
        if(x!=""){

            if(x!="ping 192.168.1.10" && x!="ping 192.168.1.20" && x!="ping 192.168.1.30" && x!="ping 192.168.1.40" && x!="ping 192.168.1.50"){
                
                BustaErrore.show();
                BustaErrore.css("left",$(mittente).css("left"));
                BustaErrore.css("top",$(mittente).css("top"));
                setTimeout(function(){BustaErrore.hide()}, 800);

                if(regExpIp.test(x.replace("ping ",""))){
                    $("#ris").remove();
                    $("#risultato").after("<label id='ris'> Esecuzione di "+x+" con 32 byte di dati: <br> Richiesta scaduta. <br> Richiesta scaduta.  <br> Richiesta scaduta.   <br> Richiesta scaduta.   <br> Statistiche Ping per"+x.replace("ping ","")+": Pacchetti: Trasmessi = 4, Ricevuti = 0, Persi = 4 (100% persi) </label>");
                }
                else{
                    $("#ris").remove();
                    $("#risultato").after('<label id="ris">"'+x+'" non è riconosciuto come comando interno o esterno, un programma eseguibile o un file batch. </label>');
                }
                
            }
            else{
                if(mittente==""){
                    alert("seleziona mittente");
                }
                else{
                    destinatario="#pc"+x.substring(15,16);
                    if(mittente!=destinatario){
                        b1=true;
                        animazioneBusta();
                    }
                    else{
                        BustaOk.show();
                        BustaOk.css("left",$(mittente).css("left"));
                        BustaOk.css("top",$(mittente).css("top"));
                        setTimeout(function(){BustaOk.hide()}, 800);
                        x=$("#destinatario").val()
                        $("#ris").remove();
                        $("#risultato").after("<label id='ris'>Esecuzione di Ping "+x.replace("ping ","")+" con 32 byte di dati: <br> Risposta da "+x.replace("ping ","")+": byte=32 durata=1ms TTL=128 <br> Risposta da "+x.replace("ping ","")+": byte=32 durata<1ms TTL=128 <br> Risposta da "+x.replace("ping ","")+": byte=32 durata<1ms TTL=128 <br> Risposta da "+x.replace("ping ","")+": byte=32 durata<1ms TTL=128 <br> Statistiche Ping per "+x.replace("ping ","")+": <br> Pacchetti: Trasmessi = 4, Ricevuti = 4, Persi = 0 (0% persi),<br> Tempo approssimativo percorsi andata/ritorno in millisecondi: Minimo = 0ms, Massimo =  0ms, Medio =  0ms </label>")
                
                        mittente="";
                        destinatario="";
                    }
                }
            }
        }
    }
}

function animazioneBusta(){
    if(mittente!=""){
        mittente1=$(mittente);
        Busta2.show();
        xBusta2=parseInt(mittente1.css("left"));
        yBusta2=parseInt(mittente1.css("top"));
        Busta2.css("left",xBusta2);
        Busta2.css("top",yBusta2);
        nextDispositivo=collegamentiPc[mittente.replace("#pc","")-1]
        m2=setInterval(inviaBusta,15); 
    }
    else{
        alert("seleziona mittente");
    }
}

function daSwitch(sw){
    var scollegato=true;
    for(var i=0;i<3;i++){
        var s=String(macTable[sw-1][i]);
        if(s==destinatario){
            nextDispositivo=destinatario
            m2=setInterval(inviaBusta,15);
            scollegato=false;
        }
    }
    if(scollegato){
        inviaScollegato(sw);
    }
}


function inviaScollegato(s){
    for(var i=0;i<3;i++){
        nextDispositivo=String(collegamentiSwitch[s-1][i]);
        if(nextDispositivo.substring(0,3)=="#sw"){
            for(var j=0;j<3;j++){
                var sf=String(macTable[nextDispositivo.replace("#sw","")-1][j]);
                if(sf==destinatario){
                    chiama()
                    return;
                }
            }
        }
        else{
            if(i==2){
                nextDispositivo="#sw1";
                chiama();
                return;
            }
        }
    }
}

function chiama(){
    m2=setInterval(inviaBusta,15);
}

function inviaBusta(){
    var xSw2=parseInt($(nextDispositivo).css("left")), ySw2=parseInt($(nextDispositivo).css("top"));
    if(xBusta2!=xSw2 || yBusta2!=ySw2){
        if(xBusta2>xSw2){
            xBusta2--;
        }
        else if(xBusta2<xSw2){
            xBusta2++;
        }

        if(yBusta2>ySw2){
            yBusta2--;
            
        }
        else if(yBusta2<ySw2){
            yBusta2++;
        }

        Busta2.css("left",xBusta2);
        Busta2.css("top",yBusta2);
    }else{
        clearInterval(m2);
        if(verificaContattoPc(xBusta2,yBusta2)==destinatario){
            BustaOk.show();
            BustaOk.css("left",xBusta2);
            BustaOk.css("top",yBusta2);
            setTimeout(function(){BustaOk.hide()}, 800);

            
            if(b1){
                b1=false;
                var box=mittente;
                mittente=destinatario;
                destinatario=box;
                $("#mittente").text("192.168.1."+mittente.replace("#pc","")+"0");
                $("#destinatario1").text("192.168.1."+destinatario.replace("#pc","")+"0");
                $("#type").text("TYPE:0x0");
                animazioneBusta();
            }
            else{
                x=$("#destinatario").val()
                $("#ris").remove();
                $("#risultato").after("<label id='ris'>Esecuzione di Ping "+x.replace("ping ","")+" con 32 byte di dati: <br> Risposta da "+x.replace("ping ","")+": byte=32 durata=1ms TTL=128 <br> Risposta da "+x.replace("ping ","")+": byte=32 durata<1ms TTL=128 <br> Risposta da "+x.replace("ping ","")+": byte=32 durata<1ms TTL=128 <br> Risposta da "+x.replace("ping ","")+": byte=32 durata<1ms TTL=128 <br> Statistiche Ping per "+x.replace("ping ","")+": <br> Pacchetti: Trasmessi = 4, Ricevuti = 4, Persi = 0 (0% persi),<br> Tempo approssimativo percorsi andata/ritorno in millisecondi: Minimo = 0ms, Massimo =  0ms, Medio =  0ms </label>")
                $(destinatario).css("opacity", "100%");
                mittente="";
                destinatario="";
                Busta2.hide();
            }
        }
        else{
            daSwitch(nextDispositivo.replace("#sw",""));
            return
        }
    }
}



//Modulo de patron
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C','H','D','S'],
        especiales = ['A','J','Q','K',];

    let puntoJugadores = []; //posicion de numero de jugadores en el juego [0,0] [player1,player2]
    let  puntosJugador = 0;

    //Referencias del html
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    let puntosHtml = document.querySelectorAll('small');
    const divCartasJugadores = document.querySelectorAll('.divCartas');

    //Inicializa el juego
    const inicializaJuego = ( numJugadores = 2) =>{
        deck = crearDeck();

        puntoJugadores = [];
        for(let i=0; i<numJugadores; i++){
            puntoJugadores.push(0);
        }

        puntosHtml.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnDetener.disabled = false;
        btnPedir.disabled = false;


    }

    //Crea un nuevo deck
    const crearDeck = () =>{

        deck = [];
        for(let i = 2; i<=10; i++){
            for(let tipo of tipos){
                deck.push(i+tipo);
            }
        }

        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial+tipo);
            }
        }

        return _.shuffle(deck);    
    }


    //pedir carta
    const pedirCarta = () => {

        if(deck.length === 0){
            throw 'No more cards available';
        }

        return deck.pop();
    }

    const valorCarta = ( carta ) =>{

        const valor = carta.substring(0, carta.length-1);
        return (isNaN(valor))? ((valor === 'A') ? 11: 10): valor*1; 
    }

    //turno: 0=primer jugador y el ultimo la computadora
    const acumularPuntos = ( carta, turno) =>{

            puntoJugadores[turno]+= valorCarta(carta);
            puntosHtml[turno].innerText = puntoJugadores[turno];
            return puntoJugadores[turno];
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{

        const [puntosMinimos, puntosComputadora] = puntoJugadores;

        setTimeout(() => {

            if( puntosComputadora === puntosMinimos){
                alert('Nadie gana');
            }else if( puntosMinimos > 21){
                alert('Computadora gana');
            }else if( puntosComputadora > 21){
                alert('Jugador gana');
            }else{
                alert('AI gana');
            }

        }, 10);
    }

    // AI Turn
    const turnoComputadora = ( puntosMinimos ) =>
    {
        let puntosComputadora = 0;
        do{

            const carta = pedirCarta();
            puntosComputadora =  acumularPuntos(carta, puntoJugadores.length-1);
            crearCarta(carta,puntoJugadores.length-1);

        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

    /**
     * Eventos
     */
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta,0);

        if(puntosJugador > 21){
            console.warn('Lost');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if( puntosJugador === 21){
            console.warn('Win');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });



    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', ()=>{

        inicializaJuego();

    });




})();

 
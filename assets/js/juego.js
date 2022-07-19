//Modulo de patron
(() => {
    'use strict'

    let deck = [];


    const tipos = ['C','H','D','S'];
    const especiales = ['A','J','Q','K',];

    let puntosJugador = 0;
    let puntosComputadora = 0;

    //Referencias del html

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const playersScore = document.querySelectorAll('small');
    const playerOneDeck = document.querySelector('#jugador-cartas');
    const playerTwoDeck = document.querySelector('#computadora-cartas');


    /**
     * create deck
     * 
     */
    const crearDeck = () =>{
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

        deck = _.shuffle(deck);

        return deck;
        
        
    }


    /** 
     * return cart
     */

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

    // AI Turn

    const turnoComputadora = ( puntosMinimos ) =>
    {
        do{

            const carta = pedirCarta();
            puntosComputadora+= valorCarta(carta);
            playersScore[1].innerText = puntosComputadora;
            const imgCarta = document.createElement('img');
            imgCarta.classList.add('carta');
            imgCarta.src = `assets/cartas/${carta}.png`;
        
            playerTwoDeck.append(imgCarta);

            if(puntosMinimos > 21){
                break;
            }

        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


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

    /**
     * Eventos
     */
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugador+= valorCarta(carta);
        playersScore[0].innerText = puntosJugador;
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `assets/cartas/${carta}.png`;

        playerOneDeck.append(imgCarta);

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

        console.clear();

        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        playerOneDeck.innerHTML = '';
        playerTwoDeck.innerHTML = '';

        btnDetener.disabled = false;
        btnPedir.disabled = false;

        playersScore[0].innerText = 0;
        playersScore[1].innerText = 0;

    });


    crearDeck();

})();

 
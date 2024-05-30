
  const miModulo = (() =>{
    'use strict';

    let deck         = [];
  const tipos      = ['C','D','H','S'],
        especiales = ['A','J','Q','K'];

let puntosJugadores = [];

  //Referencias el HTML
  const btnpedir = document.querySelector('#btnpedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevo');

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML   = document.querySelectorAll('small');
        
        // Esta funcion inicializa el juego
        const inicializarJuego = (numJugadores = 2) =>{
          deck = crearDeck();

          puntosJugadores = [];
          for(let i = 0; i<numJugadores; i++){
            puntosJugadores.push(0);
          }
      puntosHTML.forEach(elem => elem.innerText = 0 );
      divCartasJugadores.forEach(elem => elem.innerHTML = '');

      btnpedir.disabled = false;
      btnDetener.disabled = false;
      }
       

  // Esta funcion crea un neuvo Deck
  const crearDeck = () => {
    deck = [];
  for(let i = 2; i<=10; i++){
      for(let tipo of tipos){
        deck.push(i + tipo);
      }
      
  }
  for(let tipo of tipos){
    for(let esp of especiales){
      deck.push(esp + tipo);
    }
  }
  return _.shuffle(deck);;
}
 
  // Esta funcion me permite crear una carta
  const pedirCarta = () => {

  if(deck.length === 0){
  throw 'no hay cartas en el deck';

  }
      return deck.pop();
  }
  //   pedirCarta();
  const valorCarta = (carta) =>{
  const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor))   ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
  }

   //Turno 0 = primer jugador y el ultimo sera la computadora
  const acumularPuntos = (carta,turno) =>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];

    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) =>{
    const imgCarta = document.createElement('img');
    imgCarta.src = `../assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
   divCartasJugadores[turno].append(imgCarta);

  }

  const determinarGanador = () => {

    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if(puntosComputadora === puntosMinimos){
          alert('Nadie gana :(');
      }else if(puntosMinimos > 21){
        alert('Computadora Gana')
      }else if(puntosComputadora > 21){
          alert('Jugador Gana');
      }else{
          alert('Computadora Gana');
      }
  }, 10);
  }

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) =>{
 
    let puntosComputadora = 0;
        do{
  const carta = pedirCarta();
 puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
  crearCarta(carta, puntosJugadores.length -1);
  }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

     determinarGanador();
}
  

  // Eventos
  btnpedir.addEventListener('click',()=>{

const carta = pedirCarta();
 const puntosJugador = acumularPuntos(carta, 0);

 crearCarta(carta, 0);


  if( puntosJugador > 21){
      console.warn('Lo siento mucho, Perdiste');
      btnpedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);

  }else if (puntosJugador === 21){
      console.warn('21, Genial!');
      btnpedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
  }

  });

  btnDetener.addEventListener('click',()=>{
      btnpedir.disabled = true;
      btnDetener.disabled = true;

      turnoComputadora(puntosJugadores[0]);
  });

  //btnNuevoJuego.addEventListener('click',()=>{

    //  inicializarJuego();
      
  //});

    return {
     nuevoJuego: inicializarJuego
    };
  
  })();





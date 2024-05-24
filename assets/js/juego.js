

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

// Esta funcion crea una nueva funcion
const crearDeck = () => {
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

 //console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
}

crearDeck()
// Esta funcion me permite crear una carta
const pedirCarta = () =>{
if(deck.length === 0){
throw 'no hay cartas en el deck';

}
const carta = deck.pop();
console.log(deck);
console.log(carta);
    return carta;
}
 //   pedirCarta();
const valorCarta = (carta) =>{

 const valor = carta.substring(0, carta.length - 1);
  return (isNaN(valor))   ?
          (valor === 'A') ? 11 : 10
          : valor * 1;
 
}
const valor = valorCarta(pedirCarta());
console.log({valor});

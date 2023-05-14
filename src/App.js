import './App.css';
import {useEffect, useState} from "react";
import Card from "./components/Card";


const array_imgs = [
    {'src': '/imgs/c3po.png', matched: false},
    {'src': '/imgs/clone1.png', matched: false},
    {'src': '/imgs/clone2.png', matched: false},
    {'src': '/imgs/darth_vader.png', matched: false},
    {'src': '/imgs/han_solo.png', matched: false},
    {'src': '/imgs/luke.png', matched: false},
    {'src': '/imgs/r2d2.png', matched: false},
    {'src': '/imgs/stormtrooper.png', matched: false},
]


function App() {

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [disabled, setDisabled] = useState(false); // para que no puedan hacer trampa xd
    const [haswon, setHasWon] = useState(false); // para que no puedan hacer trampa xd

    //shuffle array. Also, may be called start new game
    const shuffleCards = () => {
        const shuffledCards = [...array_imgs, ...array_imgs]
        .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }));

        setCards(shuffledCards);
        setTurns(0);
        setTurns(0);
        setFirstCard(null);
        setSecondCard(null);
        setHasWon(false)
    }

    // handle choice
    const handleChoice = (card) => {
        firstCard? setSecondCard(card) : setFirstCard(card);
    }

    // start the game automatically
    useEffect(() => {
        shuffleCards();
    }, []);

    // compare two selected cards.
    useEffect(() => {

        if (firstCard && secondCard) {
            setDisabled(true);
            if (firstCard.src === secondCard.src) {
                setCards((prev) => {
                    const newCards = prev.map((card) => {
                        if (card.id === firstCard.id || card.id === secondCard.id) {
                            return { ...card, matched: true };
                        }
                        return card;
                    });
                    if (newCards.every((card) => card.matched)) {
                        setHasWon(true);
                    }
                    return newCards;
                });
                setTimeout(() => resetTurn(), 1000);
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
        setDisabled(false);
    }, [firstCard, secondCard]);

    // reset turn
    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
        setTurns(prev => prev + 1);
        setDisabled(false)
    }


  return (
    <div className="App">
        <h1>Juego de memoria</h1>
        <div className="score">Turnos: {turns} </div>
        <div className="men">
            {haswon && <h1>Has ganado!</h1>}
        </div>
        <button onClick={shuffleCards}>Comienza un nuevo juego</button>
        <div className="container">
            <div className="card-grid">
                {cards.map(card => (
                    <Card key={card.id} card={card} handleChoice={handleChoice}
                          flipped={card === firstCard || card === secondCard || card.matched
                          }
                          disabled = {disabled}
                    />
                ))}
            </div>
        </div>

    </div>
  );
}

export default App;

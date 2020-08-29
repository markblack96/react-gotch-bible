import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: [...Array(52).keys()].map(x=>++x),
            currentCard: {card: '🂠', rank: 'None', suit: 'None'},
            workouts: {hearts: 'push-ups', spades: 'sit-ups', diamonds: 'pull-ups', clubs: 'squats'},
            currentWorkout: '',
        }
        this.generateDeck = this.generateDeck.bind(this);
        this.drawCard = this.drawCard.bind(this);
        this.saveOptions = this.saveOptions.bind(this);
    }
    componentDidMount() {
        this.generateDeck();
    }
    generateDeck() {
        let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
        let ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        let hearts = ['🂱','🂲','🂳','🂴','🂵','🂶','🂷','🂸','🂹','🂺','🂻','🂽','🂾'];
        let spades = ['🂡','🂢','🂣','🂤','🂥','🂦','🂧','🂨','🂩','🂪','🂫','🂭','🂮'];
        let diamonds = ['🃁','🃂','🃃','🃄','🃅','🃆','🃇','🃈','🃉','🃊','🃋','🃍','🃎'];
        let clubs = ['🃑','🃒','🃓','🃔','🃕','🃖','🃗','🃘','🃙','🃚','🃛','🃝','🃞'];
        cards = [hearts, spades, diamonds, clubs];

        let cards = this.state.deck.map(d=>({
                        index: d,
                        suit: suits[d%4],
                        rank: ranks[d%13],
                        card: cards[d%4][d%13]
                    })
                );
        this.setState({deck: cards});
    }
    drawCard() {
        let currentCard = this.state.deck.pop();

        this.setState({
            currentCard: currentCard,
            currentWorkout: this.state.workouts[currentCard.suit.toLowerCase()]
        });
    }
    saveOptions() {
        this.setState({
            workouts: {
                hearts: document.querySelector('input#hearts').value, 
                spades: document.querySelector('input#spades').value, 
                diamonds: document.querySelector('input#diamonds').value, 
                clubs: document.querySelector('input#clubs').value, 
            }
        });
    }
    render() {
        let ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        return (
            <div id="app">
                <p>Begin by drawing a card:</p>
                <button onClick={this.drawCard}>Draw Card</button>
                <div className="flex center row">
                    <span className={this.state.currentCard.suit.toLowerCase() + " card"}>{this.state.currentCard.card}</span>
                    <div className="flex-col center">
                    <span>{`${this.state.currentCard.rank} of ${this.state.currentCard.suit}`}</span>
                    <span>{`${ranks.indexOf(this.state.currentCard.rank)+1} x ${this.state.currentWorkout}`}</span>
                    </div>
                </div>
                <div id="inputs" className="flex-col">
                    <h3>Options:</h3>
                    <label>Hearts: </label><input id="hearts" type="text" defaultValue={this.state.workouts['hearts']}></input>
                    <label>Spades: </label><input id="spades" type="text" defaultValue={this.state.workouts['spades']}></input>
                    <label>Diamonds: </label><input id="diamonds" type="text" defaultValue={this.state.workouts['diamonds']}></input>
                    <label>Clubs: </label><input id="clubs" type="text"  defaultValue={this.state.workouts['clubs']}></input>
                    <button onClick={this.saveOptions}>Save</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
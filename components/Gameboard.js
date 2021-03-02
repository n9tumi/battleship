import React from 'react';
import {Text, View, Pressable} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style';

let board = [];
let board2 = [];
const NBR_OF_ROWS = 5;
const NBR_OF_COLS = 5;
const START = 'plus';
const SHIP = false;
const SHIP2 = true;
const CROSS = 'cross';
const CIRCLE = 'circle';

export default class Gameboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: 'Game has not started',
            name1: 'Start game',
            hits: 0,
            bombs: 15,
            ships: 3,
            startingships: 3,
            timer: null,
            counter: 300
        }
        this.initializeBoard();
    }
     getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    initializeBoard() {
        for (let i = 0; i < NBR_OF_ROWS * NBR_OF_COLS; i++){
            board[i] = START;
            
        }
        for (let i = 0; i < NBR_OF_ROWS * NBR_OF_COLS; i++){
            board2[i] = SHIP;
            
        }
        for (let i = 0; i <= 2;){
            let rd=  this.getRandomInt(24);
            if(board2[rd] != SHIP2){
            board2[rd] = SHIP2;
            i++;
            }
            
        }
    }

    drawItem(number){
        if (this.state.status === 'Game has not started' ){
            this.setState({status: 'Click the start button first...'})
        }
        
        
        else if(this.state.status === 'Game is on...' && board[number] != CROSS && board[number] != CIRCLE){

        if (board2[number] === SHIP2){
            board[number] = CIRCLE;
            this.setState({hits: (this.state.hits + 1)});
            this.setState({ships: (this.state.ships - 1)});
        }
        else if(board2[number] === SHIP ){
            board[number] = CROSS;  
            
        
        }

        this.setState({bombs: (this.state.bombs - 1)});

        }
    
    }
   
    

    chooseItemColor(number) {
        if (board[number] === CROSS){
            return "#FF3031";
        }
        else if(board[number] === CIRCLE){
            return "#45CE30";
        }
        else{
            return "#74B9FF";
        }
    }

    startGame(){
        
        this.setState({
            status: 'Game is on...',
            name1: 'New game',
            hits: 0,
            bombs: 15,
            ships: this.state.startingships,
            timer: null,
            counter: 300
        });
        this.initializeBoard();
    }

    checkGameStatus(){
        if (this.state.hits >= this.state.startingships){
            this.setState({status: 'You sinked all ships.'});   
        }
        else if(this.state.bombs <= 0){
            this.setState({status: "Game over. Ships remaning."})
        }if (this.state.status != 'Game has not started' && this.state.status != 'Click the start button first...'){
            this.setState({name1: 'New game'});
        }else{
            this.setState({name1: 'Start game'});
        }
    } 

    componentDidMount() {
        let timer = setInterval(this.tick, 100);
        this.setState({timer});
      }
    
      componentWillUnmount() {
        clearInterval(this.state.timer);
      }
    
      tick =() => {
        this.checkGameStatus()
        
        if (this.state.status === "Game is on..."){
            
           if (this.state.counter > 0){
                this.setState({
                    counter: this.state.counter - 1

                });
            }
            else{
                this.setState({status: "Timeout. Ships remaining."});
            }
        }
       
      }


    render(){
        const firstRow = [];
        const secondRow = [];
        const thirdRow = [];
        const fourthRow = [];
        const fifthRow = [];

        for (let i = 0; i < NBR_OF_ROWS; i++){
            firstRow.push(
                <Pressable key={i} styles={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)}/>
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS; i < NBR_OF_ROWS * 2; i++){
            secondRow.push(
                <Pressable key={i} styles={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)}/>
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS * 2; i < NBR_OF_ROWS * 3; i++){
            thirdRow.push(
                <Pressable key={i} styles={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)}/>
                </Pressable>
            )
        }for (let i = NBR_OF_ROWS * 3; i < NBR_OF_ROWS * 4; i++){
            fourthRow.push(
                <Pressable key={i} styles={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)}/>
                </Pressable>
            )
        }for (let i = NBR_OF_ROWS * 4; i < NBR_OF_ROWS * 5; i++){
            fifthRow.push(
                <Pressable key={i} styles={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)}/>
                </Pressable>
            )
        }

        return(
            <View style={styles.gameboard}>
                <View style={styles.flex}>{firstRow}</View>
                <View style={styles.flex}>{secondRow}</View>
                <View style={styles.flex}>{thirdRow}</View>
                <View style={styles.flex}>{fourthRow}</View>
                <View style={styles.flex}>{fifthRow}</View>
                <Pressable style={styles.button} onPress={()=> this.startGame()}>
                    <Text style={styles.buttonText}>{this.state.name1}</Text>
                </Pressable>
                <Text style={styles.gameinfo}>Hits: {this.state.hits}   Bombs: {this.state.bombs}    Ships: {this.state.ships}</Text>
                <Text style={styles.gameinfo}>Timer: {this.state.counter/10} sec</Text>
                <Text style={styles.gameinfo}>status: {this.state.status}</Text>
            </View>
        )
    }
}
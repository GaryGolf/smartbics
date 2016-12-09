export function makeDecision(turns: number[]): number {
    
    const turn = turns.length
    
    const iWin = couldIwin(turns)
    if(iWin != -1) return iWin
    
    // check user turns for danger situation
    const notNow = isItDanger(turns)
    if(notNow != -1) return notNow

    switch(turn){
        case 2 :
            // is opponent has a side
            let oppTurn = [1,3,5,7].indexOf(turns[1])
            if(oppTurn >= 0) return [8,2,6,0][oppTurn]
            // if he has a corner 
        case 3 :
            const thr = three(turns)
            if( thr!= -1) return thr
            break
        default :
            break
    }
    return getFreeCell(turns)
}

function couldIwin(turns: number[]): number {

    let myTurns:number[] = turns.filter(val => true)
    myTurns.push(12)
    return isItDanger(myTurns)
}
// important loose prevention turn
function three(turns: number[]): number {
    const cases: number[][] = [
     [0,8],[1,6],[1,3],[1,5],[5,7],[3,7],
     [1,6],[0,5],[2,7],[3,8], [1,8],[5,6],[0,7],[2,3]   
    ]
    const relieve: number[][] =[
     [3,5],[1,7],[0,2],[2,8],[6,8],[0,6],
     [0,3],[1,2],[5,8],[6,7], [2,5],[7,8],[3,6],[0,1]
    ]
    if(turns.length < 3) return -1
    // check user turns for danger situation
    // return solution
    const userTurns = lastUserTurns(turns)
    for(var i = 0; i < userTurns.length-1; i++)
        for(var j = 1; j < userTurns.length; j++)
            for(var k = 0; k < cases.length; k++) {
                if(userTurns[i] == cases[k][0] &&
                    userTurns[j] == cases[k][1]) 
                    return (turns.indexOf(relieve[k][0]) == -1) ? relieve[k][0] : relieve[k][1]
                
    }
    return -1
}

function isItDanger(turns: number[]): number{
    
    const cases: number[][] = [
     [0,1],[2,5],[7,8],[6,3],[0,3],[6,7],[5,8],[1,2],
     [0,2],[2,8],[6,8],[0,6],[1,4],[4,5],[4,7],[3,4],
     [1,7],[3,5],[0,4],[2,4],[4,8],[4,6],[0,8],[2,6]
    ]
    const relieve: number[] = [
        2,8,6,0,6,8,2,0,
        1,5,7,3,7,3,1,5,
        4,4,8,6,0,2,4,4
    ]
    if(turns.length < 3) return -1
    // check user turns for danger situation
    // return solution
    const userTurns = lastUserTurns(turns)
    for(var i = 0; i < userTurns.length-1; i++)
        for(var j = 1; j < userTurns.length; j++)
            for(var k = 0; k < cases.length; k++) {
                if(userTurns[i] == cases[k][0] &&
                    userTurns[j] == cases[k][1] &&
                    turns.indexOf(relieve[k]) < 0) return relieve[k]
            }
    return -1
}
function lastUserTurns(turns: number[]): number[] {
    return turns.filter((val, idx) => (turns.length % 2 + idx % 2 == 1)).sort((a,b) => a-b)
} 

// returns true if player, who has made last turn wins
export function win(turns: number[]):boolean {
    const cases = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    // filter last user turns
    //the turns of the user , who made his turn last
    const fturns = turns.filter((val, idx) => (turns.length % 2 + idx % 2 == 1)).sort()
    if(fturns.length < 3) return false

    return inspectAllCases(cases,createArrayOfTripples(fturns))
}
export function isGameEnded(turns: number[]):boolean {
    if(turns.length == 9) return true
    return false
}

// returns free cell center then corner then other then null
export function getFreeCell(turns: number[]): number {
    // center
    if(turns.indexOf(4) < 0) return 4
    // corner
    const corners: number[] = subtract([0,2,6,8],turns)
    if(corners.length > 0) return random(corners)
    //side
    const sides: number[] = subtract([1,3,5,7],turns)
    if(sides.length > 0) return random(sides)
    return null
}

// gets random number
function random(arr: number[]): number {
    return arr[Math.floor(Math.random()*arr.length)]
}
function subtract(arr1: number[], arr2: number[]): number[] {

    return arr1.filter(val => arr2.indexOf(val) == -1)
}






//modify  array from [1,2,3,4] => [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
function createArrayOfTripples(arr: number[]): number[][]{
    let tripples:number[][] = []
    for(var i = 0; i < arr.length - 2; i++)
        for(var j = 1; j < arr.length - 1; j++)
            for(var k = 2; k < arr.length ; k++)
                tripples.push([arr[i],arr[j],arr[k]])
    return tripples
}

function compareArray(arr1: number[], arr2: number[]): boolean {

    if(arr1.length != arr2.length) return false
    for(var i = 0; i < arr1.length; i++)
        if(arr1[i] !== arr2[i]) return false

    return true
}

function inspectAllCases(cases: number[][], test: number[][]): boolean{
    for(var i = 0; i < cases.length; i++)
        for(var j = 0; j < test.length; j++)
            if(compareArray(cases[i],test[j])) return true
    return false
}
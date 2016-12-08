

// returns true if player, who has made last turn wins
export function win(turns: number[]):boolean {
    const cases = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,5],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    // filter last user turns
    //the turns of the user , who made his turn last
    const fturns = turns.filter((val, idx) => (turns.length % 2 + idx % 2 == 1)).sort()
    if(fturns.length < 3) return false

    return inspectAllCases(cases,createArrayOfTripples(fturns))
}
export function isGameEnded(turns: number[]):boolean {
    console.log('ended?'+turns.length)
    if(turns.length == 9) return true
    return false
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
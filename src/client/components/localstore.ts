
export interface LeaderboardRecord { name: string, w: number, l: number}

export function getNames(): string[] {

    const records = getLeaderboardRecords()  
    return records.map(val => val.name)
}

export function getRecord(name: string): LeaderboardRecord {
    const records = getLeaderboardRecords()
    records.forEach(val => {
        if(val.name == name ) return val
    })
    return null
}

export function updateRecords(winner: string, looser: string): void {
    
    let winnerUpdated = false
    let looserUpdated = false
    const records = getLeaderboardRecords()
    // increase win and loose counters, then sort by win counter
    const newRecords = records.map(val => {
        if(val.name == winner ) {
            winnerUpdated = true
            val.w++ 
            console.log(winner+' updated')
            return val
        } else if(val.name == looser) {
            looserUpdated = true
            val.l++
            console.log(looser+' updated')
            return val
        } else  return val
    }).sort((a,b) => b.w - a.w)
    //in case player are new insert them to  store
    if(!winnerUpdated) newRecords.push({name: winner, w: 1, l: 0})
    if(!looserUpdated) newRecords.push({name: looser, w: 0, l: 1})
    localStorage.setItem('leaderboard',JSON.stringify(newRecords))

}

export function getLeaderboardRecords(): LeaderboardRecord[] {
    
    let records: LeaderboardRecord[] = []
    const store = localStorage['leaderboard'] 
    if(!store) return []
    try {
        records = JSON.parse(store) || []
    } catch (e) {
        console.error(e)
    }
    return records
}
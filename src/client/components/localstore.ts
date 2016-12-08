
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
    // updateWinnerRecord(winner)
    // updateLooserRecord(looser)
    let winnerUpdated = false
    let looserUpdated = false
    const records = getLeaderboardRecords()
    // increase win and loose counters, then sort by win counter
    const newRecords = records.map(val => {
        if(val.name == winner ) {
            winnerUpdated = true
            val.w++ 
            return val
        } else if(val.name == looser) {
            looserUpdated = true
            val.l++
            return val
        } else  return val
    }).sort((a,b) => a.w - b.w)
    //in case player are new insert them to  store
    if(!winnerUpdated) newRecord({name: winner, w: 1, l: 0})
    if(!looserUpdated) newRecord({name: looser, w: 0, l: 1})
    localStorage.setItem('leaderboard',JSON.stringify(newRecords))

}
function updateWinnerRecord(name: string): void {
    const record = getRecord(name)
    if(!record) {
        newRecord({name, w: 1, l: 0})
    } else {
        record.w++
        updateRecord(record)
    }
}
function updateLooserRecord(name: string): void {
    const record = getRecord(name)
    if(!record) {
        newRecord({name, w: 0, l: 1})
    } else {
        record.l++
        updateRecord(record)
    }
}
function updateRecord(record:LeaderboardRecord): void {
    const records = getLeaderboardRecords()
    const newRecords = records.map(val => {
        if(val.name == record.name ) return record
        else val
    })
    localStorage.setItem('leaderboard',JSON.stringify(newRecords))
}

function newRecord(record:LeaderboardRecord): void {
    const records = getLeaderboardRecords()
    records.push(record)
    localStorage.setItem('leaderboard',JSON.stringify(records))
}


export function getLeaderboardRecords(): LeaderboardRecord[] {
    
    let records: LeaderboardRecord[]
    const store = localStorage.getItem('leaderboard')
    if(!store) return []
    try {
        records = JSON.parse(store)
    } catch (e) {
        console.error(e)
        return []
    }
    return records
}
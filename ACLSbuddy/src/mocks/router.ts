export class MockRouter {
    public date1 = new Date('Thu May 28 2020 15:21:16 GMT-0700 (Pacific Daylight Time)')
    navigate(route, extras){
        
    }
    getCurrentNavigation(){
        return {
            extras: {
                state: {
                    user: {
                        ['start']: this.date1,
                        ['end']: this.date1,
                        ['shock']: [this.date1, this.date1],
                        ['epi']: [this.date1, this.date1],
                        ['antiarr']: [this.date1, this.date1],
                        ['selecteddrug']: 'Amiodarone',
                        ['initials']:'A',
                        ['age']:'1',
                        ['gender']:'male',
                        ['race']:'native',
                        ['rhythm']:'asystole',
                        ['rosc']:'roscyes',
                        ['key']:this.date1.toString(),
                    }
                }
            },
        }
    }
    
    createUrlTree(){

    }

    serializeUrl(){
        
    }


}
export class MockRouter {

    navigate(route, extras){
        
    }
    getCurrentNavigation(){
        return {
            extras: {
                state: {
                    user: {
                        ['start']: '1ststart',
                        ['end']: '1stend',
                        ['shock']: ['shock1', 'shock2'],
                        ['epi']: ['epi1', 'epi2'],
                        ['antiarr']: ['aarr1', 'aarr2']
                    }
                }
            },
        }
    }

}
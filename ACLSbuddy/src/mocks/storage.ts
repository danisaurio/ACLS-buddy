export class MockStorage {

    private mockstorage: Map<string, any> = new Map<string, any>([
        ['1ststart', {
            ['start']: '1ststart',
            ['end']: '1stend',
            ['shock']: ['shock1', 'shock2'],
            ['epi']: ['epi1', 'epi2'],
            ['antiarr']: ['aarr1', 'aarr2']
        }],
        ['2ndstart', {
            ['start']: '2ndstart',
            ['end']: '2ndend',
            ['shock']: ['shock1', 'shock2'],
            ['epi']: ['epi1', 'epi2'],
            ['antiarr']: ['aarr1', 'aarr2']
        }],
        ['3rdstart', {
            ['start']: '3rdstart',
            ['end']: '3rdend',
            ['shock']: ['shock1', 'shock2'],
            ['epi']: ['epi1', 'epi2'],
            ['antiarr']: ['aarr1', 'aarr2']
        }],
    ]);

    get(key: string){
        return this.mockstorage.get(key);
    }

    set(key: string, value: any){
        this.mockstorage.set(key, value);
    }
    
    forEach(fn: (value, key) => void) {
        this.mockstorage.forEach(fn)
    }
    remove(key: string){
        this.mockstorage.delete(key);
    }

}
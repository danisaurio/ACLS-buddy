export class MockStorage {

    public date1 = new Date('Thu May 28 2020 15:21:16 GMT-0700 (Pacific Daylight Time)')
    public date2 = new Date('Thu May 29 2020 15:21:16 GMT-0700 (Pacific Daylight Time)')
    public date3 = new Date('Thu May 30 2020 15:21:16 GMT-0700 (Pacific Daylight Time)')

    private mockstorage: Map<string, any> = new Map<string, any>([
        [this.date1.toString(), {
            ['start']: this.date1,
            ['end']: this.date1,
            ['shock']: [this.date1, this.date1],
            ['epi']: [this.date1, this.date1],
            ['antiarr']: [this.date1, this.date1],
            ['selecteddrug']: ['Amiodarone'],
            ['initials']:'',
            ['age']:'',
            ['gender']:'',
            ['race']:'',
            ['rhythm']:'',
            ['rosc']:'',
            ['key']:this.date1.toString(),

        }],
        [this.date2.toString(), {
            ['start']: this.date2,
            ['end']: this.date2,
            ['shock']: [this.date2, this.date2],
            ['epi']: [this.date2, this.date2],
            ['antiarr']: [this.date2, this.date2],
            ['selecteddrug']: ['Amiodarone'],
            ['initials']:'',
            ['age']:'',
            ['gender']:'',
            ['race']:'',
            ['rhythm']:'',
            ['rosc']:'',
            ['key']:this.date2.toString(),
        }],
        [this.date3.toString(), {
            ['start']: this.date3,
            ['end']: this.date3,
            ['shock']: [this.date3, this.date3],
            ['epi']: [this.date3, this.date3],
            ['antiarr']: [this.date3, this.date3],
            ['selecteddrug']: ['Amiodarone'],
            ['initials']:'',
            ['age']:'',
            ['gender']:'',
            ['race']:'',
            ['rhythm']:'',
            ['rosc']:'',
            ['key']:this.date3.toString(),
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
    length(){
        return this.mockstorage.size;
    }

}
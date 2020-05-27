export class MockStorage {

    private mockstorage: Map<string, any> = new Map<string, any>();


    get(key: string){
        return this.mockstorage.get(key);
    }

    set(key: string, value: any){
        this.mockstorage.set(key, value);
    }
}
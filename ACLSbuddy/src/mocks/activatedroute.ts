export class MockActivatedRoute {

public queryParams: Object = {
    subscribe(fn){
        fn();
    }
};

}
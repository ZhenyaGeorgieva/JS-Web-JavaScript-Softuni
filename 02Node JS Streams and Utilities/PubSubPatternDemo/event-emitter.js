class EventEmitter {
    constructor() {
        this.subscriptions={};
    }
    subscribe(eventName, cb) {//взима име на събитие и callback,който искаме да извикаме, когато това събитие възникне
        this.subscriptions[eventName]=
        (this.subscriptions[eventName]||[]).concat([cb]);

        //same as
        // if(!this.subscriptions[eventName]){
        //     this.subscriptions[eventName]=[];
        // }
        // this.subscriptions[eventName]=this.subscriptions[eventName].concat([cb]);
        //or this.subscriptions[eventName].push(cb)//mutates the existing array

        const cbIndex=this.subscriptions[eventName].length-1;

        return ()=>{
            this.subscriptions[eventName]=[
                ...this.subscriptions[eventName].slice(0,cbIndex),
                ...this.subscriptions[eventName].slice(cbIndex+1)
            ];

            //same as
            // this.subscriptions[eventName].slice(0,cbIndex)
            // .concat(this.subscriptions[eventName].slice(cbIndex+1));
        }
    }

    emit(eventName,data){
        (this.subscriptions[eventName]||[]).forEach(cb=>{
            cb(data);
        });
    }
}

const emitter=new EventEmitter();
const unsub=emitter.subscribe('getData', console.log);
emitter.subscribe('getData', console.log);
emitter.subscribe('getData', console.log);

emitter.emit('getData', 'Testing...');
unsub();
console.log('-------------------------');
emitter.emit('getData','Testing....');
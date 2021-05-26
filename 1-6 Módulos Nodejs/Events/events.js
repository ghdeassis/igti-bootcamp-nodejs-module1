import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("testEvent", obj => {
    console.log(obj);
});

export default eventEmitter;
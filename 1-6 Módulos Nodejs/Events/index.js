import ev from "./events.js";

ev.on("testEvent", () => {
    console.log("ouviu tambem");
});

ev.emit("testEvent", "bla bla bla");
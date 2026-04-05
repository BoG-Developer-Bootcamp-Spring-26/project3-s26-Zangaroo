// this will prevent our MongoDB from running at every instance
import connectDb from "./connectDb";

// register executes the connectDb once immediately when we run the server
export function register(){
    connectDb();
}
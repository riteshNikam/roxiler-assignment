import { app } from "./app.js";
import { PORT_NUMBER } from "../constants.js";
import { connectDB } from "./dbs/index.js";

connectDB()
.then(
    () => {
        console.log('CONNECTION SUCCESSFULL')
        app.listen(PORT_NUMBER, () => {
            console.log(`SERVER RUNNING ON PORT ${PORT_NUMBER}`)
        })
    }
    
)





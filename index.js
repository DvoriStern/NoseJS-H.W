import mongoose from 'mongoose';
import config from './config.js'
import { insertBook,findById as bfind ,findByKind as bfindkind} from './main/book.js';
import { findById as ufind, insertUser,findByKind as ufindkind } from './main/user.js';


mongoose.connect(config.DB_URL)
    .then(async () => {
        console.log('Connected!');

         bfind('65cb809fdde1fae7ae6d93a2')
             .then(x => console.log(x))
             .catch(console.log)

        ufind('65cb81ff3e43b64fd06c42fa')
             .then(x => console.log(x))
             .catch(console.log)
        bfindkind("Drama")
        .then(x => console.log(x))
        .catch(console.log)
        ufindkind("Drama")
        .then(x => console.log(x))
        .catch(console.log)

        // try {
        //     const x = await insertBook(100, 250);
        //     console.log('hello');
        //     console.log(x);
        // } catch (error) {
        //     console.log(error.message);
        // }

        // console.log('========================================');
        // // removeBook('bdfdcs'); // קוד לא חוקי
        // // removeBook('65cb537b01c7cda1dedd7f96');

        // updateById('65cb51a27586e7e695272303', "hello");
        // updateById('2222', "hello");
        // updateById('789b51a27586e7e695272303', "hello");

        // for (let index = 0; index < 10; index++) {
        //     insertBook("book"+index,"Childish","xvnvnhg"+index,false);

        // }
        // for (let index = 0; index < 10; index++) {
        //     insertUser("user"+index,"Drama",false);

        // }
        // // insertBook("Eli Lomed Lehizaer","Childish","xvnvnhg",false);
        // // insertUser("Dvori Stern","Drama",false);
    });

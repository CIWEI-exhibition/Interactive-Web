import axios from 'axios';
import abd from './a.json';

axios.get('https://www.aquaurore.co.kr/Community_Page/note.html').then((Response)=>{
    console.log(Response.data);
}).catch((Error)=>{
    console.log(Error);
})
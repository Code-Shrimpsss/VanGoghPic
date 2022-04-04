import { axios } from "axios";

// export function request(config){
//     let newVar = Axios.create({
//         baseUrl: 'https://api.ixiaowai.cn/api/api.php?return=json',
//         timeout: 5000
//     })
//     return newVar
// }
axios({url:'https://www.fastmock.site/mock/a62b6007be40808b2edb8a8a3fb54c6a/api/book'})
.then(res =>{ console.log(res.data.data.list);})


// export function request(con){
//     let news = Axios({url:'https://www.fastmock.site/mock/a62b6007be40808b2edb8a8a3fb54c6a/api/book'
// })
// return news.data
// }
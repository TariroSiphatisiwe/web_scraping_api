import express, { response } from 'express'
import axios from 'axios'
import cheerio from 'cheerio'
import cors from 'cors'

const app = express()


const all_urls = []
const PORT = 8000
const urls = [
    'https://www.javatpoint.com/python-for-loop',
    'https://www.javatpoint.com/python-if-else',
    'https://www.javatpoint.com/python-for-loop',
    'https://www.javatpoint.com/python-functions',
    'https://www.javatpoint.com/python-strings',
    'https://www.javatpoint.com/python-regex',
    'https://www.javatpoint.com/python-lists',
    'https://www.javatpoint.com/python-set',
    'https://www.javatpoint.com/python-tuples',
    'https://www.javatpoint.com/python-dictionary',
    'https://www.javatpoint.com/python-programs',
    'https://www.javatpoint.com/numpy-tutorial',
    'https://www.javatpoint.com/java-tutorial',
    'https://www.javatpoint.com/java-programs',
    'https://www.javatpoint.com/java-oops-concepts',
    'https://www.javatpoint.com/java-string',
    'https://www.javatpoint.com/exception-handling-in-java',
    'https://www.javatpoint.com/multithreading-in-java',
    'https://www.javatpoint.com/collections-in-java',
    'https://www.javatpoint.com/javafx-tutorial',
    'https://www.javatpoint.com/jsp-tutorial',
    'https://www.javatpoint.com/spring-tutorial',
    'https://www.javatpoint.com/spring-boot-tutorial',
    'https://www.javatpoint.com/free-java-projects',
    'https://www.javatpoint.com/javascript-tutorial',
    'https://www.javatpoint.com/html-tutorial',
]




//Creating Middleware 
app.use(express.json())
app.use(cors())

//Sending a request to the route url to send scrapped data
app.get('/',(req,res)=>{
    
    //Scrapping all URLS from sub Urls of the page 
    urls.forEach(url => {
        axios.get(url)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)

                $('a').each(function () {
                    const i = $(this).attr('href')
                    if (i != undefined) {
                        if (!i.toString().includes('share')) {
                            if (!i.toString().includes('pinterest')) {
                                if (i.toString().includes('https://www.javatpoint.com/')) {

                                //Adding all URLS to an array, to be able to loop through
                                    all_urls.push(i)
                                    console.log(all_urls)

                                    //looping through each url
                                    all_urls.forEach(url_content => {
                                        axios.get(url_content)
                                            .then(response => {
                                                const html = response.data
                                                const $ = cheerio.load(html)

                                                //scrapping data from URL
                                                $('td').each(function () {
                                                    console.log($(this).text())
                                                    res.json( $(this).text())
                                                })
                                             
                                            }).catch((error => error)
                                            )

                                    })

                                }
                            }
                        }
                    }

               })

            })
    })

})

app.listen(PORT, () => console.log("listening"))




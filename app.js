//file for express app
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// express app
const app = express();


// connect to mongoDB app
const dbURL = 'mongodb+srv://netninja:XTZrkkzkoPPeA0zL@nodetuts.3s3m1ef.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000)) //putting a .then method which fires back a callback function when there is some sort of promise 
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// listen for requests , also creates ab instance of the server 
//app.listen(3000); we moved it into the mongoose connect because we want the DB to first be connected before we are allowed to listen for connections and open the port for users 

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// // mongoose and nogo sandbox routes ############### LESSON #9
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({ //using the model to create a new instance of a blog document within the code
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   }); 

//   blog.save() //used a the new instance blog and used the method called save 
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     });
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('659c9b7e2c18a51c0fef51c5')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // //res.send('<p>home page</p>') .. added express and is now using render method with title properties and Home object 
    // res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>')
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //find all of the documents inside the blogs collection
    .then((result) => { //put in the .then method because this is asyncronous 
        res.render('index', { title: 'All Blogs', blogs: result})
    }) 
    .catch((err) => {
        console.log(err);
    })
})

// creating a handler function 
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})

// 404 page
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
})
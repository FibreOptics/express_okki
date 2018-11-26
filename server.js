const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const whitelist = ['http://reactokki.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'react_okki/public')));

// An api endpoint that returns a short list of items
app.get('/api/testitem',cors(corsOptions), (req,res) => {
    const list = ["item1", "item2", "item3"];
    const jsample = [
        {
            id:0,
            username:"Jonn",
            email:"jonn@fakemail.true",
            pass:"alpha"
        },
        {
            id:1,
            username:"Jann",
            email:"Jann@fakemail.true",
            pass:"bravo"
        },
    ]
    res.json(list);
    //res.json(jsample);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    return res.status(444).send('Nothing Here!');
    //res.sendFile(path.join(__dirname+'/react_okki/public/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);
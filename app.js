const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const { post } = require('request');
const fetch = require('node-fetch');

const app = express();


//const PORT = process.env.PORT || 5000;

//app.listen(PORT, console.log(`Server started on ${PORT}`));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    // Make sure fields are filled 
    if(!email) {
        res.redirect('/sorry.html');
        return;
    }

    // Construct req data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
            }
        ]
    };

    const postData = JSON.stringify(data);

    fetch('https://us18.api.mailchimp.com/3.0/lists/065c961fa5', {
        method: 'POST',
        headers: {
            Authorization: 'auth 0ab97b0ff0f57be36aeb57af248eebd3-us18'
        },
        body: postData
    })
    .then(res.statusCode === 200) ? 
        res.redirect('/thank_you.html') :
        res.redirect('/sorry.html')
    .catch(err => console.log(err))

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

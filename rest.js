const express = require('express');
const app = express();

const lookup = require('./lookup');
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/', async (req, res) => {
    const query = JSON.parse(req.query);
    if (!query.domain) {
        res.send(JSON.stringify({
            error: "No Domain Specified"
        }));
    } else {
        res.send(JSON.stringify(
            await lookup(query.domain, req.query.extensions)
        ));
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

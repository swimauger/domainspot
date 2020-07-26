const express = require('express');
const app = express();
const cors = require('cors');

const lookup = require('./lookup');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
    const { domain, extensions } = req.body;
    if (!domain) {
        res.send(JSON.stringify({
            error: "No Domain Specified"
        }));
    } else {
        res.send(JSON.stringify(
            await lookup(domain, extensions)
        ));
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

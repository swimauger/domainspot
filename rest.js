const express = require('express');
const app = express();
const cors = require('cors');

const lookup = require('./lookup');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

class Queue {
    static tasks = [];

    static add(req, res) {
        this.tasks.push({ req, res });
        if (this.tasks.length < 2) {
            this.scrape();
        }
    }

    static async scrape() {
        for (const task of this.tasks) {
            const { domain, extensions } = task.req.body;
            if (!domain) {
                task.res.send(JSON.stringify({
                    error: "No Domain Specified"
                }));
            } else {
                task.res.send(JSON.stringify(
                    await lookup(domain, extensions)
                ));
            }
        }
    }
}

app.post('/', Queue.add.bind(Queue));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

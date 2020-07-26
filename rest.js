const express = require('express');
const app = express();
const cors = require('cors');

const { lookup, troubleshoot } = require('./lookup');
const validExtensions = require('./extensions.json');
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
            let { domain, extensions } = task.req.body;
            extensions = extensions.filter(ext => !!validExtensions[ext.toUpperCase()])
            if (!domain) {
                task.res.send(JSON.stringify({
                    error: "No Domain Specified"
                }));
            } else if (extensions.length) {
                task.res.send(JSON.stringify(
                    await lookup(domain, extensions, true)
                ));
            } else {
                task.res.send(JSON.stringify({
                    error: "No Valid Extensions Found"
                }));
            }
        }
        this.tasks = [];
    }
}

app.post('/', Queue.add.bind(Queue));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

process.on('beforeExit', async () => {
    await troubleshoot();
});

import express, { NextFunction, request, Request, response, Response} from 'express';
import * as path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

let entries: any[] = []
app.locals.entries = entries

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.get('/new-entry', (req: Request, res: Response) => {
    res.render('new-entry');
});

app.post('/new-entry', (req: Request, res: Response) => {
    if (!req.body.title || !req.body.body) {
        res.status(400).send('Entries must have a title and a body');
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    res.redirect('/');
});

app.use((req: Request, res: Response) => {
    res.status(404).render('404');
});

app.listen(3000, () => {
    console.log('The server runs on port 300');
});


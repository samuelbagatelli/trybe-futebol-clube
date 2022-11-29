import * as express from 'express';
import loginRouter, { leaderboardRouter, matchesRouter, teamsRouter } from './routers';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use('/login', loginRouter);

    this.app.use('/teams', teamsRouter);

    this.app.use('/matches', matchesRouter);

    this.app.use('/leaderboard', leaderboardRouter);

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;

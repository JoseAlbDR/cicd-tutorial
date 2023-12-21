import { Responder } from 'cote';

(async () => {
  await main();
})();

async function main() {
  const responder = new Responder({
    name: 'Thumbnail service',
  });

  responder.on('generate-thumbnail', (req, done) => {
    console.log({ req });
  });
}

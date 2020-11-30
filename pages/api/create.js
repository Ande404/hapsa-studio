export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body.data || req.body);
  res.end(JSON.stringify(req.body));
}

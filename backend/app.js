const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const privateKey = fs.readFileSync('/etc/nginx/ssl/chenjinxu.top.key', 'utf8');
const certificate = fs.readFileSync('/etc/nginx/ssl/chenjinxu.top.pem', 'utf8');

const app = express();

const conn = mysql.createConnection({
  user:'',          //用户名
  password:'',  //密码
  host:'',     //主机（默认都是local host）
  database:''     //数据库名
});

app.use(cors());
app.use(bodyParser.json());

conn.connect(err => {
  if (err) {
    console.error(err, '如果不为null，则连接失败');
  } else {
    console.log('数据库连接成功');
    // 完成连接后，开启一个定时器，每隔一段时间发送一个查询至数据库服务，保持连接活跃
    setInterval(function () {
      conn.query('SELECT 1');
    }, 5000);

    // 连接成功后导入路由
    const loginRouter = require('./modle/login')(conn);
    const registerdRouter = require('./modle/register')(conn);
    const getpublicRouter = require('./modle/getpublic')(conn);
    const sendpublicRouter = require('./modle/sendpublic')(conn);
    app.use('/login', loginRouter);
    app.use('/register', registerdRouter);
    app.use('/getpublic', getpublicRouter);
    app.use('/sendpublic', sendpublicRouter);
  }
});

// Create an HTTPS service identical to the HTTP service.
const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);
httpsServer.listen(6001, () => {
  console.log('HTTPS Server is running on https://localhost:6001');
});

// Then create a WebSocket server by fixing it on the HTTPS server
const wss = new WebSocket.Server({ server: httpsServer });
wss.on('connection', function connection(ws) {
  console.log('WebSocket client connected');
  // handle WebSocket connections and messages...
  ws.send('Hello! I am a WebSocket server.');
});
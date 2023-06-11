var express = require('express');
const path = require('path');
const sql = require('./sql');
const search = require('./search');
const getProducBy = require('./getProducByCatId');
const getlogin = require('./getlogin');
const themsuaxoa = require('./themsuaxoa');
const shoppingcard = require('./shoppingcard');


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
const { resolve } = require('path');
const { rejects } = require('assert');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    sql.executeSQL("select MaSach, SachImage, TenSach, DonGia from Sach;", (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
                <div style='display:inline;width:400px;float: left;background-color:white;color:black;'>
                <a href="/detail/${row['MaSach']}"><img style="width:400px;height: auto;" src='/images/${row['SachImage']}'/></a>
                <div style="text-align:center"><b>${row['TenSach']}</b></div>
                <div style="text-align:center"><span style="color:red;font-size: 20px;"> ${row['DonGia']} Đ</span></div>
                <div style="text-align:center;line-height: normal;padding-bottom: 25px;"><input type="button" value="Mua" onclick="addToCard(${row['MaSach']})" ></div>
                </div>
               `;
        });
        res.send(result);
    });
});

app.get('/getDetailData/:MaSach', function (req, res) {
    sql.executeSQL(`select * from Sach where MaSach = ${req.params.MaSach}`, (recordset) => {
        var row = recordset.recordsets[0][0];
        res.send(row);
    });
});

// search
app.post('/search', function (req, res) {
    search.search(req, res);
});
app.post('/searchkhachhang', function (req, res) {
    search.searchkhachhang(req, res);
});
app.post('/searchhoadon', function (req, res) {
    search.searchhoadon(req, res);
});
app.post('/searchsach', function (req, res) {
    search.searchsach(req, res);
});
//getProducByCatId
app.post('/getProducByCatId', function (req, res) {
    getProducBy.getProducByCatId(req, res);
});

app.post('/getProducByChuDe', function (req, res) {
    getProducBy.getProducByChuDe(req, res);
});

//login
app.post('/getlogin', function (req, res) {
    getlogin.getlogin(req, res);
});

app.post('/SignUp', function (req, res) {
    getlogin.SignUp(req, res);
});

app.post('/checklogin', function (req, res) {
    getlogin.checklogin(req, res);
});

//shop card
app.post('/getShoppingCard', function (req, res) {
    shoppingcard.getShoppingCard(req,res);
});

app.post('/buyProduct', async function (req, res) {
    await shoppingcard.buyProduct(req);
    res.send("ok")
});

app.get('/shopping-card', function (req, res) {
    res.sendfile(__dirname + "/shoppingcard.html");
});

//thêm,sửa xóa
app.post('/adthem', function (req, res) {
    themsuaxoa.adthem(req, res);
});
app.post('/adthemkh', function (req, res) {
    themsuaxoa.adthemkh(req, res);
});

app.post('/adsua', function (req, res) {
    themsuaxoa.adsua(req, res);
});

app.post('/adsuahd', function (req, res) {
    themsuaxoa.adsuahd(req, res);
});

app.post('/adsuakh', function (req, res) {
    themsuaxoa.adsuakh(req, res);
});

app.post('/adxoa', function (req, res) {
    themsuaxoa.adxoa(req, res);
});

app.post('/adxoahd', function (req, res) {
    themsuaxoa.adxoahoadon(req, res);
});

app.post('/adxoakh', function (req, res) {
    themsuaxoa.adxoakh(req, res);
});

app.post('/get-product-admin', function (req, res) {
    themsuaxoa.getProduct(req, res);
});
app.post('/gethoadon', function (req, res) {
    themsuaxoa.gethoadon(req, res);
});
app.post('/getkhachhang', function (req, res) {
    themsuaxoa.getkhachhang(req, res);
});
app.post('/checksach', function (req, res) {
    themsuaxoa.checksach(req, res);
});

// chạy html
app.get('/index', function (req, res) {
    res.sendfile(__dirname + "/index.html");
});

app.get('/detail/:MaSach', function (req, res) {
    res.sendfile(__dirname + "/detail.html");
});

app.get('/login', function (req, res) {
    res.sendfile(__dirname + "/login.html");
});

app.get('/signup', function (req, res) {
    res.sendfile(__dirname + "/signup.html");
});

app.get('/admin', function (req, res) {
    res.sendfile(__dirname + "/admin.html");
});

var server = app.listen(3000, function () {
    console.log('Server is running..');
});




   

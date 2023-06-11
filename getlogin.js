const sql = require('./sql');

function getlogin(req,res){
    sql.executeSQL(`select * from TaiKhoan where [TaiKhoan]='${req.body.TaiKhoan}' and MatKhau='${req.body.MatKhau}'`, (recordset) => {
        var user = recordset.recordsets[0][0];
        res.send([user]);
    });
}

function checklogin(req,res){
    sql.executeSQL(`select * from TaiKhoan where [TaiKhoan]='${req.body.TaiKhoan}'`, (recordset) => {
        var user = recordset.recordsets[0][0];
        res.send([user]);
    });
}
function SignUp(req,res){
        sql.executeSQL(`INSERT INTO TaiKhoan(TenTK,TaiKhoan,MatKhau) VALUES ('${req.body.TenTk}','${req.body.TaiKhoan}','${req.body.MatKhau}')`, (recordset) => {
            var dk = recordset.recordsets[0];
            res.send(dk);
        });    
}
    

module.exports = {
    getlogin: getlogin,
    checklogin: checklogin,
    SignUp: SignUp
}
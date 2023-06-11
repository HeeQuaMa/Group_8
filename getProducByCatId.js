const sql = require('./sql');

function getProducByCatId(req,res){
    var catId = req.body.catId;
    sql.executeSQL(`select * from Sach where catId='${catId}'`, (recordset) => {
        var result = "";
        if (recordset.recordsets[0] === null || recordset.recordsets[0].length === 0) {
            res.send("Chưa có sản phẩm");
        }
        else {
            recordset.recordsets[0].forEach(row => {
                result += `
                <div style='display:inline;width:400px;float: left;background-color:white;color:black;'>
                <a href="/detail/${row['MaSach']}"><img style="width:400px;height: auto;" src='/images/${row['SachImage']}'/></a>
                <div style="text-align:center;line-height: 40px;"><b>${row['TenSach']}</b></div>
                <div style="text-align:center"><span style="color:red;font-size: 20px;"> ${row['DonGia']} Đ</span></div>
                <div style="text-align:center;line-height: normal;padding-bottom: 25px;"><input type="button" value="Mua" onclick="addToCard(${row['MaSach']})" ></div>
                </div>
                `;
            });
            res.send(result);
        }
    });
}

function getProducByChuDe(req,res){
    var ChuDe = req.body.ChuDe;
    sql.executeSQL(`select * from Sach where ChuDe= N'${ChuDe}' order by productIndex`, (recordset) => {
        var result = "";
        if (recordset.recordsets[0] === null || recordset.recordsets[0].length === 0) {
            res.send("Chưa có sản phẩm");
        }
        else {
            recordset.recordsets[0].forEach(row => {
                result += `
                <div style='display:inline;width:400px;float: left;background-color:white;color:black;'>
                <a href="/detail/${row['MaSach']}"><img style="width:400px;height: auto;" src='/images/${row['SachImage']}'/></a>
                <div style="text-align:center;line-height: 40px;"><b>${row['TenSach']}</b></div>
                <div style="text-align:center"><span style="color:red;font-size: 20px;"> ${row['DonGia']} Đ</span></div>
                <div style="text-align:center;line-height: normal;padding-bottom: 25px;"><input type="button" value="Mua" onclick="addToCard(${row['MaSach']})" ></div>
                </div>
                `;
            });
            res.send(result);
        }
    });
}

module.exports = {
    getProducByCatId: getProducByCatId,
    getProducByChuDe: getProducByChuDe
}
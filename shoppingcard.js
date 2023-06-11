const sql = require('./sql');

function getShoppingCard(req, res) {
    var arrProductId = req.body.arrProductId;
    sql.executeSQL(`select * from Sach where MaSach in ${arrProductId}`, (recordset) => {
        var result = `<table border=1 style="border-collapse: collapse;margin: 25px 0;font-size: 28px;"><tr align='middle' ><td>Sản phẩm</td><td>Tên Sản phẩm</td><td>Số lượng</td><td>Giá Sản phẩm</td><td>Xóa</td></tr >`;
        if (recordset.recordsets[0] === null || recordset.recordsets[0].length === 0) {
            res.send("Vui long chon san pham");
        }
        else {
            recordset.recordsets[0].forEach(row => {
                result += `
<tbody style="border-bottom: 1px solid black;background-color: #f3f3f3;font-weight: bold;color: #009879;" class='product' productId='${row['MaSach']}' price='${row['DonGia']}'>
    <tr style="background-color: #f3f3f3;">
        <td style="padding: 12px 15px;"><a href="/detail/${row['MaSach']}"><img style="width:250px;height: auto;" src='/images/${row['SachImage']}'/></a></td>
        <td style="padding: 12px 15px;><div style="text-align:center;line-height: 30px;"><b>${row['TenSach']}</b></td>
        <td style="padding: 12px 15px;"><input style="width: 50px;outline: none;font-size: 20px;" type="number" value="1" min="1" class="soluong" onclick="tongtien()"></td>
        <td style="padding: 12px 15px;"><span style="color:red;font-size: 20px;" class="price" >${row['DonGia']} </span><a style="color:red;font-size: 20px;">Đ<a></td>
        <td style="padding: 12px 15px;"><input type="button" value="Delete" onclick="deleteProduct(${row['MaSach']})"></td>
    </tr>
</tbody>
                `;
            });
            result += "</table>";
            res.send(result);
        }
    });
}

async function buyProduct(req) {
    var arrSP = req.body.arrSP;
    await sql.executeSQLSync(`insert into HoaDon( MaKH, NgayBan) values('${req.body.MaKH}',getdate())`);
    var data = await sql.executeSQLSync(`select @@IDENTITY as MAHD`);
    arrSP.forEach(async objSP => {
        //console.log("MaHD", data.recordsets[0][0].MAHD);
        await sql.executeSQLSync(`insert into HoaDonChiTiet(MaHD,MaSach, SoLuong, GiaBan) values('${data.recordsets[0][0]["MAHD"]}','${objSP.Masach}','${objSP.SoLuong}','${objSP.GiaBan}') `);
    });
}

module.exports = {
    getShoppingCard: getShoppingCard,
    buyProduct: buyProduct
}
const sql = require('./sql');

function search(req,res){
    var search = req.body.search;
    sql.executeSQL(`select MaSach, SachImage, TenSach, DonGia from Sach where TenSach like N'%${search}%'`, (recordset) => {
        var result = "";
        if (recordset.recordsets[0] === null || recordset.recordsets[0].length === 0) {
            res.send("Không tìm thấy sản phẩm");
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


function searchsach(req, res) {
    sql.executeSQL(`select * from Sach where MaSach like N'%${req.body.searchTK}%' or MaHang like N'%${req.body.searchTK}%' or TenSach like N'%${req.body.searchTK}%'
    `, (recordset) => {
        res.send(recordset.recordsets[0]);
    });
}

function searchhoadon(req, res) {
    sql.executeSQL(`select HoaDon.MaHD, MaKH,MaSach,SoLuong,GiaBan,NgayBan from HoaDon inner join HoaDonChiTiet on HoaDon.MaHD = HoaDonChiTiet.MaHD 
    where HoaDon.MaHD like N'%${req.body.searchTK}%' or GiaBan like N'%${req.body.searchTK}%' or MaKH like N'%${req.body.searchTK}%'
    `, (recordset) => {
        res.send(recordset.recordsets[0]);
    });
}

function searchkhachhang(req, res) {
    sql.executeSQL(`select *from KhachHang where STT like '%${req.body.searchTK}%' or MaKH like '%${req.body.searchTK}%' 
or TenKH like N'%${req.body.searchTK}%' or Diachi like N'%${req.body.searchTK}%' or SoDienThoai like N'%${req.body.searchTK}%'
or Tongtien like N'%${req.body.searchTK}%'
    `, (recordset) => {
        res.send(recordset.recordsets[0]);
    });
}

module.exports = {
    search: search,
    searchkhachhang: searchkhachhang,
    searchsach: searchsach,
    searchhoadon: searchhoadon
}

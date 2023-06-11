const sql = require('./sql');

function getProduct(req, res) {
    sql.executeSQL(`select * from Sach `, (recordset) => {
        res.send(recordset.recordsets[0]);
    });
}
function gethoadon(req, res) {
    sql.executeSQL(`select HoaDon.MaHD, MaKH,MaSach,SoLuong,GiaBan,NgayBan from HoaDon inner join HoaDonChiTiet on HoaDon.MaHD = HoaDonChiTiet.MaHD order by MaHD asc`, (recordset) => {
        res.send(recordset.recordsets[0]);
    });
}
function getkhachhang(req, res) {
    sql.executeSQL(`select *from KhachHang `, (recordset) => {
        res.send(recordset.recordsets[0]);
    });
}

function checksach(req,res){
    sql.executeSQL(`select MaSach from Sach where MaSach = ${req.body.MaSach}`, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}

function adthem(req, res){
    sql.executeSQL(`INSERT INTO Sach VALUES ( ${req.body.MaSach} ,N'${req.body.MaHang}', N'${req.body.TenSach}', N'${req.body.TacGia}'
    , N'${req.body.NhaXB}',N'${req.body.Nhacungcap}',N'${req.body.ChuDe}', N'${req.body.Hinhthuc}',N'${req.body.NamXB}'
    ,N'${req.body.Trongluong}',N'${req.body.Kichthuoc}',N'${req.body.Sotrang}', N'${req.body.DonGia}',N'${req.body.Mota}'
    ,${req.body.trongkho}, N'${req.body.SachImage}',${req.body.catId},${req.body.proindex})
    `, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}

function adthemkh(req, res){
    sql.executeSQL(`INSERT INTO KhachHang (MaKH,TenKH,DiaChi,SoDienThoai,NgayMua,Tongtien) VALUES (${req.body.MaKH},N'${req.body.TenKH}',N'${req.body.Diachi}',${req.body.SoDienThoai},getdate(),${req.body.Tongtien})
    `, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}


function adsua(req, res){
    sql.executeSQL(`UPDATE Sach set MaHang=N'${req.body.MaHang}',TenSach = N'${req.body.TenSach}',TacGia = N'${req.body.TacGia}'
    ,NhaXB = N'${req.body.NhaXB}',Nhacungcap = N'${req.body.Nhacungcap}',ChuDe = N'${req.body.ChuDe}',Hinhthuc = N'${req.body.Hinhthuc}'
    ,NamXB = N'${req.body.NamXB}',Trongluong = N'${req.body.Trongluong}',Kichthuoc = N'${req.body.Kichthuoc}',Sotrang = N'${req.body.Sotrang}'
    ,DonGia = N'${req.body.DonGia}',Mota =N'${req.body.Mota}',TrongKho = ${req.body.trongkho},SachImage = '${req.body.SachImage}'
    ,catId = ${req.body.catId}, productIndex = ${req.body.proindex}  where MaSach = ${req.body.MaSach}
    `, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}

function adsuahd(req, res){
    sql.executeSQL(`
    UPDATE HoaDonChiTiet set SoLuong = '${req.body.SoLuong}', GiaBan ='${req.body.GiaBan}'
where MaHD = ${req.body.MaHD} and MaSach = '${req.body.MaSach}'
    `, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}

function adsuakh(req, res){
    sql.executeSQL(`UPDATE KhachHang set TenKH = N'${req.body.TenKH}',Diachi = N'${req.body.Diachi}',SoDienThoai ='${req.body.SoDienThoai}',
    Tongtien ='${req.body.Tongtien}'
    where STT = ${req.body.STT}
    `, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}

function adxoa(req, res){
    sql.executeSQL(`delete Sach where MaSach = ${req.body.MaSach}`, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}
async function adxoahoadon(req, res){
    await sql.executeSQL(`delete HoaDonChiTiet where MaHD = ${req.body.MaHD}`, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
    await sql.executeSQL(`delete HoaDon where MaHD = ${req.body.MaHD}`, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}
function adxoakh(req, res){
    sql.executeSQL(`delete KhachHang where STT = ${req.body.STT}`, (recordset) => {
        var sach = recordset.recordsets[0];
        res.send(sach);
    });
}

module.exports = {
    adthem: adthem,
    adthemkh: adthemkh,
    adsua: adsua,
    adsuahd: adsuahd,
    adsuakh: adsuakh,
    adxoa: adxoa,
    adxoahoadon: adxoahoadon,
    adxoakh: adxoakh,
    gethoadon: gethoadon,
    getProduct: getProduct,
    getkhachhang: getkhachhang,
    checksach: checksach,
}
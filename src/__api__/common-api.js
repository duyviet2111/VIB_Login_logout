class CommonApi {
    getAllEmployees() {
        const employees = [
            {
                id: 0,
                label: "",
            },
            {
                id: 1,
                label: "Lê Nhật Cường | VIB-ThanhDo | Quản lý Khách hàng cao cấp",
            },
            {
                id: 2,
                label: "Nguyễn Thị Vân | KimDong | Chuyên viên cao cấp Quản lý khách hàng ưu tiên",
            },
            {
                id: 3,
                label: "Hoàng Thế Sang | VIB-NguyenTrai | Quản lý Khách hàng",
            },
            {
                id: 4,
                label: "Nguyễn Anh Dũng | VIB-SaiGon-SD | Giám đốc Phòng Kinh doanh",
            },
            {
                id: 5,
                label: "Ngô Công Hoàn | Risk-RC-AR-HN1 | Chuyên viên Xử lý Nợ",
            },
            {
                id: 6,
                label:
                    "Lê Kim Ngân | Risk-RC-CECC2 | Trưởng nhóm Thu hồi Nợ sớm qua điện thoại Cho vay Tín chấp",
            }
        ];
        return Promise.resolve(employees);
    }

    getAllEmployeesWithMoreInfo() {
        const employees = [
            {
                id: 1,
                value: "Đặng Khắc Vỹ",
                label: "Đặng Khắc Vỹ",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/vy.dangkhac@vib.com.vn.jpg",
                email: "vy.dangkhac@vib.com.vn",
                title: "Chủ tịch hội đồng quản trị",
            },
            {
                id: 2,
                value: "Hàn Ngọc Vũ",
                label: "Hàn Ngọc Vũ",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/vu.hanngoc@vib.com.vn.jpg",
                email: "vu.hanngoc@vib.com.vn",
                title: "Tổng Giám đốc",
            },
            {
                id: 3,
                value: "Đặng Văn Sơn",
                label: "Đặng Văn Sơn",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/son.dangvan@vib.com.vn.jpg",
                email: "son.dangvan@vib.com.vn",
                title: "Phó Chủ tịch Hội đồng Quản trị",
            },
            {
                id: 5,
                value: "Nguyễn Việt Cường",
                label: "Nguyễn Việt Cường",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/cuong.nguyenviet@vib.com.vn.jpg",
                email: "cuong.nguyenviet@vib.com.vn",
                title: "Thành viên độc lập hội đồng quản trị",
            },
            {
                id: 6,
                value: "Lê Quang Trung",
                label: "Lê Quang Trung",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/trung.lequang@vib.com.vn.jpg",
                email: "trung.lequang@vib.com.vn",
                title: "Phó Tổng Giám đốc",
            },
            {
                id: 7,
                value: "Trần Nhất Minh",
                label: "Trần Nhất Minh",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/minh.trannhat@vib.com.vn.jpg",
                email: "minh.trannhat@vib.com.vn",
                title: "Phó Tổng Giám đốc",
            },
            {
                id: 8,
                value: "Ân Thanh Sơn",
                label: "Ân Thanh Sơn",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/son.anthanh@vib.com.vn.jpg",
                email: "son.anthanh@vib.com.vn",
                title: "Phó Tổng Giám đốc",
            },
            {
                id: 9,
                value: "Hồ Vân Long",
                label: "Hồ Vân Long",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/long.hovan@vib.com.vn.png",
                email: "long.hovan1@vib.com.vn",
                title: "Phó Tổng Giám đốc",
            },
            {
                id: 10,
                value: "Phạm Thị Minh Huệ",
                label: "Phạm Thị Minh Huệ",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/hue.phamminh@vib.com.vn.jpg",
                email: "hue.phamthiminh@vib.com.vn",
                title: "Kế toán trưởng",
            },
            {
                id: 11,
                value: "Nguyễn Thuỳ Linh",
                label: "Nguyễn Thuỳ Linh",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/linh.nguyenthuy@vib.com.vn.jpeg",
                email: "linh.nguyenthuy@vib.com.vn",
                title: "Trưởng ban kiểm soát",
            },
            {
                id: 13,
                value: "Đào Quang Ngọc",
                label: "Đào Quang Ngọc",
                avatar: "http://directory.ehr.vib/Resources/Upload/Images/ngoc.daoquang@vib.com.vn.JPG",
                email: "ngoc.daoquang@vib.com.vn",
                title: "Thành viên ban kiểm soát",
            },
        ];
        return Promise.resolve(employees);
    }

    getAllDocTypes() {
        const docTypes = [
            {
                id: 0,
                label: "",
            },
            {
                id: 1,
                label: "Đề  nghị và phương án vay vốn",
            },
            {
                id: 2,
                label: "Hồ sơ pháp lý",
            },
            {
                id: 3,
                label: "Hồ sơ mục đích vay",
            },
            {
                id: 4,
                label: "Hồ sơ nguồn thu thập",
            },
            {
                id: 5,
                label: "Hồ sơ TSBĐ",
            },
            {
                id: 6,
                label: "Hồ sơ thẩm định phê duyệt",
            },
            {
                id: 7,
                label: "Hồ sơ giải ngân",
            },
            {
                id: 8,
                label: "Hồ sơ khác",
            }
        ];
        return Promise.resolve(docTypes);
    }
}

export const commonApi = new CommonApi();
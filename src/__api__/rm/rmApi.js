class RMApi {
  getSearchRecords(value, page) {
    const res = {
      status: 200,
      message: "Ok",
      currentPage: 1,
      totalPage: 3,
      items: [
        {
          numberOfLOS: 12345671,
          numberOfCIF: 775641231,
          fullName: "Hoàng Xuân Xinh Ngọc 1",
          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345671,
          numberOfCIF: 775641232,
          fullName: "Hoàng Xuân Xinh Ngọc 2",

          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345673,
          numberOfCIF: 775641233,
          fullName: "Hoàng Xuân Xinh Ngọc 3",

          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345674,
          numberOfCIF: 775641234,
          fullName: "Hoàng Xuân Xinh Ngọc 4",

          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345675,
          numberOfCIF: 775641235,
          fullName: "Hoàng Xuân Xinh Ngọc 5",

          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345676,
          numberOfCIF: 775641236,
          fullName: "Hoàng Xuân Xinh Ngọc 6",

          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345677,
          numberOfCIF: 775641237,
          fullName: "Hoàng Xuân Xinh Ngọc 7",

          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345678,
          numberOfCIF: 775641238,
          fullName: "Hoàng Xuân Xinh Ngọc 8",

          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345679,
          numberOfCIF: 775641239,
          fullName: "Hoàng Xuân Xinh Ngọc 9",

          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345680,
          numberOfCIF: 775641240,
          fullName: "Hoàng Xuân Xinh Ngọc 10",
          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345681,
          numberOfCIF: 775641241,
          fullName: "Hoàng Xuân Xinh Ngọc 11",
          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345682,
          numberOfCIF: 775641242,
          fullName: "Hoàng Xuân Xinh Ngọc 12",
          status: "Lưu kho",
        },
        {
          numberOfLOS: 12345683,
          numberOfCIF: 77564143,
          fullName: "Hoàng Xuân Xinh Ngọc 13",
          status: "Lưu kho",
        },
        {
          numberOfLOS: 1234584,
          numberOfCIF: 77564144,
          fullName: "Hoàng Xuân Xinh Ngọc 14",
          status: "Lưu kho",
        },
        {
          numberOfLOS: 1234585,
          numberOfCIF: 77564145,
          fullName: "Hoàng Xuân Xinh Ngọc 15",
          status: "Lưu kho",
        },
      ],
    };

    return Promise.resolve(res);
  }

  getStepsName() {
    const res = {
      status: 200,
      message: "OK",
      data: {
        initialMember: "Trần Văn Anh | VIB Quận 1",
        saveMember: "Nguyễn Ngọc Hà | VIB Quận 1",
      },
    };

    return Promise.resolve(res);
  }
  getManagesData() {
    const res = {
      status: 200,
      message: "OK",
      currentPage: 1,
      totalPage: 3,
      items: [
        {
          id: 1,
          numOfHDTD: 123456,
          numOfCIF: 123456,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 2,
          numOfHDTD: 123457,
          numOfCIF: 123457,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 3,
          numOfHDTD: 123458,
          numOfCIF: 123458,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 4,
          numOfHDTD: 123459,
          numOfCIF: 123459,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 5,
          numOfHDTD: 123460,
          numOfCIF: 123460,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 6,
          numOfHDTD: 1234561,
          numOfCIF: 1234561,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 7,
          numOfHDTD: 1234562,
          numOfCIF: 1234572,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 8,
          numOfHDTD: 1234563,
          numOfCIF: 1234573,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 9,
          numOfHDTD: 1234564,
          numOfCIF: 1234574,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 10,
          numOfHDTD: 1234565,
          numOfCIF: 1234575,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 11,
          numOfHDTD: 1234566,
          numOfCIF: 1234576,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
        {
          id: 12,
          numOfHDTD: 1234567,
          numOfCIF: 1234577,
          recordType: "Vay vốn",
          fullname: "Nguyễn Văn A",
          recordStatus: "Lưu kho",
        },
      ],
    };

    return Promise.resolve(res);
  }

  getInforRecord() {
    const res = {
      status: 200,
      message: "OK",
      value: {
        col1: {
          numOfLOS: "abc",
          numOfCover: "abc",
          numOfBox: 23434,
          numOfCIF: 43434,
          numOfSeal: 343434,
        },
        col2: {
          status: "abc",
          CustomerName: "Trần Văn A",
          numOfSeal: 4343,
          numOfBox1: 234354,
          memberManagement: "Trần Văn A",
        },

        processOfRecords: [
          {
            id: 235,
            time: "1 / 1 / 2022",
            status: "Mượn",
            requirePerson: "Nguyễn Thị Bích liên",
            approvePerson: "Trần Văn A",
          },
          {
            id: 236,
            time: "1 / 1 / 2022",
            status: "Mượn",
            requirePerson: "Nguyễn Thị Bích liên",
            approvePerson: "Trần Văn A",
          },
          {
            id: 237,
            time: "1 / 1 / 2022",
            status: "Mượn",
            requirePerson: "Nguyễn Thị Bích liên",
            approvePerson: "Trần Văn A",
          },
          {
            id: 238,
            time: "1 / 1 / 2022",
            status: "Mượn",
            requirePerson: "Nguyễn Thị Bích liên",
            approvePerson: "Trần Văn A",
          },
          {
            id: 239,
            time: "1 / 1 / 2022",
            status: "Mượn",
            requirePerson: "Nguyễn Thị Bích liên",
            approvePerson: "Trần Văn A",
          },
          {
            id: 240,
            time: "1 / 1 / 2022",
            status: "Mượn",
            requirePerson: "Nguyễn Thị Bích liên",
            approvePerson: "Trần Văn A",
          },
        ],
      },
    };

    return Promise.resolve(res);
  }

  getHandlingRecords() {
    const res = {
      status: 200,
      message: "OK",
      currentPage: 1,
      totalPage: 3,
      items: [
        {
          id: 67687868,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
        {
          id: 67687867,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
        {
          id: 67687866,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
        {
          id: 67687865,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
        {
          id: 67687864,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
        {
          id: 67687863,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
        {
          id: 67687862,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
        {
          id: 67687861,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
        {
          id: 67687860,
          numOfHDTD: 878764,
          cif: 75657,
          fullname: "Trần Văn A",
          reqType: "Lưu mới",
          status: "Chờ lưu kho",
          date: "22/03/2022",
        },
      ],
    };

    return Promise.resolve(res);
  }

  getSteps() {
    const res = {
      status: 200,
      message: "OK",
      steps: [
        {
          label: "Khởi tạo",
          description: "Trần Anh Thư | VIB quận 1",
          time: "2/25/2022",
        },
        {
          label: "Lưu kho",
          description: "Nguyện Ngọc Ngạn Anh | BRP - HO",
          time: "2/25/2022",
        },
      ],
    };
    return Promise.resolve(res);
  }

  getPrintCoverData(record) {
    const res = {
      status: 200,
      message: "OK",
      value: {
        name: "Nguyễn Thị Hương Ly",
        cif: 33434535,
        hdtd: "abc",
        loan: "Cho vay kinh doanh",
        seal1: "abc",
      },
    };

    return Promise.resolve(res);
  }

  getNumberOfCover(record) {
    const res = {
      status: 200,
      message: "OK",
      value: {
        numOfCover: "325553",
      },
    };

    return Promise.resolve(res);
  }

  getPrintRecord(record) {
    const res = {
      status: 200,
      message: "OK",
      items: [
        {
          id: 7687,
          groupRecord: "Phương án sử dụng vốn/Đề nghị vay vốn/Yêu cầu vay vốn",
          ruleOfProduct: "Theo QĐ sản phẩm",
          numOfPage: 3,
          form: "O",
        },
        {
          id: 7688,
          groupRecord: "Phương án sử dụng vốn/Đề nghị vay vốn/Yêu cầu vay vốn",
          ruleOfProduct: "Theo QĐ sản phẩm",
          numOfPage: 3,
          form: "O",
        },
        {
          id: 7689,
          groupRecord: "Phương án sử dụng vốn/Đề nghị vay vốn/Yêu cầu vay vốn",
          ruleOfProduct: "Theo QĐ sản phẩm",
          numOfPage: 3,
          form: "O",
        },
      ],
    };

    return Promise.resolve(res);
  }

  getCoverNumOfRmcard() {
    const res = {
      status: 200,
      message: "OK",
      items: [
        { numOfCover: 24343 },
        { numOfCover: 24344 },
        { numOfCover: 24345 },
        { numOfCover: 24346 },
      ],
    };

    return Promise.resolve(res);
  }
  getNewCoverOfRmcard() {
    const res = {
      status: 200,
      message: "OK",
      items: [
        { numOfCover: 24343 },
        { numOfCover: 24344 },
        { numOfCover: 24345 },
        { numOfCover: 24346 },
        { numOfCover: 24347 },
      ],
    };

    return Promise.resolve(res);
  }

  getConfirmSubmitSuccess(data) {
    const res = {
      status: 200,
      message: "OK",
    };
    return Promise.resolve(res);
  }
}
export const rmApi = new RMApi();

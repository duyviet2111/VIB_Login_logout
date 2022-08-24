class CreateFormApi {
  getCreateForms(value) {
    const formGroup = {
      productId: 1,
      items: [
        {
          id: 835698765,
          formGroupField: "Hồ sơ pháp lý",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [],
        },
        {
          id: 83573456,
          formGroupField: "Hồ sơ mục đích vay",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [],
        },
        {
          id: 835556654,
          formGroupField: "Hồ sơ nguồn thu nhập",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [],
        },
        {
          id: 83587654,
          formGroupField: "Hồ sơ giải ngân",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [],
        },
        {
          id: 8359234,
          formGroupField: "Hồ sơ khác",
          otherRecord: true,
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [],
        },
      ],
    };

    return Promise.resolve(formGroup);
  }
}
export const createFormApi = new CreateFormApi();

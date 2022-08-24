class UserApi {
  getUser() {
    const res = {
      status: 200,
      message: "OK",
      user: {
        id: 123434,
        name: "Trần Văn A",
        role: "RM",
      },
    };

    return Promise.resolve(res);
  }
}
export const userApi = new UserApi();

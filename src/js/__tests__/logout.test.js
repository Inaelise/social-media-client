import { logout } from "../api/auth/logout";
import { remove } from "../storage";

jest.mock("../storage", () => ({
  remove: jest.fn(),
}));

describe("logout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should remove the token and profile from storage", () => {
    logout();

    expect(remove).toHaveBeenCalledWith("token");
    expect(remove).toHaveBeenCalledWith("profile");
    expect(remove).toHaveBeenCalledTimes(2);
  });
});

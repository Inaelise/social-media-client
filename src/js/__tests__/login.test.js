import { login } from "../api/auth/login";
import { save } from "../storage";

global.fetch = jest.fn();
jest.mock("../storage", () => ({
  save: jest.fn(),
  load: jest.fn(),
}));

describe("login", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("Should store the token and profile when login is successful", async () => {
    const tokenMock = "mock-token";
    const profileMock = {
      name: "Ola Example",
      email: "Ola@example.no",
      accessToken: tokenMock,
    };

    require("../storage").load.mockReturnValue(null); // No token stored initially

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => profileMock,
    });

    const result = await login("Ola@example.no", "password123");

    expect(save).toHaveBeenCalledWith("token", tokenMock);
    expect(save).toHaveBeenCalledWith("profile", {
      name: "Ola Example",
      email: "Ola@example.no",
    });
    expect(result).toEqual({
      name: "Ola Example",
      email: "Ola@example.no",
    });
  });

  it("should throw an error if login fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    require("../storage").load.mockReturnValue(null);

    await expect(login("Ola@example.no", "wrong-password")).rejects.toThrow(
      "Unauthorized",
    );

    expect(save).not.toHaveBeenCalled();
  });
});

import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth";
import { checkingAuthentication } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";
jest.mock("../../../src/firebase/providers");

describe("Tests in authThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should invoke checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn should call checkingCredentials and login - if it is successful", async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn should call checkingCredentials and logout - if it isn't successful ", async () => {
    const loginData = { ok: false, errorMessage: "Error" };

    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startCreatingUserWithEmailPassword should call checkingCredentials and login - if it is seccessful ", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startCreatingUserWithEmailPassword should call checkingCredentials and logout - if it isn't seccessful ", async () => {
    const loginData = { ok: false, errorMessage: "Error" };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLoginWithEmailPassword should call checkingCredentials and login - if it is seccessful", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLogout should call logoutFirebase, clearNotes and logout", async () => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  test;
});

import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
} from "../../fixtures/authFixtures";

describe("Tests in authSlice", () => {
  test('should return initial State and be called "auth"', () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("should perform authentication", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated", // 'checking', 'not-authenticated', 'authenticated'
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("should perform logout, without arguments", () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test("should perform logout and show a error message", () => {
    const errorMessage = "Credentials are not valid";
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });

  test("should change state to checking ", () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    console.log(state);
    expect(state.status).toBe("checking");
  });
});

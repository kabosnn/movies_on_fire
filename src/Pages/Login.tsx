import auth from "../firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import "./Login.css";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [signIn, user, loading] = useSignInWithGoogle(auth);

  function handleGoogleAuth() {
    signIn();
  }

  if (user) {
    return <Navigate to="/movies" />
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-content">
          <h1>Welcome to FlickFindr 🎬✨</h1>
          <p>Your ultimate movie buddy. Let's get you started!</p>
          <button
            disabled={loading}
            className="google-login-button"
            onClick={handleGoogleAuth}
          >
            Login with Google
          </button>
        </div>
      </div>
    </main>
  );
}

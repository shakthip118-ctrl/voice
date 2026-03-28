"use client"; // <- Important! must be first line

import { SignUpButton, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser(); // now works on client

  return (
    <div>
      <h1>Home</h1>

      {isSignedIn ? (
        // Show only Sign Out when logged in
        <SignOutButton>Log Out</SignOutButton>
      ) : (
        // Show Sign In and Sign Up when logged out
        <>
          <SignInButton mode="modal">Sign In</SignInButton>
          <br></br>
          <SignUpButton mode="modal">Sign Up</SignUpButton>
        </>
      )}
    </div>
  );
}
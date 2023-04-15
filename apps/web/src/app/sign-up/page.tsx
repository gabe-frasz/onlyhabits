import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
}

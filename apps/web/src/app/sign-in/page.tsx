import { SignIn } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}

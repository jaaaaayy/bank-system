import LoginForm from "@/components/forms/login-form";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 h-svh items-center justify-center px-4">
      <span className="text-2xl font-bold">Jay Bank</span>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

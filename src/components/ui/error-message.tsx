type ErrorMessageProps = {
  msg?: string;
};

export default function ErrorMessage({ msg = 'Something went wrong.' }: ErrorMessageProps) {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div className="text-center text-red-500">{msg}</div>
    </div>
  );
}

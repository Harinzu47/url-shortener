const Error = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
      <span className="material-symbols-outlined text-[16px]">error</span>
      <span>{message}</span>
    </div>
  );
};

export default Error;
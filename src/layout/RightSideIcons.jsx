const EmailLink = () => {
  return (
    <div className="hidden fixed -right-6 top-[75%] transform -translate-y-1/2 lg:!flex flex-col items-center gap-6 text-white/90 z-50">
      <a
        href="mailto:bisht.surya@ymail.com"
        className="rotate-90 text-white/90 group hover:!text-blue-800 hover:underline transition cursor-pointer"
      >
        bisht.surya@ymail.com
      </a>
      <div className="w-px h-18 bg-gray-400 mt-14" />
    </div>
  );
};

export default EmailLink;
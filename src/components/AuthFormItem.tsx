import type { FC } from "react";

interface AuthFormItemType {
  label: string;
  type: "text" | "password" | "email";
  placeholder: string;
  name: string;
  extraClass?: string;
  labelClass?: string;
}

const AuthFormItem: FC<AuthFormItemType> = ({
  label,
  type,
  placeholder,
  name,
  extraClass,
  labelClass,
}) => {
  return (
    <label className={`${labelClass ?? ""} mb-1.5 block text-sm text-slate-200`}>
      <span className="inline-block mb-1.5">{label}</span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${extraClass ?? ""} w-full rounded-2xl bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-indigo-400/60`}
      />
    </label>
  );
};

export default AuthFormItem;

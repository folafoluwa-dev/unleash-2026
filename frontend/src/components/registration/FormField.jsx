const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
  autoComplete,
  min,
  max,
  rows,
}) => {
  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-unleash-cream text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors";

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-sm font-semibold text-unleash-brown"
      >
        {label} {required && <span className="text-unleash-orange">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows || 4}
          className={inputClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          max={max}
          className={inputClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      {error && (
        <p
          id={`${name}-error`}
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
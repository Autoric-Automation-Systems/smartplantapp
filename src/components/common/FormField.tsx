import React from "react";
import Label from "@/components/form/Label";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  errors?: string[];
  hint?: string;
  /** Ocupa a linha inteira em grids de duas colunas. */
  fullWidth?: boolean;
  children: React.ReactNode;
};

/**
 * Campo de formulário: rótulo associado ao input, mensagem de erro e dica.
 * Evita repetir o bloco Label/Input/<p>erro</p> em cada tela.
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  errors,
  hint,
  fullWidth = true,
  children,
}) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {hint && !errors?.length && (
      <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{hint}</p>
    )}
    {errors?.length ? (
      <p role="alert" className="mt-1.5 text-sm text-error-600 dark:text-error-400">
        {errors[0]}
      </p>
    ) : null}
  </div>
);

export default FormField;

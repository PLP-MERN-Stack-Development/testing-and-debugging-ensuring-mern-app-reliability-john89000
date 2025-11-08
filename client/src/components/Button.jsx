import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', disabled = false, className = '', onClick, ...rest }) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const disabledClass = disabled ? 'btn-disabled' : '';

  return (
    <button
      type="button"
      className={`${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim()}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

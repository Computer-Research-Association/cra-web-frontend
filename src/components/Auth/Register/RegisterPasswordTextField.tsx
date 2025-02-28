import React from 'react';
import styled from 'styled-components';

const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;

  label {
    color: var(--color-dark);
    font-family: 'Pretendard SemiBold';
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    user-select: none;
  }

  input {
    background-color: var(--color-white);
    color: var(--color-dark-text);
    font-size: 1.25rem;
    border: 1px solid var(--color-dark-stroke);
    border-radius: 0.5rem;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    height: 66px;
    flex: 1;

    @media (max-width: 480px) {
      padding: 1.2rem 0.8rem;
    }
  }

  input:read-only {
    background-color: var(--color-background);
  }

  input.error {
    border-color: var(--color-error);
  }

  div.error {
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    color: var(--color-error);
    font-size: 1rem;
  }
`;

export default function RegisterPasswordTextField({
  name,
  value,
  label,
  placeHolder,
  onChange,
  onBlur,
  valid,
  errorMessage,
}: {
  name: string;
  value: string;
  label: string;
  placeHolder: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLInputElement>) => void;
  valid: boolean;
  errorMessage: string;
}) {
  return (
    <Input>
      <label htmlFor={name}>{label}</label>
      <input
        type="password"
        name={name}
        id={name}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={!valid ? 'error' : ''}
      />
      {!valid && <div className="error">{errorMessage}</div>}
    </Input>
  );
}

import React from 'react';
import styled, { css } from 'styled-components';
import Icon from 'feather-icons-react';

type Variant = 'rounded' | 'normal';

interface ButtonProps {
  onClick?: (event: any) => void;
  className?: string;
  variant?: Variant;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  onClick,
  children,
  className,
  variant = 'normal',
  ...rest
}) => (
  <StyledButton
    className={className}
    onClick={onClick}
    variant={variant}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {icon ? (
      <span>
        <Icon icon={icon} width="16" strokeWidth="1" />
        {children}
      </span>
    ) : (
      children
    )}
  </StyledButton>
);

const StyledButton = styled.button<{ variant: Variant }>`
  height: 40px;
  padding: 0 20px;
  border-radius: 5px;
  background: #d4d3d3;
  border: 1px solid #afafaf;
  transition: 0.2s background-color linear;

  :hover {
    background: #bfbfbf;
  }

  span {
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.3rem;
    }
  }

  ${(props) =>
    props.variant === 'rounded' &&
    css`
      width: 40px;
      padding: 0;
      border-radius: 50%;

      span {
        svg {
          margin: 0;
        }
      }
    `};
`;

export default Button;

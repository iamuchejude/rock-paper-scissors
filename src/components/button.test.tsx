import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { render, fireEvent, RenderResult } from '@testing-library/react';

import Button from './button';
import PaperIcon from '../images/weapons/paper.svg';

describe('<Button />', () => {
  it('should render without crashing', () => {
    const handleOnClick = sinon.spy();
    const { getByText } = render(
      <Button onClick={handleOnClick}>Say Hello</Button>,
    );
    const button = getByText(/Say Hello/i);
    expect(document.body.contains(button));
  });

  it('should handle click event', () => {
    const handleOnClick = sinon.spy();
    const { getByText } = render(
      <Button onClick={handleOnClick}>Handle Click</Button>,
    );
    const button = getByText(/Handle Click/i);

    fireEvent.click(button);
    expect(handleOnClick.calledOnce);
  });

  describe('Button With Icon', () => {
    it('should render with feather icon', () => {
      const { container } = render(
        <Button onClick={() => {}} icon="user">
          With Icon
        </Button>,
      );
      const buttonChild = container.firstChild as Element;

      expect(buttonChild.contains(document.createElement('svg')));
      expect(buttonChild.textContent).to.equal('With Icon');
    });

    it('should render with svg icon', () => {
      const { container } = render(
        <Button onClick={() => {}}>
          <PaperIcon width="18" />
        </Button>,
      );
      const buttonChild = container.firstChild as Element;
      const iconWidth = (buttonChild.firstChild as Element)?.getAttribute(
        'width',
      );
      expect(document.body.contains(buttonChild));
      expect(Number(iconWidth)).to.equal(18);
    });
  });

  describe('Rounded Button', () => {
    let utils: RenderResult;

    beforeEach(() => {
      utils = render(<Button icon="user" variant="rounded" />);
    });

    it('should render rounded button with same width and height', () => {
      const button = utils.container.firstChild as Element;
      const style = window.getComputedStyle(button);
      expect(style.width).to.equal(style.height);
    });

    it('should have a border-radius of 50%', () => {
      const button = utils.container.firstChild as Element;
      const style = window.getComputedStyle(button);
      expect(style.borderRadius).to.equal('50%');
    });
  });
});

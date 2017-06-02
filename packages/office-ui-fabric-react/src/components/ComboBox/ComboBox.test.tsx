/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';
import { mount, shallow } from 'enzyme';

let { expect } = chai;

import { ComboBox } from './ComboBox';
import { IComboBoxOption } from './ComboBox.Props';

const DEFAULT_OPTIONS: IComboBoxOption[] = [
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' }
];

const DEFAULT_OPTIONS2: IComboBoxOption[] = [
  { key: '1', text: 'One' },
  { key: '2', text: 'Foo' },
  { key: '3', text: 'Bar' }
];

describe('ComboBox', () => {

  it('Can flip between enabled and disabled.', () => {
    let wrapper = shallow(
      <ComboBox
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');

    expect(comboBoxRoot.find('.is-disabled').length).equals(0, `shouldn't be disabled`);
    expect(comboBoxRoot.find('[data-is-interactable=true]').length).equals(1, 'data-is-focusable="true"');

    wrapper = shallow(
      <ComboBox
        disabled={ true }
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />);
      comboBoxRoot = wrapper.find('.ms-ComboBox');

    expect(comboBoxRoot.find('.is-disabled').length).equals(1, `should be disabled`);
    expect(comboBoxRoot.find('[data-is-interactable=false]').length).equals(1, 'data-is-focusable="false"');
  });

  it('Renders no selected item in default case', () => {

    let wrapper = mount(
      <ComboBox
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('[role="combobox"]');

    expect(inputElement.text()).equals('');
  });

  it('Renders a selected item in uncontrolled case', () => {
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('input');

    expect(inputElement.props().value).equals('1');
  });

  it('Renders a selected item in controlled case', () => {
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        selectedKey='1'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('input');

    expect(inputElement.props().value).equals('1');
  });

  it('Renders a default value with options', () => {
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        value='1'
        options={ DEFAULT_OPTIONS }
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('input');

    expect(inputElement.props().value).equals('1');
  });

  it('Renders a default value with no options', () => {
    let wrapper = mount(
      <ComboBox
        label='testgroup'
        value='1'
      />);
    let comboBoxRoot = wrapper.find('.ms-ComboBox');
    let inputElement = comboBoxRoot.find('input');

    expect(inputElement.props().value).equals('1');
  });

  it('Can change items in uncontrolled case', () => {
    let comboBoxRoot;

    try {
      let wrapper = mount(
        <ComboBox
          label='testgroup'
          defaultSelectedKey='1'
          options={ DEFAULT_OPTIONS }
        />);
      comboBoxRoot = wrapper.find('.ms-ComboBox');
      let buttonElement = comboBoxRoot.find('button');
      buttonElement.simulate('click');
      let secondItemElement = wrapper.getDOMNode().ownerDocument.querySelector('.ms-ComboBox-item[data-index="1"]');
      ReactTestUtils.Simulate.click(secondItemElement);
    }
    finally {
      let inputElement = comboBoxRoot.find('input');
      expect(inputElement.props().value).equals('2');
    }
  });

// Text cases for AutoComplete: True, AllowFreeform: True
  it('Can insert text in uncontrolled case with autoComplete and allowFreeform on', () => {
    let comboBoxRoot;
    let inputElement;
    try {
      let wrapper = mount(
        <ComboBox
          label='testgroup'
          defaultSelectedKey='1'
          options={ DEFAULT_OPTIONS2 }
          autoComplete={ true }
          allowFreeform ={ true }
        />);
      comboBoxRoot = wrapper.find('.ms-ComboBox');
      inputElement = comboBoxRoot.find('input');
      inputElement.simulate('change', { target: {value: 'f'} });
    }
    finally {
      inputElement = comboBoxRoot.find('input');
      expect(inputElement.props().value).equals('Foo');
    }
  });

  it('Can insert text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    let comboBoxRoot;
    let inputElement;
    try {
      let wrapper = mount(
        <ComboBox
          label='testgroup'
          defaultSelectedKey='1'
          options={ DEFAULT_OPTIONS2 }
          autoComplete={ true }
          allowFreeform ={ false }
        />);
      comboBoxRoot = wrapper.find('.ms-ComboBox');
      inputElement = comboBoxRoot.find('input');
      inputElement.simulate('change', { target: {value: 'f'} });
    }
    finally {
      inputElement = comboBoxRoot.find('input');
      expect(inputElement.props().value).equals('Foo');
    }
  });

  it('Can insert text in uncontrolled case with autoComplete off and allowFreeform on', () => {
    let comboBoxRoot;
    let inputElement;
    try {
      let wrapper = mount(
        <ComboBox
          label='testgroup'
          defaultSelectedKey='1'
          options={ DEFAULT_OPTIONS2 }
          autoComplete={ false }
          allowFreeform ={ true }
        />);
      comboBoxRoot = wrapper.find('.ms-ComboBox');
      inputElement = comboBoxRoot.find('input');
      inputElement.simulate('change', { target: {value: 'f'} });
    }
    finally {
      inputElement = comboBoxRoot.find('input');
      expect(inputElement.props().value).equals('f');
    }
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform off', () => {
    let comboBoxRoot;
    let inputElement;
    try {
      let wrapper = mount(
        <ComboBox
          label='testgroup'
          defaultSelectedKey='1'
          options={ DEFAULT_OPTIONS2 }
          autoComplete={ false }
          allowFreeform ={ false }
        />);
      comboBoxRoot = wrapper.find('.ms-ComboBox');
      inputElement = comboBoxRoot.find('input');
      inputElement.simulate('change', { target: {value: 'f'} });
    }
    finally {
      inputElement = comboBoxRoot.find('input');
      expect(inputElement.props().value).equals('One');
    }
  });

});
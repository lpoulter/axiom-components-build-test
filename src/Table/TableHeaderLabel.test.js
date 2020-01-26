import React from 'react';
import renderer from 'react-test-renderer';
import TableHeaderLabel from './TableHeaderLabel';

const getComponent = props => renderer.create(
  <TableHeaderLabel { ...props }>Test</TableHeaderLabel>
);

describe('TableHeaderLabel', () => {
  it('renders', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with grow', () => {
    const component = getComponent({ grow: true });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with sortDirection', () => {
    const component = getComponent({ sortDirection: 'ascending' });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with shrink', () => {
    const component = getComponent({ shrink: true });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with textAlign', () => {
    const component = getComponent({ textAlign: 'right' });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with sortable', () => {
    const component = getComponent({ sortable: false });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with width', () => {
    const component = getComponent({ width: 20 });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('width overrides grow', () => {
    const component = getComponent({ width: 20, grow: true });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('width overrides shrink', () => {
    const component = getComponent({ width: 20, shrink: true });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

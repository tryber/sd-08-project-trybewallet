import React, { Component } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';

export default class Table extends Component {
  render() {
    return (
      <>
        <TableHead />
        <TableBody />
      </>
    );
  }
}

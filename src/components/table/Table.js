import React, { Component } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

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

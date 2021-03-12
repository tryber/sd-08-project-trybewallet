import React from 'react'
import { useSelector } from 'react-redux';

import Header from '../components/Header'

export default function Wallet() {

  const { email } = useSelector(state => state)

  return (
    <>
      <Header email= { email }/>  
    </>
  )
}

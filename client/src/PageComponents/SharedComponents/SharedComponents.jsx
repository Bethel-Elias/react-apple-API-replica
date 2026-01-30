import React from 'react'
import Header from '../../components/Header/Header'
import AlertSection from '../../components/Alert/AlertSection'
import Youtube from '../../components/YouTube/Youtube'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'


function SharedComponents() {
  return (
    <>
      <Header />
      <AlertSection />
      <Outlet />
      <Youtube/>
      <Footer />
    </>
  );
}

export default SharedComponents
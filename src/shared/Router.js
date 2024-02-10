import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Shared from '../components/Shared';
import Signin from '../components/Signin';
import Faq from '../components/Faq';
import Privacy from '../components/Privacy';
import Landing from '../components/Landing';
import Signup from '../components/Signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/shared' element={<Shared />} />
        </Route>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/faq' element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

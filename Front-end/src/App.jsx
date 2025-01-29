import React from 'react';
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import {HomePages} from './routes/Routes';
import { LoginPage } from './routes/Routes';
import { SignupPage } from './routes/Routes';
import { CreateProduct } from './routes/Routes';
import  "./App.css"


function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePages/>}/>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage/>} />
    <Route path="/create-product" element={<CreateProduct />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
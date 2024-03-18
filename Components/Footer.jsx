'use client'

import React from 'react';

const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "support@db.com",
    "info@exaple.com",
    "Contact Us",
  ];

  const usefullLink = ["Home", "About Us", "Company Bio"];
  return (
    <footer className='text-center text-white backgroundMain lg:text-left'>
      <div className='mx-6 py-10 text-center md:text-left'>
      <div className='grid-cols-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div className=''>
            <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>
              Crypto Champ
            </h6>
            <p>
            Crypto Champ is your ultimate destination for crowdfunding success. With a focus on blockchain technology and cryptocurrency, we empower individuals and businesses to raise funds for their innovative projects and ideas. Join Crypto Champ today and unlock the potential to bring your dreams to life through our cutting-edge crowdfunding platform.
            </p>
          </div>
          <div className=''>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
             Products
            </h6>
            {productList.map((el,i)=>(
              <p className='mp-4 my-6' key={i+1}>
                <a href="#!">
                  {el}
                </a>
              </p>
            ))}
          </div>
          <div className=''>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
             Useful Links
            </h6>
            {usefullLink.map((el,i)=>(
              <p className='mp-4 my-6' key={i+1}>
                <a href="#!">
                  {el}
                </a>
              </p>
            ))}
          </div>
          <div>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
             Contact
            </h6>
            {contactList.map((el,i)=>(
              <p className='mp-4 my-6' key={i+1}>
                <a href="#!">
                  {el}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className='backgroundMain p-6 text-center'>
        <span>© 2024 Copyright: </span>
        <a className='font-semibold' href="https://tailwindcss.com/docs/guides/nextjs">
          Crypto Champ
        </a>
      </div>
    </footer>
  );
};


export default Footer;
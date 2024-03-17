'use client'

import React, { useState, useContext } from 'react';

// INTERNAL IMPORT 
import { CrowdFundingContext } from '../Context/CrowdFunding';
import { Logo, Menu } from '../Components/index';

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = ["White Paper", "Project", "Donation", "Members"];

  return (
    <div className="backgroundMain">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" aria-label='Company' title='Company' className="inline-flex items-center mr-8">
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">COMPANY</span>
            </a>
            <ul className="flex items-center space-x-8 lg:flex">
              {menuList.map((el, index) => (
                <li key={index} className='mr-4'>
                  <a
                    href="/"
                    aria-label="Our product"
                    title="Our product"
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    {el}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {!currentAccount && (
            <ul className="flex items-center space-x-8 lg:flex">
              <li>
                <button
                  onClick={() => connectWallet()}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}

          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href='/'
                        aria-label='Company'
                        className="inline-flex items-center"
                      >
                        <Logo color="text-black" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Company
                        </span>
                      </a>
                    </div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 mt-2 mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0. 4-1-0.4-1.4,05-0.4,1,0,1.416.3,6.31-6.3,6.3 c-0.4,0.4-0.4,1, 0,1.4C4.5,19.9,4.7,20,5,2050.5-0.1,0.7-0.316.3-6.316.3.6. 3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 0.4-0.4,0.4-1, 0-1.4L13.4,1216.3-6.3020.1,5.3,20.1,4.7,19.7,4.32"
                        />
                      </svg>
                    </button>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      {menuList.map((el, i) => (
                        <li key={i}>
                          <a
                            href="/"
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            {el}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a
                          href="/"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                          aria-label="Sign up"
                          title="Sign up"
                        >
                          Connect Wallet
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default NavBar;

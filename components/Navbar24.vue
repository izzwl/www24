<!-- <style>
ul.ntp-menu li,
ul.ntp-menu li a,
ul.ntp-menu li button{
    text-transform: uppercase;
    font-size: 10pt;
    font-weight: 500;
    color:#777;
}
</style> -->
<template>
    <nav class="bg-white/80 backdrop-blur-md border-gray-200 sticky w-full z-50 top-0  shadow-md ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-6">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img alt='NTP Logo' src="/static/img/Logo.png" class="h-9"/>
                <span class="self-center text-xs whitespace-nowrap text-red-600 font-semibold italic dark:text-white">PT NUSANTARA TURBIN DAN PROPULSI</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
                <NavDropdown24 id="dd-corporate" title="Corporate">
                    <NavDropdownMenu24 title="About Us"/>
                    <NavDropdownMenu24 title="BOC & BOD"/>
                    <NavDropdownMenu24 title="Our Customers"/>
                    <NavDropdownMenu24 title="Certificate"/>
                    <NavDropdownMenu24 title="Awards & Achievements"/>
                </NavDropdown24>

                <NavDropdown24 id="dd-services" title="Our Services">
                    <NavDropdownMenu24 title="MRO Aero Engine"/>
                    <NavDropdownMenu24 title="PT NTP Aero Brochure"/>
                    <NavDropdownMenu24 title="MRO Industrial"/>
                    <NavDropdownMenu24 title="PT NTP Industrial Brochure"/>
                    <NavDropdownMenu24 title="Training"/>
                    <NavDropdownMenu24 title="Capabilities"/>
                    <NavDropdownMenu24 title="Field Services"/>
                </NavDropdown24>

                <NavDropdown24 id="dd-facilities" title="Facilities">
                    <NavDropdownMenu24 title="Our Facilities"/>
                    <NavDropdownMenu24 title="Explore Our Facility (VR Facility Tour)"/>
                </NavDropdown24>
                <NavMenu24 title="News Room"/>
                <NavMenu24 title="Procurement"/>
                <NavDropdown24 id="dd-contact" title="Contact">
                    <NavDropdownMenu24 title="Corporated Contact Info"/>
                    <NavDropdownMenu24 title="Sales & Marketing"/>
                </NavDropdown24>
                <NavMenu24 title="Career"/>
                
            </ul>
            </div>
        </div>
    </nav>
</template>
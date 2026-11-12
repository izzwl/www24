<template>
    <footer class="bg-[#172140] text-white pt-8 border-t border-gray-800">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
            
            <div class="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-6">
                <div class="mt-2 mb-6 md:mb-0">
                    <img width="500" src="/static/img/logo-white-alt.png">
                </div>

                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white transition group">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    
                    <a href="#" class="text-gray-400 hover:text-white transition">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>

                    <a href="#" class="text-gray-400 hover:text-white transition">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-12 text-sm">
                
                <div class="border-b border-gray-800 lg:border-none last:border-none">
                    <button class="w-full flex justify-between items-center py-4 lg:py-0 lg:cursor-default lg:pointer-events-none group" onclick="toggleAccordion('platforms-list', 'icon-platforms')">
                        <h3 class="text-white font-bold text-base lg:text-sm">Corporate</h3>
                        <svg id="icon-platforms" class="w-4 h-4 text-gray-400 transform transition-transform duration-200 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul id="platforms-list" class="hidden lg:block space-y-3 text-gray-400 pb-4 lg:pb-0 lg:mt-4">
                        <li><a href="#" class="hover:text-blue-400 hover:underline">About Us</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">BOD & BOC</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Our Customers</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Certificate</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Award & Achievements</a></li>
                    </ul>
                </div>

                <div class="border-b border-gray-800 lg:border-none">
                    <button class="w-full flex justify-between items-center py-4 lg:py-0 lg:cursor-default lg:pointer-events-none" onclick="toggleAccordion('tools-list', 'icon-tools')">
                        <h3 class="text-white font-bold text-base lg:text-sm">Our Services</h3>
                        <svg id="icon-tools" class="w-4 h-4 text-gray-400 transform transition-transform duration-200 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul id="tools-list" class="hidden lg:block space-y-3 text-gray-400 pb-4 lg:pb-0 lg:mt-4">
                        <li><a href="#" class="hover:text-blue-400 hover:underline">MRO Aero Engine</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">MRO Industrial</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Training</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Capabilities</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Field Services</a></li>
                    </ul>
                </div>

                <div class="border-b border-gray-800 lg:border-none">
                    <button class="w-full flex justify-between items-center py-4 lg:py-0 lg:cursor-default lg:pointer-events-none" onclick="toggleAccordion('buy-list', 'icon-buy')">
                        <h3 class="text-white font-bold text-base lg:text-sm">Facilities</h3>
                        <svg id="icon-buy" class="w-4 h-4 text-gray-400 transform transition-transform duration-200 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul id="buy-list" class="hidden lg:block space-y-3 text-gray-400 pb-4 lg:pb-0 lg:mt-4">
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Our Facilities</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">VR Facility Tour</a></li>
                    </ul>
                </div>

                <div class="border-b border-gray-800 lg:border-none">
                    <button class="w-full flex justify-between items-center py-4 lg:py-0 lg:cursor-default lg:pointer-events-none" onclick="toggleAccordion('comm-list', 'icon-comm')">
                        <h3 class="text-white font-bold text-base lg:text-sm">Contact</h3>
                        <svg id="icon-comm" class="w-4 h-4 text-gray-400 transform transition-transform duration-200 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul id="comm-list" class="hidden lg:block space-y-3 text-gray-400 pb-4 lg:pb-0 lg:mt-4">
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Corporate Contact</a></li>
                        <li><a href="#" class="hover:text-blue-400 hover:underline">Sales and Marketing</a></li>
                    </ul>
                </div>

                <div class="pt-6 lg:pt-0">
                    <h3 class="text-white font-bold mb-4 text-base lg:text-sm">About NTP</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>

                    <div class="grid grid-cols-2 gap-4 text-gray-400 mb-8">
                        <ul class="space-y-3">
                            <li><a href="#" class="hover:text-blue-400 hover:underline">Our company</a></li>
                            <li><a href="#" class="hover:text-blue-400 hover:underline">Customer success stories</a></li>
                            <li><a href="#" class="hover:text-blue-400 hover:underline">Newsroom</a></li>
                        </ul>
                        <ul class="space-y-3">
                            <li><a href="#" class="hover:text-blue-400 hover:underline">Career</a></li>
                            <li><a href="#" class="hover:text-blue-400 hover:underline">Procurement</a></li>
                        </ul>
                    </div>

<!--                     <div>
                        <h4 class="text-white font-bold mb-2 text-xs uppercase tracking-wider">Change page language</h4>
                        <div class="relative inline-block text-left w-full">
                            <button type="button" class="inline-flex justify-between items-center w-full rounded border border-gray-600 shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none">
                                <span class="flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    English
                                </span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                            </button>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="bg-[#121A33] mt-16 pt-8 pb-4 border-t border-gray-800">
             <div class="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-start gap-6">
                <div class="mt-1 opacity-80">
                  <img width="50" src="/static/img/logo-white.png">
                </div>
                <div class="flex flex-col text-xs text-gray-400 w-full">
                    <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
                        <a href="#" class="hover:text-white">About NTP</a>
                        <a href="#" class="hover:text-white">Career</a>
                        <a href="#" class="hover:text-white">Events</a>
                        <a href="#" class="hover:text-white">Locations</a>
                        <a href="#" class="hover:text-white">Contact NTP</a>
                        <a href="#" class="hover:text-white">NTP Newsroom</a>
                        <a href="#" class="hover:text-white">Inclusion at NTP</a>
                        <a href="#" class="hover:text-white">Cool Stuff</a>
                        <a href="#" class="hover:text-white">NTP Summit</a>
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                        <span>© 2026 PT. NUSANTARA TURBIN DAN PROPULSI</span>
                        <div class="flex flex-wrap gap-x-6 gap-y-2">
                            <a href="#" class="hover:text-white">Privacy statement</a>
                            <a href="#" class="hover:text-white">Terms of use</a>
                            <a href="#" class="hover:text-white">All policies and guidelines</a>
                            <a href="#" class="hover:text-white">Digital accessibility</a>
                            <a href="#" class="hover:text-white">Cookie preferences</a>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </footer>
</template>
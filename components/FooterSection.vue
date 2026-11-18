<template>
    <footer class="bg-[#172140] text-white pt-8 border-t border-gray-800">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
            
            <div class="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-6">
                <div class="mt-2 mb-6 md:mb-0">
                    <NuxtLink to="/">
                        <img width="500" src="/static/img/logo-white-alt.png" alt="PT Nusantara Turbin dan Propulsi">
                    </NuxtLink>
                </div>

                <div class="flex space-x-6">
                    <a href="https://instagram.com/ntpindonesia" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition group" title="Instagram">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    
                    <a href="https://twitter.com/ntpindonesia" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition" title="X (Twitter)">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>

                    <a href="https://www.youtube.com/@ntpindonesia" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition" title="YouTube">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-12 text-sm">
                
                <div class="border-b border-gray-800 lg:border-none last:border-none">
                    <button type="button" class="w-full flex justify-between items-center py-4 lg:py-0 lg:cursor-default lg:pointer-events-none group" @click="toggleAccordion('corporate')">
                        <h3 class="text-white font-bold text-base lg:text-sm">Corporate</h3>
                        <svg :class="['w-4 h-4 text-gray-400 transform transition-transform duration-200 lg:hidden', openSection === 'corporate' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul :class="['space-y-3 text-gray-400 pb-4 lg:pb-0 lg:mt-4', openSection === 'corporate' ? 'block' : 'hidden lg:block']">
                        <li><NuxtLink to="/corporate/about-us" class="hover:text-blue-400 hover:underline">About Us</NuxtLink></li>
                        <li><NuxtLink to="/corporate/bod-boc" class="hover:text-blue-400 hover:underline">BOD & BOC</NuxtLink></li>
                        <li><NuxtLink to="/corporate/our-customers" class="hover:text-blue-400 hover:underline">Our Customers</NuxtLink></li>
                        <li><NuxtLink to="/corporate/certificate" class="hover:text-blue-400 hover:underline">Certificate</NuxtLink></li>
                        <li><NuxtLink to="/corporate/awards-and-achievements" class="hover:text-blue-400 hover:underline">Award & Achievements</NuxtLink></li>
                    </ul>
                </div>

                <div class="border-b border-gray-800 lg:border-none">
                    <button type="button" class="w-full flex justify-between items-center py-4 lg:py-0 lg:cursor-default lg:pointer-events-none" @click="toggleAccordion('services')">
                        <h3 class="text-white font-bold text-base lg:text-sm">Our Services</h3>
                        <svg :class="['w-4 h-4 text-gray-400 transform transition-transform duration-200 lg:hidden', openSection === 'services' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul :class="['space-y-3 text-gray-400 pb-4 lg:pb-0 lg:mt-4', openSection === 'services' ? 'block' : 'hidden lg:block']">
                        <li><NuxtLink to="/our-services/mro-aero-engine" class="hover:text-blue-400 hover:underline">MRO Aero Engine</NuxtLink></li>
                        <li><NuxtLink to="/our-services/mro-industrial" class="hover:text-blue-400 hover:underline">MRO Industrial</NuxtLink></li>
                        <li><NuxtLink to="/training" class="hover:text-blue-400 hover:underline">Training</NuxtLink></li>
                        <li><NuxtLink to="/field-services" class="hover:text-blue-400 hover:underline">Field Services</NuxtLink></li>
                    </ul>
                </div>

                <div class="border-b border-gray-800 lg:border-none">
                    <button type="button" class="w-full flex justify-between items-center py-4 lg:py-0 lg:cursor-default lg:pointer-events-none" @click="toggleAccordion('facilities')">
                        <h3 class="text-white font-bold text-base lg:text-sm">Facilities</h3>
                        <svg :class="['w-4 h-4 text-gray-400 transform transition-transform duration-200 lg:hidden', openSection === 'facilities' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul :class="['space-y-3 text-gray-400 pb-4 lg:pb-0 lg:mt-4', openSection === 'facilities' ? 'block' : 'hidden lg:block']">
                        <li><NuxtLink to="/our-facilities" class="hover:text-blue-400 hover:underline">Our Facilities</NuxtLink></li>
                    </ul>
                </div>

                <div class="border-b border-gray-800 lg:border-none">
                    <button type="button" class="w-full flex justify-between items-center py-4 lg:py-0 lg:cursor-default lg:pointer-events-none" @click="toggleAccordion('contact')">
                        <h3 class="text-white font-bold text-base lg:text-sm">Contact</h3>
                        <svg :class="['w-4 h-4 text-gray-400 transform transition-transform duration-200 lg:hidden', openSection === 'contact' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul :class="['space-y-3 text-gray-400 pb-4 lg:pb-0 lg:mt-4', openSection === 'contact' ? 'block' : 'hidden lg:block']">
                        <li><NuxtLink to="/contact/contact-info" class="hover:text-blue-400 hover:underline">Corporate Contact</NuxtLink></li>
                        <li><NuxtLink to="/contact/sales-marketing" class="hover:text-blue-400 hover:underline">Sales and Marketing</NuxtLink></li>
                    </ul>
                </div>

                <div class="pt-6 lg:pt-0">
                    <h3 class="text-white font-bold mb-4 text-base lg:text-sm">About NTP</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-6">
                        PT Nusantara Turbin dan Propulsi (NTP) is an internationally certified MRO excellence center specializing in maintenance, repair, and overhaul of aero engines, industrial gas and steam turbines, and rotating equipment.
                    </p>

                    <div class="grid grid-cols-2 gap-4 text-gray-400 mb-8">
                        <ul class="space-y-3">
                            <li><NuxtLink to="/corporate/about-us" class="hover:text-blue-400 hover:underline">Our company</NuxtLink></li>
                            <li><NuxtLink to="/corporate/our-customers" class="hover:text-blue-400 hover:underline">Our customers</NuxtLink></li>
                            <li><NuxtLink to="/corporate/awards-and-achievements" class="hover:text-blue-400 hover:underline">Achievements</NuxtLink></li>
                        </ul>
                        <ul class="space-y-3">
                            <li><NuxtLink to="/career" class="hover:text-blue-400 hover:underline">Career</NuxtLink></li>
                            <li><NuxtLink to="/contact/contact-info" class="hover:text-blue-400 hover:underline">Contact us</NuxtLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-[#121A33] mt-16 pt-8 pb-4 border-t border-gray-800">
             <div class="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-start gap-6">
                <div class="mt-1 opacity-80">
                  <NuxtLink to="/">
                    <img width="50" src="/static/img/logo-white.png" alt="PT Nusantara Turbin dan Propulsi">
                  </NuxtLink>
                </div>
                <div class="flex flex-col text-xs text-gray-400 w-full">
                    <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
                        <NuxtLink to="/corporate/about-us" class="hover:text-white">About NTP</NuxtLink>
                        <NuxtLink to="/career" class="hover:text-white">Career</NuxtLink>
                        <NuxtLink to="/our-facilities" class="hover:text-white">Facilities</NuxtLink>
                        <NuxtLink to="/contact/contact-info" class="hover:text-white">Contact NTP</NuxtLink>
                        <NuxtLink to="/corporate/certificate" class="hover:text-white">Certificates</NuxtLink>
                        <NuxtLink to="/corporate/our-customers" class="hover:text-white">Customers</NuxtLink>
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                        <span>© 2026 PT. NUSANTARA TURBIN DAN PROPULSI &bull; Powered by Dept. MIS</span>
                        <div class="flex flex-wrap gap-x-6 gap-y-2">
                            <NuxtLink to="/corporate/about-us" class="hover:text-white">Corporate Profile</NuxtLink>
                            <NuxtLink to="/contact/sales-marketing" class="hover:text-white">Commercial Inquiries</NuxtLink>
                            <NuxtLink to="/contact/contact-info" class="hover:text-white">Official Office</NuxtLink>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const openSection = ref<string | null>(null);

const toggleAccordion = (name: string) => {
  openSection.value = openSection.value === name ? null : name;
};
</script>

<template>
    <div class="">
        <div class="">
            <Navbar24/>

            <HeaderSectionTest bg="bg-[url('/static/img/ntp-bg-old.jpg')]">
              <template #h1>CONTACT US</template>
            </HeaderSectionTest>

            <section class="py-12 px-12 bg-white">
              <div class="max-w-screen-xl mx-auto md:px-4 sm:px-6 lg:px-8">
                  
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
                      
                      <div class="bg-gray-100 p-8 rounded-lg shadow-sm">
                          <h2 class="text-2xl font-bold text-[#172140] mb-6">LEAVE A MESSAGE</h2>
                          
                          <form action="#" class="space-y-4">
                              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <input type="text" placeholder="Name" class="w-full bg-white border-none p-4 rounded text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
                                  <input type="email" placeholder="Email" class="w-full bg-white border-none p-4 rounded text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
                              </div>
                              
                              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <input type="text" placeholder="Subject" class="w-full bg-white border-none p-4 rounded text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
                                  <input type="text" placeholder="Phone" class="w-full bg-white border-none p-4 rounded text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
                              </div>
                              
                              <textarea rows="6" placeholder="Comment" class="w-full bg-white border-none p-4 rounded text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm resize-none"></textarea>
                              
                              <div>
                                  <button type="button" class="bg-[#172140] hover:bg-amber-500 text-white font-bold py-3 px-8 rounded transition duration-300">
                                      Send Message
                                  </button>
                              </div>
                          </form>
                      </div>

                      <div class="flex flex-col justify-center">
                          <div class="flex items-center gap-3 mb-4">
                              <span class="w-8 h-[2px] bg-[#1C284E]"></span>
                              <span class="text-[#1C284E] font-bold text-sm md:text-lg tracking-widest uppercase">Get In Touch</span>
                          </div>

                          <h1 class="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                              Contact Us Today
                          </h1>
                          
                          <p class="text-gray-500 mb-10 leading-relaxed md:text-lg">
                            You can send us message via form on the left or via the contact listed below.  
                          </p>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                              
                              <div>
                                  <h3 class="font-bold text-gray-900 md:text-2xl mb-4">Sales & Marketing</h3>
                                  <ul class="space-y-3 md:text-lg text-gray-500">
                                      <li class="flex items-center gap-3">
                                          <svg class="w-5 h-5 text-[#1C284E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                          <span>support@domain.com</span>
                                      </li>
                                      <li class="flex items-center gap-3">
                                          <svg class="w-5 h-5 text-[#1C284E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                          <span>(+62) 81 322 1467</span>
                                      </li>
                                      <li class="flex items-center gap-3">
                                          <svg class="w-5 h-5 text-[#1C284E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                          <span>09:00 AM - 22:00 PM</span>
                                      </li>
                                  </ul>
                              </div>

                              <div>
                                  <h3 class="font-bold text-gray-900 md:text-2xl mb-4">Corporate Contact</h3>
                                  <ul class="space-y-3 md:text-lg text-gray-500">
                                      <li class="flex items-center gap-3">
                                          <svg class="w-5 h-5 text-[#1C284E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                          <span>support@domain.com</span>
                                      </li>
                                      <li class="flex items-center gap-3">
                                          <svg class="w-5 h-5 text-[#1C284E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                          <span>(+62) 81 322 1467</span>
                                      </li>
                                      <li class="flex items-center gap-3">
                                          <svg class="w-5 h-5 text-[#1C284E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                          <span>09:00 AM - 22:00 PM</span>
                                      </li>
                                  </ul>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>

              <div>
                  <img 
                      src="/public/static/img/contact/maps-ntp.png" 
                      alt="Map Placeholder" 
                      class="md:px-12 mx-auto w-full max-w-screen-xl h-96 object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  >
              </div>
            </section>

            <FooterSection/>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout:'tw'
});
</script>
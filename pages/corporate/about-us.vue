<template>
  <div class="">
    <div class="">
      <Navbar24/>

      <HeaderSectionTest bg="bg-[url('/static/img/ntp-bg-old.jpg')]">
        <template #h1>ABOUT US</template>
      </HeaderSectionTest>

      <div class="py-24 px-12 min-h-96">
        <div class="grid gap-4 grids-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto">
          <div>
            <h1 class="mb-10 text-left text-3xl font-bold text-blue-950 md:text-4xl ">OUR JOURNEY</h1>
          </div>
          <div>
            <p>
              Established on June 23, 1998 in which formerly had been UMC-IPTN division founded on August 23, 1986. NTP Head Office/ Workshop is at Jl. Pajajaran 154 (KP.IV) Bandung 40174 INDONESIA, adjacent to Husein Sastranegara airport, Bandung-Indonesia.
              <br/><br/>
              PT Nusantara Turbin dan Propulsi (NTP), as a worldwide well-known company providing the maintenance business of aero engines and industrial turbines and servicing MRO market, operates with sophisticated equipment in an integrated MRO facility on area of 45.000 m2 , which is empowered by more than 300 highly competent, professional, and experienced employees.
            </p>
          </div>
        </div>
      </div>

      <div class="py-24 px-12 min-h-96 bg-[url('/static/img/bg-alt-eng.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
        <div class="grid gap-4 grids-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto">
          <div>
            <h1 class="mb-10 text-left text-3xl font-bold text-white md:text-4xl ">CORPORATE OVERVIEW</h1>
          </div>
          <div>
            <p class="text-white">
              PT Nusantara Turbin dan Propulsi (NTP) is a trusted excellence center leading in South East Asia in the field of engineering, maintenance, repair and overhaul of gas turbines and rotating equipment.
              Since the early establishment by the name of Universal Maintenance Center (UMC) a division of PT IPTN, NTP has been projected as a business of engineering, maintenance, repair and overhaul in the field of turbines and rotating equipment.
            </p>
          </div>
        </div>
      </div>

      <div class="py-24 px-12 min-h-96 border-b border-gray-200">
        <div class="grid gap-4 grids-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto">
          <div>
            <h1 class="mb-10 text-left text-3xl font-bold text-blue-950 md:text-4xl ">VISION</h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      <div class="py-24 px-12 min-h-96">
        <div class="grid gap-4 grids-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto">
          <div>
            <h1 class="mb-10 text-left text-3xl font-bold text-blue-950 md:text-4xl ">MISSION</h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>


      <FooterSection/>


    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout:'tw'
});

</script>
<template>
    <div class="">
        <div class="">
            <Navbar24/>
            
            <HeaderSection>
                <template #h2>about us</template>
                <template #h1>
                    the story<br/>
                    of our<span class="bg-amber-400 text-white pl-1 pr-2"> journey</span>
                </template>
            </HeaderSection>

            <SlideSideBySideSection bg="bg-[url('/static/img/ntp-bg-old.jpg')]" sideimage="bg-[url('/static/img/ntp-old.jpg')]">
                <template #h2>Our Journey</template>
                <template #p>
                    Established on June 23, 1998 in which formerly had been UMC-IPTN division founded on August 23, 1986. NTP Head Office/ Workshop is at Jl. Pajajaran 154 (KP.IV) Bandung 40174 INDONESIA, adjacent to Husein Sastranegara airport, Bandung-Indonesia.
                    <br/><br/>
                    PT Nusantara Turbin dan Propulsi (NTP), as a worldwide well-known company providing the maintenance business of aero engines and industrial turbines and servicing MRO market, operates with sophisticated equipment in an integrated MRO facility on area of 45.000 m2 , which is empowered by more than 300 highly competent, professional, and experienced employees.
                </template>
            </SlideSideBySideSection>

            <ContactSection/>

            <FooterSection/>

        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout:'tw'
});

</script>
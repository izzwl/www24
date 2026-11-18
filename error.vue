<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-amber-300 selection:text-blue-950">
    <!-- Navbar -->
    <Navbar24 />

    <!-- Main Content Container -->
    <main class="flex-grow flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <!-- Background subtle aviation/turbine grid decoration -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="background-image: radial-gradient(#172140 1px, transparent 1px); background-size: 24px 24px;"></div>
      
      <!-- Ambient Glow in NTP Navy & Amber Colors -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-blue-950/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="w-full max-w-4xl mx-auto z-10">
        <div class="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl p-6 sm:p-10 md:p-12 text-center transition-all">
          
          <!-- Status Badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
               :class="badgeClass">
            <span class="w-2 h-2 rounded-full animate-ping" :class="dotClass"></span>
            <span>{{ badgeText }}</span>
          </div>

          <!-- Hero Status Code -->
          <div class="relative mb-4">
            <h1 class="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-blue-950 select-none">
              {{ statusCode }}
            </h1>
            <div class="h-1.5 w-24 bg-gradient-to-r from-blue-950 via-amber-400 to-amber-500 mx-auto rounded-full mt-2 mb-6"></div>
          </div>

          <!-- Main Title & Description -->
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            {{ errorTitle }}
          </h2>
          <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {{ errorDescription }}
          </p>

          <!-- Primary Actions -->
          <div class="flex flex-wrap items-center justify-center gap-4 mb-10">
            <!-- Home button -->
            <button
              type="button"
              @click="handleNavigate('/')"
              class="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Kembali ke Beranda
            </button>

            <!-- Reload or Back button -->
            <button
              v-if="statusCode === 500"
              type="button"
              @click="reloadPage"
              class="inline-flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-semibold px-6 py-3.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Muat Ulang Halaman
            </button>

            <button
              v-else
              type="button"
              @click="goBack"
              class="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm active:scale-95 border border-slate-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Halaman Sebelumnya
            </button>

            <!-- Contact support -->
            <button
              type="button"
              @click="handleNavigate('/contact/contact-info')"
              class="inline-flex items-center justify-center gap-2 text-blue-900 hover:text-blue-950 hover:underline font-semibold px-4 py-3.5 text-xs sm:text-sm tracking-wide"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Hubungi NTP
            </button>
          </div>

          <!-- Quick Directory Links -->
          <div class="border-t border-slate-200/80 pt-8 mt-6">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Layanan & Informasi PT Nusantara Turbin dan Propulsi
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-left">
              <button
                type="button"
                @click="handleNavigate('/our-services/mro-aero-engine')"
                class="group p-3 rounded-lg border border-slate-200 hover:border-amber-400/80 bg-slate-50/50 hover:bg-amber-50/30 transition text-left"
              >
                <div class="text-xs font-bold text-slate-800 group-hover:text-blue-950">MRO Aero Engine</div>
                <div class="text-[11px] text-slate-500">Turbofan & Turboprop</div>
              </button>

              <button
                type="button"
                @click="handleNavigate('/our-services/mro-industrial')"
                class="group p-3 rounded-lg border border-slate-200 hover:border-amber-400/80 bg-slate-50/50 hover:bg-amber-50/30 transition text-left"
              >
                <div class="text-xs font-bold text-slate-800 group-hover:text-blue-950">MRO Industrial</div>
                <div class="text-[11px] text-slate-500">Gas & Steam Turbines</div>
              </button>

              <button
                type="button"
                @click="handleNavigate('/our-facilities')"
                class="group p-3 rounded-lg border border-slate-200 hover:border-amber-400/80 bg-slate-50/50 hover:bg-amber-50/30 transition text-left"
              >
                <div class="text-xs font-bold text-slate-800 group-hover:text-blue-950">Fasilitas NTP</div>
                <div class="text-[11px] text-slate-500">Workshop & Test Cell</div>
              </button>

              <button
                type="button"
                @click="handleNavigate('/career')"
                class="group p-3 rounded-lg border border-slate-200 hover:border-amber-400/80 bg-slate-50/50 hover:bg-amber-50/30 transition text-left"
              >
                <div class="text-xs font-bold text-slate-800 group-hover:text-blue-950">Karir</div>
                <div class="text-[11px] text-slate-500">Bergabung dengan Kami</div>
              </button>
            </div>
          </div>

          <!-- Technical Details (Collapsible for Debugging) -->
          <div v-if="error?.stack && isDev" class="mt-8 pt-6 border-t border-slate-200 text-left">
            <details class="text-xs text-slate-500">
              <summary class="cursor-pointer font-mono hover:text-slate-800 select-none">
                Detail Teknis (Mode Pengembang)
              </summary>
              <pre class="mt-3 p-4 bg-slate-900 text-slate-200 rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed max-h-60 overflow-y-auto">
{{ error.stack || error.message }}
              </pre>
            </details>
          </div>

        </div>
      </div>
    </main>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { initFlowbite } from 'flowbite';

interface CustomError {
  url?: string;
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  description?: string;
  data?: any;
  stack?: string;
}

const props = defineProps<{
  error?: CustomError;
}>();

const isDev = process.env.NODE_ENV === 'development';

const statusCode = computed(() => {
  const code = Number(props.error?.statusCode);
  return !isNaN(code) && code > 0 ? code : 404;
});

const badgeText = computed(() => {
  if (statusCode.value === 404) return 'Error 404 • Halaman Tidak Ditemukan';
  if (statusCode.value === 500) return 'Error 500 • Kendala Server Internal';
  if (statusCode.value === 403) return 'Error 403 • Akses Dibatasi';
  return `Error ${statusCode.value} • ${props.error?.statusMessage || 'Informasi Status'}`;
});

const badgeClass = computed(() => {
  if (statusCode.value === 404) return 'bg-amber-100 text-amber-900 border border-amber-300';
  if (statusCode.value === 500) return 'bg-rose-100 text-rose-900 border border-rose-300';
  if (statusCode.value === 403) return 'bg-purple-100 text-purple-900 border border-purple-300';
  return 'bg-blue-100 text-blue-900 border border-blue-300';
});

const dotClass = computed(() => {
  if (statusCode.value === 404) return 'bg-amber-500';
  if (statusCode.value === 500) return 'bg-rose-500';
  if (statusCode.value === 403) return 'bg-purple-500';
  return 'bg-blue-500';
});

const errorTitle = computed(() => {
  if (statusCode.value === 404) return 'Halaman Tidak Ditemukan';
  if (statusCode.value === 500) return 'Terjadi Kendala pada Sistem';
  if (statusCode.value === 403) return 'Akses Ditolak';
  return props.error?.statusMessage || props.error?.message || 'Terjadi Kesalahan';
});

const errorDescription = computed(() => {
  if (statusCode.value === 404) {
    return 'Mohon maaf, halaman yang Anda cari tidak tersedia, sudah dipindahkan ke alamat lain, atau tautan yang dimasukkan belum tepat.';
  }
  if (statusCode.value === 500) {
    return 'Sistem kami sedang mengalami kendala sementara saat memproses permintaan Anda. Tim kami telah mencatat kendala ini dan sedang memperbaikinya.';
  }
  if (statusCode.value === 403) {
    return 'Anda tidak memiliki hak akses atau kredensial yang memadai untuk membuka halaman atau direktori ini.';
  }
  return props.error?.message || 'Permintaan tidak dapat diselesaikan saat ini. Silakan kembali ke beranda atau hubungi tim kami.';
});

useHead({
  title: computed(() => `${statusCode.value} - ${errorTitle.value} | PT NTP`)
});

const handleNavigate = (path: string) => {
  clearError({ redirect: path });
};

const goBack = () => {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    window.history.back();
  } else {
    handleNavigate('/');
  }
};

const reloadPage = () => {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};

onMounted(() => {
  try {
    initFlowbite();
  } catch (e) {
    // ignore
  }
});
</script>

<style>
@import url("~/assets/css/base.css");
@import url("primeicons/primeicons.css");
@import url("~/assets/css/font.css");

body {
  font-family: "Lato", sans-serif !important;
}
</style>

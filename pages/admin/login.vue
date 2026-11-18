<template>
  <div class="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Decor Accent -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
      <!-- Logo & Brand Header -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block hover:opacity-90 transition">
          <img
            src="/static/img/Logo-stroke.png"
            alt="PT Nusantara Turbin dan Propulsi"
            class="h-12 mx-auto mb-3"
          />
        </NuxtLink>
        <h1 class="text-2xl font-extrabold text-white tracking-wide">
          NTP WEBSITE CMS
        </h1>
        <p class="mt-1 text-xs text-slate-400">
          Content Management System &bull; Portal Otorisasi
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-200/80">
        <div class="mb-6 border-b border-slate-100 pb-4">
          <h2 class="text-base font-bold text-blue-950">Masuk ke Panel Admin</h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Gunakan username dan password akun Portal Anda.
          </p>
        </div>

        <!-- Alert Error Message -->
        <div
          v-if="errorMessage"
          class="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2 animate-fadeIn"
        >
          <svg class="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span class="leading-relaxed">{{ errorMessage }}</span>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="username" class="block text-xs font-semibold text-slate-700 mb-1">
              Username
            </label>
            <div class="relative">
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                autocomplete="username"
                placeholder="Contoh: 150029"
                :disabled="isLoading"
                class="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-950 focus:border-blue-950 outline-none transition disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                autocomplete="current-password"
                placeholder="Masukkan password Anda"
                :disabled="isLoading"
                class="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-950 focus:border-blue-950 outline-none transition disabled:opacity-50"
              />
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-blue-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition duration-150 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <svg
                v-if="isLoading"
                class="animate-spin h-4 w-4 text-blue-950"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ isLoading ? 'Memverifikasi...' : 'Masuk ke CMS' }}</span>
            </button>
          </div>
        </form>

        <!-- Access Note -->
        <div class="mt-6 pt-4 border-t border-slate-100 text-center">
          <p class="text-[11px] text-slate-500 leading-relaxed">
            Otorisasi grup aktif: <strong class="text-blue-950 font-mono">cmswww24*</strong>.<br>
            Hanya user dengan hak akses grup terkait yang dapat mengelola konten.
          </p>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="text-center mt-6 text-xs text-slate-400 space-y-1">
        <p>&copy; {{ new Date().getFullYear() }} PT Nusantara Turbin dan Propulsi</p>
        <p class="text-[11px] text-slate-500">Powered by Dept. MIS</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: false
});

useHead({
  title: 'Admin Login | PT NTP CMS'
});

const form = ref({
  username: '',
  password: ''
});

const isLoading = ref(false);
const errorMessage = ref('');

// Cek apakah user sudah login sebelumnya
onMounted(async () => {
  try {
    const res: any = await $fetch('/api/auth/me');
    if (res && res.authenticated) {
      await navigateTo('/admin');
    }
  } catch {
    // Abaikan jika belum login
  }
});

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    errorMessage.value = 'Silakan isi username dan password.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: form.value.username,
        password: form.value.password
      }
    });

    if (res && res.success) {
      await navigateTo('/admin');
    } else {
      errorMessage.value = 'Login gagal. Silakan coba lagi.';
    }
  } catch (err: any) {
    const msg = err?.data?.statusMessage || err?.message || 'Login gagal. Periksa kembali username dan password Anda.';
    errorMessage.value = msg;
  } finally {
    isLoading.value = false;
  }
};
</script>

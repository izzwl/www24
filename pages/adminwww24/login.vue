<template>
  <div class="min-h-screen bg-white flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
    <div class="w-full max-w-[420px] mx-auto">
      
      <!-- Header: Logo beside "Welcome to Website CMS" -->
      <div class="flex items-center space-x-4 mb-4">
        <NuxtLink to="/" class="shrink-0 hover:opacity-90 transition">
          <img
            src="/static/img/Logo.png"
            alt="PT Nusantara Turbin dan Propulsi"
            class="h-12 w-auto object-contain"
          />
        </NuxtLink>
        <div>
          <span class="block text-xs sm:text-sm font-medium text-slate-600">
            Welcome to
          </span>
          <h1 class="text-xl sm:text-2xl font-bold text-[#0082c8] tracking-tight leading-tight">
            Website CMS
          </h1>
        </div>
      </div>

      <!-- Divider line -->
      <div class="border-b border-slate-200 mb-6"></div>

      <!-- Alert Error Message -->
      <div
        v-if="errorMessage"
        class="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2"
      >
        <svg class="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <span class="leading-relaxed">{{ errorMessage }}</span>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Username -->
        <div>
          <label for="username" class="block text-xs font-bold text-slate-700 mb-1.5">
            Username<span class="text-red-500 ml-0.5">*</span>
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            autocomplete="username"
            placeholder="Username akun Portal Anda"
            :disabled="isLoading"
            class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0082c8] focus:border-[#0082c8] transition text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-xs font-bold text-slate-700 mb-1.5">
            Password<span class="text-red-500 ml-0.5">*</span>
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="Password akun Portal Anda"
            :disabled="isLoading"
            class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0082c8] focus:border-[#0082c8] transition text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
          />
        </div>

        <!-- Security Verification -->
        <div>
          <label for="captcha" class="block text-xs font-bold text-slate-700 mb-1.5">
            Security Verification<span class="text-red-500 ml-0.5">*</span>
          </label>
          <div class="flex rounded-lg overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-[#0082c8] focus-within:border-[#0082c8]">
            <div
              @click="generateCaptcha"
              title="Klik untuk ganti pertanyaan matematika"
              class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-sm px-4 py-2.5 border-r border-slate-300 flex items-center justify-center select-none cursor-pointer transition shrink-0 min-w-[90px]"
            >
              {{ captchaQuestion }}
            </div>
            <input
              id="captcha"
              v-model="form.captchaAnswer"
              type="text"
              required
              autocomplete="off"
              placeholder="Jawaban angka"
              :disabled="isLoading"
              class="w-full px-3.5 py-2.5 text-sm bg-white focus:outline-none text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
            />
          </div>
          <p class="text-[11px] text-slate-500 mt-1.5 leading-normal">
            Solve the math calculation above to verify you are not a robot.
          </p>
        </div>

        <!-- Sign In Button -->
        <div class="pt-2">
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2.5 px-4 bg-[#0082c8] hover:bg-[#0070ad] active:bg-[#005f94] text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition duration-150 disabled:opacity-50 flex items-center justify-center space-x-1.5"
          >
            <svg
              v-if="isLoading"
              class="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>{{ isLoading ? 'Memverifikasi...' : 'Sign In →' }}</span>
          </button>
        </div>
      </form>

      <!-- Bottom Divider -->
      <div class="border-b border-slate-200 my-6"></div>

      <!-- Footer Info / Helpful Links -->
      <div class="text-center text-xs text-slate-500 space-y-1.5">
        <p>
          Gunakan akun Portal NTP dengan otorisasi <strong class="text-slate-700 font-mono">cmswww24*</strong>
        </p>
        <p class="text-[11px] text-slate-400">
          Butuh bantuan akses? <a href="/contact/contact-info" class="text-[#0082c8] hover:underline">Hubungi Dept. MIS</a>
          &bull;
          <NuxtLink to="/" class="text-[#0082c8] hover:underline">Buka Website NTP</NuxtLink>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: false
});

useHead({
  title: 'Admin Login | PT NTP CMS'
});

const form = ref({
  username: '',
  password: '',
  captchaAnswer: ''
});

const num1 = ref(6);
const num2 = ref(2);
const operator = ref('-');

const captchaQuestion = computed(() => `${num1.value} ${operator.value} ${num2.value} = ?`);

const correctAnswer = computed(() => {
  return operator.value === '+' ? num1.value + num2.value : num1.value - num2.value;
});

const generateCaptcha = () => {
  const ops = ['+', '-'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  operator.value = op;
  if (op === '+') {
    num1.value = Math.floor(Math.random() * 8) + 1;
    num2.value = Math.floor(Math.random() * 8) + 1;
  } else {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * (a - 1)) + 1;
    num1.value = a;
    num2.value = b;
  }
  form.value.captchaAnswer = '';
};

const isLoading = ref(false);
const errorMessage = ref('');

// Cek apakah user sudah login sebelumnya
onMounted(async () => {
  generateCaptcha();
  try {
    const res: any = await $fetch('/api/auth/me');
    if (res && res.authenticated) {
      await navigateTo('/adminwww24');
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

  // Verifikasi Security Calculation
  const parsedAnswer = parseInt(form.value.captchaAnswer.trim(), 10);
  if (isNaN(parsedAnswer) || parsedAnswer !== correctAnswer.value) {
    errorMessage.value = 'Security verification belum tepat. Silakan jawab perhitungan matematika dengan benar.';
    generateCaptcha();
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
      await navigateTo('/adminwww24');
    } else {
      errorMessage.value = 'Login gagal. Silakan coba lagi.';
      generateCaptcha();
    }
  } catch (err: any) {
    const msg = err?.data?.statusMessage || err?.message || 'Login gagal. Periksa kembali username dan password Anda.';
    errorMessage.value = msg;
    generateCaptcha();
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans">
    <!-- Top Header -->
    <header class="bg-blue-950 text-white px-6 py-4 flex flex-wrap items-center justify-between shadow-md sticky top-0 z-40">
      <div class="flex items-center space-x-3">
        <img src="/static/img/Logo.png" alt="NTP" class="h-8 brightness-0 invert" />
        <div>
          <h1 class="text-lg font-bold tracking-wider">NTP WEBSITE CMS</h1>
          <p class="text-xs text-blue-200">Editor Konten & Media Halaman Website</p>
        </div>
      </div>
      <div class="flex items-center space-x-3 mt-2 sm:mt-0">
        <div v-if="currentUser" class="text-right hidden sm:block mr-2">
          <span class="text-xs font-semibold block text-white">{{ currentUser.fullName }}</span>
          <span class="text-[10px] text-amber-300 block font-mono">
            @{{ currentUser.username }} &bull; {{ currentUser.groups?.join(', ') }}
          </span>
        </div>
        <a href="/" target="_blank" class="text-xs bg-blue-900 hover:bg-blue-800 text-white px-3 py-2 rounded transition">
          Buka Website &rarr;
        </a>
        <button
          v-if="activeSection === 'activityLogs'"
          @click="fetchLogs(selectedLogMonth)"
          :disabled="isLoadingLogs"
          class="text-xs font-semibold bg-blue-900 hover:bg-blue-800 text-white px-3 py-2 rounded transition flex items-center space-x-1"
        >
          <svg class="w-3.5 h-3.5 mr-1" :class="{ 'animate-spin': isLoadingLogs }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ isLoadingLogs ? 'Memuat Log...' : 'Refresh Log' }}</span>
        </button>
        <button
          v-else
          @click="saveCurrentSection"
          :disabled="isSaving"
          class="text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-blue-950 px-4 py-2 rounded shadow transition disabled:opacity-50"
        >
          {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
        <button
          @click="handleLogout"
          class="text-xs font-semibold bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded transition"
          title="Keluar dari Panel Admin"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Save Alert Banner -->
    <div v-if="saveMessage" class="px-6 py-2.5 bg-emerald-600 text-white text-xs font-medium text-center transition">
      {{ saveMessage }}
    </div>
    <div v-if="errorMessage" class="px-6 py-2.5 bg-red-600 text-white text-xs font-medium text-center transition">
      {{ errorMessage }}
    </div>

    <!-- Main Container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-6">
      <!-- Section Nav -->
      <aside class="w-full md:w-64 md:shrink-0 bg-white rounded-xl border border-slate-200 p-3 shadow-sm self-start">
        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 pt-1">
          Menu Sesuai Navbar
        </div>
        <nav class="space-y-0.5">
          <template v-for="sec in sections" :key="sec.key">
            <div
              v-if="sec.group"
              class="text-[10px] font-bold text-amber-600 uppercase tracking-wider pt-3 pb-1 px-3 border-t border-slate-100 first:border-0 first:pt-0"
            >
              {{ sec.group }}
            </div>
            <button
              @click="activeSection = sec.key"
              :class="[
                'w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-between',
                activeSection === sec.key ? 'bg-blue-950 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              ]"
            >
              <span>{{ sec.label }}</span>
              <span class="text-[10px] opacity-60">&rarr;</span>
            </button>
          </template>
        </nav>
        <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 px-3 flex items-center justify-between">
          <span>CMS v2.4</span>
          <span class="font-medium text-slate-500">Powered by Dept. MIS</span>
        </div>
      </aside>

      <!-- Content Editor Form -->
      <main class="flex-1 min-w-0 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div v-if="pending" class="text-center py-16 text-slate-500 text-sm">
          Memuat data konten...
        </div>

        <div v-else-if="content">
          <!-- 1. BERANDA (HOME) -->
          <div v-if="activeSection === 'home'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Beranda (Home)</h2>
              <p class="text-xs text-slate-500">Edit slide carousel utama dan teks pembuka website</p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 class="text-sm font-bold text-blue-950">Slide Carousel Utama</h3>
                  <p class="text-xs text-slate-500">Maksimal 5 slide. Atur mana yang aktif/ditampilkan dan link tujuannya.</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                    {{ content.home.slides ? content.home.slides.length : 0 }} / 5 Slide
                  </span>
                  <button
                    @click="addSlide"
                    :disabled="content.home.slides && content.home.slides.length >= 5"
                    class="text-xs font-bold bg-blue-950 hover:bg-blue-900 text-white px-3 py-1.5 rounded disabled:opacity-40 transition"
                  >
                    + Tambah Slide
                  </button>
                </div>
              </div>

              <div
                v-for="(slide, sIdx) in content.home.slides"
                :key="sIdx"
                :class="[
                  'p-4 rounded-xl border transition space-y-3',
                  slide.active ? 'border-slate-300 bg-white shadow-sm' : 'border-slate-200 bg-slate-100/70 opacity-75'
                ]"
              >
                <!-- Slide Header: Number + Active Toggle + Remove -->
                <div class="flex items-center justify-between border-b pb-2">
                  <div class="flex items-center space-x-3">
                    <span class="text-xs font-black px-2 py-0.5 rounded bg-blue-950 text-white">
                      Slide {{ sIdx + 1 }}
                    </span>
                    <label class="flex items-center space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        v-model="slide.active"
                        class="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
                      />
                      <span
                        :class="[
                          'text-xs font-bold uppercase tracking-wider',
                          slide.active ? 'text-emerald-700' : 'text-slate-400'
                        ]"
                      >
                        {{ slide.active ? 'Aktif (Ditampilkan)' : 'Nonaktif (Disembunyikan)' }}
                      </span>
                    </label>
                  </div>

                  <button
                    v-if="content.home.slides.length > 1"
                    @click="removeSlide(sIdx)"
                    class="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 hover:bg-red-50 rounded transition"
                  >
                    Hapus Slide
                  </button>
                </div>

                <!-- Titles -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="text-[11px] text-slate-500 block mb-0.5">Judul Baris 1</label>
                    <input v-model="slide.title1" class="w-full p-2 border rounded text-xs font-bold" />
                  </div>
                  <div>
                    <label class="text-[11px] text-slate-500 block mb-0.5">Judul Baris 2 (Highlight Kuning)</label>
                    <input v-model="slide.title2" class="w-full p-2 border rounded text-xs font-bold text-amber-600" />
                  </div>
                </div>

                <!-- Subtitle -->
                <div>
                  <label class="text-[11px] text-slate-500 block mb-0.5">Subjudul / Deskripsi</label>
                  <textarea v-model="slide.subtitle" rows="2" class="w-full p-2 border rounded text-xs"></textarea>
                </div>

                <!-- Button & Link Settings with Dropdown -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <label class="text-[11px] text-slate-600 font-semibold block mb-0.5">Teks Tombol (Button Text)</label>
                    <input v-model="slide.buttonText" placeholder="Contoh: Explore Our Services" class="w-full p-2 border rounded text-xs font-medium" />
                  </div>
                  <div>
                    <label class="text-[11px] text-slate-600 font-semibold block mb-0.5">Tujuan Halaman (Dropdown Halaman)</label>
                    <select v-model="slide.link" class="w-full p-2 border rounded text-xs bg-white font-medium text-slate-800 outline-none">
                      <option v-for="page in availablePages" :key="page.value" :value="page.value">
                        {{ page.label }}
                      </option>
                    </select>
                    <div class="mt-1 flex items-center gap-1">
                      <span class="text-[10px] text-slate-400">Atau ketik custom link:</span>
                      <input v-model="slide.link" placeholder="Custom URL / path" class="flex-1 px-1.5 py-0.5 border rounded text-[10px] font-mono text-slate-600" />
                    </div>
                  </div>
                </div>

                <!-- Image -->
                <div class="flex items-center gap-2">
                  <div class="flex-1">
                    <label class="text-[11px] text-slate-500 block mb-0.5">Gambar Background Slide</label>
                    <input v-model="slide.image" class="w-full p-2 border rounded text-xs font-mono" />
                  </div>
                  <button
                    @click="openMediaPicker(slide, 'image')"
                    class="mt-4 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded transition"
                  >
                    Pilih / Upload
                  </button>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <h3 class="text-sm font-bold text-blue-950">Section "About Us" Singkat di Beranda</h3>
              <div>
                <label class="text-[11px] text-slate-500 block mb-0.5">Judul</label>
                <input v-model="content.home.aboutBrief.title" class="w-full p-2 border rounded text-xs font-bold" />
              </div>
              <div>
                <label class="text-[11px] text-slate-500 block mb-0.5">Paragraf</label>
                <textarea v-model="content.home.aboutBrief.subtitle" rows="3" class="w-full p-2 border rounded text-xs"></textarea>
              </div>
            </div>
          </div>

          <!-- 2. ABOUT US -->
          <div v-else-if="activeSection === 'aboutUs'" class="space-y-6">
            <AdminHeaderBanner
              v-if="content.aboutUs"
              :target="content.aboutUs"
              default-title="ABOUT US"
              @open-media-picker="openMediaPicker"
            />

            <AdminAboutSections
              v-if="content.aboutUs"
              :sections="content.aboutUs.sections || []"
              @open-media-picker="onMroOpenMediaPicker"
              @direct-upload="onMroDirectUpload"
            />
          </div>

          <!-- 3. BOD & BOC -->
          <div v-else-if="activeSection === 'bodBoc'" class="space-y-6">
            <AdminHeaderBanner
              v-if="content.bodBoc"
              :target="content.bodBoc"
              default-title="BOD AND BOC"
              @open-media-picker="openMediaPicker"
            />

            <!-- Manajemen Section & Pejabat (Bisa Re-arrange Intro & Pejabat, Tambah Intro & Tambah Pejabat) -->
            <AdminBodBocSections
              v-if="content.bodBoc"
              :sections="content.bodBoc.sections || []"
              @open-media-picker="onMroOpenMediaPicker"
              @direct-upload="onMroDirectUpload"
            />
          </div>

          <!-- 4. CUSTOMERS -->
          <div v-else-if="activeSection === 'customers'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Customers & Global Expansion</h2>
              <p class="text-xs text-slate-500">Edit statistik dan daftar customer Aero & Turbine</p>
            </div>

            <AdminHeaderBanner
              v-if="content.customers"
              :target="content.customers"
              default-title="OUR CUSTOMERS"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.customers"
              :target="content.customers"
              default-badge="Global Reach"
              default-title="NTP Aero Customer Expansion"
              default-description="Our customers are large international and domestic aviation or military aviation entities demanding total compliance with authority codes and optimal operational execution."
            />

            <!-- Market Presence, Metrics & World Map (Core Identity Style) -->
            <div v-if="content.customers" class="p-4 border rounded-xl bg-slate-50 space-y-4">
              <div class="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 class="text-xs font-bold text-blue-950 uppercase tracking-wider">
                    Market Presence, Metrik & World Map
                  </h3>
                  <p class="text-[11px] text-slate-500">Teks kiri, dua card metrik di kanan, dan gambar full-width map di bawahnya</p>
                </div>
              </div>

              <!-- Left Side Content -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-semibold text-slate-700 block mb-1">Badge (Kiri)</label>
                  <input
                    v-model="content.customers.marketPresenceBadge"
                    placeholder="Contoh: Market Presence"
                    class="w-full p-2 border rounded text-xs font-semibold"
                  />
                </div>
                <div>
                  <label class="text-xs font-semibold text-slate-700 block mb-1">Judul Utama (Kiri)</label>
                  <input
                    v-model="content.customers.marketPresenceTitle"
                    placeholder="Contoh: International MRO Partner Network"
                    class="w-full p-2 border rounded text-xs font-bold text-blue-950"
                  />
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-700 block mb-1">Deskripsi Tambahan (Kiri, Opsional)</label>
                <textarea
                  v-model="content.customers.marketPresenceDescription"
                  rows="2"
                  placeholder="Deskripsi singkat market presence..."
                  class="w-full p-2 border rounded text-xs"
                ></textarea>
              </div>

              <!-- Right Side Metric Cards -->
              <div class="p-3 bg-white border rounded-lg space-y-3">
                <span class="text-xs font-bold text-slate-700 block">Dua Card Metrik (Kanan)</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Card 1 -->
                  <div class="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                    <span class="text-[11px] font-bold text-amber-600 block">Card 1</span>
                    <div>
                      <label class="text-[11px] text-slate-500 block mb-0.5">Nilai Metrik</label>
                      <input
                        v-if="content.customers.stats"
                        v-model="content.customers.stats.countries"
                        placeholder="30++"
                        class="w-full p-1.5 border rounded text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label class="text-[11px] text-slate-500 block mb-0.5">Label Keterangan</label>
                      <input
                        v-if="content.customers.stats"
                        v-model="content.customers.stats.countriesLabel"
                        placeholder="Customer Countries"
                        class="w-full p-1.5 border rounded text-xs"
                      />
                    </div>
                  </div>

                  <!-- Card 2 -->
                  <div class="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                    <span class="text-[11px] font-bold text-amber-600 block">Card 2</span>
                    <div>
                      <label class="text-[11px] text-slate-500 block mb-0.5">Nilai Metrik</label>
                      <input
                        v-if="content.customers.stats"
                        v-model="content.customers.stats.exportShare"
                        placeholder="59%"
                        class="w-full p-1.5 border rounded text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label class="text-[11px] text-slate-500 block mb-0.5">Label Keterangan</label>
                      <input
                        v-if="content.customers.stats"
                        v-model="content.customers.stats.exportShareLabel"
                        placeholder="Export Customer Share"
                        class="w-full p-1.5 border rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Section Background Image (Core Identity Blue Style) -->
              <div class="p-3 bg-white border rounded-lg space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold text-slate-700 block">Latar Belakang Biru Section (Default: /static/img/bg-alt-eng.jpg)</label>
                  <span class="text-[11px] text-slate-400">Overlay Biru Tua Core Identity (bg-blue-950/85)</span>
                </div>
                <div class="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    v-model="content.customers.mapSectionBg"
                    placeholder="/static/img/bg-alt-eng.jpg"
                    class="flex-1 p-2 border rounded text-xs font-mono w-full"
                  />
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      @click="openMediaPicker(content.customers, 'mapSectionBg')"
                      class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded transition whitespace-nowrap"
                    >
                      Pilih Media
                    </button>
                    <label class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded cursor-pointer transition whitespace-nowrap">
                      <span>Upload Baru</span>
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="(e) => handleDirectUpload(e, content.customers, 'mapSectionBg')"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <!-- World Map Image (2:1 Ratio - Fill) -->
              <div class="p-3 bg-white border rounded-lg space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold text-slate-700 block">Gambar Map / Holder Image</label>
                  <span class="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Rasio 2:1 (Lebar 2, Tinggi 1) - Fill
                  </span>
                </div>

                <div class="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    v-model="content.customers.mapImage"
                    placeholder="/static/img/holder.jpg"
                    class="flex-1 p-2 border rounded text-xs font-mono w-full"
                  />
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      @click="openMediaPicker(content.customers, 'mapImage')"
                      class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded transition whitespace-nowrap"
                    >
                      Pilih Media
                    </button>
                    <label class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded cursor-pointer transition whitespace-nowrap">
                      <span>Upload Baru</span>
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="(e) => handleDirectUpload(e, content.customers, 'mapImage')"
                      />
                    </label>
                  </div>
                </div>

                <!-- Opsi Mode Tampilan Fill / Contain -->
                <div class="flex items-center gap-4 text-xs pt-1">
                  <span class="text-slate-500 font-medium">Mode Tampilan:</span>
                  <label class="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-blue-950">
                    <input
                      type="radio"
                      v-model="content.customers.mapImageFit"
                      value="cover"
                      class="text-blue-950 focus:ring-blue-950"
                    />
                    <span>Fill (Cover - Isi Penuh Rasio 2:1)</span>
                  </label>
                  <label class="inline-flex items-center gap-1.5 cursor-pointer text-slate-600">
                    <input
                      type="radio"
                      v-model="content.customers.mapImageFit"
                      value="contain"
                      class="text-blue-950 focus:ring-blue-950"
                    />
                    <span>Fit (Contain - Skala Proporsional)</span>
                  </label>
                </div>

                <!-- Preview Gambar dengan Rasio 2:1 -->
                <div v-if="content.customers.mapImage" class="mt-2 p-2 bg-slate-100 rounded border flex items-center gap-3">
                  <div class="w-32 aspect-[2/1] rounded overflow-hidden bg-slate-900 border shrink-0 flex items-center justify-center">
                    <img
                      :src="content.customers.mapImage"
                      alt="Map Preview"
                      :class="['w-full h-full', content.customers.mapImageFit === 'contain' ? 'object-contain' : 'object-cover']"
                    />
                  </div>
                  <div class="text-xs text-slate-500 truncate space-y-0.5">
                    <div class="font-mono text-slate-700 truncate">{{ content.customers.mapImage }}</div>
                    <div class="text-[11px] text-slate-400">Preview frame aspek rasio 2:1 (Lebar 2, Tinggi 1)</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Manajemen Section Gambar Customer / Partner Network (Reusable) -->
            <AdminImageGridSections
              v-if="content.customers"
              :sections="content.customers.sections"
              title="Customer & Partner Network - Manajemen Section Gambar"
              item-label="Customer / Partner"
              @open-media-picker="onMroOpenMediaPicker"
              @direct-upload="onMroDirectUpload"
            />
          </div>

          <!-- 5. CERTIFICATES -->
          <div v-else-if="activeSection === 'certificate'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Sertifikasi</h2>
              <p class="text-xs text-slate-500">Atur kelompok sertifikasi Airworthiness, OEM, QMS, dan Industrial</p>
            </div>

            <AdminHeaderBanner
              v-if="content.certificate"
              :target="content.certificate"
              default-title="CERTIFICATIONS"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.certificate"
              :target="content.certificate"
              default-badge="Global Standards"
              default-title="Certifications & Accreditations"
              default-description="Internationally recognized airworthiness authorizations, OEM approvals, and quality management systems assuring total flight and industrial safety compliance."
            />

            <!-- Manajemen Section Gambar Sertifikasi (Reusable) -->
            <AdminImageGridSections
              v-if="content.certificate"
              :sections="content.certificate.sections || content.certificate.groups"
              title="Sertifikasi - Manajemen Section Gambar"
              item-label="Sertifikat / Approval"
              @open-media-picker="onMroOpenMediaPicker"
              @direct-upload="onMroDirectUpload"
            />
          </div>

          <!-- 6. AWARDS & ACHIEVEMENTS -->
          <div v-else-if="activeSection === 'awards'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Awards and Achievements</h2>
              <p class="text-xs text-slate-500">Kelola daftar penghargaan dan milestone perusahaan</p>
            </div>

            <AdminHeaderBanner
              v-if="content.awards"
              :target="content.awards"
              default-title="AWARDS AND ACHIEVEMENTS"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.awards"
              :target="content.awards"
              default-badge="Track Record"
              default-title="AWARDS AND ACHIEVEMENTS"
              default-description="Recognitions of excellence in aerospace engineering, industrial maintenance, and safety reliability over 30 years of continuous operation."
            />

            <!-- Manajemen Milestone & Penghargaan (Tambah, Urutkan, Hapus, Aktif/Nonaktif) -->
            <AdminAwardsMilestones
              v-if="content.awards"
              :items="content.awards.items"
            />
          </div>

          <!-- 7. MRO AERO ENGINE -->
          <div v-else-if="activeSection === 'aeroEngine'" class="space-y-6">
            <AdminMroSections
              v-if="content.aeroEngine"
              :sections="content.aeroEngine.sections || []"
              title="MRO Aero Engine - Manajemen Section"
              @open-media-picker="onMroOpenMediaPicker"
              @direct-upload="onMroDirectUpload"
            />
          </div>

          <!-- 8. MRO INDUSTRIAL -->
          <div v-else-if="activeSection === 'industrial'" class="space-y-6">
            <AdminMroSections
              v-if="content.industrial"
              :sections="content.industrial.sections || []"
              title="MRO Industrial - Manajemen Section"
              @open-media-picker="onMroOpenMediaPicker"
              @direct-upload="onMroDirectUpload"
            />
          </div>

          <!-- 9. TRAINING SERVICES -->
          <div v-else-if="activeSection === 'training'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Training Services</h2>
              <p class="text-xs text-slate-500">Edit program pelatihan & sertifikasi teknis turbomachinery</p>
            </div>

            <AdminHeaderBanner
              v-if="content.training"
              :target="content.training"
              default-title="TRAINING SERVICES"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.training"
              :target="content.training"
              default-badge="Workforce & Technical Mastery"
              default-title="Aero Engine & Industrial Turbomachinery Training Programs"
              default-description="Empowering aerospace and heavy industry engineers with hands-on technical competencies, maintenance certifications, and advanced diagnostic training conducted by certified NTP instructors."
            />

            <!-- Manajemen Card List Training (Tambah, Urutkan, Hapus, Upload/Picker) -->
            <AdminCardList
              v-if="content.training"
              :items="content.training.items"
              title="Daftar Program Training & Sertifikasi"
              item-label="Program Training"
              default-tag="Certified MRO Training"
              default-image="/static/img/services/industrial01.jpg"
              @open-media-picker="onMroOpenMediaPicker"
              @direct-upload="onMroDirectUpload"
            />
          </div>

          <!-- 10. FIELD SERVICES -->
          <div v-else-if="activeSection === 'fieldServices'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Field Services</h2>
              <p class="text-xs text-slate-500">Edit kapabilitas on-site (Overhaul, Coating, Inspection, Borescope, NDI)</p>
            </div>

            <AdminHeaderBanner
              v-if="content.fieldServices"
              :target="content.fieldServices"
              default-title="FIELD SERVICES"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.fieldServices"
              :target="content.fieldServices"
              default-badge="Global On-Site Support"
              default-title="Industrial Turbine Services: Field Services Capabilities"
              default-description="NTP provides responsive on-site engineering services, field overhauls, advanced inspections, and non-destructive examination directly at client operating sites worldwide."
            />

            <!-- Manajemen Card List Field Services (Tambah, Urutkan, Hapus, Upload/Picker) -->
            <AdminCardList
              v-if="content.fieldServices"
              :items="content.fieldServices.items"
              title="Daftar Layanan Field Services"
              item-label="Layanan"
              default-tag="Certified NTP Field Team"
              default-image="/static/img/services/industrial01.jpg"
              @open-media-picker="onMroOpenMediaPicker"
              @direct-upload="onMroDirectUpload"
            />
          </div>

          <!-- 11. FACILITIES -->
          <div v-else-if="activeSection === 'facilities'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Facilities (12 Langkah Workflow)</h2>
              <p class="text-xs text-slate-500">Sesuai alur workflow slide 7</p>
            </div>

            <AdminHeaderBanner
              v-if="content.facilities"
              :target="content.facilities"
              default-title="OUR FACILITIES"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.facilities"
              :target="content.facilities"
              default-badge="Workshop & Workflow"
              default-title="Workshop Facilities & Capability Workflow"
              default-description="With a 45,000 m² integrated plant area and state-of-the-art specialized equipment, NTP executes comprehensive overhauls and testing for engines and industrial equipment."
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="(step, sIdx) in content.facilities.steps" :key="sIdx" class="p-3 border rounded-xl bg-slate-50 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-blue-950 text-white text-xs flex items-center justify-center font-bold">
                    {{ step.step }}
                  </span>
                  <input v-model="step.name" class="flex-1 p-1 border rounded text-xs font-semibold" />
                </div>
                <div class="flex gap-2">
                  <input v-model="step.image" placeholder="Image Path" class="flex-1 p-1 border rounded text-xs font-mono" />
                  <button @click="openMediaPicker(step, 'image')" class="px-2 py-1 bg-slate-200 text-xs font-bold rounded">Pilih</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 12. CORPORATE CONTACT -->
          <div v-else-if="activeSection === 'contactInfo'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Corporate Contact Info</h2>
              <p class="text-xs text-slate-500">Alamat kantor, telepon, email, dan gambar peta</p>
            </div>

            <AdminHeaderBanner
              v-if="content.contactInfo"
              :target="content.contactInfo"
              default-title="CONTACT US"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.contactInfo"
              :target="content.contactInfo"
              default-badge="Official Channels"
              default-title="Contact Us Today"
              default-description="We are ready to provide technical consultation, quote estimations, and scheduling for your engine assets."
              desc-key="subtitle"
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-slate-600 block mb-1">Judul Halaman</label>
                <input v-model="content.contactInfo.title" class="w-full p-2 border rounded text-sm font-bold" />
              </div>
              <div>
                <label class="text-xs text-slate-600 block mb-1">Telepon</label>
                <input v-model="content.contactInfo.phone" class="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label class="text-xs text-slate-600 block mb-1">Email</label>
                <input v-model="content.contactInfo.email" class="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label class="text-xs text-slate-600 block mb-1">Jam Operasional</label>
                <input v-model="content.contactInfo.hours" class="w-full p-2 border rounded text-sm" />
              </div>
            </div>
            <div>
              <label class="text-xs text-slate-600 block mb-1">Alamat Kantor / Workshop</label>
              <textarea v-model="content.contactInfo.address" rows="2" class="w-full p-2 border rounded text-xs"></textarea>
            </div>
            <div>
              <label class="text-xs text-slate-600 block mb-1">Gambar Peta</label>
              <div class="flex gap-2">
                <input v-model="content.contactInfo.mapImage" class="flex-1 p-2 border rounded text-xs font-mono" />
                <button @click="openMediaPicker(content.contactInfo, 'mapImage')" class="px-3 py-1 bg-slate-200 text-xs font-bold rounded">Pilih</button>
              </div>
            </div>
          </div>

          <!-- 13. SALES & MARKETING -->
          <div v-else-if="activeSection === 'salesMarketing'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Sales & Marketing Division</h2>
              <p class="text-xs text-slate-500">Kontak divisi komersial aero dan industri</p>
            </div>

            <AdminHeaderBanner
              v-if="content.salesMarketing"
              :target="content.salesMarketing"
              default-title="SALES & MARKETING"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.salesMarketing"
              :target="content.salesMarketing"
              default-badge="Commercial Inquiries"
              default-title="SALES & MARKETING DIVISION"
              default-description="Get in direct touch with our specialized commercial teams for Aero Engine MRO and Industrial Turbine Maintenance solutions."
            />

            <div class="space-y-4">
              <div v-for="(team, tIdx) in content.salesMarketing.teams" :key="tIdx" class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <input v-model="team.sector" class="w-full p-2 border rounded text-sm font-bold text-blue-950" />
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="text-[11px] text-slate-500 block">Email</label>
                    <input v-model="team.email" class="w-full p-1.5 border rounded text-xs font-semibold" />
                  </div>
                  <div>
                    <label class="text-[11px] text-slate-500 block">Telepon / Ext</label>
                    <input v-model="team.phone" class="w-full p-1.5 border rounded text-xs" />
                  </div>
                </div>
                <div>
                  <label class="text-[11px] text-slate-500 block">Deskripsi Lingkup</label>
                  <textarea v-model="team.description" rows="2" class="w-full p-1.5 border rounded text-xs"></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- 14. CAREER -->
          <div v-else-if="activeSection === 'career'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Karir (Career)</h2>
              <p class="text-xs text-slate-500">Kelola banner header dan info lowongan kerja</p>
            </div>

            <AdminHeaderBanner
              v-if="content.career"
              :target="content.career"
              default-title="CAREER"
              @open-media-picker="openMediaPicker"
            />

            <AdminSectionIntro
              v-if="content.career"
              :target="content.career"
              default-badge="Work With Us"
              default-title="OUR OPEN ROLES"
              default-description="Discover exciting career opportunities at PT. NTP and join our talented and passionate team. Explore our current openings below and find the perfect role to showcase your skills and experiences."
            />

            <!-- Pengaturan Endpoint API Recruitment -->
            <div v-if="content.career" class="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div class="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 class="text-sm font-bold text-blue-950 flex items-center space-x-2">
                    <span>Pengaturan Endpoint API Lowongan Kerja (Recruitment API)</span>
                    <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Server-Side Request</span>
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5">
                    URL endpoint penyedia daftar lowongan kerja rekrutmen. Permintaan data diproses di sisi server (Server-Side Request) demi keamanan dan mencegah kendala CORS.
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">
                  URL Endpoint API Recruitment
                </label>
                <div class="flex flex-col sm:flex-row gap-2">
                  <input
                    v-model="content.career.apiUrl"
                    type="text"
                    placeholder="Contoh: http://127.0.0.1:8003/recruitment-api/list_jobvacan"
                    class="flex-1 p-2.5 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-950"
                  />
                  <button
                    type="button"
                    @click="testCareerApi"
                    :disabled="isTestingApi"
                    class="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50 flex items-center justify-center space-x-1.5 shrink-0"
                  >
                    <svg v-if="isTestingApi" class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{{ isTestingApi ? 'Menguji...' : 'Uji Koneksi Server-Side' }}</span>
                  </button>
                </div>
                <p class="text-[11px] text-slate-400 mt-1">
                  Default: <code class="bg-slate-200 px-1 py-0.5 rounded text-slate-700">http://127.0.0.1:8003/recruitment-api/list_jobvacan</code>
                </p>
              </div>

              <!-- Hasil Test API Banner -->
              <div
                v-if="apiTestResult"
                :class="[
                  'p-3.5 rounded-xl text-xs border flex items-start space-x-2',
                  apiTestResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-700'
                ]"
              >
                <div class="mt-0.5 shrink-0 font-bold">
                  {{ apiTestResult.success ? '✓' : '✕' }}
                </div>
                <div class="flex-1">
                  <div class="font-bold">{{ apiTestResult.message }}</div>
                  <div v-if="apiTestResult.count !== undefined" class="text-[11px] mt-0.5">
                    Status: Server Nuxt berhasil mengambil <strong>{{ apiTestResult.count }}</strong> lowongan kerja aktif dari endpoint tersebut.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 15. GLOBAL FOOTER & QUICK CONTACT -->
          <div v-else-if="activeSection === 'contact'" class="space-y-6">
            <div class="border-b pb-3">
              <h2 class="text-xl font-bold text-blue-950">Global Footer & Quick Contact Banner</h2>
              <p class="text-xs text-slate-500">Banner kontak yang muncul di seluruh bagian bawah halaman</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-slate-600 block mb-1">Email Resmi</label>
                <input v-model="content.contact.email" class="w-full p-2 border rounded text-sm font-semibold" />
              </div>
              <div>
                <label class="text-xs text-slate-600 block mb-1">Website URL</label>
                <input v-model="content.contact.web" class="w-full p-2 border rounded text-sm font-semibold" />
              </div>
              <div>
                <label class="text-xs text-slate-600 block mb-1">Instagram</label>
                <input v-model="content.contact.instagram" class="w-full p-2 border rounded text-sm font-semibold" />
              </div>
              <div>
                <label class="text-xs text-slate-600 block mb-1">Telepon</label>
                <input v-model="content.contact.phone" class="w-full p-2 border rounded text-sm font-semibold" />
              </div>
            </div>
          </div>

          <!-- 16. RIWAYAT PERUBAHAN (AUDIT LOGS) -->
          <div v-else-if="activeSection === 'activityLogs'" class="space-y-6">
            <div class="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 class="text-xl font-bold text-blue-950 flex items-center space-x-2">
                  <span>Riwayat Perubahan Data (Audit Log)</span>
                  <span class="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                    Auto Monthly File Rotation
                  </span>
                </h2>
                <p class="text-xs text-slate-500 mt-1">
                  Pencatatan riwayat setiap aksi simpan konten dan upload media yang dilakukan oleh user berwenang.
                </p>
              </div>

              <!-- Month Selector & Refresh -->
              <div class="flex items-center space-x-2">
                <div class="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                  <label class="text-[11px] font-bold text-slate-600 px-1">Periode:</label>
                  <select
                    v-model="selectedLogMonth"
                    @change="onSelectMonthChange"
                    class="bg-white text-xs font-semibold text-slate-800 border border-slate-300 rounded px-2.5 py-1 focus:ring-1 focus:ring-blue-950"
                  >
                    <option v-for="m in availableLogMonths" :key="m" :value="m">
                      Bulan {{ m }}
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  @click="fetchLogs(selectedLogMonth)"
                  :disabled="isLoadingLogs"
                  class="text-xs bg-blue-950 hover:bg-blue-900 text-white font-semibold px-3 py-2 rounded transition flex items-center space-x-1 disabled:opacity-50"
                  title="Muat ulang log"
                >
                  <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': isLoadingLogs }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{{ isLoadingLogs ? 'Memuat...' : 'Refresh' }}</span>
                </button>
              </div>
            </div>

            <!-- Summary Stats Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div class="text-[11px] font-bold text-blue-900 uppercase tracking-wider">Total Aktivitas Bulan Ini</div>
                  <div class="text-2xl font-black text-blue-950 mt-0.5">{{ activityLogs.length }}</div>
                  <div class="text-[10px] text-blue-700">File: activity-{{ selectedLogMonth }}.json</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-blue-950 text-white flex items-center justify-center font-bold text-xs tracking-wider">
                  LOG
                </div>
              </div>

              <div class="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div class="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Perubahan Konten</div>
                  <div class="text-2xl font-black text-amber-950 mt-0.5">
                    {{ activityLogs.filter(l => l.action === 'UPDATE_CONTENT').length }}
                  </div>
                  <div class="text-[10px] text-amber-700">Aksi simpan section/halaman</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                  EDIT
                </div>
              </div>

              <div class="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div class="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Upload Berkas / Media</div>
                  <div class="text-2xl font-black text-emerald-950 mt-0.5">
                    {{ activityLogs.filter(l => l.action === 'UPLOAD_MEDIA').length }}
                  </div>
                  <div class="text-[10px] text-emerald-700">Gambar & dokumen baru</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  FILE
                </div>
              </div>
            </div>

            <!-- Search & Filter Bar -->
            <div class="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div class="w-full sm:w-80">
                <div class="relative">
                  <input
                    v-model="logSearchQuery"
                    type="text"
                    placeholder="Cari user, section, summary, ip..."
                    class="w-full bg-white text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-950 focus:border-blue-950"
                  />
                  <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div class="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <span class="text-xs text-slate-500">Filter Aksi:</span>
                <button
                  type="button"
                  @click="logActionFilter = 'ALL'"
                  :class="[
                    'text-xs px-2.5 py-1 rounded font-semibold transition',
                    logActionFilter === 'ALL' ? 'bg-blue-950 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  ]"
                >
                  Semua
                </button>
                <button
                  type="button"
                  @click="logActionFilter = 'UPDATE_CONTENT'"
                  :class="[
                    'text-xs px-2.5 py-1 rounded font-semibold transition',
                    logActionFilter === 'UPDATE_CONTENT' ? 'bg-blue-950 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  ]"
                >
                  Update Konten
                </button>
                <button
                  type="button"
                  @click="logActionFilter = 'UPLOAD_MEDIA'"
                  :class="[
                    'text-xs px-2.5 py-1 rounded font-semibold transition',
                    logActionFilter === 'UPLOAD_MEDIA' ? 'bg-blue-950 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  ]"
                >
                  Upload Media
                </button>
              </div>
            </div>

            <!-- Log Table -->
            <div class="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div v-if="isLoadingLogs" class="text-center py-12 text-slate-400 text-xs">
                Memuat riwayat perubahan...
              </div>

              <div v-else-if="filteredLogs.length === 0" class="text-center py-12 text-slate-400 text-xs">
                Belum ada aktivitas tercatat pada periode ini atau tidak ada data yang cocok dengan pencarian.
              </div>

              <div v-else class="overflow-x-auto w-full">
                <table class="w-full text-left text-xs text-slate-700 min-w-[720px]">
                  <thead class="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th class="py-3 px-3">Waktu (WIB)</th>
                      <th class="py-3 px-3">Pengguna</th>
                      <th class="py-3 px-3">Aksi</th>
                      <th class="py-3 px-3">Bagian (Section)</th>
                      <th class="py-3 px-3">Keterangan Perubahan</th>
                      <th class="py-3 px-3">IP Address</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-slate-50/80 transition">
                      <td class="py-3 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                        {{ log.timestampWIB }}
                      </td>
                      <td class="py-3 px-3 whitespace-nowrap">
                        <div class="font-semibold text-slate-900">{{ log.user?.fullName || log.user?.username || '-' }}</div>
                        <div class="text-[10px] font-mono text-slate-500">
                          @{{ log.user?.username }} ({{ log.user?.groups?.join(', ') || 'user' }})
                        </div>
                      </td>
                      <td class="py-3 px-3 whitespace-nowrap">
                        <span
                          v-if="log.action === 'UPDATE_CONTENT'"
                          class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200"
                        >
                          UPDATE KONTEN
                        </span>
                        <span
                          v-else-if="log.action === 'UPLOAD_MEDIA'"
                          class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200"
                        >
                          UPLOAD MEDIA
                        </span>
                        <span
                          v-else
                          class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {{ log.action }}
                        </span>
                      </td>
                      <td class="py-3 px-3 whitespace-nowrap">
                        <span class="font-medium text-slate-800">{{ log.sectionLabel || log.section }}</span>
                        <span class="block text-[10px] text-slate-400 font-mono">key: {{ log.section }}</span>
                      </td>
                      <td class="py-3 px-3 text-slate-800 min-w-[280px]">
                        <p class="text-xs">{{ log.summary }}</p>
                      </td>
                      <td class="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-500">
                        {{ log.ip }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-slate-50 rounded-lg p-3 text-[11px] text-slate-500 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span>
                Menampilkan <strong>{{ filteredLogs.length }}</strong> dari <strong>{{ activityLogs.length }}</strong> catatan aktivitas log bulan ini.
              </span>
              <span class="font-mono text-[10px] text-slate-400">
                server/data/logs/activity-{{ selectedLogMonth }}.json
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Media Picker Modal -->
    <MediaPickerModal
      :is-open="mediaPickerOpen"
      :current-value="activeTargetObj ? activeTargetObj[activeTargetField] : ''"
      @close="mediaPickerOpen = false"
      @select="handleMediaSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue';

definePageMeta({
  layout: false,
  middleware: ['admin-auth']
});

useHead({
  title: 'CMS Content Editor | PT NTP'
});

const reqHeaders = useRequestHeaders(['cookie']);
const { data: authState } = await useFetch<any>('/api/auth/me', { headers: reqHeaders });
const currentUser = computed(() => authState.value?.user);

const handleLogout = async () => {
  if (!confirm('Apakah Anda yakin ingin keluar dari CMS?')) return;
  try {
    await $fetch('/api/auth/logout', { method: 'POST' });
    await navigateTo('/admin/login');
  } catch (err) {
    console.error('Logout error:', err);
    await navigateTo('/admin/login');
  }
};

const { data: content, pending, refresh } = await useFetch<Record<string, any>>('/api/content');


const sections = [
  // 1. Home
  { group: 'Home', key: 'home', label: '1. Beranda (Home)' },

  // 2. Corporate (Sesuai Dropdown Corporate di Navbar)
  { group: 'Corporate', key: 'aboutUs', label: '2. About Us' },
  { key: 'bodBoc', label: '3. BOC & BOD' },
  { key: 'customers', label: '4. Our Customers' },
  { key: 'certificate', label: '5. Certificate' },
  { key: 'awards', label: '6. Awards & Achievements' },

  // 3. Our Services (Sesuai Dropdown Our Services di Navbar)
  { group: 'Our Services', key: 'aeroEngine', label: '7. MRO Aero Engine' },
  { key: 'industrial', label: '8. MRO Industrial' },
  { key: 'training', label: '9. Training Services' },
  { key: 'fieldServices', label: '10. Field Services' },

  // 4. Facilities (Sesuai Dropdown Facilities di Navbar)
  { group: 'Facilities', key: 'facilities', label: '11. Our Facilities' },

  // 5. Contact (Sesuai Dropdown Contact di Navbar)
  { group: 'Contact', key: 'contactInfo', label: '12. Corporate Contact' },
  { key: 'salesMarketing', label: '13. Sales & Marketing' },

  // 6. Career & Footer
  { group: 'Lainnya', key: 'career', label: '14. Career (Karir)' },
  { key: 'contact', label: '15. Footer & Quick Contact' },

  // 7. Audit & Log
  { group: 'Audit & Sistem', key: 'activityLogs', label: '16. Riwayat Perubahan (Log)' }
];

const activeSection = ref('home');
const isSaving = ref(false);
const saveMessage = ref('');
const errorMessage = ref('');

// Activity Log State & Handlers
const selectedLogMonth = ref('');
const availableLogMonths = ref<string[]>([]);
const activityLogs = ref<any[]>([]);
const isLoadingLogs = ref(false);
const logSearchQuery = ref('');
const logActionFilter = ref('ALL');

const fetchLogs = async (month?: string) => {
  isLoadingLogs.value = true;
  try {
    const url = month ? `/api/logs?month=${encodeURIComponent(month)}` : '/api/logs';
    const res: any = await $fetch(url);
    if (res?.success) {
      activityLogs.value = res.logs || [];
      availableLogMonths.value = res.availableMonths || [];
      selectedLogMonth.value = res.selectedMonth || res.currentMonth;
    }
  } catch (err: any) {
    console.error('Failed to fetch activity logs:', err);
  } finally {
    isLoadingLogs.value = false;
  }
};

const onSelectMonthChange = () => {
  fetchLogs(selectedLogMonth.value);
};

watch(activeSection, (newSec) => {
  if (newSec === 'activityLogs' && activityLogs.value.length === 0 && !isLoadingLogs.value) {
    fetchLogs();
  }
});

const filteredLogs = computed(() => {
  let list = activityLogs.value;
  if (logActionFilter.value !== 'ALL') {
    list = list.filter((l: any) => l.action === logActionFilter.value);
  }
  if (logSearchQuery.value.trim()) {
    const q = logSearchQuery.value.toLowerCase();
    list = list.filter((l: any) =>
      (l.user?.fullName && l.user.fullName.toLowerCase().includes(q)) ||
      (l.user?.username && l.user.username.toLowerCase().includes(q)) ||
      (l.sectionLabel && l.sectionLabel.toLowerCase().includes(q)) ||
      (l.section && l.section.toLowerCase().includes(q)) ||
      (l.summary && l.summary.toLowerCase().includes(q)) ||
      (l.ip && l.ip.toLowerCase().includes(q))
    );
  }
  return list;
});

// Career API Endpoint Test State & Handler
const isTestingApi = ref(false);
const apiTestResult = ref<any>(null);

const testCareerApi = async () => {
  const url = content.value?.career?.apiUrl || 'http://127.0.0.1:8003/recruitment-api/list_jobvacan';
  isTestingApi.value = true;
  apiTestResult.value = null;
  try {
    const res: any = await $fetch(`/api/career/jobs?testUrl=${encodeURIComponent(url)}`);
    if (res?.success) {
      apiTestResult.value = {
        success: true,
        message: 'Koneksi Server-Side Berhasil! Endpoint dapat diakses dengan baik oleh server.',
        count: res.count || (res.data ? res.data.length : 0)
      };
    } else {
      apiTestResult.value = {
        success: false,
        message: res?.message || 'Gagal terhubung ke endpoint API.'
      };
    }
  } catch (err: any) {
    apiTestResult.value = {
      success: false,
      message: `Error uji koneksi server-side: ${err.message || err}`
    };
  } finally {
    isTestingApi.value = false;
  }
};
const availablePages = [
  { label: 'Beranda (/)', value: '/' },
  // Corporate
  { label: 'About Us (/corporate/about-us)', value: '/corporate/about-us' },
  { label: 'BOC & BOD (/corporate/bod-boc)', value: '/corporate/bod-boc' },
  { label: 'Our Customers (/corporate/our-customers)', value: '/corporate/our-customers' },
  { label: 'Certifications (/corporate/certificate)', value: '/corporate/certificate' },
  { label: 'Awards & Achievements (/corporate/awards-and-achievements)', value: '/corporate/awards-and-achievements' },
  // Our Services
  { label: 'MRO Aero Engine (/our-services/mro-aero-engine)', value: '/our-services/mro-aero-engine' },
  { label: 'MRO Industrial (/our-services/mro-industrial)', value: '/our-services/mro-industrial' },
  { label: 'Training Services (/training)', value: '/training' },
  { label: 'Field Services (/field-services)', value: '/field-services' },
  // Facilities
  { label: 'Our Facilities (/our-facilities)', value: '/our-facilities' },
  // Contact
  { label: 'Corporate Contact (/contact/contact-info)', value: '/contact/contact-info' },
  { label: 'Sales & Marketing (/contact/sales-marketing)', value: '/contact/sales-marketing' },
  // Career
  { label: 'Career (/career)', value: '/career' }
];

const addSlide = () => {
  if (!content.value.home.slides) content.value.home.slides = [];
  if (content.value.home.slides.length >= 5) return;
  content.value.home.slides.push({
    active: true,
    title1: 'NEW SLIDE TITLE',
    title2: 'NEW SLIDE HIGHLIGHT',
    subtitle: 'Description for the new slide...',
    image: '/static/img/carousel/Screenshot_20240614_123738.png',
    buttonText: 'Learn More',
    link: '/our-services/mro-aero-engine'
  });
};

const removeSlide = (index: number) => {
  if (content.value.home.slides.length > 1) {
    content.value.home.slides.splice(index, 1);
  }
};

// MRO Aero Engine item handlers
const addAmcItem = () => {
  if (!content.value.aeroEngine) content.value.aeroEngine = {};
  if (!content.value.aeroEngine.amcList) content.value.aeroEngine.amcList = [];
  content.value.aeroEngine.amcList.push({
    title: 'Authorized Maintenance Center (AMC)',
    engine: '',
    series: '',
    aircraft: '',
    image: '',
    isActive: true
  });
};

const removeAmcItem = (index: number) => {
  if (content.value?.aeroEngine?.amcList) {
    content.value.aeroEngine.amcList.splice(index, 1);
  }
};

const addTurboFanItem = () => {
  if (!content.value.aeroEngine) content.value.aeroEngine = {};
  if (!content.value.aeroEngine.turboFanJet) content.value.aeroEngine.turboFanJet = [];
  content.value.aeroEngine.turboFanJet.push({
    name: '',
    series: '',
    aircraft: '',
    image: '',
    isActive: true
  });
};

const removeTurboFanItem = (index: number) => {
  if (content.value?.aeroEngine?.turboFanJet) {
    content.value.aeroEngine.turboFanJet.splice(index, 1);
  }
};

const addTurboPropItem = () => {
  if (!content.value.aeroEngine) content.value.aeroEngine = {};
  if (!content.value.aeroEngine.turboPropShaft) content.value.aeroEngine.turboPropShaft = [];
  content.value.aeroEngine.turboPropShaft.push({
    name: '',
    series: '',
    aircraft: '',
    image: '',
    isActive: true
  });
};

const removeTurboPropItem = (index: number) => {
  if (content.value?.aeroEngine?.turboPropShaft) {
    content.value.aeroEngine.turboPropShaft.splice(index, 1);
  }
};
const addIntroItem = () => {
  if (!content.value.aeroEngine) content.value.aeroEngine = {};
  if (!content.value.aeroEngine.introSection) {
    content.value.aeroEngine.introSection = {
      title: 'Maintenance, Repair and Overhaul of Aero Engine',
      description: content.value.aeroEngine.introText || '',
      image: '/static/img/services/aero01.jpg',
      displayType: 'list',
      items: []
    };
  }
  if (!content.value.aeroEngine.introSection.items) content.value.aeroEngine.introSection.items = [];
  content.value.aeroEngine.introSection.items.push('');
};

const removeIntroItem = (index: number) => {
  if (content.value?.aeroEngine?.introSection?.items) {
    content.value.aeroEngine.introSection.items.splice(index, 1);
  }
};

const addSupportItem = () => {
  if (!content.value.aeroEngine) content.value.aeroEngine = {};
  if (!content.value.aeroEngine.supportSection) {
    content.value.aeroEngine.supportSection = {
      title: 'Production Engine Assembly & Support Facilities',
      description: '',
      image: '/static/img/services/aero02.jpg',
      displayType: 'card',
      items: []
    };
  }
  if (!content.value.aeroEngine.supportSection.items) content.value.aeroEngine.supportSection.items = [];
  content.value.aeroEngine.supportSection.items.push('');
};

const removeSupportItem = (index: number) => {
  if (content.value?.aeroEngine?.supportSection?.items) {
    content.value.aeroEngine.supportSection.items.splice(index, 1);
  }
};


const isDirectUploading = ref(false);
const handleDirectUpload = async (event: Event, targetObj: any, fieldName: string) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  isDirectUploading.value = true;
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res: any = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    if (res?.file?.url) {
      targetObj[fieldName] = res.file.url;
    }
  } catch (err: any) {
    alert(`Upload gagal: ${err.message || err}`);
  } finally {
    isDirectUploading.value = false;
    input.value = '';
  }
};


// Media picker state
const mediaPickerOpen = ref(false);
const activeTargetObj = ref<any>(null);
const activeTargetField = ref<string>('');

const openMediaPicker = (targetObj: any, fieldName: string) => {
  activeTargetObj.value = targetObj;
  activeTargetField.value = fieldName;
  mediaPickerOpen.value = true;
};

const handleMediaSelected = (url: string) => {
  if (activeTargetObj.value && activeTargetField.value) {
    activeTargetObj.value[activeTargetField.value] = url;
  }
};

const onMroOpenMediaPicker = (payload: { target: any; key: string }) => {
  openMediaPicker(payload.target, payload.key);
};

const onMroDirectUpload = (payload: { event: any; target: any; key: string }) => {
  handleDirectUpload(payload.event, payload.target, payload.key);
};


watchEffect(() => {
  if (content.value?.aeroEngine) {
    if (!content.value.aeroEngine.sections) {
      content.value.aeroEngine.sections = [];
    }
  }
  if (content.value?.industrial) {
    if (!content.value.industrial.sections) {
      content.value.industrial.sections = [];
    }
  }
  if (content.value?.aboutUs) {
    if (!content.value.aboutUs.sections) {
      content.value.aboutUs.sections = [];
    }
  }
  if (content.value?.bodBoc) {
    if (!content.value.bodBoc.sections) {
      content.value.bodBoc.sections = [];
    }
  }
  if (content.value?.customers) {
    if (!content.value.customers.stats) {
      content.value.customers.stats = {
        countries: '30++',
        countriesLabel: 'Customer Countries',
        exportShare: '59%',
        exportShareLabel: 'Export Customer Share'
      };
    }
  }
  if (content.value?.awards) {
    if (!Array.isArray(content.value.awards.items)) {
      content.value.awards.items = [];
    }
  }
  if (content.value?.fieldServices) {
    if (!Array.isArray(content.value.fieldServices.items)) {
      content.value.fieldServices.items = [];
    }
  }
  if (content.value?.training) {
    if (!Array.isArray(content.value.training.items)) {
      content.value.training.items = [];
    }
  }
  if (content.value?.aeroEngine) {
    if (!content.value.aeroEngine.introSection) {
      content.value.aeroEngine.introSection = {
        title: 'Maintenance, Repair and Overhaul of Aero Engine',
        description: content.value.aeroEngine.introText || '',
        image: '/static/img/services/aero01.jpg',
        displayType: 'list',
        items: content.value.aeroEngine.bullets || [
          'Turbo Prop, Turbo Shaft, Turbo Jet / Fan',
          'Component Repair',
          'Accessories',
          'Line maintenance'
        ]
      };
    }
    if (!content.value.aeroEngine.supportSection) {
      content.value.aeroEngine.supportSection = {
        title: 'Production Engine Assembly & Support Facilities',
        description: 'To face ever-changing global competition, NTP provides dedicated services to support complete aircraft propulsion life-cycle requirements:',
        image: '/static/img/services/aero02.jpg',
        displayType: 'card',
        items: [
          'Workshop Repair & Balancing',
          'On-Wing Maintenance',
          'OEM Sparepart Sales',
          'Engine Test Cell Validation'
        ]
      };
    }
  }
  if (content.value?.aeroEngine) {
    if (!content.value.aeroEngine.amcList || content.value.aeroEngine.amcList.length === 0) {
      const list: any[] = [];
      if (content.value.aeroEngine.amcHoneywell) {
        list.push({ ...content.value.aeroEngine.amcHoneywell, isActive: true });
      }
      if (content.value.aeroEngine.amcGE) {
        list.push({ ...content.value.aeroEngine.amcGE, isActive: true });
      }
      content.value.aeroEngine.amcList = list;
    }
  }
  if (content.value && !content.value.career) {
    content.value.career = {
      headerTitle: 'CAREER',
      headerBg: '/static/img/ntp-bg-old.jpg',
      title: 'OUR OPEN ROLES',
      description: 'Discover exciting career opportunities at PT. NTP and join our talented and passionate team. Explore our current openings below and find the perfect role to showcase your skills and experiences.',
      apiUrl: 'http://127.0.0.1:8003/recruitment-api/list_jobvacan'
    };
  } else if (content.value?.career && !content.value.career.apiUrl) {
    content.value.career.apiUrl = 'http://127.0.0.1:8003/recruitment-api/list_jobvacan';
  }
});

const saveCurrentSection = async () => {
  if (!content.value || !content.value[activeSection.value]) return;

  if (activeSection.value === 'aeroEngine' && content.value.aeroEngine) {
    const list = content.value.aeroEngine.amcList;
    if (Array.isArray(list) && list.length > 0) {
      content.value.aeroEngine.amcHoneywell = { ...list[0] };
      if (list.length > 1) {
        content.value.aeroEngine.amcGE = { ...list[1] };
      }
    }
  }

  isSaving.value = true;
  saveMessage.value = '';
  errorMessage.value = '';
  try {
    await $fetch('/api/content', {
      method: 'POST',
      body: {
        section: activeSection.value,
        data: content.value[activeSection.value]
      }
    });
    saveMessage.value = `Perubahan pada "${activeSection.value}" berhasil disimpan ke server!`;
    setTimeout(() => {
      saveMessage.value = '';
    }, 4000);
  } catch (err: any) {
    errorMessage.value = `Gagal menyimpan: ${err.message || err}`;
  } finally {
    isSaving.value = false;
  }
};
</script>

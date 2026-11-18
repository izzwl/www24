<template>
  <div class="space-y-6">
    <!-- Header with Action -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
      <div>
        <h3 class="text-lg font-bold text-blue-950">About Us - Manajemen Section</h3>
        <p class="text-xs text-slate-500">
          Kelola section halaman About Us. Anda dapat menambah section baru, mengubah urutan, mengedit isi, atau menonaktifkan section.
        </p>
      </div>

      <!-- Add Section Dropdown / Button -->
      <div class="relative">
        <button
          type="button"
          @click="showAddMenu = !showAddMenu"
          class="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
        >
          <span>+ Tambah Section Baru</span>
          <span class="text-[10px]">&#9662;</span>
        </button>

        <div
          v-if="showAddMenu"
          class="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-30 space-y-1"
        >
          <div class="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Pilih Tipe Section
          </div>
          <button
            v-for="st in availableTypes"
            :key="st.type"
            type="button"
            @click="addNewSection(st.type)"
            class="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 flex items-start gap-2.5 transition"
          >
            <span class="p-1.5 rounded bg-amber-100 text-amber-800 text-xs shrink-0 font-bold">
              {{ st.icon }}
            </span>
            <div>
              <div class="font-bold text-blue-950">{{ st.label }}</div>
              <div class="text-[11px] text-slate-500 leading-tight">{{ st.desc }}</div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Section Empty State -->
    <div v-if="!sections || sections.length === 0" class="text-center py-12 bg-slate-50 border rounded-xl">
      <p class="text-sm font-semibold text-slate-600 mb-2">Belum ada section di halaman About Us.</p>
      <button
        type="button"
        @click="showAddMenu = true"
        class="text-xs font-bold text-blue-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition"
      >
        + Tambah Section Pertama
      </button>
    </div>

    <!-- Sections Accordion List -->
    <div v-else class="space-y-4">
      <div
        v-for="(sec, sIdx) in sections"
        :key="sec.id || sIdx"
        :class="[
          'border rounded-xl transition overflow-hidden shadow-sm',
          sec.isActive !== false ? 'bg-white border-slate-300' : 'bg-slate-50 border-slate-200 opacity-75'
        ]"
      >
        <!-- Section Bar / Header -->
        <div class="p-4 bg-slate-50 border-b flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <!-- Section Number -->
            <span class="px-2 py-0.5 rounded bg-blue-950 text-white text-[11px] font-bold">
              #{{ sIdx + 1 }}
            </span>

            <!-- Type Badge -->
            <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-blue-950 border border-slate-300">
              {{ getTypeLabel(sec.type) }}
            </span>

            <!-- Section Title Preview -->
            <span class="font-bold text-xs md:text-sm text-blue-950 truncate max-w-xs sm:max-w-md">
              {{ sec.title || '(Tanpa Judul)' }}
            </span>
          </div>

          <!-- Section Controls (Active Toggle, Re-order Up/Down, Collapse/Expand, Delete) -->
          <div class="flex items-center gap-2">
            <!-- Active Toggle -->
            <label class="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer mr-2 select-none">
              <input
                type="checkbox"
                v-model="sec.isActive"
                class="rounded border-slate-300 text-blue-950 focus:ring-blue-900"
              />
              <span :class="['text-xs font-bold', sec.isActive !== false ? 'text-emerald-700' : 'text-slate-400']">
                {{ sec.isActive !== false ? 'Aktif' : 'Nonaktif' }}
              </span>
            </label>

            <!-- Re-order Move Up -->
            <button
              type="button"
              :disabled="sIdx === 0"
              @click="moveSection(sIdx, -1)"
              class="w-7 h-7 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed rounded text-xs text-slate-700 font-bold transition flex items-center justify-center"
              title="Geser Naik (Re-arrange ke Atas)"
            >
              &uarr;
            </button>

            <!-- Re-order Move Down -->
            <button
              type="button"
              :disabled="sIdx === sections.length - 1"
              @click="moveSection(sIdx, 1)"
              class="w-7 h-7 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed rounded text-xs text-slate-700 font-bold transition flex items-center justify-center"
              title="Geser Turun (Re-arrange ke Bawah)"
            >
              &darr;
            </button>

            <!-- Collapse / Expand Button -->
            <button
              type="button"
              @click="toggleCollapse(sIdx)"
              class="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded text-xs text-slate-700 font-medium transition"
            >
              {{ isCollapsed(sIdx) ? 'Buka Detail' : 'Tutup' }}
            </button>

            <!-- Delete Section -->
            <button
              type="button"
              @click="deleteSection(sIdx)"
              class="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-bold transition ml-1"
              title="Hapus Section Ini"
            >
              Hapus
            </button>
          </div>
        </div>

        <!-- Section Body (Form Inputs) -->
        <div v-show="!isCollapsed(sIdx)" class="p-5 space-y-4">
          <!-- Common Fields -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="md:col-span-2">
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Judul Section</label>
              <input
                v-model="sec.title"
                class="w-full p-2 border rounded text-xs font-bold"
                placeholder="OUR JOURNEY / EXCELLENCE AND COMPETITIVE..."
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Tagline / Badge Atas</label>
              <input
                v-model="sec.badge"
                class="w-full p-2 border rounded text-xs uppercase"
                placeholder="History & Heritage / Core Values & Vision"
              />
            </div>
          </div>

          <!-- TYPE 1: SPLIT STORY (Our Journey & Corporate Overview) -->
          <div v-if="sec.type === 'split-story'" class="space-y-4 pt-3 border-t">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Tema Tampilan (Background)</label>
                <select
                  v-model="sec.bgTheme"
                  class="w-full p-2 border rounded text-xs bg-white font-medium text-slate-800"
                >
                  <option value="white">Latar Putih (Clean White)</option>
                  <option value="slate">Latar Abu Terang (Slate-50)</option>
                  <option value="dark-image">Latar Gelap dengan Foto Background & Overlay</option>
                </select>
              </div>

              <!-- BG Image if dark-image -->
              <div v-if="sec.bgTheme === 'dark-image'">
                <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Foto Background</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="sec.bgImage"
                    class="flex-1 p-2 border rounded text-xs font-mono"
                    placeholder="/static/img/bg-alt-eng.jpg"
                  />
                  <label class="px-2.5 py-1.5 bg-blue-950 text-white hover:bg-blue-900 text-xs font-bold rounded cursor-pointer shrink-0">
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="$emit('direct-upload', { event: $event, target: sec, key: 'bgImage' })"
                    />
                  </label>
                  <button
                    type="button"
                    @click="$emit('open-media-picker', { target: sec, key: 'bgImage' })"
                    class="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded shrink-0"
                  >
                    Galeri
                  </button>
                </div>
              </div>
            </div>

            <!-- Paragraphs List -->
            <div class="bg-slate-50 p-4 rounded-xl border space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-xs font-bold text-slate-800">Daftar Paragraf Penjelasan (Kolom Kanan)</label>
                <button
                  type="button"
                  @click="addParagraph(sec)"
                  class="text-xs text-blue-950 font-bold bg-amber-400 hover:bg-amber-300 px-2.5 py-1 rounded transition"
                >
                  + Tambah Paragraf
                </button>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(p, pIdx) in (sec.paragraphs || [])"
                  :key="pIdx"
                  class="flex items-start gap-2 bg-white p-2 border rounded-lg"
                >
                  <span class="text-xs font-bold text-slate-400 w-5 pt-1.5">{{ pIdx + 1 }}.</span>
                  <textarea
                    v-model="sec.paragraphs[pIdx]"
                    rows="2"
                    class="flex-1 p-1.5 border rounded text-xs leading-relaxed"
                    placeholder="Isi teks paragraf..."
                  ></textarea>
                  <button
                    type="button"
                    @click="removeArrayItem(sec, 'paragraphs', pIdx)"
                    class="text-xs text-red-600 hover:text-red-800 font-bold px-2 py-1 hover:bg-red-50 rounded shrink-0"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TYPE 2: CORE VALUES & VISION (EXCELLENCE AND COMPETITIVE) -->
          <div v-else-if="sec.type === 'core-values'" class="space-y-4 pt-3 border-t">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Tagline Chip (Kotak Kuning)</label>
                <input
                  v-model="sec.tagline"
                  class="w-full p-2 border rounded text-xs font-bold"
                  placeholder="EXCELLENCE AND COMPETITIVE"
                />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Quote / Slogan di Bawah Judul</label>
                <input
                  v-model="sec.quote"
                  class="w-full p-2 border rounded text-xs italic"
                  placeholder="Delivering Excellence, Building Competitiveness, Sustaining Trust."
                />
              </div>
            </div>

            <!-- Pillars (Excellence, Competitive, etc.) -->
            <div class="bg-slate-50 p-4 rounded-xl border space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold text-blue-950 uppercase tracking-wider">
                    Pilar Nilai & Penjelasan (Kolom Kanan)
                  </h4>
                  <p class="text-[11px] text-slate-500">Edit penjelasan Excellence, Competitive, atau tambah pilar nilai baru</p>
                </div>
                <button
                  type="button"
                  @click="addPillar(sec)"
                  class="px-3 py-1.5 bg-blue-950 text-white hover:bg-blue-900 rounded text-xs font-bold transition"
                >
                  + Tambah Pilar Nilai
                </button>
              </div>

              <div class="space-y-3">
                <div
                  v-for="(pillar, plIdx) in (sec.pillars || [])"
                  :key="plIdx"
                  class="p-4 border rounded-xl bg-white space-y-2 shadow-sm"
                >
                  <div class="flex items-center justify-between border-b pb-2">
                    <div class="flex items-center space-x-2 flex-1 mr-2">
                      <span class="text-xs font-black px-2 py-0.5 rounded bg-blue-950 text-white shrink-0">
                        Pilar {{ plIdx + 1 }}
                      </span>
                      <input
                        v-model="pillar.title"
                        placeholder="Nama Pilar (Contoh: Excellence / Competitive)"
                        class="p-1.5 border rounded text-xs font-bold text-blue-950 flex-1"
                      />
                    </div>
                    <button
                      type="button"
                      @click="removeArrayItem(sec, 'pillars', plIdx)"
                      class="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-0.5 hover:bg-red-50 rounded"
                    >
                      Hapus Pilar
                    </button>
                  </div>

                  <div>
                    <label class="text-[10px] text-slate-500 block mb-0.5">Penjelasan Pilar</label>
                    <textarea
                      v-model="pillar.description"
                      rows="2"
                      class="w-full p-2 border rounded text-xs leading-relaxed"
                      placeholder="We uphold the highest standards of quality..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Footer Note -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  Catatan Komitmen Penutup (Kotak Biru di Bawah Pilar)
                </label>
                <textarea
                  v-model="sec.footerNote"
                  rows="2"
                  class="w-full p-2 border rounded text-xs leading-relaxed"
                  placeholder="PT NTP is committed to delivering the highest quality of service..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- TYPE 3: FEATURE CARDS -->
          <div v-else-if="sec.type === 'feature-cards'" class="space-y-4 pt-3 border-t">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Kartu Fitur / Poin</span>
              <button
                type="button"
                @click="addCard(sec)"
                class="px-3 py-1.5 bg-blue-950 text-white hover:bg-blue-900 rounded text-xs font-bold transition"
              >
                + Tambah Kartu
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="(card, cIdx) in (sec.cards || [])"
                :key="cIdx"
                class="p-3 border rounded-xl bg-slate-50 space-y-2"
              >
                <div class="flex items-center justify-between">
                  <input
                    v-model="card.title"
                    placeholder="Judul Kartu..."
                    class="w-full font-bold text-xs p-1.5 border rounded"
                  />
                  <button
                    type="button"
                    @click="removeArrayItem(sec, 'cards', cIdx)"
                    class="text-xs text-red-600 hover:text-red-800 font-bold ml-2"
                  >
                    Hapus
                  </button>
                </div>
                <textarea
                  v-model="card.description"
                  rows="2"
                  class="w-full p-1.5 border rounded text-xs"
                  placeholder="Penjelasan..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- TYPE 4: QUOTE BANNER -->
          <div v-else-if="sec.type === 'quote-banner'" class="space-y-4 pt-3 border-t">
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Teks Quote / Slogan Utama</label>
              <textarea
                v-model="sec.quote"
                rows="2"
                class="w-full p-2 border rounded text-xs font-bold leading-relaxed"
                placeholder="Masukkan kutipan komitmen..."
              ></textarea>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Penulis / Atas Nama (Opsional)</label>
              <input
                v-model="sec.author"
                class="w-full p-2 border rounded text-xs"
                placeholder="Contoh: Dewan Direksi & Komisaris PT NTP"
              />
            </div>
          </div>

          <!-- TYPE 5: HEADER / HERO BANNER -->
          <div v-else-if="sec.type === 'header-banner' || sec.type === 'hero-banner'" class="space-y-4 pt-3 border-t">
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Teks Judul Banner &lt;h2&gt;</label>
              <input
                v-model="sec.title"
                class="w-full p-2 border rounded text-xs font-bold text-blue-950 uppercase"
                placeholder="ABOUT US"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Subjudul / Keterangan (Opsional)</label>
              <input
                v-model="sec.subtitle"
                class="w-full p-2 border rounded text-xs"
                placeholder="Keterangan singkat..."
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Gambar Background (ntp-bg-old.jpg)</label>
              <div class="flex gap-2">
                <input
                  v-model="sec.bgImage"
                  placeholder="/static/img/ntp-bg-old.jpg"
                  class="flex-1 p-2 border rounded text-xs font-mono"
                />
                <button
                  type="button"
                  @click="$emit('open-media-picker', { target: sec, key: 'bgImage' })"
                  class="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-xs font-bold rounded"
                >
                  Pilih Media
                </button>
              </div>
            </div>
          </div>

          <!-- TYPE 6: INTRO SECTION -->
          <div v-else-if="sec.type === 'intro-section' || sec.type === 'intro'" class="space-y-4 pt-3 border-t">
            <div class="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">Badge Kategori (Amber)</label>
                  <input
                    v-model="sec.badge"
                    placeholder="Contoh: Our Identity"
                    class="w-full p-2 border border-slate-300 rounded text-xs font-bold text-amber-600 bg-white uppercase tracking-wider"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">Judul Section &lt;h2&gt;</label>
                  <input
                    v-model="sec.title"
                    placeholder="Contoh: OVERVIEW & HERITAGE"
                    class="w-full p-2 border border-slate-300 rounded text-xs font-bold text-blue-950 bg-white"
                  />
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">Paragraf Deskripsi Pengantar</label>
                <textarea
                  v-model="sec.description"
                  rows="3"
                  placeholder="Uraian pengantar section..."
                  class="w-full p-2 border border-slate-300 rounded text-xs leading-relaxed bg-white"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  sections: Array<Record<string, any>>;
}>();

defineEmits<{
  (e: 'open-media-picker', payload: { target: any; key: string }): void;
  (e: 'direct-upload', payload: { event: Event; target: any; key: string }): void;
}>();

const showAddMenu = ref(false);
const collapsedMap = ref<Record<number, boolean>>({});

const availableTypes = [
  {
    type: 'split-story',
    label: '1. Narasi 2 Kolom (Our Journey / Overview)',
    desc: 'Judul di kiri, paragraf narasi di kanan (bisa latar putih atau foto background)',
    icon: '📖'
  },
  {
    type: 'core-values',
    label: '2. Core Values & Vision (Excellence & Competitive)',
    desc: 'Judul di kiri, pilar penjelasan Excellence & Competitive di kanan',
    icon: '💎'
  },
  {
    type: 'feature-cards',
    label: '3. Kartu Fitur / Poin Sorotan',
    desc: 'Grid kartu 2–3 kolom untuk sorotan pilar atau fasilitas korporasi',
    icon: '✨'
  },
  {
    type: 'quote-banner',
    label: '4. Banner Quote / Slogan Utama',
    desc: 'Banner gelap satu kolom dengan kutipan atau komitmen manajemen',
    icon: '💬'
  },
  {
    type: 'header-banner',
    label: '5. Header Banner (Background Image & Title)',
    desc: 'Banner latar foto (ntp-bg-old.jpg) dengan judul putih besar di tengah',
    icon: '🖼️'
  },
  {
    type: 'intro-section',
    label: '6. Intro Header (Badge + Judul + Paragraf)',
    desc: 'Standar pengantar: badge kategori amber, judul <h2> tebal, dan paragraf deskripsi',
    icon: '📝'
  }
];

const getTypeLabel = (type: string) => {
  const match = availableTypes.find(t => t.type === type);
  return match ? match.label.split('.')[1].trim() : type;
};

const isCollapsed = (idx: number) => {
  return collapsedMap.value[idx] === true;
};

const toggleCollapse = (idx: number) => {
  collapsedMap.value[idx] = !collapsedMap.value[idx];
};

const moveSection = (idx: number, delta: number) => {
  const newIdx = idx + delta;
  if (newIdx < 0 || newIdx >= props.sections.length) return;
  const temp = props.sections[idx];
  props.sections[idx] = props.sections[newIdx];
  props.sections[newIdx] = temp;
};

const deleteSection = (idx: number) => {
  if (confirm(`Yakin ingin menghapus section "${props.sections[idx]?.title || 'ini'}"?`)) {
    props.sections.splice(idx, 1);
  }
};

const addNewSection = (type: string) => {
  showAddMenu.value = false;
  const id = `about-sec-${Date.now()}`;

  let newSec: Record<string, any> = {
    id,
    type,
    isActive: true,
    title: 'JUDUL SECTION BARU',
    badge: 'KATEGORI SECTION'
  };

  if (type === 'split-story') {
    newSec.bgTheme = 'white';
    newSec.paragraphs = [
      'Paragraf pertama menjelaskan sejarah, identitas, atau pencapaian...',
      'Paragraf kedua memberikan rincian komprehensif...'
    ];
  } else if (type === 'core-values') {
    newSec.title = 'EXCELLENCE AND COMPETITIVE';
    newSec.badge = 'Core Values & Vision';
    newSec.tagline = 'Excellence and Competitive';
    newSec.quote = 'Delivering Excellence, Building Competitiveness, Sustaining Trust.';
    newSec.bgTheme = 'white';
    newSec.pillars = [
      {
        letter: 'E',
        title: 'EXCELLENCE',
        tagline: 'Service Excellence',
        description: 'Penjelasan komitmen terhadap kualitas, keandalan, dan keselamatan...',
        tags: 'Quality • Safety • Reliability'
      },
      {
        letter: 'C',
        title: 'COMPETITIVE',
        tagline: 'Market Leadership',
        description: 'Penjelasan komitmen terhadap efisiensi, inovasi, dan kapabilitas...',
        tags: 'Capability • Innovation • Partnership'
      }
    ];
    newSec.footerNote = 'PT NTP berkomitmen untuk memberikan layanan MRO terbaik berstandar global.';
  } else if (type === 'feature-cards') {
    newSec.cards = [
      { title: 'Pilar 1', description: 'Deskripsi pilar...' },
      { title: 'Pilar 2', description: 'Deskripsi pilar...' }
    ];
  } else if (type === 'quote-banner') {
    newSec.quote = 'Kutipan komitmen bersama untuk keunggulan berkesinambungan.';
    newSec.author = 'PT Nusantara Turbin dan Propulsi';
  } else if (type === 'header-banner' || type === 'hero-banner') {
    newSec.title = 'ABOUT US';
    newSec.subtitle = '';
    newSec.bgImage = '/static/img/ntp-bg-old.jpg';
  } else if (type === 'intro-section' || type === 'intro') {
    newSec.badge = 'Our Identity';
    newSec.title = 'OVERVIEW & HERITAGE';
    newSec.description = 'PT Nusantara Turbin dan Propulsi is committed to precision engineering, reliability, and world-class service standards.';
  }

  props.sections.push(newSec);
  collapsedMap.value[props.sections.length - 1] = false;
};

const addParagraph = (sec: any) => {
  if (!sec.paragraphs) sec.paragraphs = [];
  sec.paragraphs.push('');
};

const addPillar = (sec: any) => {
  if (!sec.pillars) sec.pillars = [];
  sec.pillars.push({
    letter: 'V',
    title: 'NILAI BARU',
    tagline: 'Tagline',
    description: 'Deskripsi pilar nilai...',
    tags: 'Value 1 • Value 2'
  });
};

const addCard = (sec: any) => {
  if (!sec.cards) sec.cards = [];
  sec.cards.push({
    title: 'Fitur Baru',
    description: 'Deskripsi fitur...'
  });
};

const removeArrayItem = (obj: any, key: string, idx: number) => {
  if (obj[key] && Array.isArray(obj[key])) {
    obj[key].splice(idx, 1);
  }
};
</script>

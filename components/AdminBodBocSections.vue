<template>
  <div class="space-y-6">
    <!-- Header with Action Buttons -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
      <div>
        <h3 class="text-lg font-bold text-blue-950">BOD & BOC - Manajemen Section & Pejabat</h3>
        <p class="text-xs text-slate-500">
          Atur susunan halaman BOD & BOC. Anda dapat menambah <strong>Intro Section</strong> atau <strong>Section Pejabat</strong>, dan menata urutannya (naik/turun) secara bebas.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <!-- Add Intro Section Button -->
        <button
          type="button"
          @click="addIntroSection"
          class="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <span>📝 + Tambah Intro Section</span>
        </button>

        <!-- Add Pejabat Section Button -->
        <button
          type="button"
          @click="addOfficialsSection"
          class="px-3.5 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <span>👥 + Tambah Section Pejabat</span>
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!sections || sections.length === 0" class="text-center py-12 bg-slate-50 border rounded-xl">
      <p class="text-sm font-semibold text-slate-600 mb-3">Belum ada section yang dibuat untuk halaman ini.</p>
      <div class="flex items-center justify-center gap-3">
        <button
          type="button"
          @click="addIntroSection"
          class="text-xs font-bold text-blue-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition"
        >
          📝 + Tambah Intro Section
        </button>
        <button
          type="button"
          @click="addOfficialsSection"
          class="text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 px-4 py-2 rounded-lg transition"
        >
          👥 + Tambah Section Pejabat
        </button>
      </div>
    </div>

    <!-- Section Cards List -->
    <div v-else class="space-y-6">
      <div
        v-for="(sec, sIdx) in sections"
        :key="sec.id || sIdx"
        :class="[
          'border rounded-xl bg-white shadow-sm transition overflow-hidden',
          sec.isActive === false ? 'opacity-60 border-slate-300' : 'border-slate-200'
        ]"
      >
        <!-- Card Header / Accordion Bar -->
        <div class="p-4 bg-slate-50 border-b flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <!-- Section Number -->
            <span class="px-2 py-0.5 rounded bg-slate-800 text-white text-[11px] font-bold">
              #{{ sIdx + 1 }}
            </span>

            <!-- Section Type Badge -->
            <span
              v-if="sec.type === 'intro'"
              class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
            >
              <span>📝</span>
              <span>Intro Section</span>
            </span>
            <span
              v-else
              class="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
            >
              <span>👥</span>
              <span>Section Pejabat</span>
            </span>

            <!-- Section Title Preview -->
            <div>
              <div class="font-bold text-sm text-blue-950 flex items-center gap-2">
                <span>{{ sec.title || (sec.type === 'intro' ? 'Intro Section' : 'Section Pejabat') }}</span>
                <span
                  v-if="sec.type !== 'intro' && sec.members"
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700"
                >
                  {{ sec.members.length }} Pejabat
                </span>
              </div>
              <div v-if="sec.badge" class="text-[11px] text-amber-600 font-semibold tracking-wider uppercase">
                {{ sec.badge }}
              </div>
            </div>
          </div>

          <!-- Section Controls (Rearrange, Active, Collapse, Delete) -->
          <div class="flex items-center gap-2">
            <!-- Active Toggle -->
            <label class="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer mr-2 select-none">
              <input
                type="checkbox"
                v-model="sec.isActive"
                class="rounded border-slate-300 text-blue-950 focus:ring-blue-900"
              />
              <span>Aktif</span>
            </label>

            <!-- Reorder Move Up -->
            <button
              type="button"
              :disabled="sIdx === 0"
              @click="moveSection(sIdx, -1)"
              class="w-7 h-7 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-30 rounded text-xs text-slate-700 font-bold transition flex items-center justify-center"
              title="Geser Naik (Re-arrange ke Atas)"
            >
              &uarr;
            </button>

            <!-- Reorder Move Down -->
            <button
              type="button"
              :disabled="sIdx === sections.length - 1"
              @click="moveSection(sIdx, 1)"
              class="w-7 h-7 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-30 rounded text-xs text-slate-700 font-bold transition flex items-center justify-center"
              title="Geser Turun (Re-arrange ke Bawah)"
            >
              &darr;
            </button>

            <!-- Collapse / Expand -->
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

        <!-- Card Body -->
        <div v-if="!isCollapsed(sIdx)" class="p-6 space-y-6">
          <!-- TYPE A: INTRO SECTION FORM -->
          <div v-if="sec.type === 'intro'" class="space-y-4">
            <div class="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3">
              <div class="flex items-center justify-between border-b border-amber-200 pb-2">
                <div class="flex items-center gap-2">
                  <span class="text-base">📝</span>
                  <div>
                    <h4 class="text-xs font-bold text-amber-950 uppercase tracking-wide">
                      Konten Intro Section
                    </h4>
                    <p class="text-[11px] text-amber-800">
                      Teks pengantar dengan badge kategori amber, judul utama &lt;h2&gt;, dan paragraf deskripsi
                    </p>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">
                    Badge Kategori (Teks Amber Kecil)
                  </label>
                  <input
                    v-model="sec.badge"
                    placeholder="Contoh: Corporate Leadership"
                    class="w-full p-2 border border-slate-300 rounded text-xs font-bold text-amber-600 bg-white uppercase tracking-wider"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">
                    Judul Utama Section &lt;h2&gt;
                  </label>
                  <input
                    v-model="sec.title"
                    placeholder="Contoh: BOARD OF DIRECTORS AND COMMISSIONERS"
                    class="w-full p-2 border border-slate-300 rounded text-xs font-bold text-blue-950 bg-white"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">
                  Deskripsi / Paragraf Pengantar
                </label>
                <textarea
                  v-model="sec.description"
                  rows="3"
                  placeholder="Uraian pengantar kepemimpinan perusahaan..."
                  class="w-full p-2 border border-slate-300 rounded text-xs leading-relaxed bg-white"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- TYPE B: OFFICIALS / PEJABAT SECTION FORM -->
          <div v-else class="space-y-6">
            <!-- 1. Section Header / Sub-judul -->
            <div class="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-3">
              <div class="flex items-center justify-between border-b border-blue-200/60 pb-2">
                <div>
                  <h4 class="text-xs font-bold text-blue-950 uppercase tracking-wide">
                    Identitas Kelompok Pejabat
                  </h4>
                  <p class="text-[11px] text-slate-500">
                    Nama kelompok dewan ini (misal: "Board of Directors" atau "Board of Commissioners")
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                    Sub-badge Kategori (Opsional)
                  </label>
                  <input
                    v-model="sec.badge"
                    class="w-full p-2 border rounded text-xs font-bold text-amber-600 bg-white"
                    placeholder="Contoh: Dewan Direksi / Dewan Komisaris"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                    Judul Kelompok Pejabat
                  </label>
                  <input
                    v-model="sec.title"
                    class="w-full p-2 border rounded text-xs font-bold text-blue-950 bg-white"
                    placeholder="Contoh: Board of Directors / Board of Commissioners"
                  />
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                  Deskripsi Kelompok Pejabat (Opsional)
                </label>
                <textarea
                  v-model="sec.description"
                  rows="2"
                  class="w-full p-2 border rounded text-xs leading-relaxed bg-white"
                  placeholder="Penjelasan tupoksi kelompok pejabat ini..."
                ></textarea>
              </div>
            </div>

            <!-- 2. Pejabat / Members List -->
            <div class="space-y-4">
              <div class="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 class="text-sm font-bold text-blue-950">
                    Daftar Pejabat dalam Section Ini
                  </h4>
                  <p class="text-xs text-slate-500">
                    Tambah foto, nama, jabatan, dan profil pejabat
                  </p>
                </div>
                <button
                  type="button"
                  @click="addMember(sec)"
                  class="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
                >
                  <span>+ Tambah Pejabat</span>
                </button>
              </div>

              <!-- Member Empty State -->
              <div
                v-if="!sec.members || sec.members.length === 0"
                class="text-center py-8 bg-slate-50 border border-dashed rounded-xl"
              >
                <p class="text-xs text-slate-500 mb-2">Belum ada pejabat dalam section ini.</p>
                <button
                  type="button"
                  @click="addMember(sec)"
                  class="text-xs font-bold text-blue-950 bg-white border border-slate-300 hover:bg-slate-100 px-3 py-1.5 rounded transition"
                >
                  + Tambah Pejabat Pertama
                </button>
              </div>

              <!-- Member List Cards -->
              <div v-else class="space-y-4">
                <div
                  v-for="(member, mIdx) in sec.members"
                  :key="mIdx"
                  class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 relative group/member hover:border-blue-300 transition"
                >
                  <!-- Member Header Bar -->
                  <div class="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full bg-blue-950 text-white text-[10px] font-bold flex items-center justify-center">
                        {{ mIdx + 1 }}
                      </span>
                      <span class="text-xs font-bold text-blue-950">
                        {{ member.name || 'Nama Pejabat' }}
                      </span>
                      <span v-if="member.role" class="text-[11px] text-amber-600 font-semibold">
                        &bull; {{ member.role }}
                      </span>
                    </div>

                    <div class="flex items-center gap-1">
                      <button
                        type="button"
                        :disabled="mIdx === 0"
                        @click="moveMember(sec, mIdx, -1)"
                        class="px-1.5 py-0.5 bg-white border rounded text-[10px] text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                        title="Geser Naik"
                      >
                        &uarr;
                      </button>
                      <button
                        type="button"
                        :disabled="mIdx === sec.members.length - 1"
                        @click="moveMember(sec, mIdx, 1)"
                        class="px-1.5 py-0.5 bg-white border rounded text-[10px] text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                        title="Geser Turun"
                      >
                        &darr;
                      </button>
                      <button
                        type="button"
                        @click="deleteMember(sec, mIdx)"
                        class="px-2 py-0.5 bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold rounded ml-2 transition"
                      >
                        Hapus Pejabat
                      </button>
                    </div>
                  </div>

                  <!-- Inputs Grid -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label class="text-[11px] font-semibold text-slate-600 block mb-0.5">
                        Nama Lengkap & Gelar
                      </label>
                      <input
                        v-model="member.name"
                        class="w-full p-2 border rounded text-xs font-bold text-blue-950 bg-white"
                        placeholder="Contoh: Ir. Suryanto"
                      />
                    </div>
                    <div>
                      <label class="text-[11px] font-semibold text-slate-600 block mb-0.5">
                        Jabatan / Role
                      </label>
                      <input
                        v-model="member.role"
                        class="w-full p-2 border rounded text-xs font-semibold text-amber-600 bg-white"
                        placeholder="Contoh: President Director / Commissioner"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="text-[11px] font-semibold text-slate-600 block mb-0.5">
                      Bio / Profil Singkat
                    </label>
                    <textarea
                      v-model="member.bio"
                      rows="2"
                      class="w-full p-2 border rounded text-xs leading-relaxed bg-white"
                      placeholder="Uraian singkat pengalaman, fokus, atau latar belakang..."
                    ></textarea>
                  </div>

                  <!-- Foto Profil Media Picker & Direct Upload -->
                  <div>
                    <label class="text-[11px] font-semibold text-slate-600 block mb-0.5">
                      Foto Profil Pejabat
                    </label>
                    <div class="flex items-center gap-2">
                      <!-- Thumbnail preview if image exists -->
                      <div
                        v-if="member.image"
                        class="w-12 h-12 rounded border border-slate-300 overflow-hidden bg-slate-200 shrink-0"
                      >
                        <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                      </div>

                      <input
                        v-model="member.image"
                        placeholder="/static/img/bod/dirut.jpeg"
                        class="flex-1 p-2 border rounded text-xs font-mono bg-white"
                      />

                      <!-- Direct Upload Button -->
                      <label class="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded cursor-pointer shrink-0 transition">
                        <span>Upload Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          class="hidden"
                          @change="$emit('direct-upload', { event: $event, target: member, key: 'image' })"
                        />
                      </label>

                      <!-- Media Picker Modal Button -->
                      <button
                        type="button"
                        @click="$emit('open-media-picker', { target: member, key: 'image' })"
                        class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded shrink-0 transition"
                      >
                        Pilih Media
                      </button>
                    </div>
                  </div>
                </div>
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

const collapsedMap = ref<Record<number, boolean>>({});

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
  const secName = props.sections[idx]?.title || (props.sections[idx]?.type === 'intro' ? 'Intro Section' : 'Section Pejabat');
  if (confirm(`Yakin ingin menghapus section "${secName}"?`)) {
    props.sections.splice(idx, 1);
  }
};

const addIntroSection = () => {
  const newSec = {
    id: `sec-intro-${Date.now()}`,
    type: 'intro',
    isActive: true,
    badge: 'Corporate Leadership',
    title: 'BOARD OF DIRECTORS AND COMMISSIONERS',
    description: 'The BOD establishes the Company’s business strategies as well as the annual work plan and budget including risk management, and with the agreement of the BOC, carries out these plans.'
  };
  props.sections.push(newSec);
  collapsedMap.value[props.sections.length - 1] = false;
};

const addOfficialsSection = () => {
  const isSecond = props.sections.some(s => s.type === 'officials' || s.members);
  const newSec = {
    id: `bod-sec-${Date.now()}`,
    type: 'officials',
    isActive: true,
    badge: isSecond ? 'Dewan Komisaris' : 'Dewan Direksi',
    title: isSecond ? 'Board of Commissioners' : 'Board of Directors',
    description: isSecond
      ? 'Dewan Komisaris melakukan pengawasan atas jalannya kepengurusan perseroan dan memberikan nasihat kepada Direksi.'
      : 'Direksi bertanggung jawab penuh dalam memimpin dan mengelola perseroan sesuai dengan tujuan dan strategi usaha.',
    members: [
      {
        name: '',
        role: isSecond ? 'Commissioner' : 'Director',
        bio: '',
        image: ''
      }
    ]
  };
  props.sections.push(newSec);
  collapsedMap.value[props.sections.length - 1] = false;
};

const addMember = (sec: any) => {
  if (!sec.members) sec.members = [];
  sec.members.push({
    name: '',
    role: '',
    bio: '',
    image: ''
  });
};

const deleteMember = (sec: any, mIdx: number) => {
  if (confirm(`Yakin ingin menghapus pejabat "${sec.members[mIdx]?.name || 'ini'}"?`)) {
    sec.members.splice(mIdx, 1);
  }
};

const moveMember = (sec: any, mIdx: number, delta: number) => {
  const newIdx = mIdx + delta;
  if (newIdx < 0 || newIdx >= sec.members.length) return;
  const temp = sec.members[mIdx];
  sec.members[mIdx] = sec.members[newIdx];
  sec.members[newIdx] = temp;
};
</script>

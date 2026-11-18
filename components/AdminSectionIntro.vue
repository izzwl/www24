<template>
  <div class="space-y-4 mb-6">
    <!-- Header with Add Intro Section Button -->
    <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
      <div class="flex items-center gap-2">
        <span class="text-lg">📝</span>
        <div>
          <h3 class="text-xs font-bold text-blue-950 uppercase tracking-wide">
            {{ label || 'Manajemen Intro Section' }}
          </h3>
          <p class="text-[11px] text-slate-500">
            Kelola teks pengantar (badge, judul &lt;h2&gt;, dan deskripsi). Anda dapat menambah intro section baru atau mengatur urutannya.
          </p>
        </div>
      </div>

      <button
        type="button"
        @click="addIntroSection"
        class="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
      >
        <span>+ Tambah Intro Section</span>
      </button>
    </div>

    <!-- Intro Sections List -->
    <div class="space-y-3">
      <div
        v-for="(intro, idx) in introList"
        :key="intro.id || idx"
        :class="[
          'p-4 rounded-xl border transition space-y-3',
          intro.isActive !== false ? 'bg-white border-slate-300 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'
        ]"
      >
        <!-- Card Header Bar -->
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-blue-950 text-white text-[10px] font-bold">
              Intro #{{ idx + 1 }}
            </span>
            <span class="text-xs font-bold text-blue-950 truncate max-w-xs sm:max-w-md">
              {{ intro.title || defaultTitle || 'Intro Section' }}
            </span>
            <span v-if="intro.badge || defaultBadge" class="text-[11px] text-amber-600 font-semibold uppercase tracking-wider hidden sm:inline">
              &bull; {{ intro.badge || defaultBadge }}
            </span>
          </div>

          <div class="flex items-center gap-1.5">
            <!-- Active Toggle -->
            <label class="flex items-center gap-1 text-xs text-slate-600 cursor-pointer mr-2 select-none">
              <input
                type="checkbox"
                v-model="intro.isActive"
                @change="syncPrimary"
                class="rounded border-slate-300 text-blue-950 focus:ring-blue-900"
              />
              <span>Aktif</span>
            </label>

            <!-- Move Up -->
            <button
              type="button"
              :disabled="idx === 0"
              @click="moveIntro(idx, -1)"
              class="w-6 h-6 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-30 rounded text-xs text-slate-700 font-bold transition flex items-center justify-center"
              title="Geser Naik (Re-arrange ke Atas)"
            >
              &uarr;
            </button>

            <!-- Move Down -->
            <button
              type="button"
              :disabled="idx === introList.length - 1"
              @click="moveIntro(idx, 1)"
              class="w-6 h-6 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-30 rounded text-xs text-slate-700 font-bold transition flex items-center justify-center"
              title="Geser Turun (Re-arrange ke Bawah)"
            >
              &darr;
            </button>

            <!-- Delete (if more than 1) -->
            <button
              v-if="introList.length > 1"
              type="button"
              @click="deleteIntro(idx)"
              class="px-2 py-0.5 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-bold transition ml-1"
              title="Hapus Intro Section Ini"
            >
              Hapus
            </button>
          </div>
        </div>

        <!-- Inputs Form -->
        <div class="space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="text-[11px] font-semibold text-slate-700 block mb-1">
                Badge Kategori (Teks Amber Kecil)
              </label>
              <input
                v-model="intro.badge"
                @input="syncPrimary"
                :placeholder="defaultBadge"
                class="w-full p-2 border border-slate-300 rounded text-xs font-bold text-amber-600 bg-white focus:ring-1 focus:ring-amber-500 uppercase tracking-wider"
              />
              <p class="text-[10px] text-slate-400 mt-1">Default jika kosong: "{{ defaultBadge }}"</p>
            </div>
            <div class="md:col-span-2">
              <label class="text-[11px] font-semibold text-slate-700 block mb-1">
                Judul Utama Section &lt;h2&gt;
              </label>
              <input
                v-model="intro.title"
                @input="syncPrimary"
                :placeholder="defaultTitle"
                class="w-full p-2 border border-slate-300 rounded text-xs font-bold text-blue-950 bg-white focus:ring-1 focus:ring-blue-500"
              />
              <p class="text-[10px] text-slate-400 mt-1">Default jika kosong: "{{ defaultTitle }}"</p>
            </div>
          </div>

          <div>
            <label class="text-[11px] font-semibold text-slate-700 block mb-1">
              Deskripsi / Paragraf Pengantar
            </label>
            <textarea
              v-model="intro.description"
              @input="syncPrimary"
              :placeholder="defaultDescription"
              rows="3"
              class="w-full p-2 border border-slate-300 rounded text-xs leading-relaxed bg-white focus:ring-1 focus:ring-blue-500"
            ></textarea>
            <p class="text-[10px] text-slate-400 mt-1">Default jika kosong: "{{ defaultDescription }}"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    target: Record<string, any>;
    defaultBadge?: string;
    defaultTitle?: string;
    defaultDescription?: string;
    descKey?: string;
    label?: string;
  }>(),
  {
    defaultBadge: '',
    defaultTitle: '',
    defaultDescription: '',
    descKey: 'description',
    label: 'Manajemen Intro Section'
  }
);

// Ensure target.introSections array is initialized
const initIntroList = () => {
  if (!props.target) return;
  if (!Array.isArray(props.target.introSections) || props.target.introSections.length === 0) {
    props.target.introSections = [
      {
        id: `intro-${Date.now()}`,
        badge: props.target.badge || props.defaultBadge,
        title: props.target.title || props.defaultTitle,
        description: props.target[props.descKey] || props.defaultDescription,
        isActive: true
      }
    ];
  }
};

onMounted(() => {
  initIntroList();
});

initIntroList();

const introList = computed<Array<Record<string, any>>>(() => {
  initIntroList();
  return props.target.introSections;
});

// Synchronize the first active intro back to target root fields for complete backward compatibility
const syncPrimary = () => {
  if (!props.target || !props.target.introSections) return;
  const activeFirst = props.target.introSections.find((i: any) => i.isActive !== false) || props.target.introSections[0];
  if (activeFirst) {
    props.target.badge = activeFirst.badge;
    props.target.title = activeFirst.title;
    props.target[props.descKey] = activeFirst.description;
  }
};

const addIntroSection = () => {
  initIntroList();
  const newIntro = {
    id: `intro-${Date.now()}`,
    badge: props.defaultBadge || 'Section Category',
    title: props.defaultTitle || 'SECTION TITLE',
    description: props.defaultDescription || 'Section overview description...',
    isActive: true
  };
  props.target.introSections.push(newIntro);
};

const deleteIntro = (idx: number) => {
  if (confirm('Yakin ingin menghapus intro section ini?')) {
    props.target.introSections.splice(idx, 1);
    syncPrimary();
  }
};

const moveIntro = (idx: number, delta: number) => {
  const newIdx = idx + delta;
  if (newIdx < 0 || newIdx >= props.target.introSections.length) return;
  const temp = props.target.introSections[idx];
  props.target.introSections[idx] = props.target.introSections[newIdx];
  props.target.introSections[newIdx] = temp;
  syncPrimary();
};
</script>

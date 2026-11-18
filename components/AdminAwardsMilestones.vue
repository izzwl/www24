<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-4 rounded-xl border border-slate-200">
      <div>
        <h3 class="text-sm font-bold text-blue-950 uppercase tracking-wider">
          Daftar Milestone & Penghargaan NTP
        </h3>
        <p class="text-xs text-slate-500">
          Total: {{ items?.length || 0 }} milestone. Tambah baru, ubah urutan manual dengan tombol panah, atau urutkan otomatis berdasarkan tahun.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <!-- Quick Sort Helpers -->
        <button
          type="button"
          @click="sortByYearDesc"
          title="Urutkan dari tahun terbaru ke terlama"
          class="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded shadow-xs transition"
        >
          Tahun Terbaru &darr;
        </button>
        <button
          type="button"
          @click="sortByYearAsc"
          title="Urutkan dari tahun terlama ke terbaru"
          class="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded shadow-xs transition"
        >
          Tahun Terlama &uarr;
        </button>
        <button
          type="button"
          @click="addItem"
          class="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded shadow-xs transition flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah Milestone Baru</span>
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!items || items.length === 0"
      class="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50"
    >
      <p class="text-sm text-slate-500 mb-3">Belum ada milestone yang terdaftar.</p>
      <button
        type="button"
        @click="addItem"
        class="px-4 py-2 bg-blue-950 text-white text-xs font-bold rounded"
      >
        + Tambah Milestone Pertama
      </button>
    </div>

    <!-- List Items -->
    <div v-else class="space-y-3">
      <div
        v-for="(award, aIdx) in items"
        :key="award.id || aIdx"
        :class="[
          'p-4 rounded-xl border transition shadow-xs space-y-3',
          award.isActive === false ? 'bg-slate-100 border-slate-300 opacity-70' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
        ]"
      >
        <!-- Card Top Bar: Index, Title Preview, Move Up/Down, Active, Delete -->
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-blue-950 text-white text-xs font-bold flex items-center justify-center shrink-0">
              {{ aIdx + 1 }}
            </span>
            <span class="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {{ award.year || 'Tahun' }}
            </span>
            <span class="text-xs font-bold text-blue-950 truncate max-w-xs sm:max-w-md">
              {{ award.title || '(Milestone Baru)' }}
            </span>
          </div>

          <div class="flex items-center gap-1.5">
            <!-- Reorder Buttons -->
            <button
              type="button"
              @click="moveUp(aIdx)"
              :disabled="aIdx === 0"
              title="Pindah ke Atas"
              class="w-7 h-7 rounded border bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold text-slate-700 transition"
            >
              &uarr;
            </button>
            <button
              type="button"
              @click="moveDown(aIdx)"
              :disabled="aIdx === items.length - 1"
              title="Pindah ke Bawah"
              class="w-7 h-7 rounded border bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold text-slate-700 transition"
            >
              &darr;
            </button>

            <!-- Toggle Active -->
            <label class="inline-flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer ml-1 px-2 py-1 bg-white rounded border">
              <input
                type="checkbox"
                v-model="award.isActive"
                class="rounded border-slate-300 text-blue-950 focus:ring-blue-950"
              />
              <span>{{ award.isActive !== false ? 'Aktif' : 'Nonaktif' }}</span>
            </label>

            <!-- Delete Button -->
            <button
              type="button"
              @click="removeItem(aIdx)"
              title="Hapus Milestone"
              class="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded border border-red-200 transition"
            >
              Hapus
            </button>
          </div>
        </div>

        <!-- Form Inputs -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="text-[11px] font-semibold text-slate-600 block mb-1">Tahun Milestone</label>
            <input
              v-model="award.year"
              placeholder="Contoh: 2024"
              class="w-full p-2 border rounded text-xs font-bold text-amber-600 bg-white"
            />
          </div>
          <div>
            <label class="text-[11px] font-semibold text-slate-600 block mb-1">Badge Kategori</label>
            <input
              v-model="award.badge"
              placeholder="NTP Milestone"
              class="w-full p-2 border rounded text-xs font-medium bg-white"
            />
          </div>
          <div>
            <label class="text-[11px] font-semibold text-slate-600 block mb-1">Pemberi Penghargaan / Institusi</label>
            <input
              v-model="award.organization"
              placeholder="Contoh: Ministry of Defence RI"
              class="w-full p-2 border rounded text-xs bg-white"
            />
          </div>
        </div>

        <div>
          <label class="text-[11px] font-semibold text-slate-600 block mb-1">Judul Milestone / Penghargaan</label>
          <input
            v-model="award.title"
            placeholder="Contoh: Excellence in Defense Aviation MRO"
            class="w-full p-2 border rounded text-xs font-bold text-blue-950 bg-white"
          />
        </div>

        <div>
          <label class="text-[11px] font-semibold text-slate-600 block mb-1">Deskripsi / Uraian Pencapaian</label>
          <textarea
            v-model="award.description"
            rows="2"
            placeholder="Keterangan singkat pencapaian..."
            class="w-full p-2 border rounded text-xs bg-white"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: any[];
}>();

const moveUp = (index: number) => {
  if (index > 0 && props.items) {
    const temp = props.items[index];
    props.items[index] = props.items[index - 1];
    props.items[index - 1] = temp;
  }
};

const moveDown = (index: number) => {
  if (props.items && index < props.items.length - 1) {
    const temp = props.items[index];
    props.items[index] = props.items[index + 1];
    props.items[index + 1] = temp;
  }
};

const addItem = () => {
  if (!props.items) return;
  props.items.push({
    id: 'award-' + Date.now(),
    year: new Date().getFullYear().toString(),
    badge: 'NTP Milestone',
    title: '',
    organization: '',
    description: '',
    isActive: true
  });
};

const removeItem = (index: number) => {
  if (!props.items) return;
  const item = props.items[index];
  const name = item.title || item.year || 'item ini';
  if (confirm(`Yakin ingin menghapus milestone "${name}"?`)) {
    props.items.splice(index, 1);
  }
};

const sortByYearDesc = () => {
  if (!props.items) return;
  props.items.sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0;
    const yearB = parseInt(b.year, 10) || 0;
    return yearB - yearA;
  });
};

const sortByYearAsc = () => {
  if (!props.items) return;
  props.items.sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0;
    const yearB = parseInt(b.year, 10) || 0;
    return yearA - yearB;
  });
};
</script>

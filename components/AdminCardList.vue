<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-4 rounded-xl border border-slate-200">
      <div>
        <h3 class="text-sm font-bold text-blue-950 uppercase tracking-wider">
          {{ title || 'Daftar Layanan & Kapabilitas' }}
        </h3>
        <p class="text-xs text-slate-500">
          Total: {{ items?.length || 0 }} {{ itemLabel || 'item' }}. Tambah baru, ubah urutan posisi naik/turun, upload/ganti gambar, atau aktifkan/nonaktifkan.
        </p>
      </div>

      <div>
        <button
          type="button"
          @click="addItem"
          class="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded shadow-xs transition flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah {{ itemLabel || 'Layanan' }} Baru</span>
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!items || items.length === 0"
      class="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50"
    >
      <p class="text-sm text-slate-500 mb-3">Belum ada {{ itemLabel || 'layanan' }} yang terdaftar.</p>
      <button
        type="button"
        @click="addItem"
        class="px-4 py-2 bg-blue-950 text-white text-xs font-bold rounded"
      >
        + Tambah {{ itemLabel || 'Layanan' }} Pertama
      </button>
    </div>

    <!-- List Items -->
    <div v-else class="space-y-3">
      <div
        v-for="(item, idx) in items"
        :key="item.id || idx"
        :class="[
          'p-4 rounded-xl border transition shadow-xs space-y-3',
          item.isActive === false ? 'bg-slate-100 border-slate-300 opacity-70' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
        ]"
      >
        <!-- Top Bar -->
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-blue-950 text-white text-xs font-bold flex items-center justify-center shrink-0">
              {{ idx + 1 }}
            </span>
            <span v-if="item.tag || defaultTag" class="text-xs font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
              {{ item.tag || defaultTag }}
            </span>
            <span class="text-xs font-bold text-blue-950 truncate max-w-xs sm:max-w-md">
              {{ item.title || `(${itemLabel || 'Layanan'} Baru)` }}
            </span>
          </div>

          <div class="flex items-center gap-1.5">
            <!-- Reorder Buttons -->
            <button
              type="button"
              @click="moveUp(idx)"
              :disabled="idx === 0"
              title="Pindah ke Atas"
              class="w-7 h-7 rounded border bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold text-slate-700 transition"
            >
              &uarr;
            </button>
            <button
              type="button"
              @click="moveDown(idx)"
              :disabled="idx === items.length - 1"
              title="Pindah ke Bawah"
              class="w-7 h-7 rounded border bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold text-slate-700 transition"
            >
              &darr;
            </button>

            <!-- Toggle Active -->
            <label class="inline-flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer ml-1 px-2 py-1 bg-white rounded border">
              <input
                type="checkbox"
                v-model="item.isActive"
                class="rounded border-slate-300 text-blue-950 focus:ring-blue-950"
              />
              <span>{{ item.isActive !== false ? 'Aktif' : 'Nonaktif' }}</span>
            </label>

            <!-- Delete Button -->
            <button
              type="button"
              @click="removeItem(idx)"
              title="Hapus"
              class="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded border border-red-200 transition"
            >
              Hapus
            </button>
          </div>
        </div>

        <!-- Form Inputs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="text-[11px] font-semibold text-slate-600 block mb-1">
              Nama {{ itemLabel || 'Layanan' }}
            </label>
            <input
              v-model="item.title"
              :placeholder="`Contoh: ${itemLabel || 'Layanan'} Baru`"
              class="w-full p-2 border rounded text-xs font-bold text-blue-950 bg-white"
            />
          </div>

          <div>
            <label class="text-[11px] font-semibold text-slate-600 block mb-1">
              Badge / Tag Label
            </label>
            <input
              v-model="item.tag"
              :placeholder="defaultTag || 'Certified NTP Team'"
              class="w-full p-2 border rounded text-xs bg-white"
            />
          </div>
        </div>

        <!-- Image input with Media Picker and Direct Upload -->
        <div>
          <label class="text-[11px] font-semibold text-slate-600 block mb-1">Gambar / Foto Ilustrasi</label>
          <div class="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <input
              v-model="item.image"
              placeholder="/static/img/services/industrial01.jpg"
              class="flex-1 p-2 border rounded text-xs font-mono bg-white w-full"
            />
            <div class="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                @click="$emit('open-media-picker', { target: item, key: 'image' })"
                class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded transition"
              >
                Pilih Media
              </button>
              <label class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded cursor-pointer transition">
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(e) => $emit('direct-upload', { event: e, target: item, key: 'image' })"
                />
              </label>
            </div>
          </div>

          <!-- Thumbnail Preview -->
          <div v-if="item.image" class="mt-2 flex items-center gap-2 p-1.5 bg-slate-100 rounded border">
            <div class="w-16 h-10 rounded overflow-hidden bg-white border shrink-0 flex items-center justify-center">
              <img :src="item.image" :alt="item.title" class="max-w-full max-h-full object-cover w-full h-full" />
            </div>
            <span class="text-[11px] text-slate-600 truncate font-mono">{{ item.image }}</span>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="text-[11px] font-semibold text-slate-600 block mb-1">Deskripsi Singkat</label>
          <textarea
            v-model="item.description"
            rows="2"
            placeholder="Keterangan singkat cakupan layanan/program..."
            class="w-full p-2 border rounded text-xs bg-white"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items: any[];
    title?: string;
    itemLabel?: string;
    defaultTag?: string;
    defaultImage?: string;
  }>(),
  {
    title: 'Daftar Layanan & Kapabilitas',
    itemLabel: 'Layanan',
    defaultTag: 'Certified NTP Team',
    defaultImage: '/static/img/services/industrial01.jpg'
  }
);

defineEmits<{
  (e: 'open-media-picker', payload: { target: any; key: string }): void;
  (e: 'direct-upload', payload: { event: any; target: any; key: string }): void;
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
    id: 'card-' + Date.now(),
    title: '',
    tag: props.defaultTag,
    image: props.defaultImage,
    description: '',
    isActive: true
  });
};

const removeItem = (index: number) => {
  if (!props.items) return;
  const item = props.items[index];
  const name = item.title || `${props.itemLabel} #${index + 1}`;
  if (confirm(`Yakin ingin menghapus "${name}"?`)) {
    props.items.splice(index, 1);
  }
};
</script>

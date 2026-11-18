<template>
  <div class="space-y-6">
    <!-- Header with Action -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
      <div>
        <h3 class="text-lg font-bold text-blue-950">{{ title || 'Manajemen Section Gambar' }}</h3>
        <p class="text-xs text-slate-500">
          Kelola section gambar/logo. Anda dapat menambah section baru, mengatur urutan section, menambah gambar & deskripsi di dalamnya, serta mengatur urutan gambarnya.
        </p>
      </div>

      <button
        type="button"
        @click="addNewSection"
        class="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
      >
        <span>+ Tambah Section Baru</span>
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="!sections || sections.length === 0" class="text-center py-12 bg-slate-50 border rounded-xl">
      <p class="text-sm font-semibold text-slate-600 mb-2">Belum ada section yang dibuat.</p>
      <button
        type="button"
        @click="addNewSection"
        class="text-xs font-bold text-blue-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition"
      >
        + Tambah Section Pertama
      </button>
    </div>

    <!-- Sections List -->
    <div v-else class="space-y-6">
      <div
        v-for="(sec, sIdx) in sections"
        :key="sec.id || sIdx"
        :class="[
          'border rounded-xl bg-white shadow-sm transition overflow-hidden',
          sec.isActive === false ? 'opacity-60 border-slate-300' : 'border-slate-200'
        ]"
      >
        <!-- Section Bar / Accordion Header -->
        <div class="p-4 bg-slate-50 border-b flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="px-2 py-0.5 rounded bg-blue-950 text-white text-[11px] font-bold">
              Section {{ sIdx + 1 }}
            </span>
            <div>
              <div class="font-bold text-sm text-blue-950 flex items-center gap-2">
                <span>{{ sec.title || sec.name || 'Section Gambar' }}</span>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {{ (sec.items ? sec.items.length : 0) }} {{ itemLabel || 'Gambar' }}
                </span>
              </div>
              <div v-if="sec.badge" class="text-[11px] text-amber-600 font-semibold tracking-wider uppercase">
                {{ sec.badge }}
              </div>
            </div>
          </div>

          <!-- Section Controls (Active Toggle, Re-order, Collapse, Delete) -->
          <div class="flex items-center gap-2">
            <label class="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer mr-2 select-none">
              <input
                type="checkbox"
                v-model="sec.isActive"
                class="rounded border-slate-300 text-blue-950 focus:ring-blue-900"
              />
              <span>Aktif</span>
            </label>

            <!-- Re-order Section Up -->
            <button
              type="button"
              :disabled="sIdx === 0"
              @click="moveSection(sIdx, -1)"
              class="w-7 h-7 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-30 rounded text-xs text-slate-700 font-bold transition flex items-center justify-center"
              title="Geser Section Naik"
            >
              &uarr;
            </button>

            <!-- Re-order Section Down -->
            <button
              type="button"
              :disabled="sIdx === sections.length - 1"
              @click="moveSection(sIdx, 1)"
              class="w-7 h-7 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-30 rounded text-xs text-slate-700 font-bold transition flex items-center justify-center"
              title="Geser Section Turun"
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

        <!-- Section Body -->
        <div v-if="!isCollapsed(sIdx)" class="p-6 space-y-6">
          <!-- 1. Section Header & Description Fields -->
          <div class="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-3">
            <div class="flex items-center justify-between border-b border-blue-200/60 pb-2">
              <h4 class="text-xs font-bold text-blue-950 uppercase tracking-wide">
                Identitas & Deskripsi Section
              </h4>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                  Sub-badge Kategori (Opsional)
                </label>
                <input
                  v-model="sec.badge"
                  class="w-full p-2 border rounded text-xs font-bold text-amber-600 bg-white uppercase tracking-wider"
                  placeholder="Contoh: Accreditations / Defense"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                  Judul Section &lt;h3&gt;
                </label>
                <input
                  v-model="sec.title"
                  @input="onSectionTitleInput(sec)"
                  class="w-full p-2 border rounded text-xs font-bold text-blue-950 bg-white"
                  placeholder="Contoh: Airworthiness Authority / Existing Customers"
                />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                Deskripsi / Paragraf Pengantar Section (Opsional)
              </label>
              <textarea
                v-model="sec.description"
                rows="2"
                class="w-full p-2 border rounded text-xs leading-relaxed bg-white"
                placeholder="Penjelasan rincian kelompok atau sertifikasi ini..."
              ></textarea>
            </div>
          </div>

          <!-- 2. Image Items Manager -->
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b pb-2">
              <div>
                <h4 class="text-sm font-bold text-blue-950">
                  Daftar {{ itemLabel || 'Gambar / Logo' }} dalam Section Ini
                </h4>
                <p class="text-xs text-slate-500">
                  Tambah file gambar, nama/judul, dan deskripsi/keterangan tiap gambar
                </p>
              </div>

              <button
                type="button"
                @click="addItem(sec)"
                class="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <span>+ Tambah {{ itemLabel || 'Gambar' }}</span>
              </button>
            </div>

            <!-- Items Empty State -->
            <div
              v-if="!sec.items || sec.items.length === 0"
              class="text-center py-8 bg-slate-50 border border-dashed rounded-xl"
            >
              <p class="text-xs text-slate-500 mb-2">Belum ada gambar dalam section ini.</p>
              <button
                type="button"
                @click="addItem(sec)"
                class="text-xs font-bold text-blue-950 bg-white border border-slate-300 hover:bg-slate-100 px-3 py-1.5 rounded transition"
              >
                + Tambah Gambar Pertama
              </button>
            </div>

            <!-- Items List -->
            <div v-else class="space-y-3">
              <div
                v-for="(item, iIdx) in sec.items"
                :key="item.id || iIdx"
                class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 relative group/item hover:border-blue-300 transition"
              >
                <!-- Item Bar -->
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-blue-950 text-white text-[10px] font-bold flex items-center justify-center">
                      {{ iIdx + 1 }}
                    </span>
                    <span class="text-xs font-bold text-blue-950 truncate max-w-xs sm:max-w-md">
                      {{ item.name || 'Item Tanpa Nama' }}
                    </span>
                    <span v-if="item.description || item.country" class="text-[11px] text-slate-500 hidden sm:inline">
                      &bull; {{ item.description || item.country }}
                    </span>
                  </div>

                  <div class="flex items-center gap-1">
                    <!-- Active Toggle -->
                    <label class="flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer mr-2 select-none">
                      <input
                        type="checkbox"
                        v-model="item.isActive"
                        class="rounded border-slate-300 text-blue-950 focus:ring-blue-900"
                      />
                      <span>Aktif</span>
                    </label>

                    <!-- Move Item Up -->
                    <button
                      type="button"
                      :disabled="iIdx === 0"
                      @click="moveItem(sec, iIdx, -1)"
                      class="px-1.5 py-0.5 bg-white border rounded text-[10px] text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                      title="Geser Gambar Naik"
                    >
                      &uarr;
                    </button>

                    <!-- Move Item Down -->
                    <button
                      type="button"
                      :disabled="iIdx === sec.items.length - 1"
                      @click="moveItem(sec, iIdx, 1)"
                      class="px-1.5 py-0.5 bg-white border rounded text-[10px] text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                      title="Geser Gambar Turun"
                    >
                      &darr;
                    </button>

                    <!-- Delete Item -->
                    <button
                      type="button"
                      @click="deleteItem(sec, iIdx)"
                      class="px-2 py-0.5 bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold rounded ml-2 transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                <!-- Item Inputs -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="text-[11px] font-semibold text-slate-600 block mb-0.5">
                      Nama / Label {{ itemLabel || 'Gambar' }}
                    </label>
                    <input
                      v-model="item.name"
                      class="w-full p-2 border rounded text-xs font-bold text-blue-950 bg-white"
                      placeholder="Contoh: IDAA / TNI AU / Solar Turbines"
                    />
                  </div>

                  <div>
                    <label class="text-[11px] font-semibold text-slate-600 block mb-0.5">
                      Deskripsi / Keterangan Gambar (Negara/Sub-info)
                    </label>
                    <input
                      v-model="item.description"
                      @input="onItemDescriptionInput(item)"
                      class="w-full p-2 border rounded text-xs bg-white"
                      placeholder="Contoh: Indonesia / OEM Partner / Aviation Authority"
                    />
                  </div>
                </div>

                <!-- Image URL & Picker -->
                <div>
                  <label class="text-[11px] font-semibold text-slate-600 block mb-0.5">
                    File Gambar / Logo
                  </label>
                  <div class="flex items-center gap-2">
                    <!-- Thumbnail preview -->
                    <div
                      v-if="item.image || item.logo"
                      class="w-12 h-12 rounded border border-slate-300 overflow-hidden bg-white shrink-0 p-1 flex items-center justify-center"
                    >
                      <img :src="item.image || item.logo" :alt="item.name" class="max-h-full max-w-full object-contain" />
                    </div>

                    <input
                      v-model="item.image"
                      @input="onItemImageInput(item)"
                      placeholder="/static/img/certification/... atau /static/img/customer/..."
                      class="flex-1 p-2 border rounded text-xs font-mono bg-white"
                    />

                    <!-- Direct Upload Button -->
                    <label class="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded cursor-pointer shrink-0 transition">
                      <span>Upload Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="onDirectUploadChange($event, item)"
                      />
                    </label>

                    <!-- Media Picker Button -->
                    <button
                      type="button"
                      @click="onOpenMediaPicker(item)"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    sections: Array<Record<string, any>>;
    title?: string;
    itemLabel?: string;
  }>(),
  {
    title: 'Manajemen Section Gambar',
    itemLabel: 'Gambar'
  }
);

const emit = defineEmits<{
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
  const secTitle = props.sections[idx]?.title || props.sections[idx]?.name || 'Section ini';
  if (confirm(`Yakin ingin menghapus section "${secTitle}" beserta seluruh gambarnya?`)) {
    props.sections.splice(idx, 1);
  }
};

const addNewSection = () => {
  const newSec = {
    id: `sec-img-${Date.now()}`,
    title: 'Section Gambar Baru',
    name: 'Section Gambar Baru',
    badge: '',
    description: '',
    isActive: true,
    items: [
      {
        id: `item-${Date.now()}`,
        name: 'Item Baru',
        description: '',
        country: '',
        image: '',
        logo: '',
        isActive: true
      }
    ]
  };
  props.sections.push(newSec);
  collapsedMap.value[props.sections.length - 1] = false;
};

const addItem = (sec: any) => {
  if (!sec.items) sec.items = [];
  sec.items.push({
    id: `item-${Date.now()}`,
    name: '',
    description: '',
    country: '',
    image: '',
    logo: '',
    isActive: true
  });
};

const deleteItem = (sec: any, iIdx: number) => {
  const itemName = sec.items[iIdx]?.name || 'item ini';
  if (confirm(`Yakin ingin menghapus gambar "${itemName}"?`)) {
    sec.items.splice(iIdx, 1);
  }
};

const moveItem = (sec: any, iIdx: number, delta: number) => {
  const newIdx = iIdx + delta;
  if (newIdx < 0 || newIdx >= sec.items.length) return;
  const temp = sec.items[iIdx];
  sec.items[iIdx] = sec.items[newIdx];
  sec.items[newIdx] = temp;
};

const onSectionTitleInput = (sec: any) => {
  sec.name = sec.title;
};

const onItemDescriptionInput = (item: any) => {
  item.country = item.description;
};

const onItemImageInput = (item: any) => {
  item.logo = item.image;
};

const onDirectUploadChange = (event: Event, item: any) => {
  const key = item.image !== undefined ? 'image' : (item.logo !== undefined ? 'logo' : 'image');
  emit('direct-upload', { event, target: item, key });
};

const onOpenMediaPicker = (item: any) => {
  const key = item.image !== undefined ? 'image' : (item.logo !== undefined ? 'logo' : 'image');
  emit('open-media-picker', { target: item, key });
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-blue-950 text-white flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="font-bold text-sm tracking-wide">Pilih atau Upload Gambar</h3>
        </div>
        <button @click="$emit('close')" class="text-slate-300 hover:text-white text-lg font-bold">
          &times;
        </button>
      </div>

      <!-- Tabs & Search -->
      <div class="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div class="flex space-x-2">
          <button
            @click="activeTab = 'gallery'"
            :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition', activeTab === 'gallery' ? 'bg-blue-950 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300']"
          >
            Galeri Gambar ({{ filteredImages.length }})
          </button>
          <button
            @click="activeTab = 'upload'"
            :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition', activeTab === 'upload' ? 'bg-blue-950 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300']"
          >
            + Upload Gambar Baru
          </button>
        </div>

        <div v-if="activeTab === 'gallery'" class="flex items-center space-x-2">
          <input
            v-model="search"
            placeholder="Cari nama gambar..."
            class="px-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-950 w-48 sm:w-64"
          />
        </div>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto flex-1">
        <!-- 1. Upload Tab -->
        <div v-if="activeTab === 'upload'" class="space-y-4">
          <div
            class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
            @click="$refs.fileInput.click()"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />
            <svg class="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-sm font-bold text-slate-700">Klik untuk memilih file gambar dari komputer</p>
            <p class="text-xs text-slate-500 mt-1">Mendukung format PNG, JPG, JPEG, SVG, WebP</p>
          </div>

          <div v-if="isUploading" class="text-center py-4 text-xs font-semibold text-blue-950">
            Sedang mengupload gambar ke server...
          </div>
          <div v-if="uploadError" class="p-3 bg-red-100 text-red-700 text-xs rounded">
            {{ uploadError }}
          </div>
        </div>

        <!-- 2. Gallery Tab -->
        <div v-else>
          <div v-if="loadingImages" class="text-center py-12 text-xs text-slate-500">
            Memuat daftar gambar...
          </div>
          <div v-else-if="filteredImages.length === 0" class="text-center py-12 text-xs text-slate-500">
            Tidak ada gambar yang cocok dengan pencarian "{{ search }}".
          </div>
          <div v-else class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            <div
              v-for="img in filteredImages"
              :key="img.url"
              @click="chooseImage(img.url)"
              :class="[
                'border rounded-lg p-2 text-center cursor-pointer transition hover:scale-105 flex flex-col justify-between',
                selectedUrl === img.url ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-400' : 'border-slate-200 bg-white hover:border-blue-950'
              ]"
            >
              <div class="h-20 w-full flex items-center justify-center overflow-hidden mb-1 bg-slate-100 rounded">
                <img :src="img.url" :alt="img.name" class="max-h-full max-w-full object-contain" />
              </div>
              <span class="text-[10px] text-slate-700 font-medium truncate block" :title="img.name">
                {{ img.name }}
              </span>
              <span class="text-[9px] text-slate-400 block uppercase">{{ img.folder }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <div class="text-xs text-slate-600 truncate max-w-md">
          <span v-if="selectedUrl">Terpilih: <strong>{{ selectedUrl }}</strong></span>
          <span v-else>Pilih gambar di atas atau upload baru</span>
        </div>
        <div class="flex space-x-2">
          <button @click="$emit('close')" class="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100">
            Batal
          </button>
          <button
            @click="confirmSelection"
            :disabled="!selectedUrl"
            class="px-4 py-1.5 bg-amber-400 text-blue-950 rounded text-xs font-bold hover:bg-amber-300 disabled:opacity-40 transition"
          >
            Gunakan Gambar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  currentValue?: string;
}>();

const emit = defineEmits(['close', 'select']);

const activeTab = ref<'gallery' | 'upload'>('gallery');
const search = ref('');
const images = ref<Array<{ url: string; name: string; folder: string }>>([]);
const loadingImages = ref(false);
const isUploading = ref(false);
const uploadError = ref('');
const selectedUrl = ref(props.currentValue || '');

const loadImages = async () => {
  loadingImages.value = true;
  try {
    const res: any = await $fetch('/api/images');
    if (res?.images) {
      images.value = res.images;
    }
  } catch (err) {
    console.error('Failed to load images:', err);
  } finally {
    loadingImages.value = false;
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    selectedUrl.value = props.currentValue || '';
    loadImages();
  }
});

const filteredImages = computed(() => {
  if (!search.value) return images.value;
  const q = search.value.toLowerCase();
  return images.value.filter(img => img.name.toLowerCase().includes(q) || img.folder.toLowerCase().includes(q));
});

const chooseImage = (url: string) => {
  selectedUrl.value = url;
};

const confirmSelection = () => {
  if (selectedUrl.value) {
    emit('select', selectedUrl.value);
    emit('close');
  }
};

const handleFileUpload = async (event: any) => {
  const file = event.target.files?.[0];
  if (!file) return;

  isUploading.value = true;
  uploadError.value = '';

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res: any = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (res?.file?.url) {
      selectedUrl.value = res.file.url;
      await loadImages();
      emit('select', res.file.url);
      emit('close');
    }
  } catch (err: any) {
    uploadError.value = `Gagal upload: ${err.message || err}`;
  } finally {
    isUploading.value = false;
  }
};
</script>

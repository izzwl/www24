<template>
  <div class="space-y-6">
    <!-- Header with Action -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
      <div>
        <h3 class="text-lg font-bold text-blue-950">{{ title }}</h3>
        <p class="text-xs text-slate-500">
          Kelola section halaman. Anda dapat menambah section baru, mengubah urutan, mengedit isi, atau menonaktifkan section.
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
      <p class="text-sm font-semibold text-slate-600 mb-2">Belum ada section yang dibuat.</p>
      <button
        type="button"
        @click="showAddMenu = true"
        class="text-xs font-bold text-blue-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition"
      >
        + Tambah Section Pertama
      </button>
    </div>

    <!-- Sections Accordion / Cards List -->
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
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Judul Section Utama</label>
              <input
                v-model="sec.title"
                class="w-full p-2 border rounded text-xs font-bold"
                placeholder="Masukkan judul..."
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Tagline / Badge Atas (Opsional)</label>
              <input
                v-model="sec.badge"
                class="w-full p-2 border rounded text-xs uppercase"
                placeholder="Contoh: OEM Authorization"
              />
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Deskripsi / Paragraf Pengantar</label>
            <textarea
              v-model="sec.description"
              rows="2"
              class="w-full p-2 border rounded text-xs leading-relaxed"
              placeholder="Deskripsi singkat section..."
            ></textarea>
          </div>

          <!-- TYPE 1: SPLIT EDITORIAL -->
          <div v-if="sec.type === 'split-editorial'" class="space-y-4 pt-3 border-t">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Side Image -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Gambar Samping (Side Image)</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="sec.image"
                    class="flex-1 p-2 border rounded text-xs font-mono"
                    placeholder="/static/img/..."
                  />
                  <label class="px-2.5 py-1.5 bg-blue-950 text-white hover:bg-blue-900 text-xs font-bold rounded cursor-pointer transition shrink-0">
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="$emit('direct-upload', { event: $event, target: sec, key: 'image' })"
                    />
                  </label>
                  <button
                    type="button"
                    @click="$emit('open-media-picker', { target: sec, key: 'image' })"
                    class="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded transition shrink-0"
                  >
                    Galeri
                  </button>
                </div>
              </div>

              <!-- Display Type & Right BG -->
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Gaya Tampilan Poin</label>
                  <select
                    v-model="sec.displayType"
                    class="w-full p-2 border rounded text-xs bg-white font-medium text-slate-800"
                  >
                    <option value="card">Kotak Card Grid</option>
                    <option value="list">Bullet List Biasa</option>
                  </select>
                </div>
                <div class="pt-4">
                  <label class="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="sec.rightbg"
                      class="w-4 h-4 text-blue-950 rounded border-slate-300"
                    />
                    <span class="text-xs text-slate-700 font-medium">Aksen Kotak Abu Samping</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Items List -->
            <div class="bg-slate-50 p-4 rounded-xl border">
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-bold text-slate-800">Daftar Poin Layanan</label>
                <button
                  type="button"
                  @click="addStringItem(sec, 'items')"
                  class="text-xs text-blue-950 font-bold bg-amber-400 hover:bg-amber-300 px-2.5 py-1 rounded transition"
                >
                  + Tambah Poin
                </button>
              </div>
              <div class="space-y-2">
                <div
                  v-for="(it, iIdx) in (sec.items || [])"
                  :key="iIdx"
                  class="flex items-center gap-2"
                >
                  <span class="text-xs font-bold text-slate-400 w-5">{{ iIdx + 1 }}.</span>
                  <input
                    v-model="sec.items[iIdx]"
                    class="flex-1 p-1.5 border rounded text-xs"
                    placeholder="Isi poin..."
                  />
                  <button
                    type="button"
                    @click="removeArrayItem(sec, 'items', iIdx)"
                    class="text-xs text-red-600 hover:text-red-800 px-2 py-1 hover:bg-red-50 rounded"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TYPE 2: AMC SHOWCASE -->
          <div v-else-if="sec.type === 'amc-showcase'" class="space-y-4 pt-3 border-t">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Daftar Mesin AMC</span>
              <button
                type="button"
                @click="addAmcItem(sec)"
                class="px-3 py-1.5 bg-blue-950 text-white hover:bg-blue-900 rounded text-xs font-bold transition"
              >
                + Tambah Kartu AMC
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(item, aIdx) in (sec.items || [])"
                :key="aIdx"
                class="p-4 border rounded-xl bg-slate-50 space-y-3"
              >
                <div class="flex items-center justify-between border-b pb-2">
                  <span class="text-xs font-black px-2 py-0.5 rounded bg-blue-950 text-white">
                    AMC Item #{{ aIdx + 1 }}
                  </span>
                  <div class="flex items-center space-x-2">
                    <label class="flex items-center space-x-1 cursor-pointer">
                      <input type="checkbox" v-model="item.isActive" class="w-4 h-4 text-amber-500 rounded border-slate-300" />
                      <span class="text-xs font-bold">{{ item.isActive !== false ? 'Aktif' : 'Inaktif' }}</span>
                    </label>
                    <button
                      type="button"
                      @click="removeArrayItem(sec, 'items', aIdx)"
                      class="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-0.5 hover:bg-red-50 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                <div>
                  <label class="text-[11px] text-slate-500 block mb-0.5">Subtitle Kemitraan OEM</label>
                  <input
                    v-model="item.title"
                    placeholder="Contoh: by Honeywell since 1986 atau Level 4 Overhaul since 1987"
                    class="w-full p-1.5 border rounded text-xs font-semibold"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label class="text-[11px] text-slate-500 block mb-0.5">Nama Engine / Mesin</label>
                    <input
                      v-model="item.engine"
                      placeholder="Contoh: Honeywell - TPE 331 / Solar Saturn 10"
                      class="w-full p-1.5 border rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label class="text-[11px] text-slate-500 block mb-0.5">Series / Capability</label>
                    <input
                      v-model="item.series"
                      placeholder="Contoh: Series: TPE331 -2, -5, -10"
                      class="w-full p-1.5 border rounded text-xs"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label class="text-[11px] text-slate-500 block mb-0.5">Label (cth: Aircraft / Application)</label>
                    <input
                      v-model="item.aircraftLabel"
                      placeholder="Aircraft / Application"
                      class="w-full p-1.5 border rounded text-xs font-semibold text-slate-700 bg-slate-50"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="text-[11px] text-slate-500 block mb-0.5">Nilai Aplikasi / Pesawat / Tipe</label>
                    <input
                      v-model="item.aircraft"
                      placeholder="Contoh: Casa 212 Series / Industrial One Shaft"
                      class="w-full p-1.5 border rounded text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label class="text-[11px] text-slate-500 block mb-0.5">Gambar Mesin</label>
                  <div class="flex items-center gap-2">
                    <div v-if="item.image" class="w-8 h-8 rounded border bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                      <img :src="item.image" class="max-h-full max-w-full object-contain" />
                    </div>
                    <input
                      v-model="item.image"
                      placeholder="/static/img/engine/..."
                      class="flex-1 p-1.5 border rounded text-xs font-mono"
                    />
                    <label class="px-2 py-1 bg-blue-950 text-white hover:bg-blue-900 text-xs font-bold rounded cursor-pointer shrink-0">
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="$emit('direct-upload', { event: $event, target: item, key: 'image' })"
                      />
                    </label>
                    <button
                      type="button"
                      @click="$emit('open-media-picker', { target: item, key: 'image' })"
                      class="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded shrink-0"
                    >
                      Pilih
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TYPE 3: GROUPED GRID -->
          <div v-else-if="sec.type === 'grouped-grid'" class="space-y-4 pt-3 border-t">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Kategori Kelompok Mesin</span>
              <button
                type="button"
                @click="addGroupItem(sec)"
                class="px-3 py-1.5 bg-blue-950 text-white hover:bg-blue-900 rounded text-xs font-bold transition"
              >
                + Tambah Kategori / Kolom
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(grp, gIdx) in (sec.groups || [])"
                :key="gIdx"
                class="p-4 border rounded-xl bg-slate-50 space-y-3"
              >
                <div class="flex items-center justify-between border-b pb-2">
                  <div class="flex items-center space-x-2">
                    <span class="text-xs font-black px-2 py-0.5 rounded bg-amber-400 text-blue-950 uppercase shrink-0">
                      Group #{{ gIdx + 1 }}
                    </span>
                    <input
                      v-model="grp.badge"
                      placeholder="Label Badge (Contoh: Turbo Fan / Jet)"
                      class="p-1 border rounded text-xs font-bold"
                    />
                    <input
                      v-model="grp.itemLabel"
                      placeholder="Label Default (cth: Application / Aircraft)"
                      class="p-1 border rounded text-xs text-slate-600 font-medium"
                      title="Label default yang akan otomatis digunakan setiap item di group ini (misal: Application, Aircraft, Platform)"
                    />
                  </div>

                  <div class="flex items-center space-x-3">
                    <div class="flex items-center space-x-1 text-xs">
                      <span class="text-slate-500">Lebar:</span>
                      <select v-model="grp.colSpan" class="p-1 border rounded text-xs bg-white">
                        <option :value="4">1/3 Lebar (4 Kolom)</option>
                        <option :value="6">1/2 Lebar (6 Kolom)</option>
                        <option :value="8">2/3 Lebar (8 Kolom)</option>
                        <option :value="12">Penuh (12 Kolom)</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      @click="removeArrayItem(sec, 'groups', gIdx)"
                      class="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-0.5 hover:bg-red-50 rounded"
                    >
                      Hapus Group
                    </button>
                  </div>
                </div>

                <!-- Items inside Group -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-bold text-slate-600">Daftar Mesin di Group Ini</span>
                    <button
                      type="button"
                      @click="addEngineToGroup(grp)"
                      class="text-xs text-blue-950 font-bold bg-amber-400 hover:bg-amber-300 px-2 py-0.5 rounded"
                    >
                      + Tambah Mesin
                    </button>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                      v-for="(eng, eIdx) in (grp.items || [])"
                      :key="eIdx"
                      class="p-3 border rounded-lg bg-white space-y-2"
                    >
                      <div class="flex items-center justify-between border-b pb-1">
                        <input
                          v-model="eng.name"
                          placeholder="Nama Mesin..."
                          class="w-full font-bold text-xs p-1 border rounded"
                        />
                        <button
                          type="button"
                          @click="removeArrayItem(grp, 'items', eIdx)"
                          class="text-xs text-red-600 hover:text-red-800 px-1.5 ml-2 font-bold"
                          title="Hapus Mesin"
                        >
                          &times;
                        </button>
                      </div>

                      <div class="space-y-1.5">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                          <div>
                            <input
                              v-model="eng.aircraftLabel"
                              :placeholder="grp.itemLabel || 'Aircraft / Application'"
                              class="w-full text-[11px] p-1 border rounded font-semibold text-slate-700 bg-slate-50"
                              title="Label prefix (misal: Application, Aircraft, Platform). Jika dikosongkan akan mengikuti default group atau bernilai Aircraft"
                            />
                          </div>
                          <div class="sm:col-span-2">
                            <input
                              v-model="eng.aircraft"
                              placeholder="Nilai Aplikasi / Pesawat / Platform"
                              class="w-full text-[11px] p-1 border rounded"
                            />
                          </div>
                        </div>
                        <div>
                          <input
                            v-model="eng.series"
                            placeholder="Series / Kapabilitas (cth: Capability: Overhaul, Repair...)"
                            class="w-full text-[11px] p-1 border rounded"
                          />
                        </div>
                      </div>

                      <div class="flex items-center gap-1.5">
                        <input
                          v-model="eng.image"
                          placeholder="Gambar"
                          class="flex-1 text-[11px] p-1 border rounded font-mono"
                        />
                        <label class="px-2 py-1 bg-blue-950 text-white text-[10px] font-bold rounded cursor-pointer shrink-0">
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            class="hidden"
                            @change="$emit('direct-upload', { event: $event, target: eng, key: 'image' })"
                          />
                        </label>
                        <button
                          type="button"
                          @click="$emit('open-media-picker', { target: eng, key: 'image' })"
                          class="px-2 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold rounded shrink-0"
                        >
                          Pilih
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TYPE 4: STEP TIMELINE -->
          <div v-else-if="sec.type === 'step-timeline'" class="space-y-4 pt-3 border-t">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Tahapan Manufaktur / Steps</span>
              <button
                type="button"
                @click="addStepItem(sec)"
                class="px-3 py-1.5 bg-blue-950 text-white hover:bg-blue-900 rounded text-xs font-bold transition"
              >
                + Tambah Step
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div
                v-for="(step, sIdx) in (sec.steps || [])"
                :key="sIdx"
                class="p-3 border rounded-xl bg-slate-50 space-y-2 relative"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-1.5">
                    <span class="text-xs font-bold text-slate-500">Step:</span>
                    <input
                      v-model="step.step"
                      class="w-12 p-1 border rounded text-xs font-bold text-center"
                      placeholder="1"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removeArrayItem(sec, 'steps', sIdx)"
                    class="text-xs text-red-600 hover:text-red-800 font-bold"
                  >
                    &times;
                  </button>
                </div>

                <input
                  v-model="step.title"
                  placeholder="Judul Step (Contoh: STEAM TURBINE 450 HP)"
                  class="w-full p-1.5 border rounded text-xs font-bold"
                />

                <textarea
                  v-model="step.desc"
                  rows="2"
                  placeholder="Keterangan..."
                  class="w-full p-1.5 border rounded text-xs"
                ></textarea>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Catatan Tambahan (Note Box di Bawah)</label>
              <textarea
                v-model="sec.note"
                rows="2"
                placeholder="Contoh: With the experience and expertise of our engineers..."
                class="w-full p-2 border rounded text-xs leading-relaxed"
              ></textarea>
            </div>
          </div>

          <!-- TYPE 5: FEATURE CARDS -->
          <div v-else-if="sec.type === 'feature-cards'" class="space-y-4 pt-3 border-t">
            <div class="flex items-center justify-between">
              <div>
                <label class="text-[11px] font-semibold text-slate-600 block mb-0.5">Badge Partner (Opsional)</label>
                <input
                  v-model="sec.partner"
                  placeholder="Contoh: Partner: PRAXAIR"
                  class="p-1.5 border rounded text-xs font-bold"
                />
              </div>
              <button
                type="button"
                @click="addFeatureCard(sec)"
                class="px-3 py-1.5 bg-blue-950 text-white hover:bg-blue-900 rounded text-xs font-bold transition self-end"
              >
                + Tambah Kartu Fitur
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(card, cIdx) in (sec.cards || [])"
                :key="cIdx"
                class="p-4 border rounded-xl bg-slate-50 space-y-2"
              >
                <div class="flex items-center justify-between border-b pb-1.5">
                  <input
                    v-model="card.title"
                    placeholder="Judul Kartu (Contoh: SermeTel Coating)"
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
                  rows="3"
                  placeholder="Keterangan..."
                  class="w-full p-2 border rounded text-xs leading-relaxed"
                ></textarea>

                <div class="space-y-1">
                  <label class="text-[11px] font-semibold text-slate-600 block">Gambar Ilustrasi Disamping (Opsional)</label>
                  <div class="flex gap-2 items-center">
                    <input
                      v-model="card.image"
                      placeholder="/static/img/services/coating01.jpg"
                      class="flex-1 p-1.5 border rounded text-xs font-mono bg-white"
                    />
                    <button
                      type="button"
                      @click="$emit('open-media-picker', { target: card, key: 'image' })"
                      class="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded"
                    >
                      Pilih
                    </button>
                    <label class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded cursor-pointer">
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="(e) => $emit('direct-upload', { event: e, target: card, key: 'image' })"
                      />
                    </label>
                  </div>
                  <div v-if="card.image" class="mt-1 flex items-center gap-2 p-1 bg-slate-100 rounded border">
                    <img :src="card.image" alt="Preview" class="w-12 h-8 object-cover rounded border" />
                    <span class="text-[10px] text-slate-500 truncate font-mono">{{ card.image }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TYPE 6: QUICK CATEGORIES -->
          <div v-else-if="sec.type === 'quick-categories'" class="space-y-4 pt-3 border-t">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Thumbnail Kategori</span>
              <button
                type="button"
                @click="addCategoryItem(sec)"
                class="px-3 py-1.5 bg-blue-950 text-white hover:bg-blue-900 rounded text-xs font-bold transition"
              >
                + Tambah Thumbnail
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div
                v-for="(cat, cIdx) in (sec.items || [])"
                :key="cIdx"
                class="p-3 border rounded-xl bg-slate-50 space-y-2"
              >
                <div class="flex items-center justify-between">
                  <input
                    v-model="cat.title"
                    placeholder="Judul Kategori"
                    class="w-full p-1 border rounded text-xs font-bold"
                  />
                  <button
                    type="button"
                    @click="removeArrayItem(sec, 'items', cIdx)"
                    class="text-xs text-red-600 hover:text-red-800 font-bold ml-1"
                  >
                    &times;
                  </button>
                </div>
                <div class="flex items-center gap-1.5">
                  <input
                    v-model="cat.image"
                    placeholder="Gambar"
                    class="flex-1 text-[11px] p-1 border rounded font-mono"
                  />
                  <label class="px-2 py-1 bg-blue-950 text-white text-[10px] font-bold rounded cursor-pointer shrink-0">
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="$emit('direct-upload', { event: $event, target: cat, key: 'image' })"
                    />
                  </label>
                  <button
                    type="button"
                    @click="$emit('open-media-picker', { target: cat, key: 'image' })"
                    class="px-2 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold rounded shrink-0"
                  >
                    Pilih
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TYPE 7: HEADER BANNER -->
          <div v-else-if="sec.type === 'header-banner' || sec.type === 'hero-banner'" class="space-y-4 pt-3 border-t">
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-0.5">Teks Judul Banner &lt;h2&gt;</label>
              <input
                v-model="sec.title"
                class="w-full p-2 border rounded text-xs font-bold text-blue-950 uppercase"
                placeholder="BANNER TITLE"
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

          <!-- TYPE 8: INTRO SECTION -->
          <div v-else-if="sec.type === 'intro-section' || sec.type === 'intro'" class="space-y-4 pt-3 border-t">
            <div class="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">Badge Kategori (Amber)</label>
                  <input
                    v-model="sec.badge"
                    placeholder="Contoh: Global Capabilities"
                    class="w-full p-2 border border-slate-300 rounded text-xs font-bold text-amber-600 bg-white uppercase tracking-wider"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">Judul Section &lt;h2&gt;</label>
                  <input
                    v-model="sec.title"
                    placeholder="Contoh: MRO SERVICES & CAPABILITIES"
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
  title: string;
}>();

defineEmits<{
  (e: 'open-media-picker', payload: { target: any; key: string }): void;
  (e: 'direct-upload', payload: { event: Event; target: any; key: string }): void;
}>();

const showAddMenu = ref(false);
const collapsedMap = ref<Record<number, boolean>>({});

const availableTypes = [
  {
    type: 'split-editorial',
    label: '1. Narasi Pengantar & Foto Samping',
    desc: 'Layout editorial split (gambar besar kiri, teks & list/cards kanan)',
    icon: '📰'
  },
  {
    type: 'amc-showcase',
    label: '2. Kartu AMC (Authorized Maintenance Center)',
    desc: 'Kartu resmi OEM partner dengan badge lisensi, foto engine, dan series',
    icon: '🏆'
  },
  {
    type: 'grouped-grid',
    label: '3. Grid Mesin Berkelompok',
    desc: 'Tabel kartu mesin terbagi per kategori (Turbo Fan, Prop, GE Series)',
    icon: '⚙️'
  },
  {
    type: 'step-timeline',
    label: '4. Tahapan Workflow / Manufaktur',
    desc: 'Langkah-langkah bernomor urut dengan deskripsi dan kotak catatan',
    icon: '🔢'
  },
  {
    type: 'feature-cards',
    label: '5. Kartu Fitur Khusus / Highlight',
    desc: 'Kotak kapabilitas 2 atau 3 kolom dengan badge partner (contoh: Coating)',
    icon: '✨'
  },
  {
    type: 'quick-categories',
    label: '6. Grid Thumbnail Kategori Cepat',
    desc: 'Grid visual 4-8 kartu kotak dengan foto thumbnail dan judul',
    icon: '🖼️'
  },
  {
    type: 'header-banner',
    label: '7. Header Banner (Background Image & Title)',
    desc: 'Banner latar foto (ntp-bg-old.jpg) dengan judul putih besar di tengah',
    icon: '🌄'
  },
  {
    type: 'intro-section',
    label: '8. Intro Header (Badge + Judul + Paragraf)',
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
  const id = `sec-${Date.now()}`;

  let newSec: Record<string, any> = {
    id,
    type,
    isActive: true,
    title: 'Judul Section Baru',
    badge: '',
    description: ''
  };

  if (type === 'split-editorial') {
    newSec.image = '/static/img/services/aero01.jpg';
    newSec.displayType = 'card';
    newSec.rightbg = true;
    newSec.items = ['Poin Layanan 1', 'Poin Layanan 2', 'Poin Layanan 3', 'Poin Layanan 4'];
  } else if (type === 'amc-showcase') {
    newSec.badge = 'OEM Authorization';
    newSec.title = 'Authorized Maintenance Center (AMC)';
    newSec.description = 'Certified maintenance capabilities approved by international OEMs.';
    newSec.items = [
      {
        isActive: true,
        title: 'by OEM Partner',
        engine: 'Engine Model',
        series: 'Series: 100/200',
        aircraft: 'Aircraft / Application',
        image: '/static/img/engine/placeholder-saturn10.png'
      }
    ];
  } else if (type === 'grouped-grid') {
    newSec.title = 'Engine & Equipment Capabilities';
    newSec.description = 'Precision overhaul solutions grouped by engineering category.';
    newSec.groups = [
      {
        badge: 'Category A',
        colSpan: 6,
        items: [
          {
            isActive: true,
            name: 'Equipment Model A',
            aircraft: 'Application Platform',
            series: 'Capability: Overhaul, Repair',
            image: '/static/img/engine/placeholder-lm2500.png'
          }
        ]
      },
      {
        badge: 'Category B',
        colSpan: 6,
        items: [
          {
            isActive: true,
            name: 'Equipment Model B',
            aircraft: 'Application Platform',
            series: 'Capability: Overhaul, Repair',
            image: '/static/img/engine/placeholder-ft8.png'
          }
        ]
      }
    ];
  } else if (type === 'step-timeline') {
    newSec.badge = 'Engineering Workflow';
    newSec.title = 'Manufacturing & Overhaul Process';
    newSec.steps = [
      { step: '1', title: 'Step 1: Intake & NDI', desc: 'Detailed non-destructive inspection.' },
      { step: '2', title: 'Step 2: Disassembly', desc: 'Precision disassembly and part measurement.' },
      { step: '3', title: 'Step 3: Overhaul & Repair', desc: 'Component re-manufacturing and balancing.' },
      { step: '4', title: 'Step 4: Final Validation', desc: 'Certified test cell run and documentation.' }
    ];
    newSec.note = 'All procedures are executed according to strict OEM technical data and airworthiness standards.';
  } else if (type === 'feature-cards') {
    newSec.badge = 'Specialized Capabilities';
    newSec.title = 'Specialized Engineering Solutions';
    newSec.partner = 'Partner: PRAXAIR';
    newSec.cards = [
      {
        title: 'Specialized Process 1',
        description: 'Advanced surface engineering for high durability and anti-corrosion protection.'
      },
      {
        title: 'Specialized Process 2',
        description: 'Precision anti-fouling coatings for extreme operating environments.'
      }
    ];
  } else if (type === 'quick-categories') {
    newSec.title = 'Capabilities Overview';
    newSec.items = [
      { title: 'Gas Turbine', image: '/static/img/services/industrial01.jpg' },
      { title: 'Steam Turbine', image: '/static/img/services/industrial02.jpg' },
      { title: 'Compressor', image: '/static/img/services/industrial01.jpg' },
      { title: 'Field Services', image: '/static/img/services/aero01.jpg' }
    ];
  } else if (type === 'header-banner' || type === 'hero-banner') {
    newSec.title = 'SECTION BANNER';
    newSec.subtitle = '';
    newSec.bgImage = '/static/img/ntp-bg-old.jpg';
  } else if (type === 'intro-section' || type === 'intro') {
    newSec.badge = 'Global Capabilities';
    newSec.title = 'MRO SERVICES & CAPABILITIES';
    newSec.description = 'Comprehensive maintenance, repair, and overhaul solutions delivering superior quality, certified safety, and optimal operational performance.';
  }

  props.sections.push(newSec);
  // Expand newly added section
  collapsedMap.value[props.sections.length - 1] = false;
};

const addStringItem = (obj: any, key: string) => {
  if (!obj[key]) obj[key] = [];
  obj[key].push('');
};

const addAmcItem = (sec: any) => {
  if (!sec.items) sec.items = [];
  sec.items.push({
    isActive: true,
    title: 'by OEM Partner',
    engine: 'New Engine Model',
    series: 'Series: ...',
    aircraft: 'Application / Aircraft: ...',
    image: '/static/img/engine/placeholder-saturn10.png'
  });
};

const addGroupItem = (sec: any) => {
  if (!sec.groups) sec.groups = [];
  sec.groups.push({
    badge: 'New Group Category',
    itemLabel: 'Application',
    colSpan: 6,
    items: [
      {
        isActive: true,
        name: 'New Equipment',
        aircraftLabel: 'Application',
        aircraft: 'Application Platform',
        series: 'Capability: Overhaul',
        image: ''
      }
    ]
  });
};

const addEngineToGroup = (grp: any) => {
  if (!grp.items) grp.items = [];
  grp.items.push({
    isActive: true,
    name: 'New Engine',
    aircraftLabel: grp.itemLabel || 'Application',
    aircraft: 'Platform',
    series: 'Series / Capability',
    image: ''
  });
};

const addStepItem = (sec: any) => {
  if (!sec.steps) sec.steps = [];
  const nextNum = String(sec.steps.length + 1);
  sec.steps.push({
    step: nextNum,
    title: `Step ${nextNum}`,
    desc: 'Deskripsi langkah...'
  });
};

const addFeatureCard = (sec: any) => {
  if (!sec.cards) sec.cards = [];
  sec.cards.push({
    title: 'Nama Fitur Baru',
    description: 'Deskripsi fitur...'
  });
};

const addCategoryItem = (sec: any) => {
  if (!sec.items) sec.items = [];
  sec.items.push({
    title: 'Kategori Baru',
    image: '/static/img/services/industrial01.jpg'
  });
};

const removeArrayItem = (obj: any, key: string, idx: number) => {
  if (obj[key] && Array.isArray(obj[key])) {
    obj[key].splice(idx, 1);
  }
};
</script>

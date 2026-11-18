<template>
  <div class="bg-slate-50 min-h-screen">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'CAREER'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'CAREER' }}</template>
    </HeaderSectionTest>

    <section class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Work With Us'"
          :title="intro.title || 'OUR OPEN ROLES'"
          :description="intro.description || 'Discover exciting career opportunities at PT. NTP and join our talented and passionate team. Explore our current openings below and find the perfect role to showcase your skills and experiences.'"
        />

        <!-- Search & Filter Controls (Shown only when vacancies exist) -->
        <div v-if="rawJobs.length > 0" class="mt-8 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Search Keyword -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Search Roles
              </label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search role title, job code, qualifications..."
                  class="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-950 focus:border-blue-950"
                />
                <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Filter Department -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <select
                v-model="selectedDepartment"
                class="w-full p-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-950 bg-white"
              >
                <option value="">All Departments</option>
                <option v-for="dept in departmentsList" :key="dept" :value="dept">
                  {{ dept }}
                </option>
              </select>
            </div>

            <!-- Filter Job Type -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Job Type
              </label>
              <select
                v-model="selectedJobType"
                class="w-full p-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-950 bg-white"
              >
                <option value="">All Job Types</option>
                <option v-for="jt in jobTypesList" :key="jt" :value="jt">
                  {{ jt }}
                </option>
              </select>
            </div>
          </div>

          <!-- Counter and Reset -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing <strong class="text-blue-950">{{ filteredJobs.length }}</strong> of <strong class="text-blue-950">{{ rawJobs.length }}</strong> open positions
            </div>
            <button
              v-if="searchQuery || selectedDepartment || selectedJobType"
              @click="resetFilters"
              class="text-blue-900 hover:text-blue-700 font-semibold"
            >
              Reset Filters &times;
            </button>
          </div>
        </div>

        <!-- 1. Loading State -->
        <div v-if="pending" class="text-center py-16">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-blue-950 mb-3"></div>
          <p class="text-xs text-slate-500 font-medium">Loading career openings from recruitment server...</p>
        </div>

        <!-- 2. Error State -->
        <div
          v-else-if="jobsError || (jobsResponse && !jobsResponse.success)"
          class="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center max-w-2xl mx-auto"
        >
          <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-base font-bold text-amber-900 mb-1">Recruitment Information Being Updated</h3>
          <p class="text-xs text-amber-800 leading-relaxed mb-4">
            Our online recruitment service is currently undergoing routine maintenance or data synchronization. Please check back shortly.
          </p>
          <button
            @click="refreshJobs"
            class="text-xs bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Reload Openings
          </button>
        </div>

        <!-- 3. Dedicated Empty State: No Vacancies Open (0 Vacancies) -->
        <div
          v-else-if="rawJobs.length === 0"
          class="bg-white border border-slate-200 rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm"
        >
          <div class="w-20 h-20 bg-blue-50 text-blue-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xs border border-blue-100">
            <svg class="w-10 h-10 text-blue-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <span class="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            No Current Openings
          </span>
          <h2 class="text-2xl font-extrabold text-blue-950 mb-3 tracking-tight">
            No Active Vacancies at This Time
          </h2>
          <p class="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto mb-6">
            Thank you for your interest in building a career with <strong>PT Nusantara Turbin dan Propulsi</strong>. We currently do not have any open positions available for new applications.
          </p>

          <div class="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 text-left text-xs text-slate-600 space-y-2 max-w-lg mx-auto">
            <div class="font-bold text-slate-800 text-[13px] flex items-center space-x-1.5 mb-2">
              <span>💡</span>
              <span>Important Applicant Advisory:</span>
            </div>
            <p class="leading-relaxed">
              • All official PT NTP job vacancies are exclusively published through this official website and corporate communication channels.
            </p>
            <p class="leading-relaxed">
              • PT NTP never charges any fees throughout any stage of the recruitment process.
            </p>
            <p class="leading-relaxed">
              • Please revisit this page periodically for updates on future openings and opportunities.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3">
            <NuxtLink
              to="/"
              class="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold rounded-xl shadow transition"
            >
              Back to Home
            </NuxtLink>
            <NuxtLink
              to="/contact/contact-info"
              class="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>

        <!-- 4. Filter Yields 0 Matching Results -->
        <div
          v-else-if="filteredJobs.length === 0"
          class="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-xl mx-auto shadow-xs"
        >
          <div class="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-blue-950 mb-1">No Matching Positions Found</h3>
          <p class="text-xs text-slate-500 leading-relaxed max-w-md mx-auto mb-4">
            No job vacancies match your selected search criteria or filter combinations.
          </p>
          <button
            @click="resetFilters"
            class="text-xs font-semibold bg-blue-950 hover:bg-blue-900 text-white px-4 py-2.5 rounded-lg transition"
          >
            Show All Openings ({{ rawJobs.length }})
          </button>
        </div>

        <!-- 5. Active Job Cards List -->
        <div v-else class="space-y-6">
          <div
            v-for="job in filteredJobs"
            :key="job.id"
            class="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400 p-6 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
          >
            <!-- Card Top: Code + Department + Remaining Days Badge -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
              <div class="flex items-center space-x-2">
                <span class="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                  {{ job.code }}
                </span>
                <span v-if="job.department?.name" class="text-xs font-semibold text-amber-600">
                  {{ job.department.name }}
                </span>
              </div>

              <!-- Days remaining badge -->
              <div class="flex items-center space-x-2">
                <span
                  v-if="job.days_remaining !== undefined && job.days_remaining !== null"
                  :class="[
                    'text-[11px] font-bold px-2.5 py-1 rounded-full',
                    job.days_remaining <= 3 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                  ]"
                >
                  {{ job.days_remaining > 0 ? `${job.days_remaining} day${job.days_remaining > 1 ? 's' : ''} left` : 'Last day to apply' }}
                </span>
                <span v-if="job.job_type?.name" class="text-[11px] font-medium bg-blue-50 text-blue-900 px-2.5 py-1 rounded-full">
                  {{ job.job_type.name }}
                </span>
              </div>
            </div>

            <!-- Job Title & Key Details -->
            <div class="space-y-3">
              <h3 class="text-xl font-extrabold text-blue-950 tracking-tight hover:text-amber-600 transition">
                {{ job.title }}
              </h3>

              <!-- Meta specs icons/badges -->
              <div class="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-600">
                <div v-if="job.location" class="flex items-center space-x-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ job.location }}</span>
                </div>

                <div v-if="job.min_education?.name" class="flex items-center space-x-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span>{{ job.min_education.name }}</span>
                </div>

                <div v-if="job.quota" class="flex items-center space-x-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Quota: {{ job.quota }} position{{ job.quota > 1 ? 's' : '' }}</span>
                </div>

                <div v-if="job.min_experience_years !== null && job.min_experience_years !== undefined" class="flex items-center space-x-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{{ job.min_experience_years > 0 ? `Min. ${job.min_experience_years} year${job.min_experience_years > 1 ? 's' : ''} experience` : 'Fresh graduates welcome' }}</span>
                </div>
              </div>

              <!-- Collapsible / Expanded Description & Requirements -->
              <div v-if="expandedJobId === job.id" class="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-700 bg-slate-50/70 p-4 rounded-xl">
                <div v-if="job.description">
                  <div class="font-bold text-blue-950 mb-1">Job Description:</div>
                  <p class="whitespace-pre-line leading-relaxed">{{ job.description }}</p>
                </div>
                <div v-if="job.requirements">
                  <div class="font-bold text-blue-950 mb-1">Qualifications & Requirements:</div>
                  <p class="whitespace-pre-line leading-relaxed">{{ job.requirements }}</p>
                </div>
                <div class="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  Application Period: <strong>{{ job.open_date }}</strong> to <strong>{{ job.close_date }}</strong>
                </div>
              </div>
            </div>

            <!-- Card Bottom: Toggle Detail + Apply Button -->
            <div class="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                @click="toggleExpand(job.id)"
                class="text-xs text-blue-950 hover:text-blue-800 font-semibold flex items-center space-x-1"
              >
                <span>{{ expandedJobId === job.id ? 'Hide Details' : 'View Details & Requirements' }}</span>
                <span>{{ expandedJobId === job.id ? '▲' : '▼' }}</span>
              </button>

              <div class="flex items-center space-x-3">
                <span class="text-[11px] text-slate-400 hidden sm:inline">
                  Deadline: {{ job.close_date }}
                </span>
                <a
                  :href="job.apply_url || job.apply_path || '#'"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition text-center flex items-center justify-center space-x-1"
                >
                  <span>Apply Now</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

definePageMeta({
  layout: 'tw'
});

useHead({
  title: 'Career Opportunities'
});

const { data: content } = await useSiteContent('career');

// Server-side request to Nuxt internal proxy endpoint
const { data: jobsResponse, pending, error: jobsError, refresh: refreshJobs } = await useFetch<any>('/api/career/jobs');

const rawJobs = computed(() => {
  return Array.isArray(jobsResponse.value?.data) ? jobsResponse.value.data : [];
});

const searchQuery = ref('');
const selectedDepartment = ref('');
const selectedJobType = ref('');
const expandedJobId = ref<number | null>(null);

const toggleExpand = (id: number) => {
  expandedJobId.value = expandedJobId.value === id ? null : id;
};

const departmentsList = computed(() => {
  const depts = new Set<string>();
  rawJobs.value.forEach((j: any) => {
    if (j.department?.name) depts.add(j.department.name);
  });
  return Array.from(depts);
});

const jobTypesList = computed(() => {
  const types = new Set<string>();
  rawJobs.value.forEach((j: any) => {
    if (j.job_type?.name) types.add(j.job_type.name);
  });
  return Array.from(types);
});

const filteredJobs = computed(() => {
  let list = rawJobs.value;
  if (selectedDepartment.value) {
    list = list.filter((j: any) => j.department?.name === selectedDepartment.value);
  }
  if (selectedJobType.value) {
    list = list.filter((j: any) => j.job_type?.name === selectedJobType.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter((j: any) => {
      const title = (j.title || '').toLowerCase();
      const code = (j.code || '').toLowerCase();
      const desc = (j.description || '').toLowerCase();
      const req = (j.requirements || '').toLowerCase();
      const loc = (j.location || '').toLowerCase();
      return title.includes(q) || code.includes(q) || desc.includes(q) || req.includes(q) || loc.includes(q);
    });
  }
  return list;
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedDepartment.value = '';
  selectedJobType.value = '';
};

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Work With Us',
      title: content.value?.title || 'OUR OPEN ROLES',
      description: content.value?.description || 'Discover exciting career opportunities at PT. NTP and join our talented and passionate team. Explore our current openings below and find the perfect role to showcase your skills and experiences.'
    }
  ];
});
</script>

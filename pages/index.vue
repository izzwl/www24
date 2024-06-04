<template>
    <div style="min-height: 90vh; z-index: -99999; margin-top:2rem;">
        <WwwTitle title="Hello World"/>
        
        <div class="hello">
        Hello coba versi {{ website.version }}
        </div>
    </div>
</template>

<script setup lang="ts">
const website = useWebsiteStore()
</script>
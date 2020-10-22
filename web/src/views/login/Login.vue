<template>
    <div id="waveformContainer">
        <canvas id="waveform" width="1200" height="300"></canvas>
        <canvas id="waveformOverlay" width="1200" height="300"></canvas>
    </div>
</template>
<script>
    import VueWaveSurfer from 'wavesurfer.js'
    export default {
        name: 'login',
        data() {
            return {
                options: {
                },
                file: 'http://example.com/file.mp3'
            }
        }
    }
</script>
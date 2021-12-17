const production = !process.env.ROLLUP_WATCH
module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    plugins: [],
    content: ['./src/**/*.{html,js,ts,svelte}'],
}

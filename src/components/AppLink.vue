<template>
    <component :is="isExternal ? 'a' : 'router-link'" :href="isExternal ? to : undefined"
        :to="isExternal ? undefined : to" v-bind="$attrs" v-on="$listeners">
        <slot />
    </component>
</template>

<script>
export default {
    name: 'AppLink',
    props: {
        to: {
            type: String,
            required: true,
        },
    },
    computed: {
        isExternal() {
            return this.to.startsWith('http://') || this.to.startsWith('https://');
        },
    },
};
</script>
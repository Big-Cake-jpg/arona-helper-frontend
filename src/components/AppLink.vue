<template>
  <router-link :to="to" v-if="!isExternalLink" v-bind="$attrs" v-on="$listeners">
    <slot />
  </router-link>
  <a v-else :href="to" v-bind="$attrs" v-on="$listeners" target="_blank">
    <slot />
  </a>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AppLink',
  inheritAttrs: false,

  props: {
    // @ts-ignore
    ...RouterLink.props,
  },

  computed: {
    isExternalLink() {
      return typeof this.to === 'string' && (this.to.startsWith('http') || this.to.startsWith('https'))
    },
  },
}
</script>